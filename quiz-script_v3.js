const directoryPath = './img/';
let imagePaths = [];
let questionCount = 0;
let correctCount = 0;
let maxQuestions = 10;
const submitButton = document.getElementById('quiz-submit-button');
const answerInput = document.getElementById('answer-input');
let keyupEventHandler = function(event) { if (event.key === 'Enter') { checkAnswer(); } };

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
  currentScoreElement.innerHTML = `Current score: ${correctCount}/${questionCount}`;

  // Check if all questions have been answered
  if (questionCount === maxQuestions) {
    alert(`You answered ${correctCount} out of ${maxQuestions} questions correctly.`);
    questionCount = 0;
    correctCount = 0;
    return;
  }

  const totalQuestionsElement = document.getElementById('total-questions');
  totalQuestionsElement.innerHTML = maxQuestions;

  submitButton.removeEventListener('click', checkAnswer);
  answerInput.removeEventListener('keyup', keyupEventHandler);

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
  function checkAnswer() {
    // Check if image is loaded
    if (!isImageLoaded) {
      return;
    }

    const userAnswer = answerInput.value.trim();
    if (userAnswer === randomAnswer.toString()) {
      feedbackContainer.innerHTML = 'Correct!';
      feedbackContainer.style.color = 'green';
      correctCount++;
    } else {
      feedbackContainer.innerHTML = `Incorrect. The correct area code was ${randomAnswer}.`;
      feedbackContainer.style.color = 'red';
    }

    questionCount++;

    submitButton.removeEventListener('click', checkAnswer);
    answerInput.removeEventListener('keyup', keyupEventHandler);

    displayNextQuestion();
  }

  submitButton.addEventListener('click', checkAnswer);
  answerInput.addEventListener('keyup', keyupEventHandler);
}
