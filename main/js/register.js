document.getElementById('register-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email');
  const password = document.getElementById('password');

  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value })
  });

  const data = await response.json();
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = data.message;

  if (response.ok) {
    messageDiv.style.color = 'green';
    // Clear the input fields
    email.value = '';
    password.value = '';
  } else {
    messageDiv.style.color = 'red';
    email.value = '';
    password.value = '';
  }
});

