const jwt = require('jsonwebtoken')

const generateTokenFake = (req, res) => {
    const token = jwt.sign({
        name: 'fake',
        id: 'fake'
    }, process.env.TOKEN_SECRET, {expiresIn: 240})
    res.json({token: token})
}

const checktoken = (req, res, next) => {
    if (!req.headers.authorization) {

        return res.status(403).json({mensaje: 'No tienes un token acivo'})
    }
    jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET, (err, decode) => {
        if (err) res.status(401).json(err)
        if (decode) {
            next()
        }
    })
}

module.exports = {generateTokenFake, checktoken}