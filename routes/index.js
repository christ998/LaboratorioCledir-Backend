const router = require('express').Router()
const userRouter = require('express').Router()
const ctr = require("../controller/controller")
const {createUser, authenticate} = require('../controller/userController')
const {generateTokenFake, checktoken} = require('../services/jwt')


router.get('/index', ctr.saludo)
router.get("/excel", ctr.excelAJson)
router.get("/all", ctr.getAllMicroorganismForAdmin)
router.get("/micparticular", ctr.getMicroorganism)
router.post("/add", ctr.createOrUpdateMicroorganism)
router.post("/file", ctr.createMicroorganismByFile)


userRouter.post("/adduser", createUser)
userRouter.post('/auth', authenticate)
router.use('/user', userRouter)

router.post('/jwtfake', generateTokenFake)
router.put('/jwtfake', checktoken)

module.exports = router