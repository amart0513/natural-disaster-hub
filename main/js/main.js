// Fix: Ensure all keys match their HTML onclick() triggers
document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-in');

    const elementInView = (el, offset = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
        );
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);
});

let currentIndex = 0;

// Fix: Correct Pop-Up Synchronization
function showPopup(type) {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const popupDetails = document.getElementById('popup-details');

    const selectedData = emergencyData[type];

    if (selectedData) {
        currentIndex = 0;  // Reset for correct content
        popupTitle.innerHTML = selectedData.title;
        popupDescription.innerHTML = selectedData.description;

        updateContent(selectedData.content[currentIndex]);
        loadMap(selectedData.content[currentIndex].coordinates, selectedData.content[currentIndex].zoom);
    }

    popup.style.display = 'flex';
}

// Fix: Correct Map Synchronization for Each Disaster
function loadMap(coordinates, zoomLevel) {
    const mapContainer = document.getElementById('map-container');

    // Clear previous map before loading a new one
    if (mapContainer._leaflet_id) {
        mapContainer.innerHTML = "";
    }

    const map = L.map(mapContainer).setView(coordinates, zoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker(coordinates).addTo(map);
}

// Correctly Update Content Details
function updateContent(data) {
    const popupDetails = document.getElementById('popup-details');
    popupDetails.innerHTML = data.details.map(detail => `<li>${detail}</li>`).join("");
}

// Carousel - Next Area in Disaster List
function showNextArea() {
    const type = document.getElementById('popup-title').innerText.toLowerCase().replace(' ', '');
    const data = emergencyData[type];

    currentIndex = (currentIndex + 1) % data.content.length;
    updateContent(data.content[currentIndex]);
    loadMap(data.content[currentIndex].coordinates, data.content[currentIndex].zoom);
}

// Carousel - Previous Area in Disaster List
function showPreviousArea() {
    const type = document.getElementById('popup-title').innerText.toLowerCase().replace(' ', '');
    const data = emergencyData[type];

    currentIndex = (currentIndex - 1 + data.content.length) % data.content.length;
    updateContent(data.content[currentIndex]);
    loadMap(data.content[currentIndex].coordinates, data.content[currentIndex].zoom);
}

// Close Popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
    currentIndex = 0; // Reset for the next selection
}
