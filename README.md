# StormReady Resource Portal

## Overview
The StormReady Resource Portal is a web application designed to provide South Florida residents with centralized, reliable information and tools for disaster preparedness and response. It offers real-time maps, static resource cards, embedded multimedia guides, and downloadable emergency checklists, all organized into intuitive sections to help users access the information they need quickly and efficiently.

## Team
- **Carolina Camarda** – Full Stack Developer  
- **Angie Martinez** – Front-End Developer  
- **Ivan Najera** – Back-End Developer  
- **Lucas Stumpf** – Oracle Database Administrator  

## Features
- **Home**: Introduction and overview of the portal’s purpose and mission.  
- **Resources**:
  - Emergency contacts  
  - Preparation tips  
  - Shelter locations  
- **Evacuation Centers**:  
  - Interactive map displaying evacuation center locations  
  - City filter for live-searching by name or capacity  
  - Horizontal scroll carousel for browsing multiple center cards  
  - “View on Map” button on each card  
- **Medical Aid**:  
  - Hospital lookup using Nominatim API and custom icons  
  - Clustering of emergency service markers (e.g., shelters, aid stations)  
- **Mental Health**: Curated articles and embedded YouTube guides for coping strategies and support resources.  
- **Contact**: Contact form for user feedback and inquiries.  

## Technologies Used
- **HTML5** and **CSS3** (FEMA-inspired modern design)  
- **JavaScript** with modular ES6 imports  
- **Leaflet** + **OpenStreetMap** for interactive mapping  
- **Nominatim API** for real hospital and service lookups  
- **Oracle DB Encyption & Authentication** for user registration, login/logout, and email verification  
- **Live Server** (VS Code Extension) for local development and testing  
- **Google Sheets** backend (optional) for form submissions  

## Installation & Local Setup
1. **Clone the repository:**  
   ```bash
   git clone https://github.com/your-org/natural-disaster-hub.git
   cd natural-disaster-hub
   
3. **Open in VS Code:**
   - Install the **Live Server** extension.
   - Right-click on index.html and select **Open with Live Server**.
  
## Usage
- Navigate through the top menu (Home, Resources, Evacuation Centers, Medical Aid, Mental Health Support, and Contact).
- Click on resource tiles to view detailed pop-ups and maps.
- Use the search filters and carousel controls on the Evacuation Centers page to find and view centers.
- Register or log in to access personalized features and sync form submissions.

## Maintenance & Contribution
- Follow the existing code structure and naming conventions.
- Open issues or pull requests for bug fixes or feature enhancements.
- Ensure all new code is accompanied by corresponding tests (unit/integration).

## License
This project is released under the MIT License.
