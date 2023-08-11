

// Updated script.js
function toggleForm() {
    const loginForm = document.querySelector('.form-box.login');
    const signupForm = document.querySelector('.form-box.register');
    const loginToggleText = document.querySelector('.login-register p');
    const signupToggleText = document.querySelector('.login-accountExist p');

    if (signupForm.style.display === 'none' || signupForm.style.display === '') {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
        loginToggleText.innerText = "Don't have an account? Register";
    } else {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        signupToggleText.innerText = "Have an account? Login";
    }
}

document.querySelector('.login-register a').addEventListener('click', function(event) {
    event.preventDefault();
    toggleForm();
});

document.querySelector('.login-accountExist a').addEventListener('click', function(event) {
    event.preventDefault();
    toggleForm();
});

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
    return passwordRegex.test(password);
}

function doPasswordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}

// sendDataToAPI function remains unchanged
async function sendDataToAPI(data) {
    // Code remains unchanged
}

// Update event listeners based on new form structure
document.querySelector('.form-box.register form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;

    if (!isValidEmail(email)) {
        alert('Invalid email format');
        return;
    }

    if (!isValidPassword(password)) {
        alert('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.');
        return;
    }

    if (!doPasswordsMatch(password, confirmPassword)) {
        alert('Passwords do not match');
    }
});

document.querySelector('.form-box.login form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    if (!isValidEmail(email)) {
        alert('Invalid email format');
        return;
    }
});

