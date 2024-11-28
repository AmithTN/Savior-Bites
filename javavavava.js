document.addEventListener('DOMContentLoaded', function () 
{
    const cartToggleButton = document.getElementById('elementor-menu-cart__toggle_button');
    const cartContainer = document.querySelector('.elementor-menu-cart__container');
    const cartCloseButton = document.querySelector('.elementor-menu-cart__close-button');
    const cartCounter = document.querySelector('.elementor-button-icon-qty');
    let isCartOpen = false;
    
    const cartTotalElement = document.getElementById('cartTotal');
    const cartItemsElement = document.getElementById('cartItems');
    const cartCountElement = document.getElementById('cartCount');
    
    // Variable to store cart data (for persistence)
    let cartData = JSON.parse(localStorage.getItem('cartData')) || [];
     
    
    // Function to open the cart (side-cart)           
    function openCart() 
    {
        cartContainer.setAttribute('aria-hidden', 'false');
        cartContainer.style.display = 'block';                                 // Show the cart
        setTimeout(() => {                                                    // Delay for smooth transition
            cartContainer.style.transform = 'translateX(0)';
        }, 10);                                                             // Short delay before applying the transform
    }


    // Function to close the cart (side-cart)
    function closeCart() 
    {
        cartContainer.style.transform = 'translateX(100%)';               // Slide out
        setTimeout(() => {                                               // Delay to allow transition
            cartContainer.setAttribute('aria-hidden', 'true');
            cartContainer.style.display = 'none';                      // Hide the cart
        }, 300);                                                      // Match the transition duration
    }


    // Toggle cart on button click
    cartToggleButton.addEventListener('click', function (event) 
    {
        event.preventDefault();
        if (cartContainer.getAttribute('aria-hidden') === 'true') 
        {
            openCart();
        } 
        else 
        {
            closeCart();
        }
    });

    

    // Close cart when clicking the close button
    if (cartCloseButton) 
    {
        cartCloseButton.addEventListener('click', function () 
        {
            closeCart();
        });
    }
    

    // Function to calculate total price for fruits
    function calculateFruitTotal() 
    {
        let fruitTotal = 0;
        const fruitCheckboxes = document.querySelectorAll('input[data-category="fruit"]'); // Assuming fruit checkboxes have data-category with "fruit"

        fruitCheckboxes.forEach((checkbox, index) => 
        {
            if (checkbox.checked) 
            {
                const quantityInput = document.getElementById(`quantity${index + 1}`);
                const price         = parseInt(checkbox.parentNode.parentNode.cells[2].innerText.replace('₹', ''));
                const quantity      = parseInt(quantityInput.value);
                fruitTotal         += price * quantity;
            }
        });

        return fruitTotal;
    }

    // Function to calculate total price for dry fruits
    function calculateDryFruitTotal() 
    {
        let dryFruitTotal = 0;
        const dryFruitCheckboxes = document.querySelectorAll('input[data-category="dryfruit"]'); // Assuming dry fruit checkboxes have name starting with "dryFruit"

        dryFruitCheckboxes.forEach((checkbox, index) => 
        {
            if (checkbox.checked) 
            {
                const quantityInput = document.getElementById(`quantity${index + 1}`);
                const price         = parseInt(checkbox.parentNode.parentNode.cells[2].innerText.replace('₹', ''));
                const quantity      = parseInt(quantityInput.value);
                dryFruitTotal      += price * quantity;
            }
        });

        return dryFruitTotal;
    }


    
       // Function to calculate total price for dry fruits
       function calculateveggiesTotal() 
       {
           let veggiesTotal = 0;
           const veggiesCheckboxes = document.querySelectorAll('input[data-category="veggies"]'); // Assuming veggies checkboxes have name starting with "veggies"

           veggiesCheckboxes.forEach((checkbox, index) => 
           {
               if (checkbox.checked) 
               {
                   const quantityInput = document.getElementById(`quantity${index + 1}`);
                   const price         = parseInt(checkbox.parentNode.parentNode.cells[2].innerText.replace('₹', ''));
                   const quantity      = parseInt(quantityInput.value);
                   veggiesTotal       += price * quantity;
               }
           });

           return veggiesTotal;
       }

       function calculateSproutsTotal() 
       {
           let sproutsTotal = 0;
           const sproutsQuantities = document.querySelectorAll('input[type="number"][data-category="sprouts"]'); 
       
           sproutsQuantities.forEach((quantityInput, index) => 
           {
               const quantity = parseInt(quantityInput.value) || 0;
       
               // Only calculate if quantity is greater than zero
               if (quantity > 0) 
               {
                   const price = parseInt(quantityInput.closest('tr').cells[2].innerText.replace('₹', '')); // Fetch price from the 3rd cell in the row
                   sproutsTotal += price * quantity; // Calculate total for this item
               }
           });
       
           return sproutsTotal;  // Return final total for "Paneer and Sprouts"
       }
       
    


    // Function to calculate total price for Heartybites 
    function calculateheartybitesTotal() 
    {
        let heartybitesTotal = 0;
        const heartybitesCheckboxes = document.querySelectorAll('input[data-category="heartybites"]'); // Assuming heartybites checkboxes have name starting with "heartybites"

        heartybitesCheckboxes.forEach((checkbox, index) => 
        {
            if (checkbox.checked) 
            {
                const quantityInput = document.getElementById(`quantity${index + 1}`);
                const price         = parseInt(checkbox.parentNode.parentNode.cells[2].innerText.replace('₹', ''));
                const quantity      = parseInt(quantityInput.value);
                heartybitesTotal   += price * quantity;
            }
        });

        return heartybitesTotal;
    }



    // Function to calculate total price for eggs
    function calculateeggTotal() 
    {
        let eggTotal = 0;
        const eggCheckboxes = document.querySelectorAll('input[data-category="egg"]'); // Assuming egg  checkboxes have name starting with "egg"

        eggCheckboxes.forEach((checkbox, index) => 
        {
            if (checkbox.checked) 
            {
                const quantityInput = document.getElementById(`quantity${index + 1}`);
                const price         = parseInt(checkbox.parentNode.parentNode.cells[2].innerText.replace('₹', ''));
                const quantity      = parseInt(quantityInput.value);
                eggTotal           += price * quantity;
            }
        });

        return eggTotal;
    }


    // Function to calculate total price for nutritious drinks
    function calculatenutritiousdrinkTotal() 
    {
        let nutritiousdrinkTotal = 0;
        const nutritiousdrinkCheckboxes = document.querySelectorAll('input[data-category="drink"]'); // Assuming drinks  checkboxes have name starting with "drink"

        nutritiousdrinkCheckboxes.forEach((checkbox, index) => 
        {
            if (checkbox.checked) 
            {
                const quantityInput = document.getElementById(`quantity${index + 1}`);
                const price         = parseInt(checkbox.parentNode.parentNode.cells[2].innerText.replace('₹', ''));
                const quantity      = parseInt(quantityInput.value);
                nutritiousdrinkTotal           += price * quantity;
            }
        });

        return nutritiousdrinkTotal;
    }




    // Function to update the cart with the total
    function updateCartTotal() 
    {
        const fruitTotal    = calculateFruitTotal();
        const dryFruitTotal = calculateDryFruitTotal();
        const veggiesTotal = calculateveggiesTotal();
        const sproutsTotal = calculateSproutsTotal();
        const heartybitesTotal     = calculateheartybitesTotal();
        const eggTotal     = calculateeggTotal();
        const nutritiousdrinkTotal     = calculatenutritiousdrinkTotal();
        const overallTotal = fruitTotal + dryFruitTotal + veggiesTotal + sproutsTotal + heartybitesTotal + eggTotal + nutritiousdrinkTotal ;

        const cartTotalElement = document.querySelector('.widget_shopping_cart_content');

        if (overallTotal > 0) 
        {
            // If there are products in the cart, display the category totals and the final total

            cartTotalElement.innerHTML =   `<h2>CART TOTAL</h2>
                                            <strong>Fruit : ₹${fruitTotal}</strong><br>                                                  
                                            <strong>Dry Fruit : ₹${dryFruitTotal}</strong><br>
                                            <strong>Veggies : ₹${veggiesTotal}</strong><br>
                                            <strong>Paneer & Sprouts : ₹${sproutsTotal}</strong><br>
                                            <strong>Hearty Bites : ₹${heartybitesTotal}</strong><br>
                                            <strong>Egg Delights : ₹${eggTotal}</strong><br>
                                            <strong>Nutritious Drinks : ₹${nutritiousdrinkTotal}</strong><br>
                                            <strong>Total : ₹${overallTotal}</strong> `;

        } 
        else 
        {
            // If the cart is empty, display the 'No products in the cart.' message

            cartTotalElement.innerHTML =   `<div class="woocommerce-mini-cart__empty-message">
                                                No products in the cart.
                                            </div>`;

        }
    }

           // Function to handle the form submission
           function handleSubmit(event) 
           {
               event.preventDefault();                                                     // Prevent the default form submission
               
               updateCartTotal();                                                        // Update the cart total instead of alert
               
               openCart();                                                             // Open the cart after updating
           }
       
           // Attach event listener to the form submission button
           document.querySelector('.Submit').addEventListener('click', handleSubmit);  


});

          

