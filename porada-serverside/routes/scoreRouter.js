const Router = require('express')
const router = new Router()
const scoreController = require('../controllers/scoreController')
const authMiddleware = require('../middlewares/authMiddleware')

const {check} = require('express-validator')


router.get('/', scoreController.getAll)
router.get('/:pageId', [
	check('pageId', 'pageId не вказано').notEmpty(),
	], scoreController.getOne)
router.post('/set', [
	check('score', 'score не вказано').notEmpty(),
	check('userId', 'userId не вказано').notEmpty(),
	check('pageId', 'pageId не вказано').notEmpty(),
	], authMiddleware, scoreController.set)


module.exports = router