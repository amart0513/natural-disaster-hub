window.addEventListener('DOMContentLoaded', async () => {
  const select = document.getElementById('location_id');
  const res = await fetch('/api/locations/all');
  const locations = await res.json();

  locations.forEach(loc => {
    const option = document.createElement('option');
    option.value = loc.id;
    option.textContent = loc.name;
    select.appendChild(option);
  });
});

document.getElementById('resource-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const location_id = parseInt(document.getElementById('location_id').value);

  const response = await fetch('/api/resources/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, category, quantity, location_id })
  });

  const result = await response.json();
  const msg = document.getElementById('response-msg');
  msg.textContent = result.message || 'Something went wrong.';
  msg.style.color = response.ok ? 'green' : 'red';
});
