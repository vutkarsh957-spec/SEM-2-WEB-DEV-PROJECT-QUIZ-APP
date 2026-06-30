import { renderCurrentQuestion, showFinalResults } from './ui.js';
import { dom } from './dom.js';
import { advanceQuiz } from './quiz.js';

function startQuiz() {
  renderCurrentQuestion();
}

// When the user clicks the "Next" or "Show Results" button
dom.nextBtn.addEventListener('click', function () {
  const hasMore = advanceQuiz();

  if (hasMore) {
    renderCurrentQuestion();
  }
  else {
    showFinalResults();
  }
});

// Fire it up when the webpage loads
document.addEventListener('DOMContentLoaded', startQuiz);