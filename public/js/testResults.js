document.getElementById('testButton').addEventListener('click', function () {
    showLoaderAnimation();
    InternetIconAnimation();
    hideControls();
    showTestResults();
});

function showLoaderAnimation() {
    document.getElementById('loader').classList.remove('d-none');
}
function InternetIconAnimation() {
    // Aplica las animaciones al icono
    const icon = document.getElementById('internetIcon');

    // Añade la clase de animación al icono
    icon.classList.add('move-left');
}

function hideControls() {
    const btnTest = document.getElementById('testButton');
    btnTest.style.display = 'none';
}

function showTestResults() {
    fetch('/test-velocidad')
        .then(response => response.json())
        .then(data => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('downloadSpeed').textContent = `${data.download}`;
            document.getElementById('uploadSpeed').textContent = `${data.upload}`;
            document.getElementById('results').classList.remove('d-none');
        })
        .catch(error => {
            // Manejo de error
            console.error('Error realizando el test:', error);
            document.getElementById('loader').style.display = 'none';
            document.getElementById('downloadSpeed').textContent = 'Error';
            document.getElementById('uploadSpeed').textContent = 'Error';
            document.getElementById('results').style.display = 'block';
        });
}