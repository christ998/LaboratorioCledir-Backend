const userModel = require('../models/UserSchema')
const bcrypt = require("bcrypt");
const user = new userModel()


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
                console.log(doc)
                const result = await bcrypt.compare(req.body.password, doc[0].password)
                result ? res.status(200).json({'mensaje': 'Logueado exitosamente'}) : res.status(401).json({'mensaje': 'Contraseña incorrecta'})
            }
        }
    })


}

module.exports = {
    createUser,
    authenticate
}