/*// register.js
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Example Firebase registration logic
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Show success message
            alert("Registration successful!");
            // Redirect to login.html after 3 seconds
            setTimeout(() => {
                window.location.href = "login.html";
            }, 3000);
        })
        .catch((error) => {
            // Handle registration errors
            alert(error.message);
        });
});*/

//Commented this out so I dont just kick your stuff out however I dont believe we are using Firebase?

document.getElementById('register-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = data.message;

  if (response.ok) {
    messageDiv.style.color = 'green';
  } else {
    messageDiv.style.color = 'red';
  }
});

