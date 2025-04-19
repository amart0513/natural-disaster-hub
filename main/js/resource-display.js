window.addEventListener('DOMContentLoaded', async () => {
  const tableBody = document.querySelector('#resource-table tbody');

  const res = await fetch('/api/resources/all');
  const resources = await res.json();

  resources.forEach(resource => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${resource.name}</td>
      <td>${resource.category}</td>
      <td>${resource.quantity}</td>
      <td>${resource.location_name}</td>
    `;

    tableBody.appendChild(row);
  });
});
