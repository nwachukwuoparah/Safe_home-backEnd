const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config({ path: "./CONFIG/config.env" });

const mailSender = async (option) => {
  try {
    const transporter = nodemailer.createTransport({
            service: process.env.SERVICE, 
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD,
        secure: false,
      },
    });

    const mailOption = {
      from: process.env.EMAIL,
      to: option.email,
      subject: option.subject,
      text: option.message,
    };
    

   const send =  await transporter.sendMail(mailOption);

  } catch (error) {
    console.log("error from mail sender=> ", error);
  }
};
module.exports = mailSender;
