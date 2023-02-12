const questions = [
  {
    question: "Which country hosted the FIFA World Cup?",
    answers: ["Russia", "Brazil", "Qatar", "USA"],
    correct: 3,
  },
  {
    question: "Which team won the World Cup?",
    answers: ["France", "England", "Brazil", "Argentina"],
    correct: 4,
  },
  {
    question: "Choose the best player of the tournament?",
    answers: [
      "Leo Messi",
      "Kylian Mbappe",
      "Cristiano Ronaldo",
      "Erling Haaland",
    ],
    correct: 1,
  },
  {
    question: "What was the final score between Argentina and France?",
    answers: ["2:2", "3:3", "3:1", "2:0"],
    correct: 2,
  },
  {
    question: "When will the next World Cup take place?",
    answers: ["2024", "2025", "2026", "2027"],
    correct: 3,
  },
];

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );
  headerContainer.innerHTML = title;

  let answerNumber = 1;
  for (answerText of questions[questionIndex]["answers"]) {
    const questionTemplate = `<li>
    <label>
      <input value="%number%" type="radio" class="answer" name="answer" />
      <span>%answer%</span>
    </label>
  </li>`;

    const answerHTML = questionTemplate
      .replace("%answer%", answerText)
      .replace("%number%", answerNumber);

    listContainer.innerHTML += answerHTML;
    answerNumber++;
  }
}

function checkAnswer() {
  const checkedRadio = listContainer.querySelector("input:checked");

  if (!checkedRadio) {
    submitBtn.blur();
    return;
  }

  const userAnswer = parseInt(checkedRadio.value);

  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }

  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
  } else {
    clearPage();
    showResults();
  }
}

function showResults() {
  const resultsTemplate = `<h2 class="title">%title%</h2>
  <h3 class="summary">%summary%</h3>
  <p class="result">%result%</p>`;

  let title, summary;

  if (score === questions.length) {
    title = "Congratulations 🔥";
    summary = "You answered all questions correctly 🤩";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Not bad 😎";
    summary = "You almost answered all questions correctly 👌";
  } else {
    title = "You are an amateur 🙃";
    summary = "It is worth learning materiel 💩";
  }

  let result = `${score} из ${questions.length}`;

  const finalSummary = resultsTemplate
    .replace("%title%", title)
    .replace("%summary%", summary)
    .replace("%result%", result);

  headerContainer.innerHTML = finalSummary;

  submitBtn.blur();
  submitBtn.innerText = "Play again";
  submitBtn.onclick = () => history.go();
}
