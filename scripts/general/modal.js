export const modalToggle = document.querySelector('.modal-wrapper');
export const confirmBtn = document.querySelector('.confirm-btn');
export const cancelBtn = document.querySelector('.cancel-btn');
export const modalText = document.querySelector('.modal-header');

export function cancelBtnHandler() {
  modalToggle.style.display = 'none';
  cancelBtn.removeEventListener('click', cancelBtnHandler);
}