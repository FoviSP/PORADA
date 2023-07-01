const sequelize = require('../postgre-connect');
const {score_m,page_m,user_m} = require('../postgre-models')
const ApiError = require('../errors/ApiError')

const {validationResult} = require('express-validator')

class ScoreController {
	async getAll(req, res){
		const {userId, pageId} = req.query
		let scores
		if(userId && pageId){
			scores = await score_m.findAndCountAll({
				where: {userId,pageId}
			})
		}
		else if(userId && !pageId){
			scores = await score_m.findAndCountAll({where: {userId},paranoid: false})
		}
		else if(!userId && pageId){
			scores = await score_m.findAndCountAll({where: {pageId}})
		}
		else if(!pageId && !userId){
			scores = await score_m.findAll({
				attributes: [
				[sequelize.fn('sum', sequelize.col('score')), 'score']
				],
				include: {
					model: page_m,
					include: {
						model: user_m
					},
				},
				group: ['page.id','page->user.id','score'],
				order: [
					['score', 'DESC']
				]
			})
		}
		return res.json(scores)
	}
	async getOne(req, res, next){
		const result = validationResult(req)
        if(!result.isEmpty()){
            return next(ApiError.badRequest(result.errors))
        }
		const {pageId} = req.params
		const score = await score_m.findAll({
			attributes: [
				[sequelize.fn('sum', sequelize.col('score')), 'score']
			],
			where:{pageId}
		})
		return res.json(score)
	}
	async set(req, res){
		const result = validationResult(req)
        if(!result.isEmpty()){
            return next(ApiError.badRequest(result.errors))
        }
        const {score, userId, pageId} = req.body
        let scores = await score_m.findOrCreate({
			where: {
				userId: userId,
				pageId: pageId
			},
			defaults: {
				score: score,
		    	userId: userId,
		    	pageId: pageId
		    }
		})
        scores = await score_m.update(
        	{
        		score: score,
		    	userId: userId,
		    	pageId: pageId
        	},
        	{where: {userId, pageId}
        })
        return res.json(scores)
	}
}

module.exports = new ScoreController()
