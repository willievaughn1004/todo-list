import initializeToggle, { toggleSidebar } from "../modules/hamburger.js";
import { ProjectModule, createMainPage } from "../modules/pages.js";
import { appendComponent, buildComponent } from "../modules/componentfunctions";
import { NoteLogicModule } from "../modules/noteLogic";
import {
  buildToDoNoteCreater,
  appendNotesToPage,
  generateEditableNote,
} from "../modules/noteUI";
import {
  addNewProjectEventListener,
  addProjectEventListeners,
  toggleProjectMenu,
} from "../modules/sidebar";

export const sidebarEventListeners = () => {
  const addDeleteProjectEventListener = () => {
    const projects = ProjectModule.getProjectTabCollection();

    for (let i = 0; i < projects.length; i++) {
      const elem = projects[i];

      const deletedProject = elem.querySelector(".delete-button");

      deletedProject.addEventListener("click", function () {
        elem.remove();
        ProjectModule.deleteProjectFromArr(elem.textContent);
      });
    }
  };

  return {
    addDeleteProjectEventListener,
  };
};

export const initializeEventListeners = () => {
  sidebarEventListeners().addDeleteProjectEventListener();
};
