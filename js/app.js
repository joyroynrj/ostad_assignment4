import { productsData } from "./product.js";
import { addToCart, increaseQuantity, decreaseQuantity, removeItem, calculateTotal, cartItems,} from "./cart.js";

const displayCartItems = () => {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const product = item.product;
    const quantity = item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <p>${product.name} x ${quantity}</p>
      <p>Price: $${product.price.toFixed(2)}</p>
      <p>Total: $${(product.price * quantity).toFixed(2)}</p>
      <button class="increase-quantity">+</button>
      <button class="decrease-quantity">-</button>
      <button class="remove-item btn btn-danger">Remove</button>
    `;

    const increaseButton = cartItem.querySelector(".increase-quantity");
    increaseButton.addEventListener("click", () => {
      increaseQuantity(product.id);
      updateCartItems();
    });

    const decreaseButton = cartItem.querySelector(".decrease-quantity");
    decreaseButton.addEventListener("click", () => {
      decreaseQuantity(product.id);
      updateCartItems();
    });

    const removeButton = cartItem.querySelector(".remove-item");
    removeButton.addEventListener("click", () => {
      removeItem(product.id);
      updateCartItems();
    });

    cartItemsContainer.appendChild(cartItem);
  });
};

const updateCartItems = () => {
  displayCartItems();
  const totalElement = document.getElementById("total");
  totalElement.innerText = `Total Price: $${calculateTotal().toFixed(2)}`;
};

window.addEventListener("DOMContentLoaded", () => {
  const productItemsContainer = document.querySelector(".products");

  productsData.forEach((product) => {
    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("btn", "btn-success", "btn-block");
    addToCartButton.textContent = product.button;

    addToCartButton.addEventListener("click", () => {
      const quantity = parseInt(prompt("Enter the quantity:", "1"));
      if (!isNaN(quantity) && quantity > 0) {
        addToCart(product, quantity);
        updateCartItems();
      } else {
        alert("Invalid quantity!");
      }
    });

    // ✅ Create element
    const productItem = document.createElement("div");

    // ✅ Add classes to element
    productItem.classList.add("product-item", "col-12", "col-md-6", "col-lg-6");
    // productItem.innerHTML = `This is a paragraph.`;
    productItem.innerHTML += `
            <div class="card">
              <img class="card-img-top" src="${product.image}" alt="${product.name}">
              <div class="card-body">
                  <h4 class="card-title"><a href="#" title="View Product">${product.name}</a></h4>
                  <p class="card-text">${product.description}</p>
                  <span class="product-price"><strong>$ ${product.price.toFixed(2)}</strong></span>
              </div>
            </div>
            `;
          
    productItem.appendChild(addToCartButton);
    productItemsContainer.appendChild(productItem);
  });

  const clearCartButton = document.getElementById("clear-cart");
  clearCartButton.addEventListener("click", () => {
    cartItems.length = 0;
    updateCartItems();
  });

  updateCartItems();
});