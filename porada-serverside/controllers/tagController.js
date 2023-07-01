const {taglist_m, page_m, user_m} = require('../postgre-models')
const ApiError = require('../errors/ApiError')
const {validationResult} = require('express-validator')

class TagController{
	async getAll(req, res){
		const {limit} = req.query
		let tags;
		if(limit){
			tags = await taglist_m.findAll({
				limit,
				include: {
					model: page_m,
					include: {
						model: user_m,
						paranoid: false
					}
				}
			})
		}else{
			tags = await taglist_m.findAll()
		}
		return res.json(tags)
	}
	async getOne(req, res, next){
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			return next(ApiError.badRequest(errors))
		}
		const {name} = req.params
		const tag = await taglist_m.findOne({where: {name}, include: page_m});
		return res.json(tag)
	}
	async add(req, res, next){
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			return next(ApiError.badRequest(errors))
		}
		const {name} = req.body
		const tag = await taglist_m.create({name})
		return res.json(tag)
	}
	async remove(req, res, next){
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			return next(ApiError.badRequest(errors))
		}
		const {id} = req.body
		const tag = await taglist_m.destroy({ where: {id} })
		return res.json(tag)
	}
}

module.exports = new TagController()