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

  function toggleProjectMenu() {
    const projectToggleIcon = document.querySelector(".fa-chevron-down");
    const projectCollection = document.querySelector(".projects-collection");
  
    projectToggleIcon.addEventListener("click", function () {
      if (projectToggleIcon.style.transform === "rotate(270deg)") {
        projectToggleIcon.style.transform = "rotate(0deg)";
        projectCollection.style.display = "";
      } else {
        projectToggleIcon.style.transform = "rotate(270deg)";
        projectCollection.style.display = "none";
      }
    });
  };
  
  function addProjectPageEventListeners() {
    const projectContainerChildren = ProjectModule.getProjectTabCollection();
  
    projectContainerChildren.forEach(function (project) {
      project.addEventListener("click", function (event) {
        if (!event.target.classList.contains("fa-trash")) {
          const pageType = project.getAttribute("class");
          addContentToMain(pageType);
          toggleSidebar();
        }
      });
    });
  };
  
  function addNewProjectEventListener() {
    const projectPlus = document.querySelector(".fa-plus");
    const main = document.querySelector("main");
  
    projectPlus.addEventListener("click", function () {
      toggleSidebar();
      main.append(ProjectModule.projectNameInput());
      submitNewProjectEventListener();
    });
  };
  
  function submitNewProjectEventListener() {
    const submit = document.querySelector(".submit-project");
    const projectInput = document.querySelector(".project-input");
    const projectGenerator = document.querySelector(".name-generator");
  
    submit.addEventListener("click", function (event) {
      ProjectModule.addNewProject(projectInput.value);
      ProjectModule.appendProjects();
      projectGenerator.remove();
      event.preventDefault();
      addDeleteProjectEventListener();
      addProjectEventListeners();
      toggleSidebar();
    });
  };
  

  return {
    addDeleteProjectEventListener,
    addProjectPageEventListeners,
  };
};

export const initializeEventListeners = () => {
  sidebarEventListeners().addDeleteProjectEventListener();
};
