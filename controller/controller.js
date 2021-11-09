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
        datos.forEach((item, index)=>{
            const nuevaBacteria = new bacteriaModel(item)
            nuevaBacteria.save((err, doc) => {
                if (err) console.log(err)
                console.log(doc)
            })
        })
    },
    async getAllMicroorganismForAdmin(req, res){
        const todosLosMicroorganismos = await bacteriaModel.find({})
        res.send(todosLosMicroorganismos)
    },

    async getParticularMicroorganism(req, res) {
        const microorganism = await bacteriaModel.find({
            "Strain code": req.query["Strain code"]
        }).exec()
        console.log(req.query)
        res.send(microorganism)
    }

}


module.exports = controllers