import { addTask } from './task-actions.js';

export const currentTaskContainer = document.querySelector('.current-task-container');
export const taskListContainer = document.querySelector('.task-list');

export const addTaskBtn = document.querySelector('.add-task-btn');
export const addTaskForm = document.querySelector('.add-task-form');
export const taskTitleInput = document.querySelector('.task-title-input');
export const taskDescInput = document.querySelector('.task-desc-input');
export const taskApproxPomodorosInput = document.querySelector('.task-approx-pomodoros-input');


addTaskBtn.addEventListener('click', () => {
  addTask();
});

addTaskForm.addEventListener('submit', event => {
  event.preventDefault();
});
