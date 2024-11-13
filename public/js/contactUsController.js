function validateForm(event) {
    const nombre = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const mensaje = document.getElementById('message').value.trim();
    const errorMessage = document.getElementById('error-message');

    // Limpiar el mensaje de error
    errorMessage.textContent = '';

    // Validar nombre
    if (nombre.length < 2) {
        errorMessage.textContent = 'Por favor, ingresa un nombre válido.';
        event.preventDefault(); // Evita que el formulario se envíe
        return false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = 'Por favor, ingresa un email válido.';
        event.preventDefault();
        return false;
    }

    // Validar asunto
    if (subject.length < 2) {
        errorMessage.textContent = 'Por favor, ingresa un asunto válido.';
        event.preventDefault();
        return false;
    }

    // Validar mensaje
    if (mensaje.length < 5) {
        errorMessage.textContent = 'El mensaje debe contener al menos 5 caracteres.';
        event.preventDefault();
        return false;
    }

    return true;
}



