const nodemailer = require('nodemailer')
// initialize nodemailer
var transporter = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'brmb-ufro@ufrontera.cl',
            pass: 'BRmB2021'
        }
    }
);

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {

    } else {
        console.log("Server is ready to take our messages");
    }
});

module.exports = transporter