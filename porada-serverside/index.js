const dotenv = require('dotenv')
const dotenv_result = dotenv.config()

const express = require('express')
const app = express();
const PORT = process.env.PORT || 2000

const router = require('./routes/index')

const cors = require('cors')

const fileUpload = require('express-fileupload')

const sequelize = require('./postgre-connect');
const models = require('./postgre-models');

const errorHandler = require('./middlewares/ErrorHandlingMiddleware')

const path = require('path')

if (dotenv_result.error) {
  throw dotenv_result.error
}

console.log(dotenv_result.parsed)

app.use(cors())
app.use(express.json())
app.use(fileUpload( {} ))
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(errorHandler)

const start = async () => {
	try{
		await sequelize.authenticate();
		await sequelize.sync();
		app.listen(PORT, () => console.log('Сервер стартував на порті '+PORT))
	}catch(e){
		console.log(e);
	}
}


start();