// login.js
// Add an event listener to the login form
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Redirect to index.html
    window.location.href = "index.html";
});

