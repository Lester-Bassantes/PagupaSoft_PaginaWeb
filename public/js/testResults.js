document.getElementById('btnTest').addEventListener('click', function () {
    showLoaderAnimation();
    hideControls();
    showTestResults();
});

function showLoaderAnimation() {
    document.getElementById('loader').classList.remove('d-none');
}

function hideControls() {
    const btnTest = document.getElementById('btnTest');
    btnTest.classList.add('d-none');
    document.getElementById('downloadSpeed').textContent = `-`;
    document.getElementById('uploadSpeed').textContent = `-`;
}

function showTestResults() {
    fetch('/test-velocidad')
        .then(response => response.json())
        .then(data => {
            document.getElementById('loader').classList.add('d-none');
            document.getElementById('downloadSpeed').textContent = `${data.download}`;
            document.getElementById('uploadSpeed').textContent = `${data.upload}`;
            document.getElementById('results').classList.remove('d-none');
            document.getElementById('btnTest').classList.remove('d-none');
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