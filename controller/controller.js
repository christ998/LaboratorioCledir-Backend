var XLSX = require("xlsx")
const bacteriaModel = require('../models/Bacteria')
const controllers = {
    saludo(req, res) {
        res.send("hola mundo con express")
    },
    excelAJson(req, res) {
        const excel = XLSX.readFile(
            "C:\\Users\\Christian\\WebstormProjects\\LaboratorioCledir-Backend\\Muestra prototipo BD.xlsx"
        );
        var nombreHoja = excel.SheetNames;
        let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]])
        datos.forEach((item, index) => {
            const nuevaBacteria = new bacteriaModel(item)
            nuevaBacteria.save((err, doc) => {
                if (err) console.log(err)
                console.log(doc)
            })
        })
    },
    async getAllMicroorganismForAdmin(req, res) {
        const todosLosMicroorganismos = await bacteriaModel.find({})
        res.send(todosLosMicroorganismos)
    },

    async getMicroorganism(req, res) {
        const parameters = {}
        const keys = Object.keys(req.query) // Devuelve un arreglo con las keys de la query como strain code, species, etc
        const values = Object.values(req.query) //Lo mismo pero con los valores

        for (let i = 0; i < keys.length; i++) {
            parameters[keys[i]] = new RegExp(values[i])
        }
        try {
            const microorganism = await bacteriaModel.find(parameters).exec()
            res.send(microorganism)
        } catch (e) {
            res.send(e)
        }

    },

    // createMicroorganism(req, res) {
    //     const request = req.body
    //     const newMicroorganism = new bacteriaModel(request)
    //     newMicroorganism.save((err, doc) => {
    //         if (err) console.log(err)
    //         console.log(doc)
    //         res.json(newMicroorganism)
    //     })
    // },

    async createMicroorganismByFile(req, res) {
        let file = req.files.file
        await file.mv("./excel/"+file.name, (err) =>{
            if (err) return res.status(500).send(err);
        })
        const excel = XLSX.readFile("./excel/"+file.name)
        var nombreHoja = excel.SheetNames;

        let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]])
        for (const item of datos) {
            console.log(item)
            await bacteriaModel.findOneAndUpdate({'Strain code': item['Strain code']}, item, {new: true, upsert: true})
        }
        res.status(200).send("File loaded")

    },

    async createOrUpdateMicroorganism(req, res) {
        const request = req.body
        console.log(req.body)
        let doc = await bacteriaModel.findOneAndUpdate({'_id': request['_id']}, req.body, {new: true, upsert: true})
        res.send(doc)
    }

}


module.exports = controllers