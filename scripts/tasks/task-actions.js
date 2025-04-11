import { taskList, currentTask, saveToStorage, getTaskIdCounter, incrementTaskIdCounter, insertCurrentTaskData, removeCurrentTaskData } from './task-storage.js';
import { renderTaskList, renderCurrentTask } from './task-rendering.js';
import { taskTitleInput, taskDescInput, taskApproxPomodorosInput, addTaskForm, addTaskBtn } from './task-elements.js';
import { modalToggle, modalText, confirmBtn, cancelBtn, modalPopUp, editTaskForm, cancelEditBtn, confirmEditBtn, editApproxPomodorosInput, editTaskDescInput, editTaskTitleInput } from '../general/modal.js';

document.addEventListener('DOMContentLoaded', () => {
  renderTaskList();
  renderCurrentTask();
});

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

export function deleteTask(id) {
  const index = taskList.findIndex(task => task.id === id);

  taskToDeleteIndex = index;
  modalToggle.style.display = 'block';
  modalPopUp.style.display = 'block';
  modalText.innerHTML = `Are you sure you want to delete "<span>${taskList[index].title}</span>"?`;

  function confirmDelete() {
    // Add current task functionality
    if (taskToDeleteIndex !== null) {
      taskList.splice(taskToDeleteIndex, 1);
      saveToStorage();
      renderTaskList();
      modalToggle.style.display = 'none';
      modalPopUp.style.display = 'none';
      taskToDeleteIndex = null;
    }
  }

  confirmBtn.addEventListener('click', confirmDelete, { once: true});
  cancelBtn.addEventListener('click', () => {
    taskToDeleteIndex = null;
    modalToggle.style.display = 'none';
    modalPopUp.style.display = 'none';
  }, { once: true});
}

export function editTask(id) {
  const index = taskList.findIndex(task => task.id === id);
  
  modalToggle.style.display = 'block';
  editTaskForm.style.display = 'block';
  editTaskForm.addEventListener('submit', e => e.preventDefault(), { once: true});

  editTaskTitleInput.value = taskList[index].title;
  editTaskDescInput.value = taskList[index].description;
  editApproxPomodorosInput.value = taskList[index].approxPomodoros;

  function confirmEdit() {

    const newTitle = editTaskTitleInput.value;
    const newDescription = editTaskDescInput.value;
    const newApproxPomodoros = Number(editApproxPomodorosInput.value);

    if (newTitle && newDescription && newApproxPomodoros > 0 && !isNaN(newApproxPomodoros)) {

      taskList[index].title = newTitle;
      taskList[index].description = newDescription;
      taskList[index].approxPomodoros = newApproxPomodoros;
      saveToStorage();
      renderTaskList();

      editTaskForm.reset();
      modalToggle.style.display = 'none';
      editTaskForm.style.display = 'none';

    } else {
      alert('Please fill in all fields correctly.');
    }
  }

  confirmEditBtn.addEventListener('click', confirmEdit, { once: true});
  cancelEditBtn.addEventListener('click', () => {
    modalToggle.style.display = 'none';
    editTaskForm.style.display = 'none';
  }, { once: true});
}

export function markTaskAsComplete(id) {
  const index = taskList.findIndex(task => task.id === id);

  modalToggle.style.display = 'block';
  modalPopUp.style.display = 'block';
  modalText.innerHTML = `Are you sure you want to mark "<span>${taskList[index].title}</span>" as complete?`;

  confirmBtn.addEventListener('click', () => {
    // Code to mark task as complete
    modalToggle.style.display = 'none';
    modalPopUp.style.display = 'none';
  }, { once: true});

  cancelBtn.addEventListener('click', () => {
    modalToggle.style.display = 'none';
    modalPopUp.style.display = 'none';
  }, { once: true});
}

