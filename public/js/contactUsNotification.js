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
        .then(response => response.json())  // Esperar una respuesta JSON
        .then(data => {
            // Verificar si la respuesta fue exitosa
            document.getElementById('formContact-loader').classList.add('d-none');
            document.getElementById('btnSendMessage').classList.remove('d-none');

            if (data.errors) {
                // Si hay errores de validación, mostrarlos
                const errorMessage = data.errors.map(error => error.msg).join('<br>');

                Swal.fire({
                    title: 'Error de validación',
                    html: errorMessage, // Mostrar los errores de validación
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            } else if (data.message) {
                // Si hay mensaje de éxito
                this.reset();

                Swal.fire({
                    title: '¡Éxito!',
                    text: data.message,  // Mostrar el mensaje de éxito del servidor
                    icon: 'success',
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
