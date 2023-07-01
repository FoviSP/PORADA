const {page_m, comment_m, pfiles_m, filelist_m} = require('../postgre-models')
const ApiError = require('../errors/ApiError')
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const {validationResult} = require('express-validator')

class CommentController{
	async getAll(req, res, next){
		const {id, pageId} = req.query
		let comments;
		if(!id && !pageId){
			return next(ApiError.badRequest([{msg: "id та pageId не вказано"}]))
		}else if(id && !pageId){
			comments = await comment_m.findAll({where: {id}, include: filelist_m});
		}else if(!id && pageId){
			comments = await comment_m.findAll({where: {pageId}, include: filelist_m});
		}else if(id && pageId){
			comments = await comment_m.findAll({where: {id, pageId}, include: filelist_m});
		}
		return res.json(comments)
	}
	async add(req, res, next){
		const result = validationResult(req)
		if(!result.isEmpty()){
			return next(ApiError.badRequest(result.errors))
		}
		const {content, reply, userId, pageId} = req.body
		const page = await page_m.findOne({where: {id: pageId}})
		if(!page){
			return next(ApiError.badRequest([{msg:"Сторінки не існує"}]))
		}
		const comment = await comment_m.create({content, reply, userId, pageId})
		if(req.files){
			req.files.forEach(async (elem, index)=>{
				let fileName = uuidv4()+".jpg"
				const file = await filelist_m.create({link: fileName})
				elem.mv(path.resolve(__dirname, '..', 'static', fileName))
				const filecurr = await pfiles_m.create({filelistId: file.id, commentId: comment.id})
			})
		}
		return res.json(comment)
	}
	async remove(req, res){
		const result = validationResult(req)
		if(!result.isEmpty()){
			return next(ApiError.badRequest(result.errors))
		}
		const {id} = req.body
		const comment = await comment_m.destroy({where: {id}});
		return res.json(comment)
	}
}

module.exports = new CommentController()