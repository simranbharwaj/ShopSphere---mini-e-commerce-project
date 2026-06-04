const registerForm =
  document.getElementById("registerForm");

registerForm.addEventListener(
  "submit",

  async (e) => {

    e.preventDefault();

    const name =
      document.getElementById("name").value;

    const email =
      document.getElementById("email").value;

    const password =
      document.getElementById("password").value;

    try {

      const response = await fetch(

        "http://localhost:5000/api/auth/register",

        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            password
          })

        }

      );

      const data = await response.json();

      showToast(data.message);

      if (response.ok) {

        window.location.href = "/login";

      }

    } catch (error) {

      console.log(error);

    }

  }
);