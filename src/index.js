import "./scss/styles.scss";
import initializeToggle from "./modules/hamburger.js";
import { createMainPage } from "./modules/mainpage.js";
import { createAddTaskEventListeners } from "./modules/eventlisteners.js";
import { appendComponent } from "./modules/componentfunctions";
import { appendNotesToPage } from "./modules/notes";

initializeToggle();

function addContentToMain(content) {
  const currentPage = document.querySelector(".current-page");
  currentPage && currentPage.remove();
  appendComponent("main", [createMainPage(`${content}`)]);
  appendNotesToPage();
}

function addEventListenersForSidebar() {
    const mainSidebarContainer = document.querySelector(".main-sidebar");
    const mainSidebarContainerChildren =
      mainSidebarContainer.querySelectorAll("[data-content]");

    mainSidebarContainerChildren.forEach(function (option) {
      option.addEventListener("click", function () {
        const pageType = option.getAttribute("class");
        addContentToMain(pageType);
      });
    });
  };

addContentToMain("indox");
createAddTaskEventListeners();
addEventListenersForSidebar();
