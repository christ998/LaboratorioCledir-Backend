const router = require('express').Router()
const ctr = require("../controller/controller")


router.get('/index', ctr.saludo)
router.get("/excel", ctr.excelAJson)
router.get("/all", ctr.getAllMicroorganismForAdmin)
router.get("/micparticular", ctr.getMicroorganism)
router.post("/add", ctr.createOrUpdateMicroorganism)


module.exports = router