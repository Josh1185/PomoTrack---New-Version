import { taskList, currentTask, completedTasks } from './task-storage.js';
import { currentTaskContainer, taskListContainer } from './task-elements.js';
import { editTask, deleteTask, markTaskAsComplete, markTaskAsCurrent, addTask, clearTaskList } from './task-actions.js';

document.addEventListener('DOMContentLoaded', () => {
  renderTaskList();
});

export function renderTaskList() {
  currentTaskContainer.innerHTML = currentTask.title // If current task object has a title, there is a current task
  ? 
  `
  <h2>Current Task</h2>
  <div class="task">
    <div class="pomodoro-progress-circle" style="background: conic-gradient(
      var(--accent-color) ${(currentTask.actualPomodoros / currentTask.approxPomodoros) * 360}deg,
      var(--color-2) 0deg
    );">
      <span class="pomodoro-progress">${currentTask.actualPomodoros}/${currentTask.approxPomodoros}</span>
    </div>

    <div class="task-information">
      <h3 class="task-title">${currentTask.title}</h3>
      <p class="task-description">${currentTask.description}</p>
      <div class="task-controls">
        <button class="edit-task-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" ><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg>
        </button>
        <button class="delete-task-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>
        </button>
        <button class="mark-task-as-complete-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="m429-336 238-237-51-51-187 186-85-84-51 51 136 135ZM216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h528q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm0-72h528v-528H216v528Zm0-528v528-528Z"/></svg>
        </button>
      </div>
    </div>
  </div>
  ` 
  : 
  `
  <h2>Current Task</h2>
  <p>No current task</p>
  `;

  let taskListHTML = "";
  taskList.forEach(task => {
    taskListHTML += `
      <div class="task">
        <div class="pomodoro-progress-circle" style="background: conic-gradient(
          var(--accent-color) ${(task.actualPomodoros / task.approxPomodoros) * 360}deg,
          var(--color-2) 0deg
        );">
          <span class="pomodoro-progress">${task.actualPomodoros}/${task.approxPomodoros}</span>
        </div>

        <div class="task-information">
          <h3 class="task-title">${task.title}</h3>
          <p class="task-description">${task.description}</p>
          <div class="task-controls">
            <button class="edit-task-btn">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" ><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg>
            </button>
            <button class="delete-task-btn">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>
            </button>
            <button class="mark-task-as-complete-btn">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="m429-336 238-237-51-51-187 186-85-84-51 51 136 135ZM216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h528q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm0-72h528v-528H216v528Zm0-528v528-528Z"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  taskListContainer.innerHTML = taskListHTML;

  document.querySelectorAll('.task').forEach(task => {
    task.addEventListener('click', event => {
      // Check if the clicked element is a button
      if (event.target.closest("button")) return;

      markTaskAsCurrent();
    });
  });

  document.querySelectorAll(".edit-task-btn").forEach(editTaskBtn => {
    editTaskBtn.addEventListener('click', editTask);
  });

  document.querySelectorAll(".delete-task-btn").forEach(deleteTaskBtn => {
    deleteTaskBtn.addEventListener('click', deleteTask);
  });

  document.querySelectorAll(".mark-task-as-complete-btn").forEach(markCompleteBtn => {
    markCompleteBtn.addEventListener('click', markTaskAsComplete);
  });
}