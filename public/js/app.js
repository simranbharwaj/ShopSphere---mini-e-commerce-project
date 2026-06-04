const productsContainer =
  document.getElementById("productsContainer");

let allProducts = [];

const getProducts = async () => {

  try {

    const response = await fetch(
      "http://localhost:5000/api/products"
    );

    const products = await response.json();

    allProducts = products;

    displayProducts(products);

  } catch (error) {

    console.log(error);

  }

};

const loadCategories = async () => {

  try {

    const response = await fetch(
      "http://localhost:5000/api/products/categories/all"
    );

    const categories =
      await response.json();

    categories.forEach((item) => {

      categoryFilter.innerHTML += `

        <option value="${item.category}">
          ${item.category}
        </option>

      `;
    });

  } catch (error) {

    console.log(error);

  }

};

const displayProducts = (products) => {

  productsContainer.innerHTML = "";

  products.forEach((product) => {

    productsContainer.innerHTML += `

      <div class="product-card">

        <img
          src="/images/${product.image}"
          class="product-image"
        />

        <div class="product-details">

          <h3 class="product-name">
            <a href="/product/${product.id}">
              ${product.name}
            </a>
          </h3>

          <p class="product-price">
            ₹${product.price}
          </p>

          <button
            class="product-btn"
            onclick="addToCart(${product.id})"
          >
            Add To Cart
          </button>

        </div>

      </div>

    `;
  });

};

window.addToCart = (id) => {

  const product = allProducts.find(
    (item) => item.id === id
  );

  let cart = JSON.parse(
    localStorage.getItem("cart")
  ) || [];

  const existingProduct = cart.find(
    (item) => item.id === id
  );

  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({
      ...product,
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

const updateCartCount = () => {

  let cart = JSON.parse(
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

const updateNavbar = () => {

  const navbarLinks =
    document.getElementById("navbarLinks");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (user) {

    navbarLinks.innerHTML = `

      <a href="/">
        Home
      </a>

      <a href="/cart">
        Cart (
        <span id="cartCount">0</span>
        )
      </a>

      <span>
        Hello, ${user.name}
      </span>

      <a href="#"
        onclick="logoutUser()"
      >
        Logout
      </a>

    `;

    updateCartCount();

  }

};

window.logoutUser = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  window.location.reload();

};

const searchInput =
  document.getElementById("searchInput");

searchInput.addEventListener(

  "input",

  (e) => {

    const value =
      e.target.value.toLowerCase();

    const filteredProducts =
      allProducts.filter((product) => {

        return (

          product.name
            .toLowerCase()
            .includes(value)

        );

      });

    displayProducts(filteredProducts);

  }

);

const categoryFilter =
  document.getElementById("categoryFilter");

categoryFilter.addEventListener(

  "change",

  (e) => {

    const selectedCategory =
      e.target.value;

    if (selectedCategory === "all") {

      displayProducts(allProducts);

      return;
    }

    const filteredProducts =
      allProducts.filter((product) => {

        return (
          product.category ===
          selectedCategory
        );

      });

    displayProducts(filteredProducts);

  }

);

window.scrollToSearch = () => {

  const section =
    document.getElementById(
      "searchSection"
    );

  section.scrollIntoView({

    behavior: "smooth"

  });

  setTimeout(() => {

    document.getElementById(
      "searchInput"
    ).focus();

  }, 500);

};

getProducts();

loadCategories();

updateCartCount();

updateNavbar();