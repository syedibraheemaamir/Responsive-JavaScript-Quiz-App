const quizData = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "Hyper Tool Multi Language"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "Which language is used for styling web pages?",
      options: ["HTML", "JQuery", "CSS", "XML"],
      answer: "CSS"
    },
    {
      question: "Inside which HTML element do we put the JavaScript?",
      options: ["<js>", "<script>", "<javascript>", "<scripting>"],
      answer: "<script>"
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "/*", "#", "<!--"],
      answer: "//"
    }
  ];
  
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const nextBtn = document.getElementById('next-btn');
  const resultEl = document.getElementById('result');
  const scoreEl = document.getElementById('score');
  const totalEl = document.getElementById('total');
  const restartBtn = document.getElementById('restart-btn');
  
  let currentQuestionIndex = 0;
  let score = 0;
  let selectedOption = null;
  
  function loadQuestion() {
    selectedOption = null;
    nextBtn.disabled = true;
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
  
    optionsEl.innerHTML = '';
    currentQuestion.options.forEach(optionText => {
      const option = document.createElement('div');
      option.classList.add('option');
      option.textContent = optionText;
      option.addEventListener('click', () => selectOption(option));
      optionsEl.appendChild(option);
    });
  }
  
  function selectOption(option) {
    if (selectedOption) return;
  
    selectedOption = option;
    const correctAnswer = quizData[currentQuestionIndex].answer;

    if (option.textContent === correctAnswer) {
      option.classList.add('correct');
      score++;
    } else {
      option.classList.add('wrong');
      Array.from(optionsEl.children).forEach(opt => {
        if (opt.textContent === correctAnswer) {
          opt.classList.add('correct');
        }
      });
    }
  
    option.classList.add('selected');
  
    nextBtn.disabled = false;
  }
  
  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });
  
  restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultEl.classList.add('hide');
    document.getElementById('quiz-container').classList.remove('hide');
    loadQuestion();
  });
  
  function showResult() {
    document.getElementById('quiz-container').classList.add('hide');
    resultEl.classList.remove('hide');
    scoreEl.textContent = score;
    totalEl.textContent = quizData.length;
  }
  
  loadQuestion();
  