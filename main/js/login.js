// login.js
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Redirect after login
        window.location.href = "index.html"; 
      })
      .catch((error) => {
        alert(error.message);
      });
  });
  