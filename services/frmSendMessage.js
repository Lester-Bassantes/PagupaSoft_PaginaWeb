const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sistemaspagupasoft@gmail.com',
        pass: 'Pagupa07'
    }
});

exports.sendMessage = (req, res) => {
    const { name, email, subject, message } = req.body;

    // Construye el mensaje a enviar
    const emailMessage = `
        Buenos días,
        
        Mi nombre es ${name}, y estoy interesado en contratar el servicio: ${subject}.
        Mensaje adicional: ${message}
        
        Puede responderme al correo: ${email}.
    `;

    // Configuración del correo electrónico
    const mailOptions = {
        from: 'sistemaspagupasoft@gmail.com',
        to: 'lbassantes99gmail.com', // Destinatario final
        subject: `Solicitud de información sobre ${subject}`,
        text: emailMessage
    };

    // Envía el correo
    transporter.sendMail(mailOptions, (error, info) => {
        alert('enviando mensaje');
        if (error) {
            console.log('Error al enviar correo:', error);
            res.status(500).send('Error al enviar el mensaje');
        } else {
            console.log('Correo enviado:', info.response);
            res.status(200).send('Mensaje enviado con éxito');
        }
    });
};
