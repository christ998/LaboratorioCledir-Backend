const {Schema} = require('mongoose')
const {mongoose} = require("../config/mongo");

const bacteriaModel = new Schema(
    {
        "Microorganism Type": {
            type: String,
            default: ''
        },
        "Strain code": {
            type: String,
            default: ''
        },
        "Species": {
            type: String,
            default: ''
        },
        "History of Deposit": {
            type: String,
            default: ''
        },
        "Depositor name": {
            type: String,
            default: ''
        },
        "Date of Isolation": {
            type: String,
            default: ''
        },
        "Source of isolation": {
            type: String,
            default: ''
        },
        "Geographic origin": {
            type: String,
            default: ''
        },
        "Preservation method": {
            type: String,
            default: ''
        },
        "Incubation time (h)": {
            type: String,
            default: ''
        },
        "Growth culture medium": {
            type: String,
            default: ''
        },
        "Optimum growth temperature": {
            type: String,
            default: ''
        },
        "Respiration": {
            type: String,
            default: ''
        },
        "Identification Method": {
            type: String,
            default: ''
        },
        "Primers": {
            type: String,
            default: ''
        },
        "GenBank accession code": {
            type: String,
            default: ''
        },
        "Sequence": {
            type: String,
            default: ''
        },
        "Macromorpholy": {
            type: String,
            default: ''
        },
        "Micromorpholy": {
            type: String,
            default: ''
        },
        "Biochemistry": {
            type: String,
            default: ''
        },
        "Related literature": {
            type: String,
            default: ''
        },
        "Samples stock": {
            type: Number,
        },
        "Link": {
            type: String,
            default:''
        }

    }, {collection: 'laboratorio'}
)
module.exports = mongoose.model('Microorganismo', bacteriaModel)
