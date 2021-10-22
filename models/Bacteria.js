const { Schema } = require('mongoose')
const {mongoose} = require("../config/mongo");

const bacteriaModel = new Schema(
    {
        "Microorganism Type": String,
        "Strain code": String,
        "Species": String,
        "History of Deposit": String,
        "Depositor name": String,
        "Date of Isolation": String,
        "Source of isolation": String,
        "Geographic origin": String,
        "Preservation method": String,
        "Incubation time (h)": String,
        "Growth culture medium": String,
        "Optimum growth temperature": String,
        "Respiration": String,
        "Identification Method": String,
        "Primers": String,
        "GenBank accession code": String,
        "Sequence": String,
        "Macromorpholy": String,
        "Micromorpholy": String,
        "Biochemistry": String,
        "Related literature": String

    },{collection: 'laboratorio'}
)
module.exports = mongoose.model('Bacteria', bacteriaModel)
