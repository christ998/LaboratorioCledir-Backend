const router = require('express').Router()
const ctr = require("../controller/controller")


router.get('/index', ctr.saludo)
router.get("/excel", ctr.excelAJson)


module.exports = router