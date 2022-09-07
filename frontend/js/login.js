function login() {
  // Clear status banner
  let statusBanner = document.querySelector("form.login .status");
  statusBanner.style.opacity = "0";

  // Grab email and password
  let email = document.querySelector('form.login input[type="email"]').value;
  let password = document.querySelector('form.login input[type="password"]').value;
  let data = { email, password };

  if (email && password) {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === "Successful!") {
          window.location.href = "/";
        } else {
          // Display error message
          statusBanner.innerHTML = data.status;
          statusBanner.style.opacity = "1";
          statusBanner.style.color = "red";
        }
      })
      .catch((err) => console.log(err));
  } else {
    statusBanner.innerHTML = "Please enter your email and password!";
    statusBanner.style.opacity = "1";
    statusBanner.style.color = "red";
  }
}

function signup() {
  // Clear status banner
  let statusBanner = document.querySelector("form.signup .status");
  statusBanner.innerHTML = "";
  statusBanner.style.opacity = "0";

  // Grab email and password
  let email = document.querySelector('form.signup input[type="email"]').value;
  let password = document.querySelector('form.signup input[type="password"]').value;
  let name = document.querySelector('form.signup input[name="name"]').value;
  let data = { email, password, name };

  if (email && password && name) {
    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "Successful!") {
          alert("Account successfully created! You can log in now.");
          window.location.href = "/login";
        } else {
          // Display error message
          statusBanner.innerHTML = data.status;
          statusBanner.style.opacity = "1";
          statusBanner.style.color = "red";
        }
      })
      .catch((err) => console.log(err));
  } else {
    statusBanner.innerHTML = "Please input all fields!";
    statusBanner.style.opacity = "1";
    statusBanner.style.color = "red";
  }

}

function switchForms() {
  // Clear status banner
  let statusBanner = document.querySelector("form.login .status");
  statusBanner.style.opacity = "0";

  let loginForm = document.querySelector("form.login");
  let signupForm = document.querySelector("form.signup");
  console.log(loginForm.style);
  console.log(signupForm);

  if (loginForm.style.opacity === "1" || loginForm.style.opacity === "") {
    console.log("first branch");
    loginForm.style.opacity = "0";
    loginForm.style.zIndex = "-1";
    setTimeout(() => {
      signupForm.style.opacity = "1";
      signupForm.style.zIndex = "1";
    }, 300);
  } else {
    console.log("second branch");
    signupForm.style.opacity = "0";
    signupForm.style.zIndex = "-1";

    setTimeout(() => {
      loginForm.style.opacity = "1";
      loginForm.style.zIndex = "1";
    }, 300);
  }
}
