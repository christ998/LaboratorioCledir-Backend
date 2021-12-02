const mongoose = require("mongoose")

const db_path = 'mongodb://root:root@localhost:27017/laboratorio?authSource=admin'
const db_name = 'laboratorio'
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

async function conectar() {
    try {
        await mongoose.connect(db_path, config)
        console.log("Conectado a MongoDB")
    } catch (e) {
        console.log("errores")
        console.error(e)
    }

}


module.exports = {conectar, mongoose}
