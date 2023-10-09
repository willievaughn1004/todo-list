import { buildToDoNote, buildToDoNoteCreater } from "./notecreation";

// TODO: Make this function about to work with seperate pages. Right now, it only works with the today page.
export function createAddTaskEventListeners() {
  const mainPage = document.querySelector(".today-page");
  const taskButton = document.querySelector(".add-task");

  taskButton.addEventListener("click", function () {
    mainPage.insertBefore(buildToDoNoteCreater(), taskButton);
    taskButton.style.display = "none";
    createNoteCreationEventListeners();
  });
}

function createNoteCreationEventListeners() {
  const mainPage = document.querySelector(".today-page");
  const exitButton = document.querySelector(".exit-button");
  const taskButton = document.querySelector(".add-task");
  const noteCreation = document.querySelector(".note-creation");
  const submitButton = document.querySelector("#submit");

  exitButton.addEventListener("click", function () {
    noteCreation.remove();
    taskButton.style.display = "";
  });

  submitButton.addEventListener("click", function(event) {
    mainPage.insertBefore(buildToDoNote(), taskButton);
    noteCreation.remove();
    taskButton.style.display = "";
    event.preventDefault();
  });
}
