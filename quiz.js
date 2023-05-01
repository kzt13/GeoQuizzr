const directoryPath = './img/';
const imagePaths = [];

fetch(directoryPath)
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const html = parser.parseFromString(data, 'text/html');
    const links = html.querySelectorAll('a');

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      if (link.href.endsWith('.png') || link.href.endsWith('.jpg') || link.href.endsWith('.jpeg')) {
        const imagePath = link.href;
        const answer = parseInt(imagePath.match(/(\d+)\.(png|jpg|jpeg)$/)[1]);
        imagePaths.push({ path: imagePath, answer: answer });
      }
    }
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
  .catch(error => console.error(error));
