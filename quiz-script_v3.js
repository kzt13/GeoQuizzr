const directoryPath = './img/';
let imagePaths = [];
let questionCount = 0;
let correctCount = 0;
let maxQuestions = 10;
const submitButton = document.getElementById('quiz-submit-button');
const answerInput = document.getElementById('answer-input');

fetch('br.json')
  .then(response => response.json())
  .then(data => {
    imagePaths = data.map(item => {
      return {
        path: item.path,
        answer: item.answer
      };
    });
    maxQuestions = Math.min(maxQuestions, imagePaths.length);
  })
  .then(() => {
    displayNextQuestion();
  })
  .catch(error => console.error(error));

function displayNextQuestion() {
  // Update score
  const currentScoreElement = document.getElementById('current-score');
  const totalQuestionsElement = document.getElementById('total-questions');
  currentScoreElement.innerHTML = correctCount;
  totalQuestionsElement.innerHTML = questionCount;

  submitButton.removeEventListener('click', checkAnswer);
  answerInput.removeEventListener('keyup', keyupEventHandler);

  // Check if all questions have been answered
  if (questionCount === maxQuestions) {
    alert(`You answered ${correctCount} out of ${maxQuestions} questions correctly.`);
    resetScore();
    return;
  }

  // Select a random image and area code
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  const randomImagePath = imagePaths[randomIndex].path;
  const randomAnswer = imagePaths[randomIndex].answer;

  // Set question image source
  const questionImage = document.getElementById('quiz-image');
  questionImage.onload = null;
  questionImage.style.visibility = 'hidden';
  questionImage.src = randomImagePath;
  let isImageLoaded = false;
  questionImage.onload = function() {
    isImageLoaded = true;
    questionImage.style.visibility = 'visible';
  };

  // Reset feedback container and answer input
  const feedbackContainer = document.getElementById('feedback-container');
  feedbackContainer.innerHTML = '';
  answerInput.value = '';

  // Check user answer and display feedback
  submitButton.addEventListener('click', checkAnswer);
  answerInput.addEventListener('keyup', keyupEventHandler);
}

function resetScore() {
  questionCount = 0;
  correctCount = 0;
  const currentScoreElement = document.getElementById('current-score');
  const totalQuestionsElement = document.getElementById('total-questions');
  currentScoreElement.innerHTML = correctCount;
  totalQuestionsElement.innerHTML = questionCount;
}

function checkAnswer() {
  // Check if image is loaded
  const questionImage = document.getElementById('quiz-image');
  if (questionImage.style.visibility !== 'visible') {
    return;
  }
  
  const userAnswer = answerInput.value;
  if (userAnswer === randomAnswer.toString()) {
    feedbackContainer.innerHTML = 'Correct!';
    feedbackContainer.style.color = 'green';
    correctCount++;
  } else {
    feedbackContainer.innerHTML = 'Incorrect. The correct area code was ' + randomAnswer;
    feedbackContainer.style.color = 'red';
  }
  
  questionCount++;
  setTimeout(() => {
    displayNextQuestion();
  }, 1000);
}

// keyupEventHandlerをグローバルスコープで定義
function keyupEventHandler(event) {
  if (event.key === 'Enter') {
    checkAnswer();
  }
}
