import "./scss/styles.scss";
import initializeToggle, { toggleSidebar } from "./modules/hamburger.js";
import { createMainPage } from "./modules/pages.js";
import { appendComponent } from "./modules/componentfunctions";
import {
  uploadNoteInput,
  getNoteInput,
  deleteNoteFromObject,
} from "./modules/noteLogic";
import { buildToDoNoteCreater, appendNotesToPage } from "./modules/noteUI";

export function createAddTaskEventListeners() {
  const taskButton = document.querySelector(".add-task");
  const noteContainerUI = document.querySelector(".note-container");
  const noteCreationContainerUI = document.querySelector(
    ".note-creation-container"
  );

  taskButton.addEventListener("click", function () {
    appendComponent(noteCreationContainerUI, [buildToDoNoteCreater()]);
    toggleTaskButton();
    createNoteCreationEventListeners();
    noteContainerUI.scrollTop = noteContainerUI.scrollHeight;
  });
}

const toggleTaskButton = () => {
  const taskButton = document.querySelector(".add-task");

  if (taskButton.style.display === "none") {
    taskButton.style.display = "flex";
  } else {
    taskButton.style.display = "none";
  }
};

export function createdDeleteNoteEventListeners() {
  const noteUICollection = document.getElementsByClassName("todo-note");

  for (let i = 0; i < noteUICollection.length; i++) {
    const selectedNote = noteUICollection[i];

    const deleteButton = selectedNote.querySelector(".delete-button");
    const noteID = selectedNote.id;

    deleteButton.addEventListener("click", function () {
      selectedNote.remove();
      deleteNoteFromObject(noteID);
    });
  }
}

function createNoteCreationEventListeners() {
  const exitButton = document.querySelector(".exit-button");
  const noteCreation = document.querySelector(".note-creation");
  const submitButton = document.querySelector("#submit");

  exitButton.addEventListener("click", function () {
    noteCreation.remove();
    toggleTaskButton();
  });

  submitButton.addEventListener("click", function (event) {
    uploadNoteInput(getNoteInput());
    appendNotesToPage();
    createdDeleteNoteEventListeners();
    noteCreation.remove();
    toggleTaskButton();
    event.preventDefault();
  });
}

function addEventListenersForSidebar() {
  const mainSidebarContainer = document.querySelector(".main-sidebar");
  const mainSidebarContainerChildren =
    mainSidebarContainer.querySelectorAll("[data-content]");

  mainSidebarContainerChildren.forEach(function (option) {
    option.addEventListener("click", function () {
      const pageType = option.getAttribute("class");
      addContentToMain(pageType);
      toggleSidebar();
    });
  });
}

function addContentToMain(content) {
  const currentPage = document.querySelector(".current-page");
  currentPage && currentPage.remove();
  appendComponent("main", [createMainPage(`${content}`)]);
  createAddTaskEventListeners();
  appendNotesToPage();
  createdDeleteNoteEventListeners();
}

initializeToggle();
addContentToMain("inbox");
addEventListenersForSidebar();
