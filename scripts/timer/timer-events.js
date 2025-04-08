import { timerState, POMODORO_MINUTES, SHORT_BREAK_MINUTES, LONG_BREAK_MINUTES } from "./timer-state.js";
import { timerContainer, timerDisplay, progressBar, startTimerBtn, pauseTimerBtn, skipTimerBtn, pomodoroBtn, shortBreakBtn, longBreakBtn, currentTaskDisplay, currentStepDisplay, focusModeBtn, gridContainer, timerTypeSelectionContainer, disableFocusModeBtn } from "./timer-elements.js";
import { initializeTimer, displayCurrentStep, startTimer, timerEnds } from "./timer-logic.js";

pomodoroBtn.addEventListener("click", () => {
  timerState.currentStep = "pomodoro";
  initializeTimer(POMODORO_MINUTES);
  pomodoroBtn.classList.add("active");
  deactivatePrevBtn(timerState.currentStep);
});

shortBreakBtn.addEventListener("click", () => {
  timerState.currentStep = "shortBreak";
  initializeTimer(SHORT_BREAK_MINUTES);
  shortBreakBtn.classList.add("active");
  deactivatePrevBtn(timerState.currentStep);
});

longBreakBtn.addEventListener("click", () => {
  timerState.currentStep = "longBreak";
  initializeTimer(LONG_BREAK_MINUTES);
  longBreakBtn.classList.add("active");
  deactivatePrevBtn(timerState.currentStep);
});

startTimerBtn.addEventListener("click", () => {
  timerState.intervalId = setInterval(startTimer, 1000);
  timerState.timerRunning = true;
  startTimerBtn.style.display = 'none';
  pauseTimerBtn.style.display = 'block';
});

skipTimerBtn.addEventListener("click", () => {
  timerEnds();
});

pauseTimerBtn.addEventListener("click", () => {
  clearInterval(timerState.intervalId);
  timerState.timerRunning = false;
  startTimerBtn.style.display = 'block';
  pauseTimerBtn.style.display = 'none';
});

focusModeBtn.addEventListener("click", () => {
  enableFocusMode();
});

export function enableFocusMode() {
  gridContainer.classList.add("focus-mode");
  shortBreakBtn.style.display = 'none';
  longBreakBtn.style.display = 'none';
  pomodoroBtn.style.display = 'none';
  focusModeBtn.style.display = 'none';

  disableFocusModeBtn.style.display = 'block';

  disableFocusModeBtn.addEventListener("click", () => {
    disableFocusMode();
  });
}

export function disableFocusMode() {
  gridContainer.classList.remove("focus-mode");
  shortBreakBtn.style.display = 'block';
  longBreakBtn.style.display = 'block';
  pomodoroBtn.style.display = 'block';
  disableFocusModeBtn.style.display = 'none';

  if (timerState.currentStep === "pomodoro") { // This check is to ensure the focus mode button is ony shown when in pomodoro step
    focusModeBtn.style.display = 'block';
  } else {
    focusModeBtn.style.display = 'none';
  }
}

export function deactivatePrevBtn(currStep) {
  switch (currStep) {
    case "pomodoro":
      shortBreakBtn.classList.remove("active");
      longBreakBtn.classList.remove("active");
      break;
    case "shortBreak":
      pomodoroBtn.classList.remove("active");
      longBreakBtn.classList.remove("active");
      break;
    case "longBreak":
      pomodoroBtn.classList.remove("active");
      shortBreakBtn.classList.remove("active");
      break;
  }
}



