const resources = [
    {
      id: "food",
      title: "Food Distribution Centers",
      description: "Access to free meals and pantry services during disaster recovery.",
      faqs: [
        { q: "Who qualifies for food aid?", a: "Anyone affected by a declared disaster." },
        { q: "Do I need an ID?", a: "Some centers require ID. Call ahead to confirm." }
      ]
    },
    // Add more for water, shelter, etc.
  ];
  
  function renderResources(data) {
    const container = document.getElementById('resource-list');
    container.innerHTML = '';
    data.forEach(res => {
      const card = document.createElement('div');
      card.className = 'resource-card';
      card.innerHTML = `
        <h4>${res.title}</h4>
        <p>${res.description}</p>
        <div class="faq-section">
          ${res.faqs.map(f => `
            <button class="faq-toggle">${f.q}</button>
            <div class="faq-answer">${f.a}</div>
          `).join('')}
        </div>
      `;
      container.appendChild(card);
    });
  
    // Toggle
    document.querySelectorAll('.faq-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        btn.nextElementSibling.classList.toggle('visible');
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => renderResources(resources));
  
  function filterResources(type) {
    if (type === 'all') {
      renderResources(resources);
    } else {
      renderResources(resources.filter(r => r.id === type));
    }
  }

  async function fetchFEMADisasters() {
    try {
      const res = await fetch("https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?$orderby=declarationDate desc&$top=5");
      const data = await res.json();
      const ul = document.getElementById("fema-live-feed");
  
      ul.innerHTML = data.DisasterDeclarationsSummaries.map(item => `
        <li><strong>${item.state}:</strong> ${item.incidentType} - ${new Date(item.declarationDate).toDateString()}</li>
      `).join('');
    } catch (err) {
      console.error("FEMA API error:", err);
    }
  }
  
  document.addEventListener("DOMContentLoaded", fetchFEMADisasters);
  
  