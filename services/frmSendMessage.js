const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

// Configura el cliente OAuth2
const oauth2Client = new OAuth2(
    'INSERTE CLIENT_ID', // CLIENT ID
    'INSERTE CLIENTE_SECRET', // CLIENTE SECRET
    'https://developers.google.com/oauthplayground' // Redirección
);

// Configura el token de acceso
oauth2Client.setCredentials({
    refresh_token: 'INSERTE REFRESH_TOKEN' // REFRESH TOKEN
});

async function sendEmail(req, res) {
    try {
        // Obtén el token de acceso
        const { token: accessToken } = await oauth2Client.getAccessToken();

        // Configuración del transporte
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'correo_cuenta_dueña_proyecto',
                clientId: 'INSERTE CLIENT_ID',
                clientSecret: 'INSERTE CLIENT_SECRET',
                refreshToken: 'INSERTE REFRESH_TOKEN',
                accessToken: accessToken
            }
        });

        const { name, email, subject, message } = req.body;

        // Construye el mensaje a enviar
        const emailMessage = `
            Buenos días,
            
            Mi nombre es ${name}, y estoy interesado en contratar el servicio: ${subject}.
            Mensaje adicional: ${message}
        `;

        // Configuración del correo electrónico
        const mailOptions = {
            from: 'correo_cuenta_dueña_proyecto',
            to: 'correo_al_que_se_envia', // Destinatario final
            replyTo: email, // Dirección a la que se responderá si respondes al correo
            subject: `Solicitud de información sobre ${subject}`,
            text: emailMessage
        };

        // Envía el correo electrónico
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
        res.status(200).send('Mensaje enviado con éxito');
    } catch (error) {
        console.log('Error al enviar correo:', error);
        res.status(500).send('Error al enviar el mensaje');
    }
}

module.exports = sendEmail;