export function markTaskAsCurrent(id) {

  modalToggle.style.display = 'block';
  modalPopUp.style.display = 'block';

  const index = taskList.findIndex(task => task.id === id);
  modalText.innerHTML = `Are you sure you want to pin "<span>${taskList[index].title}</span>" as your current task?`;
  confirmBtn.addEventListener('click', confirmTaskPinnedAsCurrent, { once: true});

  cancelBtn.addEventListener('click', () => {
    modalToggle.style.display = 'none';
    modalPopUp.style.display = 'none';
  }, { once: true});

  function confirmTaskPinnedAsCurrent() {

    const index = taskList.findIndex(task => task.id === id);

    if (currentTask.id) { // If there is a current task, push it back to the task list
      taskList.push({
        id: currentTask.id,
        title: currentTask.title,
        description: currentTask.description,
        approxPomodoros: currentTask.approxPomodoros,
        actualPomodoros: currentTask.actualPomodoros,
        isCurrentTask: false,
        creationDate: currentTask.creationDate
      });

      removeCurrentTaskData();
    }

    insertCurrentTaskData(
      taskList[index].id,
      taskList[index].title,
      taskList[index].description,
      taskList[index].approxPomodoros,
      taskList[index].actualPomodoros,
      true,
      taskList[index].creationDate,
      index
    );

    taskList.splice(index, 1);

    renderTaskList();
    saveToStorage();
    renderCurrentTask();

    modalToggle.style.display = 'none';
    modalPopUp.style.display = 'none';
  }
}

export function unpinCurrentTask() {
  modalToggle.style.display = 'block';
  modalPopUp.style.display = 'block';

  modalText.innerHTML = `Are you sure you want to unpin "<span>${currentTask.title}</span>" from your current task slot?`;
  confirmBtn.addEventListener('click', confirmUnpinCurrentTask, { once: true});

  cancelBtn.addEventListener('click', () => {
    modalToggle.style.display = 'none';
    modalPopUp.style.display = 'none';
  }, { once: true});

  function confirmUnpinCurrentTask() {

    taskList.push({
      id: currentTask.id,
      title: currentTask.title,
      description: currentTask.description,
      approxPomodoros: currentTask.approxPomodoros,
      actualPomodoros: currentTask.actualPomodoros,
      isCurrentTask: false,
      creationDate: currentTask.creationDate
    });

    removeCurrentTaskData();
    saveToStorage();
    renderTaskList();
    renderCurrentTask();
  
    modalToggle.style.display = 'none';
    modalPopUp.style.display = 'none';
  }
}

export function editCurrentTask() {
  modalToggle.style.display = 'block';
  editTaskForm.style.display = 'block';
  editTaskForm.addEventListener('submit', e => e.preventDefault(), { once: true});

  editTaskTitleInput.value = currentTask.title;
  editTaskDescInput.value = currentTask.description;
  editApproxPomodorosInput.value = currentTask.approxPomodoros;

  function confirmEditCurrentTask() {
    const newTitle = editTaskTitleInput.value;
    const newDescription = editTaskDescInput.value;
    const newApproxPomodoros = Number(editApproxPomodorosInput.value);

    if (newTitle && newDescription && newApproxPomodoros > 0 && !isNaN(newApproxPomodoros)) {
      currentTask.title = newTitle;
      currentTask.description = newDescription;
      currentTask.approxPomodoros = newApproxPomodoros;
      saveToStorage();
      renderCurrentTask();

      editTaskForm.reset();
      modalToggle.style.display = 'none';
      editTaskForm.style.display = 'none';

    } else {
      alert('Please fill in all fields correctly.');
    }
  }

  confirmEditBtn.addEventListener('click', confirmEditCurrentTask, { once: true});
  cancelEditBtn.addEventListener('click', () => {
    modalToggle.style.display = 'none';
    editTaskForm.style.display = 'none';
  }, { once: true});
}

export function deleteCurrentTask() {
  modalToggle.style.display = 'block';
  modalPopUp.style.display = 'block';

  modalText.innerHTML = `Are you sure you want to delete "<span>${currentTask.title}</span>"?`;
  confirmBtn.addEventListener('click', confirmDeleteCurrentTask, { once: true});

  cancelBtn.addEventListener('click', () => {
    modalToggle.style.display = 'none';
    modalPopUp.style.display = 'none';
  });

  function confirmDeleteCurrentTask() {
    removeCurrentTaskData();
    saveToStorage();
    renderTaskList();
    renderCurrentTask();

    modalToggle.style.display = 'none';
    modalPopUp.style.display = 'none';
  }
}

export function markCurrentTaskAsComplete() {
  modalToggle.style.display = 'block';
  modalPopUp.style.display = 'block';
  modalText.innerHTML = `Are you sure you want to mark "<span>${currentTask.title}</span>" as complete?`;

  confirmBtn.addEventListener('click', () => {
    // Code to mark task as complete
    modalToggle.style.display = 'none';
    modalPopUp.style.display = 'none';
  }, { once: true});

  cancelBtn.addEventListener('click', () => {
    modalToggle.style.display = 'none';
    modalPopUp.style.display = 'none';
  }, { once: true});
}