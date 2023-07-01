const {message_m, dfiles_m, filelist_m} = require('../postgre-models')
const ApiError = require('../errors/ApiError')
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const {validationResult} = require('express-validator')

class MessageController{
	async getAll(req, res, next){
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			return next(ApiError.badRequest(errors))
		}
		const {directId} = req.query
		const messages = await message_m.findAndCountAll({where: {directlistId: directId}})
		return res.json(messages)
	}
	async add(req, res, next){
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			return next(ApiError.badRequest(errors))
		}
		const {directId, content, userId} = req.body
		const message = await message_m.create({content, userId, directlistId: directId})
		return res.json(message)
	}
	async remove(req, res, next){
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			return next(ApiError.badRequest(errors))
		}
		const {id} = req.body
		const message = await message_m.destroy({where: {id}})
		return res.json(message)
	}
}

module.exports = new MessageController()