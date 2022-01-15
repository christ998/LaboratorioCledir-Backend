const router = require('express').Router()
const userRouter = require('express').Router()
const microRouter = require('express').Router()
const ctr = require("../controller/controller")
const {createUser, authenticate} = require('../controller/userController')
const {generateTokenFake, checktoken, tokenIsValid} = require('../services/jwt')

router.use("/micro", checktoken, microRouter)
microRouter.post("/add", ctr.createOrUpdateMicroorganism)
microRouter.post("/file", ctr.createMicroorganismByFile)
microRouter.get("/all", ctr.getAllMicroorganismForAdmin)

router.get('/micparticular', ctr.getMicroorganism)

router.use('/user', checktoken, userRouter)
userRouter.post("/adduser", createUser)

router.post('/auth', authenticate)
// router.post('/jwtfake', generateTokenFake)
router.post('/checkjwt', tokenIsValid)

module.exports = router