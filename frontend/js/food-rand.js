function generateMeal() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let ingredients = "";
      for (let i = 1; i <= 20; i++) {
        if (data.meals[0]["strIngredient" + i]) {
          ingredients += `
            <li>${data.meals[0]["strIngredient" + i]} - ${
            data.meals[0]["strMeasure" + i]
          }</li>
            `;
        } else {
          break;
        }
      }

      document.querySelector(".meal").innerHTML = `
        <div class="meal">
            <p class="meal__title">${data.meals[0].strMeal}</p>
            <img class="meal__image" src="${data.meals[0].strMealThumb}" alt="Meal Image">
            <a href="${data.meals[0].strYoutube}">
                <img class="meal__video" src="../assets/images/youtube.png"/>
            </a>
            <p>Ingredients:</p>
            <ul class="meal__ingredients">${ingredients}</ul>
            <p class="meal__instructions">${data.meals[0].strInstructions}</p>

        </div>
        `;
    });
}
