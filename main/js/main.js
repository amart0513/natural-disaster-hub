// ===================
// Scroll Animation
// ===================
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

// ===================
// Emergency Popup Map
// ===================
function showPopup(type) {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const popupDetails = document.getElementById('popup-details');

    const selectedData = emergencyData[type];

    if (selectedData) {
        currentIndex = 0;
        popupTitle.innerHTML = selectedData.title;
        popupDescription.innerHTML = selectedData.description;

        updateContent(selectedData.content[currentIndex]);
        loadMap(selectedData.content[currentIndex].coordinates, selectedData.content[currentIndex].zoom);
    }

    popup.style.display = 'flex';
}

function loadMap(coordinates, zoomLevel) {
    const mapContainer = document.getElementById('map-container');

    if (mapContainer._leaflet_id) {
        mapContainer.innerHTML = "";
    }

    const map = L.map(mapContainer).setView(coordinates, zoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker(coordinates).addTo(map);
}

function updateContent(data) {
    const popupDetails = document.getElementById('popup-details');
    popupDetails.innerHTML = data.details.map(detail => `<li>${detail}</li>`).join("");
}

function showNextArea() {
    const type = document.getElementById('popup-title').innerText.toLowerCase().replace(' ', '');
    const data = emergencyData[type];

    currentIndex = (currentIndex + 1) % data.content.length;
    updateContent(data.content[currentIndex]);
    loadMap(data.content[currentIndex].coordinates, data.content[currentIndex].zoom);
}

function showPreviousArea() {
    const type = document.getElementById('popup-title').innerText.toLowerCase().replace(' ', '');
    const data = emergencyData[type];

    currentIndex = (currentIndex - 1 + data.content.length) % data.content.length;
    updateContent(data.content[currentIndex]);
    loadMap(data.content[currentIndex].coordinates, data.content[currentIndex].zoom);
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    currentIndex = 0;
}

// ===================
// Medical Page Map + Spinner + API
// ===================
document.addEventListener("DOMContentLoaded", () => {
    const medicalMap = document.getElementById("hospital-map");
    const spinner = document.getElementById("map-loading-spinner");

    if (medicalMap) {
        if (spinner) spinner.style.display = "block";

        const map = L.map("hospital-map").setView([25.7617, -80.1918], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors"
        }).addTo(map);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    if (spinner) spinner.style.display = "none";

                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    map.setView([lat, lon], 14);

                    L.marker([lat, lon])
                        .addTo(map)
                        .bindPopup("You are here.")
                        .openPopup();

                    // Fetch real nearby hospital using OpenStreetMap Nominatim API
                    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=hospital&limit=1&bounded=1&viewbox=${lon - 0.05},${lat + 0.05},${lon + 0.05},${lat - 0.05}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data && data.length > 0) {
                                const hospital = data[0];
                                const hospitalLat = parseFloat(hospital.lat);
                                const hospitalLon = parseFloat(hospital.lon);

                                L.marker([hospitalLat, hospitalLon])
                                    .addTo(map)
                                    .bindPopup(hospital.display_name)
                                    .openPopup();
                            } else {
                                alert("No hospitals found nearby.");
                            }
                        })
                        .catch(error => {
                            console.error("Hospital lookup failed:", error);
                        });
                },
                (error) => {
                    if (spinner) spinner.style.display = "none";
                    alert("Location access denied. Showing default location.");
                }
            );
        } else {
            if (spinner) spinner.style.display = "none";
            alert("Geolocation not supported.");
        }
    }
});

// ===================
// Form Submission to Google Sheets
// ===================
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("medical-form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const location = document.getElementById("location").value;
            const condition = document.getElementById("condition").value;

            fetch("https://script.google.com/macros/s/AKfycbyIbvoEuzW5R61xN1-SWvJFa0R49nXyIt8Z6mry2B2KTOfIOxkenxwbdW0yx8hpjEPC/exec", {
                method: "POST",
                body: JSON.stringify({ name, location, condition }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.text())
            .then(data => {
                alert("Request submitted successfully.");
                form.reset();
            })
            .catch(error => {
                alert("There was an error submitting the request.");
                console.error(error);
            });
        });
    }
});
