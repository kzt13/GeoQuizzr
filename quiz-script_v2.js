const directoryPath = './img/';
const imagePaths = [];

fetch('br.json')
  .then(response => response.json())
  .then(data => {
    const imagePaths = data.map(item => {
      return {
        path: item.path,
        answer: item.answer
      };
    })
  .then(() => {
    // Select a random image and area code
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    const randomImagePath = imagePaths[randomIndex].path;
    const randomAnswer = imagePaths[randomIndex].answer;

    // Set question image source
    const questionImage = document.getElementById('quiz-image');
    questionImage.src = randomImagePath;

    // Check user answer and display feedback
    function checkAnswer() {
      const userAnswer = document.getElementById('answer-input').value;
      const feedbackContainer = document.getElementById('feedback-container');

      if (userAnswer === randomAnswer.toString()) {
        feedbackContainer.innerHTML = 'Correct!';
        feedbackContainer.style.color = 'green';
      } else {
        feedbackContainer.innerHTML = 'Incorrect. The correct area code was ' + randomAnswer;
        feedbackContainer.style.color = 'red';
      }
    }

    const answerInput = document.getElementById('answer-input');
    answerInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        checkAnswer();
      }
    });
  })
  })
  .catch(error => console.error(error));
