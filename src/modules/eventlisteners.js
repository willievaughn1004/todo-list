import { buildToDoNoteCreater } from "./notecreation";
export function createEventListeners () {

    let mainPage = document.querySelector(".today-page");
    let taskButton = document.querySelector(".add-task")
  
    taskButton.addEventListener("click", function () {
      taskButton.style.display = "none";
      mainPage.insertBefore(buildToDoNoteCreater(), taskButton);
      taskButton.style.display = "";
    });
  
  }