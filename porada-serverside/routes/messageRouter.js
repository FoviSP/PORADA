const Router = require('express')
const router = new Router()
const messageController = require('../controllers/messageController')
const {check} = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')


router.get('/', [
		check('directId', 'directId не вказано').notEmpty(),
		authMiddleware
	], messageController.getAll)

router.post('/add', [
		check('directId', 'users не вказано').notEmpty(),
		check('content', 'content не вказано').notEmpty(),
		check('userId', 'userId не вказано').notEmpty(),
		authMiddleware
	], messageController.add)

router.post('/remove', [
		check('id', 'id не вказано').notEmpty(),
		authMiddleware
	], messageController.remove)

module.exports = router