var XLSX = require("xlsx")
const bacteriaModel = require('../models/Bacteria')
const {getRole} = require('../services/verifications')
const controllers = {

    async getAllMicroorganismForAdmin(req, res) {
        const todosLosMicroorganismos = await bacteriaModel.find({})
        res.send(todosLosMicroorganismos)
    },

    async getMicroorganism(req, res) {
        const isAdmin = getRole(req.headers.authorization)
        const parameters = {}
        const keys = Object.keys(req.query) // Devuelve un arreglo con las keys de la query como strain code, species, etc
        const values = Object.values(req.query) //Lo mismo pero con los valores

        for (let i = 0; i < keys.length; i++) {
            parameters[keys[i]] = values[i]
        }
        try {
            let microorganism = {}
            if (isAdmin){
                microorganism = await bacteriaModel.find(parameters).exec()
            } else {
                parameters['IsPrivate'] = false
                microorganism = await bacteriaModel.find(parameters).exec()
            }
            res.send(microorganism)
        } catch (e) {
            res.send(e)
        }

    },

    async createMicroorganismByFile(req, res) {
        let file = req.files.file
        await file.mv("./excel/" + file.name, (err) => {
            if (err) return res.status(500).send(err);
        })
        const excel = XLSX.readFile("./excel/" + file.name)
        var nombreHoja = excel.SheetNames;

        let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]])
        for (const item of datos) {
            console.log(item)
            await bacteriaModel.findOneAndUpdate({'Strain code': item['Strain code']}, item, {new: true, upsert: true})
        }
        res.status(200).send("File loaded")

    },

    createOrUpdateMicroorganism(req, res) {
        const request = req.body
        let doc = bacteriaModel.findOneAndUpdate(
            {'_id': request['_id']}, req.body, {new: true, upsert: true}
        ).then(res => {
            res.send(doc)
        }).catch(error => {
            res.send(error)
        })
    },

}


module.exports = controllers