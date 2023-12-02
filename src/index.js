import "./scss/styles.scss";
import initializeToggle, { toggleSidebar } from "./modules/hamburger.js";
import { ProjectModule, createMainPage } from "./modules/pages.js";
import { appendComponent } from "./modules/componentfunctions";
import { NoteLogicModule } from "./modules/noteLogic";
import {
  buildToDoNoteCreater,
  appendNotesToPage,
  generateEditableNote,
} from "./modules/noteUI";
import {
  addDeleteProjectEventListener,
  addNewProjectEventListener,
  addProjectEventListeners,
  toggleProjectMenu,
} from "./modules/sidebar";

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

export function createEditDeleteEventListeners() {
  const noteUICollection = document.getElementsByClassName("todo-note");

  for (let i = 0; i < noteUICollection.length; i++) {
    const selectedNote = noteUICollection[i];

    const deleteButton = selectedNote.querySelector(".delete-button");
    const editButton = selectedNote.querySelector(".edit-button");

    const noteID = selectedNote.id;

    deleteButton.addEventListener("click", function () {
      selectedNote.remove();
      NoteLogicModule.deleteNoteFromObject(NoteLogicModule.findNote(noteID));
    });

    editButton.addEventListener("click", function () {
      selectedNote.innerHTML = "";
      selectedNote.appendChild(generateEditableNote(noteID));
      createEditableNoteEventListeners(noteID);
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
    NoteLogicModule.uploadNoteInput(NoteLogicModule.getNoteInput());
    appendNotesToPage();
    createEditDeleteEventListeners();
    noteCreation.remove();
    toggleTaskButton();
    event.preventDefault();
  });
}

function createEditableNoteEventListeners(id) {
  const editableNote = document.querySelector(".editable-note");
  const editableSubmit = editableNote.querySelector("#submit");
  const editableExit = editableNote.querySelector(".exit-button");

  editableSubmit.addEventListener("click", function () {
    NoteLogicModule.editNoteObject(
      NoteLogicModule.findNote(id),
      NoteLogicModule.getNoteInput()
    );
    // Fix this to be a function you can call at any point.
    // You repeat this multiple times.
    appendNotesToPage();
    createEditDeleteEventListeners();
  });

  editableExit.addEventListener("click", function () {
    appendNotesToPage();
    createEditDeleteEventListeners();
  });
}

export function addEventListenersForSidebar() {
  const wholeSidebar = document.querySelector(".sidebar");
  const mainSidebarContainer = document.querySelector(".main-sidebar");
  const mainSidebarContainerChildren =
    mainSidebarContainer.querySelectorAll("[data-content]");

  function addPageEventListeners(page) {
    const pageType = page.getAttribute("class");
    addContentToMain(pageType);
    toggleSidebar();
  }

  mainSidebarContainerChildren.forEach(function (option) {
    option.addEventListener("click", function () {
      addPageEventListeners(option);
    });

    // document.addEventListener("click", function () {
    //   if (wholeSidebar.classList.contains("active")) {
    //     console.log("Hey")
    //     toggleSidebar();
    //   }
    // });
  });

  document.addEventListener("DOMContentLoaded", function () {
    addProjectEventListeners();
  });
}

export function addContentToMain(content) {
  const currentPage = document.querySelector(".current-page");
  currentPage && currentPage.remove();
  appendComponent("main", [createMainPage(`${content}`)]);
  createAddTaskEventListeners();
  appendNotesToPage();
  createEditDeleteEventListeners();
}

initializeToggle();
addContentToMain("inbox");
addEventListenersForSidebar();
ProjectModule.appendProjects();
toggleProjectMenu();
addDeleteProjectEventListener();
addNewProjectEventListener();

// document.addEventListener("DOMContentLoaded", function () {
//   console.log("Hey");
// });
