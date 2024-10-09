// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  // Configura la ubicación del local
  let location = [-3.2501927438742073, -79.9724507162064]; // Tu ubicación

  // Inicializa el mapa
  let map = L.map('map').setView(location, 13);

  // Agrega la capa de teselas (tiles)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // Agrega un marcador a la ubicación
  let marker = L.marker(location).addTo(map);

  // Crea el popup y asígnalo al marcador
  let popup = L.popup()
    .setContent("Nos encontramos aquí");

  // Asocia el popup al marcador
  marker.bindPopup(popup);

  // Abre el popup al cargar el mapa
  marker.openPopup();
});


