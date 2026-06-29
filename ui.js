import { quizState } from './state.js';
import { getCurrentQuestion, submitAnswer, getFinalPercentage } from './quiz.js';
import { dom } from './dom.js';

export function renderCurrentQuestion() {
  let current = getCurrentQuestion();

  // Hide the next button until they choose an answer
  dom.nextBtn.style.display = 'none';

  // Update progress text (e.g., "Question 1 of 10")
  dom.progressTracker.textContent = `Question ${quizState.currentIndex + 1} of ${quizState.questions.length}`;
  dom.questionText.textContent = current.question;

  // Clear out old option buttons
  dom.optionsBox.innerHTML = '';

  // Create a button for each answer choice
  current.options.forEach(function (optionText, index) {
    const button = document.createElement('button');
    button.textContent = optionText;
    button.classList.add('option-btn');

    // When clicked, check the answer
    button.addEventListener('click', function () {
      handleOptionClick(index, button);
    });
    dom.optionsBox.appendChild(button);
  });
}

export function handleOptionClick(selectedIndex, clickedButton) {
  // Lock all buttons so the user can't change their mind or double-click
  let allButtons = dom.optionsBox.querySelectorAll('.option-btn');
  allButtons.forEach(btn => btn.disabled = true);

  // Check if they got it right
  let result = submitAnswer(selectedIndex);

  if (result.isCorrect) {
    clickedButton.classList.add('correct'); // Turns green
  }
  else {
    clickedButton.classList.add('wrong'); // Turns red
    allButtons[result.correctAnswerIndex].classList.add('correct'); // Highlights the correct answer in green
  }

  // Change the text of the action button depending on where we are
  let isLastQuestion = quizState.currentIndex === quizState.questions.length - 1;
  dom.nextBtn.textContent = isLastQuestion ? "Show Results" : "Next Question";
  dom.nextBtn.style.display = 'block';
}

export function showFinalResults() {
  let finalPercentage = getFinalPercentage();

  // Replace the card content with a clean summary score screen
  dom.quizCard.innerHTML = `
    <div style="text-align: center; padding: 20px 0;">
      <h2>Quiz Finished!</h2>
      <p>You got <strong>${quizState.score}</strong> out of <strong>${quizState.questions.length}</strong> questions right.</p>
      <div style="font-size: 3rem; font-weight: bold; color: #007bff; margin: 20px 0;">${finalPercentage}%</div>
      <button id="retry-btn" class="action-btn">Try Again</button>
    </div>
  `;

  // Attach dynamic event listener to the Try Again button
  document.getElementById('retry-btn').addEventListener('click', function() {
    window.location.reload();
  });
}
