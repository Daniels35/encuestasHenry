const nodemailer = require('nodemailer');
const { hostEmail, userEmail, passEmail, emailTemplate } = require('../config/emailConfig');

function enviarCorreo(encuesta, id, res) {
  const {
    full_name,
    email,
    phone_number,
    start_date,
    preferred_language,
    how_found,
    newsletter_subscription,
  } = encuesta;

  const transporter = nodemailer.createTransport({
    host: hostEmail,
    port: 465,
    auth: {
      user: userEmail,
      pass: passEmail,
    },
  });

  let emailContent = emailTemplate;

  emailContent = emailContent
    .replace('{{full_name}}', full_name)
    .replace('{{email}}', email)
    .replace('{{phone_number}}', phone_number)
    .replace('{{start_date}}', start_date)
    .replace('{{preferred_language}}', preferred_language)
    .replace('{{how_found}}', how_found)
    .replace('{{newsletter_subscription}}', newsletter_subscription)
    .replace('{{id}}', id);

  const mailOptions = {
    from: 'contact@daniels35.com',
    to: email,
    subject: 'Encuesta Realizada',
    html: emailContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado:', info.response);
      res.status(200).json({ message: 'Correo enviado con éxito.' });
    }
  });
}

module.exports = {
  enviarCorreo,
};
