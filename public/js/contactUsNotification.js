import showNotification from './notificationController';

function handleFormSubmission(event) {
    event.preventDefault(); // Prevenir el envío del formulario para que el código pueda ejecutarse

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    fetch('/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showNotification('¡Éxito!', 'Hemos recibido tu mensaje, te responderemos pronto...', 'success');
            } else {
                showNotification('Error', 'Lo sentimos, ha ocurrido un error. Inténtalo más tarde...', 'error');
            }
        })
        .catch(error => {
            showNotification('Error', 'Hubo un problema al enviar el mensaje.', error);
        });
}

// Exportar la función para usarla en el formulario
export { handleFormSubmission };
