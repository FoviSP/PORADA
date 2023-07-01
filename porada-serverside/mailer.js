var nodemailer = require('nodemailer');


class Mailer {
  constructor(){
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        type: "login",
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  send(email, title, html, text){
    this.transporter.sendMail({
      from: 'Вебфорум програмистів ПОРАДА <noreply@porada.com>',
      to: email,
      subject: title,
      text: text,
      html: html
    },
    (error, info)=>{
      if (error) {
        console.log(error);
      } else {
        console.log('Пошта відправлена: ' + info.response);
      }
    });

  }
}


module.exports = new Mailer()