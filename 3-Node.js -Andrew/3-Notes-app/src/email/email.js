const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD
  }
});

// send mail with defined transport object
const welcomeMsg = async (email, name) => {
  try {
    await transporter.sendMail({
      from: `"Task-manager" <${process.env.EMAIL_ID}>`,
      to: email,
      subject: `Welcome ${name}`,
      text: "I hope you have a amazing experience from this app"
    });
  } catch (e) {
    console.log(e);
  }
};

const calclationMsg = async email => {
  try {
    await transporter.sendMail({
      from: '"Task-manager" <${process.env.EMAIL_ID}>',
      to: email,
      subject: "Sorry to see you go",
      text: "let us know why you wish to go"
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { welcomeMsg, calclationMsg };
