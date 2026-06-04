const productContainer =
  document.getElementById("productDetails");

const productId =
  window.location.pathname.split("/")[2];

let currentProduct = null;

const updateCartCount = () => {

  const cart = JSON.parse(
    localStorage.getItem("cart")
  ) || [];

  let totalCount = 0;

  cart.forEach((item) => {
    totalCount += item.quantity;
  });

  document.getElementById(
    "cartCount"
  ).innerText = totalCount;

};

const getProduct = async () => {

  try {

    const response = await fetch(
      `http://localhost:5000/api/products/${productId}`
    );

    const product = await response.json();

    currentProduct = product;

    displayProduct(product);

  } catch (error) {

    console.log(error);

  }

};

const displayProduct = (product) => {

  productContainer.innerHTML = `

    <div class="product-card">

      <img
        src="/images/${product.image}"
        class="product-image"
      />

      <div class="product-details">

        <h2 class="product-name">
          ${product.name}
        </h2>

        <p class="product-price">
          ₹${product.price}
        </p>

        <p>
          ${product.description}
        </p>

        <br />

        <button
          class="product-btn"
          onclick="addToCart()"
        >
          Add To Cart
        </button>

      </div>

    </div>

  `;
};

window.addToCart = () => {

  let cart = JSON.parse(
    localStorage.getItem("cart")
  ) || [];

  const existingProduct = cart.find(
    (item) => item.id === currentProduct.id
  );

  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({
      ...currentProduct,
      quantity: 1
    });

  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartCount();
  
  showToast("Product added to cart");

};

getProduct();

updateCartCount();