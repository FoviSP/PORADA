const Router = require('express')
const router = new Router()
const tagController = require('../controllers/tagController')
const {check} = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/add', [
		check('name', 'Тег повинен мати назву та бути більш 4-х символів').notEmpty().isLength({ min: 4 }),
		authMiddleware
	], tagController.add)

router.post('/remove', [
		check('id', 'Айді не вказано').notEmpty(),
		authMiddleware
	], tagController.remove)

router.get('/', tagController.getAll)

router.get('/:name', [
		check('name', 'name не вказано').notEmpty()
	], tagController.getOne)

module.exports = router