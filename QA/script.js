
let questions = [
  {
    question: "What does JS stand for?",
    options: ["Java Source", "JavaScript", "Just Script", "Jolly Script"],
    correct_option: "JavaScript"
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h6>", "<h1>", "<head>", "<heading>"],
    correct_option: "<h1>"
  },
  {
    question: "CSS is used for?",
    options: ["Styling web pages", "Database storage", "Server scripting", "Programming logic"],
    correct_option: "Styling web pages"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Google", "Microsoft", "Netscape", "Oracle"],
    correct_option: "Netscape"
  },
  {
    question: "Which attribute is used in HTML to add inline styles?",
    options: ["class", "style", "font", "styles"],
    correct_option: "style"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "<!-- -->", "#", "/* */"],
    correct_option: "//"
  },
  {
    question: "Which is not a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Number"],
    correct_option: "Float"
  },
  {
    question: "Which method is used to print in the console?",
    options: ["console.print()", "console.write()", "console.log()", "log.console()"],
    correct_option: "console.log()"
  },
  {
    question: "Which CSS property controls text size?",
    options: ["font-size", "text-style", "size", "text-size"],
    correct_option: "font-size"
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Transfer Markup Language",
      "High Text Marking Language",
      "Hyper Text Markup Language",
      "Hyper Tool Markup Language"
    ],
    correct_option: "Hyper Text Markup Language"
  }
];

let count = 0;
let marks = 0;
let timer;
let timeLeft = 600; 


let startBtn = document.getElementById("startBtn");
let instructionContainer = document.getElementById("instruction-container");
let questionContainer = document.getElementById("question-container");
let resultContainer = document.getElementById("result-container");
let question = document.getElementById("question");
let options = document.getElementsByClassName("option");
let result = document.getElementById("result");
let statusMsg = document.getElementById("status");
let timerDisplay = document.getElementById("timer");


questionContainer.style.display = "none";
resultContainer.style.display = "none";


startBtn.onclick = function () {
  if (startBtn.textContent === "reset") {
    resetQuiz();
    return;
  }

  if (count === 0) {
    startTimer();
  }

  if (count === questions.length) {
    endQuiz();
    return;
  }

  showQuestion();
};


function showQuestion() {
  questionContainer.style.display = "block";
  instructionContainer.style.display = "none";
  resultContainer.style.display = "none";
  startBtn.textContent = "Next";

  let q = questions[count];
  question.textContent = q.question;
  for (let i = 0; i < 4; i++) {
    options[i].textContent = q.options[i];
    options[i].style.backgroundColor = "#ecf0f1";
    options[i].disabled = false;
  }
  count++;
}


for (let option of options) {
  option.onclick = function () {
    if (option.textContent === questions[count - 1].correct_option) {
      option.style.backgroundColor = "#2ecc71";
      marks += 2;
    } else {
      option.style.backgroundColor = "#e74c3c";
      for (let i of options) {
        if (i.textContent === questions[count - 1].correct_option) {
          i.style.backgroundColor = "#2ecc71";
        }
      }
      marks -= 1;
    }
    for (let i of options) {
      i.disabled = true;
    }
  };
}


function startTimer() {
  timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    } else {
      let minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      timeLeft--;
    }
  }, 1000);
}


function endQuiz() {
  questionContainer.style.display = "none";
  instructionContainer.style.display = "none";
  resultContainer.style.display = "block";
  startBtn.textContent = "reset";

  result.textContent = `Marks: ${marks}`;
  statusMsg.textContent = marks >= 7 ? "🎉 You Passed!" : "❌ You Failed!";
  clearInterval(timer);
}


function resetQuiz() {
  count = 0;
  marks = 0;
  timeLeft = 600;
  clearInterval(timer);
  instructionContainer.style.display = "block";
  questionContainer.style.display = "none";
  resultContainer.style.display = "none";
  startBtn.textContent = "Start";
  timerDisplay.textContent = "Time Left: 10:00";
}
