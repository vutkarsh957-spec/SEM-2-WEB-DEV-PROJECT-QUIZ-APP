import { quizState } from './state.js';

// Gets the question we are currently looking at
export function getCurrentQuestion() {
  return quizState.questions[quizState.currentIndex];
}

// Checks the answer, updates score, and tells the UI if it was right
export function submitAnswer(userChoice) {
  let current = getCurrentQuestion();
  let isCorrect = userChoice === current.correctAnswer;

  if (isCorrect) {
    quizState.score++;
  }

  return {
    isCorrect: isCorrect,
    correctAnswerIndex: current.correctAnswer
  };
}

// Moves the tracker to the next question
export function advanceQuiz() {
  if (quizState.currentIndex < quizState.questions.length - 1) {
    quizState.currentIndex++;
    return true; // Moved forward successfully
  }
  return false; // No more questions left
}

// Calculates the final percentage math cleanly
export function getFinalPercentage() {
  let total = quizState.questions.length;
  let percentage = (quizState.score / total) * 100;
  return Math.round(percentage);
}
