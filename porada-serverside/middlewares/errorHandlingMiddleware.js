const ApiError = require('../errors/ApiError')


module.exports = function (err, req, res, next){
	if(err instanceof ApiError){
		return res.status(err.status).json({error: err.status, errors: err.message})
	}
	return res.status(500).json( {error: 500, message: "Непередбаченна помилка!"} )
}