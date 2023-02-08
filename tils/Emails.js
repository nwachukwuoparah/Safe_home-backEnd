const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config({path: './CONFIG/config.env'})

const mailSender = async(option)=>{
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
            user: process.env.user,
            pass: process.env.EMAILPASS,
            secure: false
        },
    })

    const mailOption = {
        from: process.env.EMAIL,
        to: option.email,
        subject:  option.subject,
        text: option.message
    };
    await transporter.sendMail(mailOption);
 }
module.exports = mailSender;
