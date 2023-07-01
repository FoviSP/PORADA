const ApiError = require('../errors/ApiError')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	if(req.method === 'OPTIONS'){
		next()
	}
	try{
		const token = req.headers.authorization.split(' ')[1] // Bearer *token*
		if(!token){
			return next(ApiError.notAuth('Не авторизован'))
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		if(!decoded){
			return next(ApiError.notAuth('Не авторизован'))
		}
		req.user = decoded
		next()
	}catch(e){
		return next(ApiError.notAuth('Не авторизован'))
	}
}