const jwt = require('jsonwebtoken')

// const generateTokenFake = (req, res) => {
//     const token = jwt.sign({
//         name: 'fake',
//         id: 'fake'
//     }, process.env.TOKEN_SECRET, {expiresIn: 240})
//     res.json({token: token})
// }

const generateToken = (email, password) => {
    const token = jwt.sign({
        email,
        password
    }, process.env.TOKEN_SECRET)

    return token
}

const checktoken = (req, res, next) => {
    if (!req.headers.authorization) {

        return res.status(403).json({mensaje: 'No tienes un token activo'})
    }
    jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET, (err, decode) => {
        if (err) res.status(401).json(err)
        if (decode) {
            next()
        }
    })
}

const tokenIsValid = (req, res) => {
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, (err, dec) => {
        if (err) res.status(400).json(err)
        if (dec) res.status(200).send(dec)
    })
}

module.exports = {generateTokenFake, checktoken, generateToken, tokenIsValid}