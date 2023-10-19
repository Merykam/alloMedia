const nodemailer = require("nodemailer");

const sendMail = async(email, token) => {
    let transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "99b526ae614c16",
          pass: "b8acbb8dc65efc"
        }
      });
    
      const info = await transport.sendMail({
        from: '"AlloMedia 👻" <AllomMedia@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Verify Email", // Subject line
        text: "hal3arrrr", // plain text body
        html: `<a href="/api/users/activate/${token}">click here to verify</a>`, // html body
      });
}



const sendResetPasswordEmail = async (email, resetPasswordLink) => {
 

    let transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "99b526ae614c16",
          pass: "b8acbb8dc65efc"
        }
      });

    const info = await transport.sendMail({
        from: '"AlloMedia 👻" <AllomMedia@gmail.com>',
        to: email,
        subject: 'Réinitialisation de mot de passe',
        html: `<p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p><p><a href="${resetPasswordLink}">${resetPasswordLink}</a></p>`
    });
};

module.exports = {
    sendMail,
    sendResetPasswordEmail
};

