const jwt = require('jsonwebtoken')
const {decode} = require("jsonwebtoken");

const generateTokenFake = (req, res) => {
    const token = jwt.sign({
        name: 'fake',
        id: 'fake'
    }, process.env.TOKEN_SECRET)
    res.json({token: token})
}

const checktoken = (req, res) => {
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, (err, decode) => {
        if (err) res.status(403).json(err)
        if (decode) res.json(decode)
    })
}

module.exports ={generateTokenFake, checktoken}