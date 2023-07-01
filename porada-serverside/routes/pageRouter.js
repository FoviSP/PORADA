const Router = require('express')
const router = new Router()
const pageController = require('../controllers/pageController')
const authMiddleware = require('../middlewares/authMiddleware')

const {check} = require('express-validator')


router.get('/', pageController.getAll)
router.get('/:id', [
		check('id', 'id не вказано').notEmpty()
	], pageController.getOne)
router.post('/create', [
		check('name', 'У кожної сторінки є назва').notEmpty(),
		check('description', 'Сторінка повинна мати опис').notEmpty(),
		check('tags', 'Теги сторінки не вказані').notEmpty(),
		check('userId', 'userId не вказан').notEmpty()
	], authMiddleware, pageController.create)
router.post('/remove', [
		check('id', 'id не вказано').notEmpty()
	], authMiddleware, pageController.remove)


module.exports = router