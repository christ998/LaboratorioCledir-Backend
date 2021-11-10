const express = require('express');
const {conectar, mongoose} = require("./config/mongo")
const router = require("./routes/");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')

const PORT = 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(fileUpload())

app.use(router)

app.listen(PORT, ()=>console.log("Escuchando en el puerto", PORT))


// (async () =>{
//     console.log("ejemplo")
// })()

const conexion = async function () {

    let db = await conectar()
}
conexion()
