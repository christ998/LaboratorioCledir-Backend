const express = require('express');
const {conectar, mongoose} = require("./config/mongo")
const router = require("./routes/");
const bodyParser = require("body-parser");
const PORT = 3000
const app = express()
app.use(router)
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.listen(PORT, ()=>console.log("Escuchando en el puerto", PORT))


// (async () =>{
//     console.log("ejemplo")
// })()

const conexion = async function () {

    let db = await conectar()
}
conexion()
