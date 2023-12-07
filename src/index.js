import "./scss/styles.scss";
import { ProjectModule, createMainPage } from "./modules/pages.js";
import { appendComponent } from "./modules/componentfunctions";
import { NoteLogicModule } from "./modules/noteLogic";
import { initializeEventListeners } from "./modules/eventListeners.js";
import {
  buildToDoNoteCreater,
  appendNotesToPage,
  generateEditableNote,
} from "./modules/noteUI";

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
};

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
};

export function addContentToMain(content) {
  const currentPage = document.querySelector(".current-page");
  currentPage && currentPage.remove();
  appendComponent("main", [createMainPage(`${content}`)]);
  createAddTaskEventListeners();
  appendNotesToPage();
  createEditDeleteEventListeners();
}

addContentToMain("inbox");
ProjectModule.appendProjects();
initializeEventListeners();

// TODO: Fix code to allow differation with code that is from projects. 
// When you try to commit a message, it doesn't bring up seperate page. Figure out
// how to fix that