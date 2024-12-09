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

// Get elements related to the carousel
const carouselSlideWrappers = document.querySelectorAll('.carousel-slide-wrapper');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
let slideIndex = 0;
// New variable to record the index of the currently displayed pair of slides (each group has 2 slides as a pair).
let currentSlidePairIndex = 0;
// Define a variable to store the timer used for automatic carousel sliding.
let autoSlideInterval;

// Display a specified set of carousel slides (display two slides each time).
function showSlide() {
    carouselSlideWrappers.forEach((wrapper, index) => {
        wrapper.style.display = index === slideIndex? 'flex' : 'none';
        const slidePairs = wrapper.querySelectorAll('.carousel-slide-half');
        for (let i = 0; i < slidePairs.length; i += 2) {
            slidePairs[i].style.display = i === currentSlidePairIndex? 'block' : 'none';
            slidePairs[i + 1].style.display = i === currentSlidePairIndex? 'block' : 'none';
        }
    });
}

// Switch to the next set of carousel slides (switch a pair of slides, i.e., two slides each time).
function nextSlide() {
    currentSlidePairIndex += 2;
    if (currentSlidePairIndex >= 6) { // There are 6 slides in a group, display 2 each time, so there are 3 pairs. Check if it's greater than or equal to 6.
        currentSlidePairIndex = 0;
        slideIndex++;
        if (slideIndex >= carouselSlideWrappers.length) {
            slideIndex = 0;
        }
    }
    showSlide();
}

// Switch to the previous set of carousel slides (switch a pair of slides, i.e., two slides each time).
function prevSlide() {
    currentSlidePairIndex -= 2;
    if (currentSlidePairIndex < 0) {
        currentSlidePairIndex = 4; // Go back to the last pair of the previous group (6 slides in each group, 2 each time, so go back to the third pair with indices 4 and 5).
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = carouselSlideWrappers.length - 1;
        }
    }
    showSlide();
}

// Initially display the first set of carousel slides (display the first pair of slides).
function initCarousel() {
    showSlide();
    // Determine whether to start automatic sliding based on the screen width. Here, it's assumed that automatic sliding won't start when the width is less than 768px. You can adjust this as needed.
    if (window.innerWidth >= 768) {
        autoSlideInterval = setInterval(nextSlide, 3000); // Switch slides every 3 seconds. You can adjust the time interval.
    }
}

// Add a click event listener to the "Next" button.
nextButton.addEventListener('click', () => {
    nextSlide();
    // Restart the automatic sliding timer after clicking the button (if the screen width meets the condition for automatic sliding).
    if (window.innerWidth >= 768) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 3000);
    }
});

// Add a click event listener to the "Previous" button.
prevButton.addEventListener('click', () => {
    prevSlide();
    // Restart the automatic sliding timer after clicking the button (if the screen width meets the condition for automatic sliding).
    if (window.innerWidth >= 768) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 3000);
    }
});

// Listen for the window resize event to adjust the carousel logic when the screen size changes.
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        // If the screen becomes large enough to meet the condition for automatic sliding, restart automatic sliding.
        if (!autoSlideInterval) {
            initCarousel();
        }
    } else {
        // If the screen becomes smaller, clear the automatic sliding timer and display the first slide.
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
        slideIndex = 0;
        currentSlidePairIndex = 0;
        showSlide();
    }
});

// Initialize the carousel when the page finishes loading.
window.addEventListener('load', initCarousel);

// Function to show the payment popup.
function showPaymentPopup() {
    // Create a modal box (the outer container simulating the payment popup).
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.zIndex = '9999';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';

    // Create the content part of the popup.
    const popupContent = document.createElement('div');
    popupContent.style.backgroundColor = 'white';
    popupContent.style.padding = '20px';
    popupContent.style.borderRadius = '5px';

    const paymentInfo = document.createElement('p');
    paymentInfo.textContent = 'Please pay 100 ¥';

    // Define an array containing paths and related configurations for two QR code images (example part, you can adjust as needed).
    const qrCodeImages = [
        {
            src: 'https://soong-a.github.io/labweb.github.io/image/wechat.png',
            width: '300px',
            height: '380px',
            alt: 'Payment QR Code'
        },
        {
            src: 'https://soong-a.github.io/labweb.github.io/image/wepay.png',
            width: '300px',
            height: '380px',
            alt: 'Payment QR Code'
        }
    ];
    // Logic to randomly generate an index to select image configuration information, etc. (example part, you can adjust as needed).
    const randomIndex = Math.floor(Math.random() * qrCodeImages.length);
    const selectedQrCodeConfig = qrCodeImages[randomIndex];
    const qrCodeImg = document.createElement('img');
    qrCodeImg.src = selectedQrCodeConfig.src;
    qrCodeImg.style.width = selectedQrCodeConfig.width;
    qrCodeImg.style.height = selectedQrCodeConfig.height;
    qrCodeImg.alt = selectedQrCodeConfig.alt;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cancel';
    closeButton.style.marginRight = '10px'; // Add right margin to the cancel button to separate it from the confirm payment button.
    closeButton.onclick = function () {
        document.body.removeChild(modal);
    };

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm payment';
    confirmButton.style.marginLeft = '10px'; // Add left margin to the confirm payment button to separate it from the cancel button.
    confirmButton.onclick = function () {
        // Here you can add the actual payment logic, such as sending a request to the server, etc. For now, just a simple message is shown.
        alert('The simulation payment is successful, and in a real application, it needs to interface with the payment platform!');
        document.body.removeChild(modal);
    };

    // Add elements to the popup content area one by one.
    popupContent.appendChild(paymentInfo);
    popupContent.appendChild(qrCodeImg);
    popupContent.appendChild(closeButton);
    popupContent.appendChild(confirmButton);
    modal.appendChild(popupContent);

    document.body.appendChild(modal);
}
