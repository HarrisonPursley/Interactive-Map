// Obtain user current location
// Map location on Leaflet map
// Allow user to select a business type from a list and map five nearest locations on the map using Foursquare API
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