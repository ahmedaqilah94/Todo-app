export const appElement = document.querySelector(".app");
export const toggleThemeElement = document.querySelector(
  ".container__theme-toggle",
);
export const inputElement = document.querySelector("#task-input");
export const taskListElement = document.querySelector(".tasks");
export const NewTaskCheckboxElement = document.querySelector(
  ".input-bar__checkbox",
);
export const itemsLeftCount = document.querySelector(
  ".status-bar__items-left-count",
);
export const activeFilterButton = document.querySelector(".active-tasks");
export const completeFilterButton = document.querySelector(".completed-tasks");
export const allFilterButton = document.querySelector(".all-tasks");
export const clearCompletedButton = document.querySelector(
  ".status-bar__clear-completed",
);
export const leftCountLabel = document.querySelector(
  ".status-bar__items-left-count",
);
export const getDeleteIcons = () => {
  return document.querySelectorAll(".task__delete");
};
export const getCheckboxElements = () => {
  return document.querySelectorAll(".task__checkbox");
};
export const getTasksElement = () => {
  return document.querySelectorAll(".task");
};
