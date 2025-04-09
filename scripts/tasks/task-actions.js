import { taskList, currentTask, saveToStorage, getTaskIdCounter, incrementTaskIdCounter } from './task-storage.js';
import { renderTaskList } from './task-rendering.js';
import { taskTitleInput, taskDescInput, taskApproxPomodorosInput, addTaskBtn, addTaskForm } from './task-elements.js';

export function addTask() {
  const title = taskTitleInput.value;
  const description = taskDescInput.value;
  const approxPomodoros = Number(taskApproxPomodorosInput.value);

  if (title && description && approxPomodoros > 0 && !isNaN(approxPomodoros)) {

    const id = `${title.toLowerCase().replace(/\s+/g, '-')}-${getTaskIdCounter()}`;

    console.log(taskList);

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

export function deleteTask() {
  console.log('Deleting task...');
}

export function editTask() {
  console.log('Editing task...');
}

export function markTaskAsComplete() {
  console.log('Marking task as complete...');
}

export function markTaskAsCurrent() {
  console.log('Marking task as current...');
}