const productForm =
  document.getElementById("productForm");

const adminProducts =
  document.getElementById("adminProducts");

const getProducts = async () => {

  try {

    const response = await fetch(
      "http://localhost:5000/api/products"
    );

    const products = await response.json();

    displayProducts(products);

  } catch (error) {

    console.log(error);

  }

};

const displayProducts = (products) => {

  adminProducts.innerHTML = "";

  products.forEach((product) => {

    adminProducts.innerHTML += `

      <div class="product-card">

        <img
          src="/images/${product.image}"
          class="product-image"
        />

        <div class="product-details">

          <h3 class="product-name">
            ${product.name}
          </h3>

          <p class="product-price">
            ₹${product.price}
          </p>

          <button
            class="product-btn"
            onclick="editProduct(${product.id})"
          >
            Edit
          </button>

          <button
            class="delete-btn"
            onclick="deleteProduct(${product.id})"
          >
            Delete
          </button>

        </div>

      </div>

    `;
  });

};

productForm.addEventListener(

  "submit",

  async (e) => {

    e.preventDefault();

    const name =
      document.getElementById("name").value;

    const price = Number(
      document.getElementById("price").value
    );

    const image =
      document.getElementById("image").value;

    const category =
      document.getElementById("category").value;

    const description =
      document.getElementById("description").value;

    const editId =
      productForm.getAttribute(
        "data-edit-id"
      );

    let url =
      "http://localhost:5000/api/products";

    let method = "POST";

    if (editId) {

      url =
        `http://localhost:5000/api/products/${editId}`;

      method = "PUT";
    }

    try {

      const response = await fetch(

        url,

        {

          method,

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            name,
            price,
            image,
            category,
            description

          })

        }

      );

      const data = await response.json();

      showToast(data.message);

      productForm.reset();

      productForm.removeAttribute(
        "data-edit-id"
      );

      productForm.querySelector("button")
      .innerText = "Add Product";

      getProducts();

      document.getElementById(
        "formSection"
      ).scrollIntoView({

        behavior: "smooth"

      });

    } catch (error) {

      console.log(error);

    }

  }

);

window.deleteProduct = async (id) => {

  try {

    const response = await fetch(

      `http://localhost:5000/api/products/${id}`,

      {
        method: "DELETE"
      }

    );

    const data = await response.json();

    showToast(data.message);

    getProducts();

  } catch (error) {

    console.log(error);

  }

};

window.editProduct = async (id) => {

  try {

    const response = await fetch(
      `http://localhost:5000/api/products/${id}`
    );

    const product = await response.json();

    document.getElementById("name").value =
      product.name;

    document.getElementById("price").value =
      product.price;

    document.getElementById("image").value =
      product.image;

    document.getElementById("category").value =
      product.category;

    document.getElementById("description").value =
      product.description;

    productForm.setAttribute(
      "data-edit-id",
      id
    );

    productForm.querySelector("button")
    .innerText = "Update Product";

    document.getElementById(
      "formSection"
    ).scrollIntoView({

      behavior: "smooth"

    });

  } catch (error) {

    console.log(error);

  }

};

getProducts();