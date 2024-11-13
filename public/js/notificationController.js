const alert = require('sweetalert2');

function showNotification(title, message, icon) {
    alert.fire({
        title: title,
        text: message,
        icon: icon
    });
}

window.showNotification = showNotification;