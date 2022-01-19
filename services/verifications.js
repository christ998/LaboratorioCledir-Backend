const jwt = require('jsonwebtoken')

function getRole(token) {
    if (token) {
        const payload =  jwt.decode(token, process.env.TOKEN_SECRET)
        return payload.isAdmin
    } else {
        return null
    }
}

module.exports = {getRole}