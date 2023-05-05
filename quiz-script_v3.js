const directoryPath = './img/';
let imagePaths = [];
let questionCount = 0;
let correctCount = 0;
let maxQuestions = 10;
const submitButton = document.getElementById('quiz-submit-button');
const answerInput = document.getElementById('answer-input');
const selectedIndexes = [];
const country = getCountryFromUrl(); // get selected country from URL parameter
const popupContainer = document.getElementById('popup-container');
const resultText = document.getElementById('result-text');
const playAgainButton = document.getElementById('play-again-button');
const returnToCountryButton = document.getElementById('return-to-country-button');

fetch(`./json/${country}.json`) // load JSON file based on selected country
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

function getCountryFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const country = urlParams.get('country');
  if (country) {
    return country.toLowerCase(); // convert to lowercase to match JSON file names
  } else {
    return 'br'; // default to Brazil if country parameter is not specified
  }
}

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
    let message = `You answered ${correctCount} out of ${maxQuestions} questions correctly.`;
    resultText.innerHTML = message;
    popupContainer.style.display = 'block';

    playAgainButton.addEventListener('click', playAgain);
    returnToCountryButton.addEventListener('click', returnToCountry);
    
    return;
  }

  function playAgain() {
    popupContainer.style.display = 'none';
    resetScore();
    selectedIndexes = [];
    selectedIndexes.length = 0;
    displayNextQuestion();
  }

  function returnToCountry() {
    popupContainer.style.display = 'none';
    window.location.href = 'index.html';
  }

  // Select a random image and area code that has not been selected yet
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * imagePaths.length);
  } while (selectedIndexes.includes(randomIndex));
  selectedIndexes.push(randomIndex);
  
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
    const userAnswer = answerInput.value;
    if (userAnswer === randomAnswer.toString()) {
      feedbackContainer.innerHTML = 'Correct!';
      feedbackContainer.style.color = 'green';
      correctCount++;
    } else {
      feedbackContainer.innerHTML = 'Incorrect. The correct area code was ' + randomAnswer;
      feedbackContainer.style.color = 'red';
    }
    submitButton.removeEventListener('click', checkAnswer);
    answerInput.removeEventListener('keyup', keyupEventHandler);
    setTimeout(() => {
      questionCount++;
      displayNextQuestion();
    }, 1000);
  }

  // Add event listeners to submit button and answer input
  submitButton.addEventListener('click', checkAnswer);
  answerInput.addEventListener('keyup', keyupEventHandler);

  // Define keyupEventHandler function in displayNextQuestion
  function keyupEventHandler(event) {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  }
}


function resetScore() {
  questionCount = 0;
  correctCount = 0;
  const currentScoreElement = document.getElementById('current-score');
  const totalQuestionsElement = document.getElementById('total-questions');
  currentScoreElement.innerHTML = correctCount;
  totalQuestionsElement.innerHTML = questionCount;
  resultText.innerHTML = '';
}

