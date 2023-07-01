const {directs_m, directlist_m, user_m} = require('../postgre-models')
const ApiError = require('../errors/ApiError')
const {validationResult} = require('express-validator')
const { Op } = require("sequelize");

class DirectController{
	async getOne(req, res, next){
		const errors = validationResult(req).array()
		let data;
		if(errors.length === 2){
			return next(ApiError.badRequest(errors))
		}else if(errors[0].path === "id"){
			const {userId} = req.query
			data = await user_m.findAndCountAll({
				where: {id: userId},
				include: {
					model: directlist_m,
					include: {
						model: user_m
					}
				}
			})
		}else if(errors[0].path === "userId"){
			const {id} = req.query
			data = await user_m.findAndCountAll({
				include: {
					model: directlist_m,
					where: {id}
				}
			})
		}
		return res.json(data)
	}
	async create(req, res, next){
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			return next(ApiError.badRequest(errors))
		}
		const {users} = req.body
		let direct = await directlist_m.findAll({
			include: {
				model: user_m,
				where: {
					id: {
						[Op.or]: [users[0],users[1]]
					}
				}
			},
			group: ['directlist.id', 'users.id', 'users->directs.id']
		})
		if(direct.length < 2){
			let direct = await directlist_m.create()
			users.forEach(async (elem, index)=>{
				await directs_m.create({directlistId: direct.id, userId: elem})
			})
		}
		return res.json(direct)
	}
}

module.exports = new DirectController()