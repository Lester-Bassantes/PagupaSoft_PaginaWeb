function validateForm() {
    const nombre = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const mensaje = document.getElementById('message').value.trim();
    const errorMessage = document.getElementById('error-message');

    if (nombre.length < 2) {
        errorMessage.textContent = 'Por favor, ingresa un nombre válido.';
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = 'Por favor, ingresa un email válido.';
        return false;
    }

    if (subject.length < 2) {
        errorMessage.textContent = 'Por favor, ingresa un asunto válido.';
        return false;
    }

    if (mensaje.length < 5) {
        errorMessage.textContent = 'El mensaje debe contener al menos 5 caracteres.';
        return false;
    }

    return true;
}


