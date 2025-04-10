export let taskList = JSON.parse(localStorage.getItem('taskList')) || [];

export let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
export let currentTask = JSON.parse(localStorage.getItem('currentTask')) || {};
let taskIdCounter = JSON.parse(localStorage.getItem('taskIdCounter')) || 0;

export function incrementTaskIdCounter() {
  taskIdCounter++;
  saveToStorage();
}

export function getTaskIdCounter() {
  return taskIdCounter;
}

export function saveToStorage() {
  localStorage.setItem('taskList', JSON.stringify(taskList));
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  localStorage.setItem('currentTask', JSON.stringify(currentTask));
  localStorage.setItem('taskIdCounter', JSON.stringify(taskIdCounter));
}
