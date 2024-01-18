let map, infoWindow;
const MAX_LOCATIONS = 5;
let userLocations = [];

const lastUbicacion = [
  { lat: 51.509865, lng: -0.118092, name: "Londres" },
  { lat: 40.712776, lng: -74.005974, name: "Nueva York" },
  { lat: 40.416775, lng: -3.703790, name: "Madrid" },
  { lat: 50.850346, lng: 4.351721, name: "Bruselas" },
  { lat: 45.464211, lng: 9.191383, name: "Milán" }
];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow();

  // Mostrar las ubicaciones predefinidas
  showLocationsOnMap(lastUbicacion);

  const locationButton = document.createElement("button");

  locationButton.textContent = "Ubicacion Actual";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", getUserLocation);

  // Mostrar las últimas ubicaciones almacenadas al cargar la página
  userLocations = JSON.parse(localStorage.getItem('userLocations')) || [];
  showLastLocationsOnMap();
}

function showLocationsOnMap(locations) {
  locations.forEach((location, index) => {
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: location.name || `Ubicación ${index + 1}`,
    });
  });
}

function showLastLocationsOnMap() {
  // Limpiar marcadores existentes antes de mostrar las ubicaciones
  clearMarkers();

  // Mostrar las últimas ubicaciones almacenadas
  showLocationsOnMap(userLocations);
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          name: "Ubicación actual",
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("Ubicación encontrada.");
        infoWindow.open(map);
        map.setCenter(pos);

        // Almacenar la ubicación actual y mostrar las últimas ubicaciones
        userLocations.unshift(pos);
        userLocations = userLocations.slice(0, MAX_LOCATIONS);
        localStorage.setItem('userLocations', JSON.stringify(userLocations));

        showLastLocationsOnMap();
      },
      (error) => {
        handleLocationError(true, infoWindow, map.getCenter(), error);
      }
    );
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos, error) {
  console.error(error);
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? `Error: ${error.message}`
      : "Error: Tu navegador no admite la geolocalización."
  );
  infoWindow.open(map);
}

function clearMarkers() {
  // Limpiar marcadores existentes
  userLocations.forEach((location) => {
    const marker = new google.maps.Marker({
      position: location,
      map: null,
      title: location.name,
    });
  });
}

window.initMap = initMap;
