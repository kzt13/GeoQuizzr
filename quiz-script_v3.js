const directoryPath = './img/';
let imagePaths = [];

fetch('br.json')
  .then(response => response.json())
  .then(data => {
    imagePaths = data.map(item => {
      return {
        path: item.path,
        answer: item.answer
      };
    });

    const numQuestions = Math.min(imagePaths.length, 10);
    const questions = [];

    for (let i = 0; i < numQuestions; i++) {
      const randomIndex = Math.floor(Math.random() * imagePaths.length);
      const randomImagePath = imagePaths[randomIndex].path;
      const randomAnswer = imagePaths[randomIndex].answer;

      questions.push({
        imagePath: randomImagePath,
        answer: randomAnswer
      });

      // Remove the image path from the list so it won't be selected again
      imagePaths.splice(randomIndex, 1);
    }

    let questionIndex = 0;
    const questionImage = document.getElementById('quiz-image');
    const feedbackContainer = document.getElementById('feedback-container');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('quiz-submit-button');
    submitButton.addEventListener('click', checkAnswer);

    function displayQuestion() {
      questionImage.src = questions[questionIndex].imagePath;
      feedbackContainer.innerHTML = '';
      answerInput.value = '';
    }

    function checkAnswer() {
      const userAnswer = answerInput.value;
      const randomAnswer = questions[questionIndex].answer;

      if (userAnswer === randomAnswer.toString()) {
        feedbackContainer.innerHTML = 'Correct!';
        feedbackContainer.style.color = 'green';
      } else {
        feedbackContainer.innerHTML = 'Incorrect. The correct area code was ' + randomAnswer;
        feedbackContainer.style.color = 'red';
      }

      questionIndex++;
      if (questionIndex < questions.length) {
        displayQuestion();
      } else {
        alert('Quiz complete!');
      }
    }

    displayQuestion();
    answerInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        checkAnswer();
      }
    });
  })
  .catch(error => console.error(error));
