// Obtain user current location | status: completed
// Map location on Leaflet map | status: completed
// Allow user to select a business type from a list and map five nearest locations on the map using Foursquare API | status: completed
const myMap = {
    coords: [],
    businesses: [],
    map: {},
    markers: {},

    buildMap(){
        this.map = L.map('map', {
            center: this.coords,
            zoom: 14,
        });
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: '15',
        }).addTo(this.map)
        const marker = L.marker([this.coords])
        marker
        .addTo(this.map)
        .bindPopup('You are here!')
        .openPopup()
    },
    addMarkers(){
        for (var i = 0; i < this.businesses.length; i++){
            this.markers = L.marker([
                this.businesses[i].latitude,
                this.businesses[i].longitude,
            ])
                .bindPopup(`${this.businesses[i].name}`)
                .addTo(this.map)
        }
    }
}
function geoFindMe(){
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#map-link");

    mapLink.href = "";
    mapLink.textContent = "";

    function success(position){
        const latitude = position.coords.latitude;
        const longitude = positions.coords.longitude;

        status.textContent = "";
        mapLink.href = '';
        mapLink.textContent = 'Latitude: ${latitude} °, Longitude: ${longitude} °';
    }
    function errorCallback(error){
        alert('ERROR(${error.code}): ${error.message}');
    }
    const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
    };
    const watchID = navigator.geolocation.watchPosition(success, error, options);
}

var map = L.map('map').setView([latitude, longitude], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

