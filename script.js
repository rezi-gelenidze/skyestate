// Initialize the Leaflet map
const map = L.map('map').setView([42.3154, 43.3569], 7); // Centered on Georgia

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Marker for the selected location (non-draggable)
let marker = L.marker([41.7151, 44.8271]).addTo(map);

// Event listener to move marker to the clicked location on the map
map.on('click', function (e) {
    const latLng = e.latlng;
    marker.setLatLng(latLng);
    // Update the location input with the clicked coordinates
    document.getElementById('location').value = `Lat: ${latLng.lat.toFixed(5)}, Lng: ${latLng.lng.toFixed(5)}`;
});

// Price list object with property type-specific prices
const priceList = {
    residential: {
        droneFootage: 100,    // Residential drone footage price
        threeDImages: 200,    // Residential 3D images price
        traditionalImages: 50 // Residential traditional images price
    },
    commercial: {
        droneFootage: 150,    // Commercial drone footage price
        threeDImages: 250,    // Commercial 3D images price
        traditionalImages: 70 // Commercial traditional images price
    },
    private: {
        droneFootage: 120,    // Private property drone footage price
        threeDImages: 220,    // Private property 3D images price
        traditionalImages: 60 // Private property traditional images price
    }
};

// Function to update the total price based on selected services and property type
function updatePrice() {
    let price = 0;
    const propertyType = document.getElementById('real-estate-type').value;

    // Add prices for selected services based on the selected property type
    if (document.getElementById('drone-footage').checked) {
        price += priceList[propertyType].droneFootage;
    }
    if (document.getElementById('3d-images').checked) {
        price += priceList[propertyType].threeDImages;
    }
    if (document.getElementById('traditional-images').checked) {
        price += priceList[propertyType].traditionalImages;
    }

    // Display the updated price
    document.getElementById('price').textContent = 'Total Price: $' + price;
}

// Add event listeners to each checkbox to update price dynamically
document.getElementById('drone-footage').addEventListener('change', updatePrice);
document.getElementById('3d-images').addEventListener('change', updatePrice);
document.getElementById('traditional-images').addEventListener('change', updatePrice);

// Add event listener to update price when the property type changes
document.getElementById('real-estate-type').addEventListener('change', updatePrice);

// Initialize price when the page loads
updatePrice();

// Form submit event (you can keep it for processing the final order)
document.getElementById('booking-form').addEventListener('submit', function (event) {
    event.preventDefault();
    // Here you can handle form submission or further processing
    alert('Order confirmed, we will contact you soon! \nThe total price is: ' + document.getElementById('price').innerHTML);
});