const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {check} = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/register', [
		check('username', 'Ім\'я користувача не вказано').notEmpty(),
		check('email', 'Пошта користувача не вірна').isEmail(),
		check('password', 'Пароль повиннен бути більш 4 та менш 25 символів').isLength({min: 4, max: 25}),
		check('description', 'Опис повиннен бути більш 10 та менш 150 символів').isLength({min: 10, max: 150}),
	], userController.registration)

router.post('/login', [
		check('email', 'Пошта користувача не вірна').isEmail(),
		check('password', 'Пароль повиннен бути більш 4 та менш 25 символів').isLength({min: 4, max: 25})
	], userController.login)

router.post('/remove', [
		check('id', 'id користувача не вказано').notEmpty()
	], userController.remove)

router.post('/updateData', [
		authMiddleware,
		check('id', 'id не вказано').notEmpty(),
		check('name', 'name не вказано').notEmpty(),
		check('description', 'description не вказано').notEmpty()
	], userController.updateData)

router.get('/updateToken', [
	authMiddleware
	], userController.updateToken)

router.get('/submit/:link', [
		check('link', 'Посилання не вказано').notEmpty()
	], userController.submit)

router.get('/', [
		check('id', 'Айді користувача не вказано').notEmpty()
	], userController.getOne)

module.exports = router