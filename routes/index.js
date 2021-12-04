const router = require('express').Router()
const userRouter = require('express').Router()
const microRouter = require('express').Router()
const ctr = require("../controller/controller")
const {createUser, authenticate} = require('../controller/userController')
const {generateTokenFake, checktoken} = require('../services/jwt')


microRouter.post("/add", ctr.createOrUpdateMicroorganism)
microRouter.post("/file", ctr.createMicroorganismByFile)
microRouter.get("/all", ctr.getAllMicroorganismForAdmin)
router.use("/micro", checktoken, microRouter)

router.get('/micparticular', ctr.getMicroorganism)

userRouter.post("/adduser", createUser)
router.use('/user', checktoken, userRouter)

router.post('/auth', authenticate)

router.post('/jwtfake', generateTokenFake)


module.exports = router