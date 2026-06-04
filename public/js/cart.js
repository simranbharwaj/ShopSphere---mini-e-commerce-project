const cartContainer =
  document.getElementById("cartContainer");

const cartTotal =
  document.getElementById("cartTotal");

const checkoutBtn =
  document.getElementById("checkoutBtn");

let cart = JSON.parse(
  localStorage.getItem("cart")
) || [];

const displayCart = () => {

  cartContainer.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {

    cartContainer.innerHTML = `

      <div class="empty-cart">

        <h2>Your cart is empty</h2>

        <p>
          Add some products to continue shopping
        </p>

        <a href="/">
          Continue Shopping
        </a>

      </div>

    `;

    cartTotal.innerText =
      "Total: ₹0";

    checkoutBtn.disabled = true;

    checkoutBtn.style.opacity = "0.5";

    checkoutBtn.style.cursor =
      "not-allowed";

    return;
  }

  checkoutBtn.disabled = false;

  checkoutBtn.style.opacity = "1";

  checkoutBtn.style.cursor =
    "pointer";

  cart.forEach((item, index) => {

    total +=
      Number(item.price) *
      item.quantity;

    cartContainer.innerHTML += `

      <div class="cart-item">

        <img
          src="/images/${item.image}"
          class="cart-item-image"
        />

        <div class="cart-item-details">

          <h2 class="cart-item-name">
            ${item.name}
          </h2>

          <p class="cart-item-price">
            ₹${item.price}
          </p>

          <div class="quantity-controls">

            <button
              class="quantity-btn"
              onclick="decreaseQuantity(${index})"
            >
              -
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              class="quantity-btn"
              onclick="increaseQuantity(${index})"
            >
              +
            </button>

          </div>

          <button
            class="remove-btn"
            onclick="removeItem(${index})"
          >
            Remove Item
          </button>

        </div>

      </div>

    `;
  });

  cartTotal.innerText =
    `Total: ₹${total}`;
};

checkoutBtn.addEventListener(
  "click",

  () => {

    if (cart.length === 0) {

      showToast("Cart is empty");

      return;
    }

    window.location.href =
      "/checkout";

  }
);

window.increaseQuantity = (index) => {

  cart[index].quantity += 1;

  updateCart();

};

window.decreaseQuantity = (index) => {

  if (cart[index].quantity > 1) {

    cart[index].quantity -= 1;

  } else {

    cart.splice(index, 1);

  }

  updateCart();

};

window.removeItem = (index) => {

  cart.splice(index, 1);

  updateCart();

};

const updateCart = () => {

  localStorage.setItem(

    "cart",

    JSON.stringify(cart)

  );

  displayCart();

};

displayCart();