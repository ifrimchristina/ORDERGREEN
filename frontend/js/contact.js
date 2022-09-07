window.addEventListener("load", () => {
  let options = document.querySelectorAll(".slider .option");
  options.forEach((option) => {
    option.onclick = () => {
      let parent = option.parentElement;
      let selected = parent.querySelector(".selected");
      if (selected) {
        selected.classList.remove("selected");
      }
      option.classList.add("selected");
    };
  });
});

function sendSurvey() {
  let survey = [];
  let question_elements = document.querySelectorAll(".survey > p");
  let answer_elements = document.querySelectorAll(
    ".survey .selected > p, .survey textarea"
  );

  let questions = Array.from(question_elements).map((element) => {
    return element.innerText;
  });
  let answers = Array.from(answer_elements).map((element) => {
    if (element.tagName == "P") {
      return element.innerText;
    } else {
      return element.value;
    }
  });

  // If any answer is empty, alert with error
  if (answers.includes("")) {
    alert("Please fill in all fields");
    return;
  }

  for (let i = 0; i < questions.length; i++) {
    survey.push({
      question: questions[i],
      answer: answers[i],
    });
  }

  fetch("http://localhost:3001/contact", {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(survey),
  }).then((data) => {
    if (data.status == 200) {
      alert("Survey sent!");
    } else {
      alert("Something went wrong!");
    }
  });
}
