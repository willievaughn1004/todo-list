import { appendComponent } from "./componentfunctions";
import {
  buildToDoNoteCreater,
  appendNotesToPage,
  uploadNoteInput,
  getNoteInput,
} from "./notes";

// TODO: Seperate UI and logic related tasks and assign them to their own module.
// You can use button clicks that create UI in one module, and button clicks that change
// logic in
export function createAddTaskEventListeners() {
  const taskButton = document.querySelector(".add-task");
  const noteContainerUI = document.querySelector(".note-container");
  const noteCreationContainerUI = document.querySelector(
    ".note-creation-container"
  );

  taskButton.addEventListener("click", function () {
    appendComponent(noteCreationContainerUI, [buildToDoNoteCreater()])
    toggleTaskButton();
    createNoteCreationEventListeners();
    noteContainerUI.scrollTop = noteContainerUI.scrollHeight;
  });
}

const toggleTaskButton = () => {
  const taskButton = document.querySelector(".add-task");

  if (taskButton.style.display === 'none') {
    taskButton.style.display = "flex";
  } else {
    taskButton.style.display = 'none'
  };

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
    noteCreation.remove();
    toggleTaskButton();
    event.preventDefault();
  });
}
