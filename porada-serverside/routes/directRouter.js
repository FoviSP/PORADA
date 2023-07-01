const Router = require('express')
const router = new Router()
const directController = require('../controllers/directController')
const {check,oneOf} = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')


router.get('/', [
		check('userId', 'userId не вказано').notEmpty(),
		check('id', 'id не вказано').notEmpty(),
		authMiddleware
	], directController.getOne)
router.post('/create', [
	check('users', 'users не вказано').notEmpty(),
	authMiddleware
	], directController.create)

module.exports = router