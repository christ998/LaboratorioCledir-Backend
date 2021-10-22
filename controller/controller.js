var XLSX = require("xlsx")
const bacteriaModel = require('../models/Bacteria')
const controllers = {
    saludo(req, res) {
        res.send("hola mundo con express")
    },
    excelAJson(req, res) {
        const excel = XLSX.readFile(
            "C:\\Users\\Christian\\WebstormProjects\\laboratorio-cledir-backend\\Registro de Cepas.xlsx"
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
    }

}


module.exports = controllers