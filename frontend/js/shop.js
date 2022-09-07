window.addEventListener("load", () => {
  // Load items

  fetch("http://localhost:3001/get-items", {
    method: "GET",
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((items) => {
      items.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.id = item.id;
        itemElement.innerHTML = `
                <section class="info">
                <div class="image-wrapper">
                  <img
                    class="item__img"
                    src="${item.image}"
                    alt="item__img"
                  />
                  <p class="item__title">${item.title}</p>
                </div>
                <div class="separator"></div>
                <div class="price">
                  <p class="value">${item.price}</p>
                  <p class="currency">EUR/KG</p>
                </div>
              </section>
              <section class="buttons">
                <div
                  class="check-btn"
                  onclick="checkStock(${item.id})"
                >
                  <p class="btn__text">Check stock</p>
                </div>
                <div class="buy-btn" onclick="buyItem(${item.id})">
                  <p class="btn__text">Buy</p>
                </div>
                <div class="delete-btn" onclick="deleteItem(${item.id})">
                  <p class="btn__text">Delete</p>
                </div>
              </section>
                `;
        document.querySelector(".items").appendChild(itemElement);
      });
    });
});

function checkStock(id) {
  fetch("http://localhost:3001/check-stock/" + id, {
    method: "GET",
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.inStock) {
        const item = document.getElementById(id);
        item.querySelector(".check-btn").style.backgroundColor = "green";
        item.querySelector(".check-btn > p").innerHTML = "In stock";
      } else {
        const item = document.getElementById(id);
        item.querySelector(".check-btn").style.backgroundColor = "red";
        item.querySelector(".check-btn > p").innerHTML = "Out of stock";
      }
    });
}

function buyItem(id) {
  fetch("http://localhost:3001/buy-item/" + id, {
    method: "PUT",
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.status === "Bought!") {
        const item = document.getElementById(id);
        item.querySelector(".buy-btn > p").innerHTML = "Bought";
      } else {
        const item = document.getElementById(id);
        item.querySelector(".buy-btn > p").innerHTML = "Buy";
        alert(
          "An error has occured while buying the item. Please try again later!"
        );
      }
    });
}

function deleteItem(id) {
  fetch("http://localhost:3001/delete-item/" + id, {
    method: "DELETE",
    credentials: 'include',
  }).then((response) => {
    if (response.status === 200) {
      const item = document.getElementById(id);
      item.remove();
    } else {
      alert(
        "An error has occured while deleting the item. Please try again later!"
      );
    }
  });
}