function decreaseQuantity(id) {
    const quantityInput = document.getElementById(`quantity${id}`);
    let quantity = parseInt(quantityInput.value);
    if (quantity > 0) {                                 // Prevent quantity from going below 0
        quantityInput.value = quantity - 1;
        updateSubtotal(id);                             // Update subtotal after quantity change
        updateTotal();                                  // Update total
    }
}

// Function to increase quantity
function increaseQuantity(id) {
    const quantityInput = document.getElementById(`quantity${id}`);
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
    updateSubtotal(id);                                 // Update subtotal after quantity change
    updateTotal();                                      // Update total
}

// Function to update subtotal when quantity changes
function updateSubtotal(id) {
    const quantityInput = document.getElementById(`quantity${id}`);
    const price = parseInt(document.querySelector(`input[name="product${id}"]`).parentNode.parentNode.cells[2].innerText.replace('₹', '')); // Get price from table
    const quantity = parseInt(quantityInput.value);
    const subtotal = quantity * price;

    // Update the subtotal display in the table
    document.getElementById(`subtotal${id}`).innerText = `₹${subtotal}`;
}

// Function to calculate total price for selected products
function calculateTotal() {
    let total = 0;

    // Loop through each product's subtotal and add it to the total
    for (let i = 1; i <= 25; i++) {      // Adjust '25' to match the number of products if needed
        const subtotalElement = document.getElementById(`subtotal${i}`);
        
        if (subtotalElement) {           // Check if the element exists
            const subtotalText = subtotalElement.innerText.replace('₹', '').trim();
            const subtotal = parseInt(subtotalText, 10) || 0;  // Parse subtotal as integer
            total += subtotal;
        } else {
            console.warn(`Element with ID subtotal${i} not found`);
        }
    }

    return total; // Return the final total amount
}

