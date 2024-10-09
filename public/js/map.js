// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('map')) {
    // Configura la ubicación del local
    let location = [-3.2501927438742073, -79.9724507162064];

    let map = L.map('map').setView(location, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let marker = L.marker(location).addTo(map);

    let popup = L.popup()
      .setContent("Nos encontramos aquí");

    marker.bindPopup(popup);
    marker.openPopup();
  }
});


