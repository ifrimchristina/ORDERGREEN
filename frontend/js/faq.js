window.addEventListener("load", () => {
  let questions = document.querySelectorAll(".question");
  console.log(questions);
  questions.forEach((question) => {
    question.onclick = () => {
      let image = question.querySelector("img");
      if (question.classList.contains("expanded")) {
        question.classList.remove("expanded");
        image.src = "../assets/images/plus.png";
      } else {
        question.classList.add("expanded");
        image.src = "../assets/images/minus.png";
      }
    };
  });
});