// Function to update the total display
function updateTotal() {
    const totalAmount = calculateTotal();
    const totalDisplay = document.getElementById('totalDisplay');  // Ensure you have an element to display the total
    if (totalDisplay) {
        totalDisplay.innerHTML = `<strong>Total: ₹${totalAmount}</strong>`; // Update total display
    } else {
        console.warn("Element with ID 'totalDisplay' not found");
    }
}

// Call updateTotal() whenever needed, for example after any quantity or subtotal change
updateTotal();


/*Submenu dropdown functionality to work on mobile or tablets */

document.querySelectorAll('.menu-item').forEach(item => 
{
    item.addEventListener('click', event => 
    {
        const submenu = item.querySelector('.submenu');
        if (submenu) 
        {
            submenu.classList.toggle('show');
        }
    });
});

/*header for mobile navigation*/

 // Toggle main menu open/close
document.querySelector('.toggle-1').addEventListener('click', function() {
    const menuToggle = this;
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

    // Toggle aria-expanded and the class to manage menu visibility
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    document.body.classList.toggle('menu-open');  // Toggles the "menu-open" class on the body or parent container
});
document.querySelectorAll('.accordion-menu').forEach(menuLink => {
    menuLink.addEventListener('click', function(event) {
        const chevronIcon = this.querySelector('.bi-chevron-down');
        
        // Check if the clicked element is the chevron (expand icon)
        if (event.target === chevronIcon) {
            // Prevent default action to stop the link from navigating when clicking the chevron
            event.preventDefault();
            
            // Toggle the submenu visibility
            let submenu = this.nextElementSibling;  // Get the next element (submenu)
            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
            } else {
                submenu.style.display = 'block';
            }


            // Rotate the chevron icon
            chevronIcon.classList.toggle('rotated');
        } else {
         
            // Else, let the menu link perform its default behavior (navigation)
            // Do nothing here, so the default action (navigating) happens naturally
         
        }
    });
});






//backup of check out


