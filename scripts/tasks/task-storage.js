export let taskList = JSON.parse(localStorage.getItem('taskList')) || [
  {
    id: `csc229-hw-45`,
    title: `CSC229 HW`,
    description: `Algorithm Analysis, Big O Notation`,
    approxPomodoros: 4,
    actualPomodoros: 2,
    isCurrentTask: false,
    creationDate: Date.now()
  },
  {
    id: `bcs378-hw-46`,
    title: `BCS378 HW`,
    description: `Cryptography, RSA Algorithm`,
    approxPomodoros: 6,
    actualPomodoros: 1,
    isCurrentTask: false,
    creationDate: Date.now()
  }
];

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
