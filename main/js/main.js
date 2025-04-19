// ===================
// Scroll Animation
// ===================
document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-in');

    const elementInView = (el, offset = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
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
    if (mapContainer._leaflet_id) mapContainer.innerHTML = "";

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
// Medical Page Map + Spinner + Emergency Services + Toggle Legend
// ===================
document.addEventListener("DOMContentLoaded", () => {
    const medicalMap = document.getElementById("hospital-map");
    const spinner = document.getElementById("map-loading-spinner");

    if (!medicalMap) return;

    if (spinner) spinner.style.display = "block";

    const map = L.map("hospital-map").setView([25.7617, -80.1918], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    // Icons
    const hospitalIcon = L.icon({
        iconUrl: 'images/aid icon.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    const shelterIcon = L.icon({
        iconUrl: 'images/emergency-shelter icon.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    const aidIcon = L.icon({
        iconUrl: 'images/hospital icon.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    // Layer groups
    const hospitalLayer = L.layerGroup().addTo(map);
    const shelterLayer = L.layerGroup().addTo(map);
    const aidLayer = L.layerGroup().addTo(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            if (spinner) spinner.style.display = "none";

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            map.setView([lat, lon], 14);

            L.marker([lat, lon])
                .addTo(map)
                .bindPopup("You are here.")
                .openPopup();

            // Emergency service types
            const emergencyTypes = [
                { type: "hospital", icon: hospitalIcon, layer: hospitalLayer },
                { type: "shelter", icon: shelterIcon, layer: shelterLayer },
                { type: "first aid", icon: aidIcon, layer: aidLayer }
            ];

            emergencyTypes.forEach(service => {
                fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${service.type}&limit=10&bounded=1&viewbox=${lon - 0.05},${lat + 0.05},${lon + 0.05},${lat - 0.05}`)
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(location => {
                            const lat = parseFloat(location.lat);
                            const lon = parseFloat(location.lon);

                            const marker = L.marker([lat, lon], { icon: service.icon })
                                .bindPopup(`<b>${location.display_name}</b>`);

                            service.layer.addLayer(marker);
                        });
                    })
                    .catch(err => console.error(`Error fetching ${service.type}:`, err));
            });

            // Mini toggle legend
            const legend = L.control({ position: "topright" });

            legend.onAdd = function () {
                const div = L.DomUtil.create("div", "info legend");
                div.innerHTML = `
                    <div style="background:#fff; padding:10px; border-radius:8px; box-shadow: 0 2px 6px rgba(0,0,0,0.2); font-family: Inter, sans-serif;">
                        <strong>Filter Services</strong><br/>
                        <label><input type="checkbox" id="toggle-hospitals" checked> 🏥 Hospitals</label><br/>
                        <label><input type="checkbox" id="toggle-shelters" checked> 🛌 Shelters</label><br/>
                        <label><input type="checkbox" id="toggle-aid" checked> 🩹 Aid Stations</label>
                    </div>
                `;
                return div;
            };

            legend.addTo(map);

            // Toggle layers with checkboxes
            document.addEventListener("change", (e) => {
                if (e.target.id === "toggle-hospitals") {
                    e.target.checked ? map.addLayer(hospitalLayer) : map.removeLayer(hospitalLayer);
                }
                if (e.target.id === "toggle-shelters") {
                    e.target.checked ? map.addLayer(shelterLayer) : map.removeLayer(shelterLayer);
                }
                if (e.target.id === "toggle-aid") {
                    e.target.checked ? map.addLayer(aidLayer) : map.removeLayer(aidLayer);
                }
            });

        }, (error) => {
            if (spinner) spinner.style.display = "none";
            alert("Location access denied. Showing default location.");
        });
    } else {
        if (spinner) spinner.style.display = "none";
        alert("Geolocation not supported.");
    }
});

// ===================
// search bar
// ===================
document.getElementById("search-bar").addEventListener("keyup", function () {
    const query = this.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
  
    cards.forEach(card => {
      const content = card.textContent.toLowerCase();
      card.style.display = content.includes(query) ? "block" : "none";
    });
  });

// ===================
// Evacuation Map
// ===================
document.addEventListener("DOMContentLoaded", () => {
    const centerList = document.getElementById("center-list");
    const searchInput = document.getElementById("search-center");
    const map = L.map("evacuation-map").setView([25.7617, -80.1918], 11); // Miami default
  
    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);
  
    // Sample evacuation center data
    const centers = [
      {
        name: "South Miami Shelter",
        capacity: 200,
        contact: "(305) 123-4567",
        coordinates: [25.7079, -80.2938]
      },
      {
        name: "North Miami Center",
        capacity: 150,
        contact: "(305) 765-4321",
        coordinates: [25.9003, -80.1622]
      },
      {
        name: "Downtown Safe Zone",
        capacity: 300,
        contact: "(305) 987-6543",
        coordinates: [25.7743, -80.1937]
      }
    ];
  
    // Function to render center cards
    function renderCenters(data) {
      centerList.innerHTML = "";
      data.forEach(center => {
        const card = document.createElement("div");
        card.className = "center-card";
        card.innerHTML = `
          <h3>${center.name}</h3>
          <p><strong>Capacity:</strong> ${center.capacity}</p>
          <p><strong>Contact:</strong> ${center.contact}</p>
          <button onclick="centerMap(${center.coordinates[0]}, ${center.coordinates[1]})">View on Map</button>
        `;
        centerList.appendChild(card);
      });
    }
  
    // Show all markers on the map
    centers.forEach(center => {
      L.marker(center.coordinates)
        .addTo(map)
        .bindPopup(`<strong>${center.name}</strong><br/>Capacity: ${center.capacity}<br/>Contact: ${center.contact}`);
    });
  
    // Center map on a specific location (called by card buttons)
    window.centerMap = (lat, lon) => {
      map.setView([lat, lon], 14);
    };
  
    // Search functionality
    searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase();
      const filtered = centers.filter(center =>
        center.name.toLowerCase().includes(value) ||
        center.capacity.toString().includes(value)
      );
      renderCenters(filtered);
    });
  
    // Initial render
    renderCenters(centers);
  });
  
  
// ===================
// Form Submission to Google Sheets
// ===================
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("medical-form");

    // ✅ Auto-fill today's date in the date input
    const dateField = document.getElementById("date");
    if (dateField) {
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        dateField.value = today;
    }

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const location = document.getElementById("location").value.trim();
            const condition = document.getElementById("condition").value.trim();
            const date = document.getElementById("date").value;
            const submitButton = form.querySelector("button[type='submit']");

            if (!name || !location || !condition || !date) {
                alert("Please complete all fields before submitting.");
                return;
            }

            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";

            // Function to send data to Google Sheet
            const sendData = (lat = '', lon = '') => {
                fetch("https://script.google.com/macros/s/AKfycbxDjLlgxON4RbVDf2S3c2_Ht6F0rGEmstTXBG4rSFPk0b0Byf02Wsh38d2BnGP_xNs/exec", {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        location,
                        condition,
                        date // 👈 manually selected date from form
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => response.text())
                .then(data => {
                    alert("Request submitted successfully.");
                    form.reset();
                    if (dateField) dateField.value = new Date().toISOString().split('T')[0];
                    submitButton.disabled = false;
                    submitButton.textContent = "Submit Request";
                })
                .catch(error => {
                    alert("There was an error submitting the request.");
                    console.error(error);
                    submitButton.disabled = false;
                    submitButton.textContent = "Submit Request";
                });
            };

            // Use geolocation if available
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        sendData(position.coords.latitude, position.coords.longitude);
                    },
                    () => {
                        sendData(); // no location fallback
                    }
                );
            } else {
                sendData();
            }
        });
    }
});


