import {
  clearCompletedButton,
  getCheckboxElements,
  getDeleteIcons,
  inputElement,
  NewTaskCheckboxElement,
  taskListElement,
  toggleThemeElement,
} from "./elements";
import {
  addTask,
  deleteCompletedTasks,
  deleteTask,
  filterActiveTasks,
  filterAllTasks,
  filterCompletedTasks,
  saveTasksMovementToDataB,
  toggleTask,
  toggleTheme,
} from "./utils";

export const initTasklistener = () => {
  getDeleteIcons().forEach((icon) => {
    icon.addEventListener("click", () => deleteTask(icon));
  });

  getCheckboxElements().forEach((box) => {
    box.addEventListener("click", () => toggleTask(box));
  });

  document.querySelectorAll(".filter-links__link").forEach((element) => {
    element.addEventListener("click", () => {
      document
        .querySelector(".filter-links__link--isActive")
        .classList.remove("filter-links__link--isActive");
      element.classList.add("filter-links__link--isActive");

      if (element.classList.contains("all-tasks")) filterAllTasks();
      if (element.classList.contains("active-tasks")) filterActiveTasks();
      if (element.classList.contains("completed-tasks")) filterCompletedTasks();
    });
  });
};

export const initListener = () => {
  clearCompletedButton.addEventListener("click", deleteCompletedTasks);

  NewTaskCheckboxElement.addEventListener("click", () => {
    NewTaskCheckboxElement.classList.toggle("checked");
  });

  inputElement.addEventListener(
    "keydown",
    (event) => event.key === "Enter" && addTask(),
  );

  toggleThemeElement.addEventListener("click", toggleTheme);

  let draggedTask = null;
  taskListElement.addEventListener("dragstart", (e) => {
    draggedTask = e.target.closest(".task");
  });

  taskListElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    const targetTask = e.target.closest(".task");
    if (!targetTask) return;
    const rect = targetTask.getBoundingClientRect();
    const middle = rect.top + rect.height / 2;
    if (e.clientY < middle) {
      taskListElement.insertBefore(draggedTask, targetTask);
      draggedTask.classList.add("dragging");
    } else {
      taskListElement.insertBefore(draggedTask, targetTask.nextSibling);
      draggedTask.classList.add("dragging");
    }
    saveTasksMovementToDataB();
  });
  taskListElement.addEventListener("drop", () => {
    draggedTask.classList.remove("dragging");
  });
};
