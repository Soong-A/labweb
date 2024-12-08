document.addEventListener('DOMContentLoaded', function () {
    // Get the sidebar element in the DOM
    var sidebar = document.getElementById('sidebar');
    // Get the sidebar toggle button element in the DOM
    var sidebarToggle = document.getElementById('sidebar-toggle');
    // Get the main content area element in the DOM
    var content = document.querySelector('.content');
    // Get the body element of the HTML document
    var body = document.body;

    sidebarToggle.addEventListener('click', function () {
        // Toggle the 'open' class on the sidebar element. This class is likely used in CSS to show or hide the sidebar.
        sidebar.classList.toggle('open');
        // Toggle the'sidebar-open' class on the body element. It might be used in CSS to adjust the page layout when the sidebar is toggled.
        body.classList.toggle('sidebar-open');
    });
});

// Get the contact form element
const contactForm = document.getElementById('contactForm');

// Add an event listener for the form's submit event
contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior.

    // Get the values of each form field
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Perform form validation
    let isValid = true;

    if (name === '') {
        alert('Please write your name');
        isValid = false;
    }

    if (email === '') {
        alert('Please write your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        alert('Please fill in the correct email format');
        isValid = false;
    }

    if (message === '') {
        alert('Please fill in your message');
        isValid = false;
    }

    // If the validation passes, code can be added here to send the form data to the server (e.g., using AJAX, etc. This is just a simple validation example and doesn't involve actual sending for now).
    if (isValid) {
        alert('The form is successfully submitted and we will contact you as soon as possible!');
        // The form can be reset here.
        contactForm.reset();
    }
});

// Function to validate the email format
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}