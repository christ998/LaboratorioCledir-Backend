const {Schema} = require('mongoose')
const {mongoose} = require("../config/mongo");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,

    },

    isAdmin: {
        type: Boolean,
        default: false
    }

}, {collection: 'usuario'})

// Método para encriptar la contraseña
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

// Método para comparar la contraseña ingresada por el usuario
userSchema.methods.matchPassword = function (password) {
    bcrypt.compare(password, this.password, (err, result) => {
        if (err) return err
        if (result) return result
    });
};

module.exports = mongoose.model('User', userSchema)