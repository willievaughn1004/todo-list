import "./scss/styles.scss";
import initializeToggle from "./modules/hamburger.js";
import { createMainPage} from "./modules/mainpage.js";
import { createAddTaskEventListeners } from "./modules/eventlisteners.js";
import { appendComponent } from "./modules/componentfunctions";
import { appendNotesToPage } from "./modules/notes";

initializeToggle();

function addContentToMain(content) {
  appendComponent("main", [createMainPage(`${content}`)]);
};

function addEventListenersForSidebar() {
  const today = document.querySelector(".today");
  const week = document.querySelector(".week");
  const inbox = document.querySelector(".inbox");

  inbox.addEventListener("click", function() {
    const currentPage = document.querySelector(".current-page");
    currentPage.remove();
    addContentToMain("indox");
    appendNotesToPage();
  });

  today.addEventListener("click", function() {
    const currentPage = document.querySelector(".current-page");
    currentPage.remove();
    addContentToMain("today");
    appendNotesToPage();
  })

  week.addEventListener("click", function() {
    const currentPage = document.querySelector(".current-page");
    currentPage.remove();
    addContentToMain("week");
    appendNotesToPage();
  })
}

addContentToMain("indox");
appendNotesToPage();
createAddTaskEventListeners();
addEventListenersForSidebar();