document.addEventListener('DOMContentLoaded', () => {
    // Retrieve and display the cart total on the checkout page
    const cartTotal = localStorage.getItem('cartTotal') || 0;
    document.getElementById('cart-total').textContent = cartTotal;
});

  // Function to validate form fields
function validateForm() {
    const name = document.getElementById('form-field-fullname').value.trim();
    const phone = document.getElementById('form-field-PhoneNo').value.trim();
    const address = document.getElementById('form-field-address').value.trim();
    const pincode = document.getElementById('form-field-pincode').value.trim();

    // Check if all required fields are filled
    if (!name || !phone || !address || !pincode) {
        alert('Please fill in all required fields.');
        return false;
    }
    return true;
}


// Function to initiate payment via PhonePe
function initiatePayment() {
    const totalAmount = localStorage.getItem('cartTotal');
    const upiLink = `upi://pay?pa=amithalex5251@oksbi&pn=YourName&am=${totalAmount}&cu=INR`; // (replace 'YOUR_UPI_ID@bank' with your actual UPI ID)

    // Redirect to UPI link (this should open the UPI app for payment)
    window.location.href = upiLink;
}

// Attach initiatePayment function to Place Order button
document.getElementById('place_order').addEventListener('click', initiatePayment);

     
// Function to clear cart after payment

function clearCart() {
/*      localStorage.removeItem('cartData');
    localStorage.removeItem('cartTotal');    */
    alert("Thank you for your purchase!");
}
    

// Confirm payment and clear cart
document.getElementById('phonepe-link').addEventListener('click', () => {
    setTimeout(() => {
        clearCart();    // Clear cart after payment confirmation
    }, 5000);          // Adjust timing as needed
});


//for backend part cart data 
        
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve and display the cart total on the checkout page
    const cartTotal = localStorage.getItem('cartTotal') || 0;
    document.getElementById('cart-total').textContent = cartTotal;
});

// Check if each field is valid using reportValidity()
function validateForm() {
    const nameField = document.getElementById('form-field-fullname');
    const phoneField = document.getElementById('form-field-PhoneNo');
    const addressField = document.getElementById('form-field-address');
    const pincodeField = document.getElementById('form-field-pincode');

    // Check each field and set custom validation messages if empty
    if (!nameField.value.trim()) {
        nameField.setCustomValidity("Please enter your full name.");
    } else {
        nameField.setCustomValidity(""); // Clear message if valid
    }
    if (!phoneField.value.trim()) {
        phoneField.setCustomValidity("Please enter your 10-digit phone number.");
    } else {
        phoneField.setCustomValidity("");
    }
    if (!addressField.value.trim()) {
        addressField.setCustomValidity("Please enter your address.");
    } else {
        addressField.setCustomValidity("");
    }
    if (!pincodeField.value.trim()) {
        pincodeField.setCustomValidity("Please enter your 6-digit pin code.");
    } else {
        pincodeField.setCustomValidity("");
    }

    // Trigger the custom validation messages
    return nameField.reportValidity() && phoneField.reportValidity() &&
           addressField.reportValidity() && pincodeField.reportValidity();
}

// Function to initiate payment via PhonePe
function initiatePayment() {
    const totalAmount = localStorage.getItem('cartTotal');
    const upiLink = `upi://pay?pa=amithalex5251@oksbi&pn=YourName&am=${totalAmount}&cu=INR`;
    window.location.href = upiLink; // Redirect to UPI link for payment
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem('cartData');
    localStorage.removeItem('cartTotal');
    document.getElementById('cart-container').innerHTML = '';
    document.getElementById('cart-total').textContent = '0';
    alert("Thank you for your purchase!");
}

// Function to handle the checkout process
function checkout() {
    if (!validateForm()) return; // Validate form before proceeding

    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    const billingDetails = {
        name: document.getElementById('form-field-fullname').value,
        phone: document.getElementById('form-field-PhoneNo').value,
        address: document.getElementById('form-field-address').value,
        pincode: document.getElementById('form-field-pincode').value
    };

    fetch('/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartData, billingDetails }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Checkout data sent:', data);
        alert('Order placed successfully! Now proceeding to payment.');
        
        // Initiate payment after successful checkout
        initiatePayment();
        
        // Clear the cart after checkout and payment initiation
        clearCart();
    })
    .catch(error => console.error('Error:', error));
}

// Attach checkout function to Place Order button
document.getElementById('place_order').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    checkout();         // Call checkout function
});

