const ApiError = require('../errors/ApiError')
const {user_m, links_m} = require('../postgre-models')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const mailer = require('../mailer')

const generateJwt = (id, username, role) =>{
	return jwt.sign({id: id, username: username, role: role}, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn: '12h' })
}

class UserController{
	async registration(req, res, next){
		const result = validationResult(req)
		if(!result.isEmpty()){
			return next(ApiError.badRequest(result.errors))
		}
		const {username, description, email, password} = req.body
		const candidate = await user_m.findOne({where: {email}, paranoid: false})
		if(candidate){
			if(candidate.deletedAt){
				return next(ApiError.badRequest([{msg: 'Цей користувач заблокован'}]))
			}
			return next(ApiError.badRequest([{msg: 'Користувач вже існує'}]))
		}
		const hashedPassword = bcrypt.hashSync(password, 5)
		let fileName = "";
		if(req.files){
			fileName = uuidv4()+".jpg"
			const {avatar} = req.files
			avatar.mv(path.resolve(__dirname, '..', 'static', fileName))
		}else{
			fileName = 'default.jpg';
		}
		const user = await user_m.create({username,description,email,password: hashedPassword,avatar: fileName})
		const uuid = uuidv4()
		const link = 'http://localhost:2000/api/user/submit/'+uuid
		links_m.create({userId: user.id, link: uuid})
		mailer.send(email, 'Підтвердження аккаунту', '<h2>Підтвердіть свій аккаунт по посиланню</h2><h4>'+link+'</h4>', 'Підтвердіть свій аккаунт по посиланню: '+link)
		return res.json({user})
	}
	async login(req, res, next){
		const result = validationResult(req)
		if(!result.isEmpty()){
			return next(ApiError.badRequest(result.errors))
		}
		const {email, password} = req.body;
		const user = await user_m.findOne({where: {email}})
		if(!user){
			return next(ApiError.notAuth([{msg: 'Користувача не існує'}]))
		}
		const comparePassword = bcrypt.compareSync(password, user.password);
		if(!comparePassword){
			return next(ApiError.notAuth([{msg: 'Пароль невірний'}]))
		}
		const outlink = await links_m.findOne({where: {userId: user.id}}) 
		if(outlink){
			return next(ApiError.badRequest([{msg: 'Цей аккаунт не підтвержен'}]))
		}
		const token = generateJwt(user.id, user.username, user.role)
		return res.json({token})
	}
	async getOne(req, res, next){
		const result = validationResult(req)
		if(!result.isEmpty()){
			return next(ApiError.badRequest(result.errors))
		}
		const {id} = req.query
		const user = await user_m.findOne({where: {id}, paranoid: false})

		return res.json(user)
	}
	async remove(req, res, next){
		const result = validationResult(req)
		if(!result.isEmpty()){
			return next(ApiError.badRequest(result.errors))
		}
		const {id} = req.body
		const user = await user_m.destroy({where: {id}})
		return res.json(user)
	}
	async updateData(req, res, next){
		const result = validationResult(req)
		if(!result.isEmpty()){
			return next(ApiError.badRequest(result.errors))
		}
		const {id, name, description} = req.body
		const user = await user_m.update({username: name, description: description}, {where:{id}})
		return res.json(user)
	}
	async updateToken(req, res, next){
		const result = validationResult(req)
		if(!result.isEmpty()){
			return next(ApiError.badRequest(result.errors))
		}
		const id = req.user.id
		const user = await user_m.findOne({where: {id}, paranoid: false})
		if(user && user.get('deletedAt')){
			return next(ApiError.forbidden([{msg: 'Ви заблоковані'}]))
		}
		const token = generateJwt(id, req.user.username, req.user.role)
		return res.json({token})
	}
	async submit(req, res, next){
		const result = validationResult(req)
		if(!result.isEmpty()){
			return next(ApiError.badRequest(result.errors))
		}
		const {link} = req.params
		const outlink = await links_m.findOne({where: {link}})
		if(!outlink){
			return next(ApiError.forbidden([{msg: 'Посилання не існує'}]))
		}
		await links_m.destroy({where: {link}})
		res.writeHead(302, {
		    Location: 'http://localhost:3000/login?submit=yes'
		});
		return res.end();
	}
}

module.exports = new UserController()