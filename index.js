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
            zoom: 8,
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
async function geoFindMe(){
    const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}

async function getFoursquare(business) {
	const options = {
		method: 'GET',
		headers: {
		Accept: 'application/json',
		Authorization: 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8='
		}
	}
	let limit = 5
	let lat = myMap.coordinates[0]
	let lon = myMap.coordinates[1]
	let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses
}

var map = L.map('map').setView([0, 0], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);