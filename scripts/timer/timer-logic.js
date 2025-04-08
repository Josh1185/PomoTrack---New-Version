import { timerState, POMODORO_MINUTES, SHORT_BREAK_MINUTES, LONG_BREAK_MINUTES } from './timer-state.js';
import { timerContainer, timerDisplay, progressBar, startTimerBtn, pauseTimerBtn, skipTimerBtn, pomodoroBtn, shortBreakBtn, longBreakBtn, currentTaskDisplay, currentStepDisplay, focusModeBtn, gridContainer } from './timer-elements.js';
import { deactivatePrevBtn, disableFocusMode, enableFocusMode } from './timer-events.js';

let startingMinutes = POMODORO_MINUTES;
let time = (startingMinutes * 60) - 1;
let progressDegrees = 0; // Initial progress degrees

initializeTimer(POMODORO_MINUTES);

export function initializeTimer(mins) {
  timerState.timerRunning = false;
  clearInterval(timerState.intervalId);
  startingMinutes = mins;
  time = (startingMinutes * 60) - 1;
  timerState.progressPercentage = 0;
  updateTimerDisplay();
  progressBar.style.background = `
    conic-gradient(
      var(--accent-color) 0deg,
      var(--color-2) 0deg
    )
  `;
  startTimerBtn.style.display = 'block';
  pauseTimerBtn.style.display = 'none';
  displayCurrentStep();
}

function updateTimerDisplay() {
  if (startingMinutes < 10) {
    timerDisplay.textContent = `0${startingMinutes}:00`;
  } else {
    timerDisplay.textContent = `${startingMinutes}:00`;
  }
}

export function displayCurrentStep() {
  switch (timerState.currentStep) {
    case "pomodoro":
      currentStepDisplay.innerHTML = `<span>Pomodoro ${timerState.pomodoroIndex}:</span> Focus on your task!`;
      focusModeBtn.style.display = 'block';
      break;
    case "shortBreak":
      currentStepDisplay.innerHTML = `<span>Short Break ${timerState.shortBreakIndex}:</span> Take a quick break!`;
      focusModeBtn.style.display = 'none';
      break;
    case "longBreak":
      currentStepDisplay.innerHTML = `<span>Long Break:</span> Relax and recharge!`;
      focusModeBtn.style.display = 'none';
      break;
  }
}

export function startTimer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  const progressPercentageIncrement = (100 / (startingMinutes * 60));

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  timerDisplay.textContent = `${minutes}:${seconds}`;

  timerState.progressPercentage += progressPercentageIncrement;
  progressDegrees = (timerState.progressPercentage / 100) * 360;
  progressBar.style.background = `
    conic-gradient(
      var(--accent-color) ${progressDegrees}deg,
      var(--color-2) 0deg
    )
  `;

  time--;
  if (time < 0) {
    timerEnds();
  }
}

export function timerEnds() {
  timerState.timerRunning = false;

  switch (timerState.currentStep) {

    case "pomodoro": // Was a pomodoro
      if (timerState.pomodoroIndex <= 3) { // First 3 pomodoros are followed by short breaks
        timerState.pomodoroIndex++;
        timerState.currentStep = "shortBreak";
        shortBreakBtn.classList.add("active");
        // Update Pomodoro Progress
        deactivatePrevBtn(timerState.currentStep);
        initializeTimer(SHORT_BREAK_MINUTES);

      } else { // After 3 pomodoros, switch to long break
        timerState.currentStep = "longBreak";
        longBreakBtn.classList.add("active");
        // Update Pomodoro Progress
        deactivatePrevBtn(timerState.currentStep);
        initializeTimer(LONG_BREAK_MINUTES);
        timerState.pomodoroIndex = 1; // Reset pomodoro index for next cycle
        timerState.shortBreakIndex = 1; // Reset short break index for next cycle
      }

      if (gridContainer.classList.contains("focus-mode")) { // If focus mode was active, deactivate it
        disableFocusMode();
      }
      break;

    case "shortBreak": // Was a short break
      timerState.shortBreakIndex++;
      timerState.currentStep = "pomodoro";
      pomodoroBtn.classList.add("active");
      deactivatePrevBtn(timerState.currentStep);
      initializeTimer(POMODORO_MINUTES);
      break;

    case "longBreak": // Was a long break
      timerState.currentStep = "pomodoro";
      pomodoroBtn.classList.add("active");
      deactivatePrevBtn(timerState.currentStep);
      initializeTimer(POMODORO_MINUTES);
      break;
  }
}