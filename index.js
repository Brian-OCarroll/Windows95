type:'strict';


let questionNumber = 0
let score = 0


function createQuestions() {
 if (questionNumber < answerLog.length) {
  return `
  <section class="question-page" role="region">
    <h2 id="question">${answerLog[questionNumber].question}</h2>
    <form>
      <fieldset>
        <label>
          <input type="radio" class="quest" name="question" value="${answerLog[questionNumber].answers[0]}" required></input>
          <span>${answerLog[questionNumber].answers[0]}</span>
        </label>
        <label>
          <input type="radio" class="quest" name="question" value="${answerLog[questionNumber].answers[1]}" required></input>
          <span>${answerLog[questionNumber].answers[1]}</span>
        </label>
        <label>
          <input type="radio" class="quest" name="question" value="${answerLog[questionNumber].answers[2]}" required></input>
          <span>${answerLog[questionNumber].answers[2]}</span>
        </label>
        <label>
          <input type="radio" class="quest" name="question" value="${answerLog[questionNumber].answers[3]}" required></input>
          <span>${answerLog[questionNumber].answers[3]}</span>
        </label>
      </fieldset>
      <button type="submit" class="js-submit-button">Submit</button>
    </form>
    <div class="question-tracker">
      <span id="question-count">Question: ${questionNumber}/6</span>
      <span id="score-count">Score: ${score}/${questionNumber}</span>
    </div>
  </section>
  `;}
  else {
    resultsPage();
    $('.question-page').addClass('hidden');
  }
};


function renderQuestions() {
  $('.question-page').html(createQuestions());
}

function startQuiz() {
$('.start-page').on('click', '#start-button', function(event) {
  $('.start-page').addClass('hidden');
  $('.question-page').removeClass('hidden');
});
}

function iterateQuestion() {
  questionNumber++;
}

function iterateScore() {
  score++;
}

function selectedAnswer() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${answerLog[questionNumber].correctAnswer}`;
    if (correctAnswer === answer) {
      selected.parent().addClass('correct');
      scriptForCorrectAnswer();
      iterateScore();
    }
    else {
      selected.parent().addClass('incorrect');
      scriptForWrongAnswer();
    }
  });
}


function scriptForCorrectAnswer() {
  let correctAnswer = `${answerLog[questionNumber].correctAnswer}`;
  $('.question-page').html(`
   <div class = "correct-answer">
   <div class="correct-icon"><img src="${answerLog[questionNumber].correctIcon}" alt="${answerLog[questionNumber].correctIconAlt}">
   </div>
   <p>Correctomundo</p>
   <button type="button" class="next-button">Next Question</button>
   </div>
  `);
}

function scriptForWrongAnswer() {
  let correctAnswer = `${answerLog[questionNumber].correctAnswer}`;
  $('.question-page').html(`
   <div class = "wrong-answer">
   <div class="wrong-icon"><img src="${answerLog[questionNumber].incorrectIcon}" alt="${answerLog[questionNumber].incorrectIconAlt}">
   </div>
   <p><b> Wrong Answer </b></p>
   <p> The correct answer is <span>"${correctAnswer}"</span></p>
   <button type="button" class="next-button">Next Question</button>
   </div>
  `);
}

function ifCorrectAnswer() {
  scriptForCorrectAnswer();
}

function ifWrongAnswer() {
  scriptForWrongAnswer();
}

function renderNextQuestion() {
  $('main').on('click', '.next-button', function(event) {
    iterateQuestion();
    renderQuestions();
    selectedAnswer();
  });
}

function resultsPage() {
  $('.results-page').html(`
  <div class="results-insert">
  <h3>Congrats, you are now a Windows 95 master!</h3>
  <div class="results-image"><img   src="https://guidebookgallery.org/pics/gui/startupshutdown/shutdowncomplete/winnt31.png" alt="computer-shutoff"></div>
  <p>Your Score is ${score}/6</p>
  <button type="button" class="restart-button">RESTART COMPUTER</button>
  </div>
  `);
}

function restartQuiz() {
  $('.results-page').on('click', '.restart-button', function(event){
    location=location;
  });
}

function handleQuizFunctions() {
  startQuiz();
  renderQuestions(); 
  selectedAnswer();
  renderNextQuestion();
  restartQuiz();
}

$(handleQuizFunctions);
