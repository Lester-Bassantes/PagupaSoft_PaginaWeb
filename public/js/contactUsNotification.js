// Manejo de datos del formulario y envío de mensaje
document.getElementById('frmSendMessage').addEventListener('submit', function (event) {
    hideControls();
    showLoaderAnimationSubmit();

    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener los valores del formulario
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // Realizar la solicitud POST al servidor
    fetch('/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            // Verificar si la respuesta fue exitosa
            document.getElementById('formContact-loader').classList.add('d-none');
            document.getElementById('btnSendMessage').classList.remove('d-none');
            if (response.ok) {
                this.reset();

                // Mostrar una notificación de éxito con SweetAlert
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Hemos recibido tu mensaje. Nos pondremos en contacto contigo.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                // Mostrar una notificación de error con SweetAlert
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al enviar tu mensaje, por favor inténtalo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }

        })
        .catch(error => {
            // Mostrar una notificación de error si ocurre un problema con la solicitud
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al enviar tu mensaje.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        });
});

function hideControls() {
    document.getElementById('btnSendMessage').classList.add('d-none');
}

function showLoaderAnimationSubmit() {
    document.getElementById('formContact-loader').classList.remove('d-none');
}

