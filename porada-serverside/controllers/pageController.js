const {page_m, tags_m, taglist_m, user_m} = require('../postgre-models')
const ApiError = require('../errors/ApiError')
const {validationResult} = require('express-validator')
const sequelize = require('../postgre-connect');

class PageController{
    async getAll(req, res){
        let {userId, contains, limit, page} = req.query
        page = page || 1
        limit = limit || 10
        const offset = page * limit - limit
        let pages;
        if(!contains && !userId){
            pages = await page_m.findAndCountAll({
                limit,
                offset,
                include: [{model: taglist_m},{model: user_m, paranoid: false}]
            })
        }else if(contains && !userId){
            pages = await page_m.findAndCountAll({
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('page.name')), 'LIKE', '%' + contains + '%')
                },
                limit,
                offset,
                include: [{model: taglist_m},{model: user_m, paranoid: false}]
            })
        }else if(!contains && userId){
            pages = await page_m.findAndCountAll({
                where: {userId},
                limit,
                offset,
                include: [{model: taglist_m},{model: user_m, paranoid: false}]
            })
        }else if(contains && userId){
            pages = await page_m.findAndCountAll({
                where: {
                    userId,
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('page.name')), 'LIKE', '%' + contains + '%')
                },
                limit,
                offset,
                include: [{model: taglist_m},{model: user_m, paranoid: false}]
            })
        }
        return res.json(pages)
    }
    async getOne(req, res, next){
        const result = validationResult(req)
        if(!result.isEmpty()){
            return next(ApiError.badRequest(result.errors))
        }       
        const {id} = req.params
        const page = await page_m.findAll({where: {id}, include: [{model: taglist_m},{model: user_m, paranoid: false}]})
        return res.json(page)
    }
    async create(req, res, next){
        const result = validationResult(req)
        if(!result.isEmpty()){
            return next(ApiError.badRequest(result.errors))
        }
        const {name, description, userId, tags} = req.body
        const page = await page_m.create({name: name, description: description, userId: userId})
        tags.forEach(async (elem, index) => {
            let tag = await taglist_m.findOne({where:{name:elem.trim()}})
            if(!tag){
                tag = await taglist_m.create({name: elem.trim()});
            }
            const t = await tags_m.create({taglistId: tag.id, pageId: page.id});
        })
        return res.json(page)
    }
    async remove(req, res){
        const result = validationResult(req)
        if(!result.isEmpty()){
            return next(ApiError.badRequest(result.errors))
        }
        const {id} = req.body
        const page = await page_m.destroy({ where: {id} })
        return res.json(page)
    }
}

module.exports = new PageController()
