const userModel = require('../models/UserSchema')
const bcrypt = require("bcrypt");
const user = new userModel()
const {generateToken} = require('../services/jwt')

const createUser = async (req, res) => {

    const passwordEncrypted = await user.encryptPassword(req.body.password)
    await userModel.create({
        email: req.body.email,
        password: passwordEncrypted,
        isAdmin: req.body.isAdmin
    }, (err, docs) => {
        if (err) {
            res.status(409).json({
                "mensaje": 'Usuario ya existe',
                err
            })

        } else {
            res.sendStatus(201)
        }
    })

}

const authenticate = (req, res) => {
    userModel.find({
        email: req.body.email
    }, async (err, doc) => {
        if (err) {
            res.status(409).send(err)
        } else {
            if (doc.length == 0) {
                res.status(404).json({
                    "mensaje": 'Usuario no existe',
                })
            } else {
                const result = await bcrypt.compare(req.body.password, doc[0].password)
                console.log(doc)
                if (doc) {
                    const token = generateToken(req.body.email, doc[0].isAdmin)
                    res.status(200).json({'mensaje': 'Logueado exitosamente', 'token': token})
                } else {
                    res.status(401).json({'mensaje': 'Contraseña incorrecta'})
                }
            }
        }
    })


}

module.exports = {
    createUser,
    authenticate
}