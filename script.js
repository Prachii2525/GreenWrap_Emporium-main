

// Array to hold cart items
let cart = [];

// Function to add item to the cart
function addToCart(productName, productPrice) {
  // Check if the item is already in the cart
  const existingItem = cart.find(item => item.name === productName);

  if (existingItem) {
    // If item already exists, increase the quantity
    existingItem.quantity++;
  } else {
    // If item does not exist, add it to the cart
    const newItem = {
      name: productName,
      price: parseFloat(productPrice),
      quantity: 1
    };
    cart.push(newItem);
  }

  // Update the cart display
  updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCountElement = document.getElementById('cart-count');
  const totalPriceElement = document.getElementById('total-price');

  // Clear the existing cart items
  cartItemsContainer.innerHTML = '';

  let totalPrice = 0;
  let totalItems = 0;

  // Loop through the cart items and display them
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
            <p>${item.name} x ${item.quantity}</p>
            <p>$${(item.price * item.quantity).toFixed(2)}</p>
        `;
    cartItemsContainer.appendChild(cartItem);

    // Calculate the total price
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;
  });

  // Update the total price and cart count
  totalPriceElement.textContent = totalPrice.toFixed(2);
  cartCountElement.textContent = totalItems;
}

// Add event listeners to the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-name');
    const productPrice = button.getAttribute('data-price');
    addToCart(productName, productPrice);
  });
});

// Initial update to display empty cart
updateCartDisplay();



// Initial update to display empty cart
updateCartDisplay();


document.querySelectorAll(".draggable").forEach((img) => {
  img.addEventListener("mousedown", dragStart);
  img.addEventListener("mouseup", dragEnd);
  img.addEventListener("mousemove", drag);
});

let activeItem = null;

function dragStart(event) {
  activeItem = event.target;
  activeItem.initialX =
    event.clientX -
    (activeItem.offsetLeft - document.documentElement.scrollLeft);
  activeItem.initialY =
    event.clientY - (activeItem.offsetTop - document.documentElement.scrollTop);
}

function drag(event) {
  if (activeItem) {
    event.preventDefault();
    let x = event.clientX - activeItem.initialX;
    let y = event.clientY - activeItem.initialY;

    activeItem.style.transform = `translate(${x}px, ${y}px)`;
  }
}

function dragEnd() {
  activeItem = null;
}

// JavaScript for continuous sliding of product items
const productList = document.querySelector(".product-list");
const productItems = document.querySelectorAll(".product-item");
const productCount = productItems.length;
const itemWidth = productItems[0].offsetWidth;

let currentPosition = 0;

function cloneItems() {
  // Clone items to create a seamless loop
  productList.innerHTML += productList.innerHTML;
}

function startSlider() {
  cloneItems(); // Clone items once to make the loop seamless
  const totalItems = productList.children.length;

  function slide() {
    currentPosition -= 0.5; // Adjusted speed for smoother transition
    productList.style.transform = `translateX(${currentPosition}px)`;

    // When the original set of items has moved off-screen, reset without visible jump
    if (Math.abs(currentPosition) >= itemWidth * productCount) {
      productList.style.transition = "none"; // Disable transition
      currentPosition = 0;
      productList.style.transform = `translateX(${currentPosition}px)`;

      // Force reflow to reset transition (to avoid the animation skip)
      productList.offsetHeight;

      productList.style.transition = "transform 0.5s linear"; // Re-enable transition
    }

    requestAnimationFrame(slide);
  }

  requestAnimationFrame(slide);
}

startSlider();

