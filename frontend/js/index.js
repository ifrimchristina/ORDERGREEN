document.onreadystatechange = checkSession;

function checkSession() {
  console.log("salll");
  fetch("http://localhost:3001/session", {
    method: "GET",
    credentials: "include",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status === "Valid!") {
        if (window.location.pathname === "/login") {
          window.location.href = "/";
        }
        let name_elements = document.querySelectorAll(".name");
        name_elements.forEach((element) => {
          element.innerHTML = data.name;
        });
      } else {
        if (window.location.pathname != "/login")
          window.location.href = "/login";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function toggleSidebar() {
  let sidebar = document.querySelector(".sidebar");
  let main = document.querySelector(".main");

  console.log(window.scrollY);
  if (sidebar.style.width == "0px" || sidebar.style.width == "") {
    sidebar.style.top = `${window.scrollY}px`;
    sidebar.style.width = "250px";
    sidebar.style.borderRight = "2px solid black";
    main.style.filter = "brightness(0.1)";
  } else {
    sidebar.style.width = "0px";
    sidebar.style.borderRight = "none";
    main.style.filter = "brightness(1)";
  }
}

function logout() {
  // Delete session cookie
  let sessionCookie = document.cookie.split("; ").find((cookie) => {
    return cookie.startsWith("ordergreen-session-cookie=");
  });
  if (sessionCookie) {
    let sessionCookieName = sessionCookie.split("=")[0];
    document.cookie =
      sessionCookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  window.location.href = "/login";
}

window.addEventListener("scroll", () => {
  const height = window.innerHeight;
  const scrolled = window.scrollY;
  let logo = document.querySelector(".about > img");

  if (logo)
    if (scrolled > height / 45 && logo.style.position != "fixed") {
      console.log("first branch");
      logo.style.position = "fixed";
      logo.style.top = "5px";
      logo.style.width = "10vw";
    } else if (scrolled < height / 45 && logo.style.position != "absolute") {
      console.log("second branch");
      logo.style.position = "absolute";
      logo.style.top = "7vw";
      logo.style.width = "30vw";
    }
});
