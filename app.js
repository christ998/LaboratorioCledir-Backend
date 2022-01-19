const express = require('express');
const {conectar, mongoose} = require("./config/mongo")
const router = require("./routes/");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')
const transporter = require('./services/nodemailer')
var cors = require('cors')
var morgan = require('morgan')
const PORT = 4000
const app = express()
require('dotenv').config()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
    preserveExtension: true,
}))

app.use(router)

app.listen(PORT, ()=>console.log("Escuchando en el puerto", PORT))

const conexion = async function () {

    let db = await conectar()
}
conexion()
