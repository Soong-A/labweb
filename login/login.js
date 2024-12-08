// Get the registration form element
const registrationForm = document.getElementById('registrationForm');

// Function to validate the email format
function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Clear the content of all message labels and reset their class names (hide them and remove the 'error' and'success' classes)
function clearMessages() {
    const messageLabels = document.querySelectorAll('.message-label');
    messageLabels.forEach(label => {
        label.innerText = '';
        label.classList.remove('error', 'success');
        label.classList.add('hidden');
    });
}

// Validate the username and set the message label. If the validation fails, show an alert message.
function validateUsername() {
    const username = document.getElementById('username').value;
    const usernameMessage = document.querySelector('.username-message');
    if (username === '') {
        alert('The user name cannot be empty');
        usernameMessage.innerText = '';
        usernameMessage.classList.remove('hidden');
        usernameMessage.classList.add('error');
        return false;
    }
    usernameMessage.innerText = '';
    usernameMessage.classList.add('hidden');
    usernameMessage.classList.remove('error');
    return true;
}

// Validate the email format and set the message label. If the validation fails, show an alert message.
function validateEmail() {
    const email = document.getElementById('email').value;
    const emailMessage = document.querySelector('.email-message');
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        emailMessage.innerText = '';
        emailMessage.classList.remove('hidden');
        emailMessage.classList.add('error');
        return false;
    }
    emailMessage.innerText = '';
    emailMessage.classList.add('hidden');
    emailMessage.classList.remove('error');
    return true;
}

// Validate whether the password meets the requirements and set the message label. If the validation fails, show an alert message.
function validatePassword() {
    const password = document.getElementById('password').value;
    const passwordMessage = document.querySelector('.password-message');
    const confirmPassword = document.getElementById('confirmPassword').value;
    // Check if the password length is at least 6 characters
    const isLengthValid = password.length >= 6;
    if (!isLengthValid) {
        alert('The password must be at least 6 characters long, please re-enter it');
        passwordMessage.innerText = '';
        passwordMessage.classList.remove('hidden');
        passwordMessage.classList.add('error');
        return false;
    }
    // Check if the password and the confirmation password match
    if (password!== confirmPassword) {
        alert('The password does not match the confirmation password. Please re-enter it');
        passwordMessage.innerText = '';
        passwordMessage.classList.remove('hidden');
        passwordMessage.classList.add('error');
        return false;
    }
    passwordMessage.innerText = '';
    passwordMessage.classList.add('hidden');
    passwordMessage.classList.remove('error');
    return true;
}

// Validate the confirmation password and set the message label (the logic here is simplified because the main validation has been done in validatePassword)
function validateConfirmPassword() {
    return true;
}

// Validate the gender selection and set the message label. If the validation fails, show an alert message.
function validateGender() {
    const gender = document.getElementById('gender').value;
    const genderMessage = document.querySelector('.gender-message');
    if (gender === '') {
        alert('Please select gender');
        genderMessage.innerText = '';
        genderMessage.classList.remove('hidden');
        genderMessage.classList.add('error');
        return false;
    }
    genderMessage.innerText = '';
    genderMessage.classList.add('hidden');
    genderMessage.classList.remove('error');
    return true;
}

// Add a submit event listener to the form
registrationForm.addEventListener('submit', function (e) {
    console.log('Enter the form submit event handler function');
    e.preventDefault(); // Prevent the default form submission behavior

    clearMessages();

    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isGenderValid = validateGender();

    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isGenderValid) {
        // Add the redirect code here. Originally, it was an alert showing the login was successful. Now, it redirects to a page.
        alert("SUCCESS");
        window.location.href = '../index.html';
    }
});