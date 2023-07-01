const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middlewares/authMiddleware')
const {check} = require('express-validator')

router.get('/', commentController.getAll)
router.post('/add', [
	check('content', 'content не вказано').notEmpty(),
	check('userId', 'userId не вказано').notEmpty(),
	check('pageId', 'pageId не вказано').notEmpty(),
	authMiddleware
	], commentController.add)
router.post('/remove', [
	check('id', 'id не вказано').notEmpty(),
	authMiddleware
	], commentController.remove)

module.exports = router