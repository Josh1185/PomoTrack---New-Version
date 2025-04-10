import { taskList, currentTask, saveToStorage, getTaskIdCounter, incrementTaskIdCounter } from './task-storage.js';
import { renderTaskList } from './task-rendering.js';
import { taskTitleInput, taskDescInput, taskApproxPomodorosInput, addTaskBtn, addTaskForm } from './task-elements.js';
import { modalToggle, modalText, confirmBtn, cancelBtn, cancelBtnHandler } from '../general/modal.js';

export function addTask() {
  const title = taskTitleInput.value;
  const description = taskDescInput.value;
  const approxPomodoros = Number(taskApproxPomodorosInput.value);

  if (title && description && approxPomodoros > 0 && !isNaN(approxPomodoros)) {

    const id = `${title.toLowerCase().replace(/\s+/g, '-')}-${getTaskIdCounter()}`;

    taskList.push({
      id,
      title,
      description,
      approxPomodoros,
      actualPomodoros: 0,
      isCurrentTask: false,
      creationDate: Date.now()
    });

    incrementTaskIdCounter();
    saveToStorage();
    renderTaskList();
    addTaskForm.reset();
  }
}

export function clearTaskList() {
  console.log('Clearing task list...');
}

let taskToDeleteIndex = null;

export function deleteTask(index) {
  taskToDeleteIndex = index;
  modalToggle.style.display = 'block';
  modalText.innerHTML = `Are you sure you want to delete "<span>${taskList[index].title}</span>"?`;
  console.log('task to delete: ', taskToDeleteIndex);
  console.log('task list before: ', taskList);

  function confirmDelete() {
    /* if (taskList[index].isCurrentTask) { // If the task is current, clear the current task
      currentTask = {};
    } */
    if (taskToDeleteIndex !== null) {
      taskList.splice(taskToDeleteIndex, 1);
      saveToStorage();
      renderTaskList();
      modalToggle.style.display = 'none';
      taskToDeleteIndex = null;

      confirmBtn.removeEventListener('click', confirmDelete);
    }
  }

  confirmBtn.addEventListener('click', confirmDelete)
  cancelBtn.addEventListener('click', () => {
    taskToDeleteIndex = null;
    cancelBtnHandler();
  });
}

export function editTask(index) {
  console.log('Editing task...'); // Make an edit task modal
}

export function markTaskAsComplete(index) {
  modalToggle.style.display = 'block';
  modalText.innerHTML = `Are you sure you want to mark "<span>${taskList[index].title}</span>" as complete?`;

  confirmBtn.addEventListener('click', () => {
    // Code to mark task as complete
    modalToggle.style.display = 'none';
  });

  cancelBtn.addEventListener('click', () => {
    cancelBtnHandler();
  });
}

export function markTaskAsCurrent(index) {
  modalToggle.style.display = 'block';
  modalText.innerHTML = `Are you sure you want to pin "<span>${taskList[index].title}</span>" as your current task?`;

  confirmBtn.addEventListener('click', () => {
    // Code to mark task as complete
    modalToggle.style.display = 'none';
  });

  cancelBtn.addEventListener('click', () => {
    cancelBtnHandler();
  });
}