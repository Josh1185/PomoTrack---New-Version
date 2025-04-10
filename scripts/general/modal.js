export const modalToggle = document.querySelector('.modal-wrapper');
export const confirmBtn = document.querySelector('.confirm-btn');
export const cancelBtn = document.querySelector('.cancel-btn');
export const modalText = document.querySelector('.modal-header');
export const modalPopUp = document.querySelector('.modal');
export const editTaskForm = document.querySelector('.edit-task-form');
export const confirmEditBtn = document.querySelector('.confirm-edit-btn');
export const cancelEditBtn = document.querySelector('.cancel-edit-btn');
export const editTaskTitleInput = document.querySelector('.edit-task-title-input');
export const editTaskDescInput = document.querySelector('.edit-task-desc-input');
export const editApproxPomodorosInput = document.querySelector('.edit-task-approx-pomodoros-input');

export function cancelBtnHandler() {
  modalToggle.style.display = 'none';
  modalPopUp.style.display = 'none';
  editTaskForm.style.display = 'none';
  cancelBtn.removeEventListener('click', cancelBtnHandler);
}