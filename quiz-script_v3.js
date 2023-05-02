const directoryPath = './img/';
let imagePaths = [];
let questionCount = 0;
let correctCount = 0;

fetch('br.json')
  .then(response => response.json())
  .then(data => {
    imagePaths = data.map(item => {
      return {
        path: item.path,
        answer: item.answer
      };
    });
  })
  .then(() => {
    displayNextQuestion();
  })
  .catch(error => console.error(error));

function displayNextQuestion() {
  // Check if all questions have been answered
  if (questionCount === Math.min(10, imagePaths.length)) {
    alert(`You answered ${correctCount} out of ${Math.min(10, imagePaths.length)} questions correctly.`);
    return;
  }

  // Select a random image and area code
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  const randomImagePath = imagePaths[randomIndex].path;
  const randomAnswer = imagePaths[randomIndex].answer;

  // Set question image source
  const questionImage = document.getElementById('quiz-image');
  questionImage.src = randomImagePath;

  // Reset feedback container and answer input
  const feedbackContainer = document.getElementById('feedback-container');
  feedbackContainer.innerHTML = '';
  const answerInput = document.getElementById('answer-input');
  answerInput.value = '';

  // Check user answer and display feedback
  function checkAnswer() {
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
    setTimeout(displayNextQuestion, 1000);
  }

  const submitButton = document.getElementById('quiz-submit-button');
  submitButton.addEventListener('click', checkAnswer);

  answerInput = document.getElementById('answer-input');
  answerInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  });
}
