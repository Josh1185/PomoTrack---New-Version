export const timerState = {
  currentStep: "pomodoro",
  pomodoroIndex: 1,
  shortBreakIndex: 1,
  timerRunning: false,
  progressPercentage: 0,
  intervalId: null
};

export const POMODORO_MINUTES = 25;
export const SHORT_BREAK_MINUTES = 5;
export const LONG_BREAK_MINUTES = 15;