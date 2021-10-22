const mongoose = require("mongoose")

const db_path = 'mongodb://root:root@localhost:27017/laboratorio?authSource=admin'
const db_name = 'laboratorio'
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
async function conectar (){
    mongoose.connect(db_path, config, error => {
        if (!error){
            console.log("Conectado a mongodb")
        } else {
            console.log("Error de conexion a mongodb")
            console.error(error)
        }
    })

}



module.exports = {conectar, mongoose}
