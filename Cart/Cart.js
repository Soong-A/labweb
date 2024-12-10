// Wait for the DOM content to be fully loaded before executing the following code
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
        // Toggle the 'open' class on the sidebar element. This class is likely used in CSS to show or hide the sidebar
        sidebar.classList.toggle('open');
        // Toggle the'sidebar-open' class on the body element. It might be used in CSS to adjust the page layout when the sidebar is toggled
        body.classList.toggle('sidebar-open');
    });
});

// Get the relevant elements in the page
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const removeButtons = document.querySelectorAll('.remove-button');
const removeCartButtons = document.querySelectorAll('.remove-cart-button');
const checkoutButton = document.querySelector('.checkout-button');

// Add click event listener to each product removal button in the shopping cart item list area
removeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        // Find the closest product item element to the clicked button in the DOM hierarchy. This is based on the structure of the DOM, looking upward for a parent element that matches the specified selector
        const productItem = event.target.closest('.product-item');
        if (productItem) {
            // Get the name of the product by retrieving the text content of the h3 element within the product item
            const productName = productItem.querySelector('h3').textContent;
            // Remove the product item element from the DOM
            productItem.remove();
            // Update the display of the number of items in the shopping cart. (Assume there is an element on the page used to display the item count. The selector and operation logic might need to be adjusted according to the actual situation.)
            const cartItemCountElement = document.getElementById('cart-itemCount');
            if (cartItemCountElement) {
                let currentCount = parseInt(cartItemCountElement.textContent);
                currentCount--;
                cartItemCountElement.textContent = currentCount;
            }
            // Show an alert message to the user indicating that the product has been successfully removed from the cart
            alert(`Items have been successfully removed from the cart: ${productName}`);
            // More logic can be added here, such as updating the total price of the shopping cart, sending a delete request to the server, etc. For now, this only simulates removing the DOM element of the product item.
            // Send a delete request to the server (This is just an example. The URL and request parameters need to be completed in a real application.)
            fetch('/api/remove-cart-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productItem.dataset.productId // Assume the product item has a custom data attribute to store the product ID. This needs to be added according to the actual situation.
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('The product record has been deleted on the server.');
                    } else {
                        console.error('Server failed to delete product record, may need to try again');
                        // An alert message can be shown here to inform the user that the server-side operation failed and suggest trying again.
                        alert('Oops, there was a problem when removing the product, the server side operation failed, you can try again later');
                    }
                })
                .catch(error => {
                    console.error('Network request error:', error);
                    // Show an alert message to the user indicating that there is a problem with the network and they should try again later.
                    // alert('The network is not stable, the request to remove the product failed to send, please check the network and try again later.');
                });
        }
    });
});

// Add click event listener to each special product removal button in the special product section
removeCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        // Find the closest special product item element to the clicked button in the DOM hierarchy
        const specialProductItem = event.target.closest('.special-product-item');
        if (specialProductItem) {
            // Get the name of the special product by retrieving the text content of the h3 element within the special product item
            const specialProductName = specialProductItem.querySelector('h3').textContent;
            // Remove the special product item element from the DOM
            specialProductItem.remove();
            // Show an alert message to the user indicating that the special product has been successfully removed
            alert(`Special items were successfully removed: ${specialProductName}`);
            // More related business logic can be added later, such as updating the display of the special product list, sending a delete request to the server, etc.
            // Send a delete request to the server (This is just an example. The URL and request parameters need to be completed in a real application.)
            fetch('/api/remove-special-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    specialProductId: specialProductItem.dataset.specialProductId // Assume the special product item has a custom data attribute to store the special product ID.
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('The server has successfully deleted the special item record.');
                    } else {
                        console.error('Server failed to delete special item record, may need to try again');
                        alert('Oops, there was a problem when removing the product, the server side operation failed, you can try again later');
                    }
                })
                .catch(error => {
                    console.error('Network request error:', error);
                    // alert('The network is not stable, the request to remove the product failed to send, please check the network and try again later.');
                });
        }
    });
});

// Add click event listener to the checkout button
checkoutButton.addEventListener('click', () => {
    // Show an alert message to the user indicating that the checkout process was successful
    alert('Checkout success');
});