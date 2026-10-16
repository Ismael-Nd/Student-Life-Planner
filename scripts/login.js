const form = document.querySelector("form");
const email = form.querySelector('input[type="email"]');
const password = form.querySelector('input[type="password"]');
const message = document.querySelector("#login-error");
const role = document.body.dataset.role;

form.addEventListener("submit", function(event) {
    event.preventDefault();
    message.textContent = "";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value)) {
        message.textContent = "Enter a valid eamil address.";
        email.focus();
        return;
    }

    const passwordPattern = /^\S{8,}$/;

    if(!passwordPattern.test(password.value)) {
        message.textContent = 
            "Use at least 8 characters without spaces.";
        password.focus();
        return;
    }

    try {
        sessionStorage.setItem("role", role);
        window.location.href = "index.html";
    } catch {
        message.textContent = "Login Could not be opened. Try Again";
    }

});