const checkoutForm =
  document.getElementById("checkoutForm");

const checkoutTotal =
  document.getElementById("checkoutTotal");

const cart = JSON.parse(
  localStorage.getItem("cart")
) || [];

const user = JSON.parse(
  localStorage.getItem("user")
);

if (cart.length === 0) {

  showToast("Your cart is empty");

  setTimeout(() => {

    window.location.href = "/cart";

  }, 1500);

}

let total = 0;

cart.forEach((item) => {

  total += Number(item.price) * item.quantity;

});

checkoutTotal.innerText =
  `Total: ₹${total}`;

if (user) {

  document.getElementById("name").value =
    user.name;

  document.getElementById("email").value =
    user.email;

}

checkoutForm.addEventListener(

  "submit",

  async (e) => {

    e.preventDefault();

    const customer_name =
      document.getElementById("name").value;

    const customer_email =
      document.getElementById("email").value;

    const address =
      document.getElementById("address").value;

    try {

      const response = await fetch(

        "http://localhost:5000/api/orders",

        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            user_id: user
              ? user.id
              : null,

            customer_name,

            customer_email,

            address,

            total_amount: total

          })

        }

      );

      const data = await response.json();

      showToast(data.message);

      if (response.ok) {

        localStorage.removeItem("cart");

        setTimeout(() => {

          window.location.href = "/";

        }, 1500);

      }

    } catch (error) {

      console.log(error);

    }

  }

);