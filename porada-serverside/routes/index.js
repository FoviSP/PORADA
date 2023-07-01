const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const pageRouter = require('./pageRouter')
const tagRouter = require('./tagRouter')
const commentRouter = require('./commentRouter')
const directRouter = require('./directRouter')
const messageRouter = require('./messageRouter')
const scoreRouter = require('./scoreRouter')

router.use('/user', userRouter)
router.use('/comment', commentRouter)
router.use('/page', pageRouter)
router.use('/tag', tagRouter)
router.use('/direct', directRouter)
router.use('/message', messageRouter)
router.use('/score', scoreRouter)

module.exports = router