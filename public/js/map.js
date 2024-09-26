// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  // Configura la ubicación del local
  const localizacion = [-3.2501927438742073, -79.9724507162064]; // Tu ubicación
  
  // Inicializar el mapa en la sección About Us
  initMap('map', localizacion);

  // Escuchar el evento de apertura del modal para inicializar el mapa
  const mapModal = document.getElementById('mapModal');
  mapModal.addEventListener('show.bs.modal', function () {
    initMap('map', localizacion); // Inicializa el mapa en el modal
  });

  // Limpiar el mapa al cerrar el modal (opcional)
  mapModal.addEventListener('hidden.bs.modal', function () {
    const mapElement = document.getElementById('map');
    mapElement.innerHTML = ''; // Limpiar el contenido del mapa al cerrar
  });
});

// Función para inicializar el mapa
function initMap(mapElementId, localizacion) {
  const mapElement = document.getElementById(mapElementId);
  mapElement.classList.add('loading');

  // Crear el mapa centrado en la ubicación
  const map = L.map(mapElementId).setView(localizacion, 15);

  // Añadir la capa de mapas de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Añadir un marcador en la ubicación
  L.marker(localizacion).addTo(map)
    .bindPopup('Aquí está tu local')
    .openPopup();
  mapElement.classList.remove('loading');
}
