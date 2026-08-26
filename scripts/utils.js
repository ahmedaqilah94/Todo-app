import {
  activeFilterButton,
  appElement,
  completeFilterButton,
  getTasksElement,
  inputElement,
  leftCountLabel,
  NewTaskCheckboxElement,
  taskListElement,
} from "./elements";
import { initTasklistener } from "./eventListeners";
import deleteIcon from "../images/icon-cross.svg";

export const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveToDataB = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const toggleTheme = () => {
  appElement.classList.toggle("light-theme");
  saveToDataB("lightTheme", appElement.classList.contains("light-theme"));
};

export const initDataOnStartup = () => {
  const isLight = fetchData("lightTheme");
  if (isLight === null) {
    return;
  } else if (isLight === true) {
    toggleTheme();
  }
  renderTaskList(fetchData("tasks"));
};
export const getLastTaskId = () => {
  let countId = 0;
  const tasks = fetchData("tasks");
  tasks.forEach(() => {
    countId++;
  });
  return countId;
};
export let taskId = getLastTaskId();
export const addTask = () => {
  taskId++;
  const inputValue = inputElement.value;
  const task = {
    value: inputValue,
    isCompleted: false,
    id: taskId,
  };

  if (!inputValue) return;
  task.isCompleted = NewTaskCheckboxElement.classList.contains("checked");
  const tasks = fetchData("tasks") || [];
  tasks.unshift(task);
  saveToDataB("tasks", tasks);
  renderTaskList(tasks);
};

export const renderTaskList = (tasks) => {
  let taskList = "";
  tasks?.forEach((task) => {
    taskList += `<li draggable="true" class="task" id="${task.id}">
              <button type="button" data-num="${task.id}" class="task__checkbox checkbox ${task.isCompleted ? "checked" : ""}" ></button>
              <span class="task__text ${task.isCompleted ? "task__text--completed" : ""}">${task.value}</span>
              <img src=${deleteIcon} class="task__delete" data-num="${task.id}" alt="delete icon"/>
            </li>`;
  });
  taskListElement.innerHTML = taskList;
  NewTaskCheckboxElement.classList?.remove("checked");
  inputElement.value = "";
  initTasklistener();
  getItemsLeftCount();
};

export const deleteTask = (icon) => {
  const answer = confirm("هل أنت متأكد من حذف القيمة");
  if (answer === false) return;
  let tasks = fetchData("tasks");
  const id = icon.dataset.num;
  tasks = tasks.filter((task) => task.id !== id);
  saveToDataB("tasks", tasks);
  renderTaskList(tasks);

  if (activeFilterButton.classList.contains("filter-links__link--isActive")) {
    activeFilterButton.click();
  }
  if (completeFilterButton.classList.contains("filter-links__link--isActive")) {
    completeFilterButton.click();
  }
};

export const toggleTask = (box) => {
  box.classList.toggle("checked");
  box.nextElementSibling.classList.toggle("task__text--completed");
  const tasks = fetchData("tasks");
  const id = box.dataset.num;
  const curentTask = tasks.find((task) => task.id == id);
  curentTask.isCompleted = !curentTask.isCompleted;
  saveToDataB("tasks", tasks);
  renderTaskList(tasks);
};

export const filterAllTasks = () => {
  const tasks = fetchData("tasks") || [];
  renderTaskList(tasks);
};

export const filterActiveTasks = () => {
  const tasks = fetchData("tasks") || [];
  const activeTasks = tasks.filter((task) => !task.isCompleted);
  renderTaskList(activeTasks);
};

export const filterCompletedTasks = () => {
  const tasks = fetchData("tasks") || [];
  const completedTasks = tasks.filter((task) => task.isCompleted);
  renderTaskList(completedTasks);
};

export const deleteCompletedTasks = () => {
  const tasks = fetchData("tasks") || [];
  const activeTasks = tasks.filter((task) => !task.isCompleted);
  renderTaskList(activeTasks);
  saveToDataB("tasks", activeTasks);
};

export const getItemsLeftCount = () => {
  const tasks = fetchData("tasks") || [];
  let count = 0;
  tasks.forEach((task) => {
    if (!task.isCompleted) count++;
  });
  leftCountLabel.textContent = count;
};

export const saveTasksMovementToDataB = () => {
  let tasks = [];
  getTasksElement().forEach((element) => {
    const taskValue = element.textContent.trim();
    const taskId = element.id;
    const taskIsCompleted =
      element.firstElementChild.classList.contains("checked");
    const task = {
      value: taskValue,
      isCompleted: taskIsCompleted,
      id: taskId,
    };
    tasks.push(task);
  });
  saveToDataB("tasks", tasks);
};
