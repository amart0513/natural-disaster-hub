// login.js
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Example Firebase login logic
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Display success message (optional)
            alert("Login successful!");

            // Redirect to index.html
            window.location.href = "index.html";
        })
        .catch((error) => {
            // Handle login errors
            const errorMessage = error.message;
            alert("Login failed: " + errorMessage);
        });
});
