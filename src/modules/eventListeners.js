import { toggleSidebar, toggleHamburgerIcon } from "../modules/hamburger.js";
import { ProjectModule, createMainPage } from "../modules/pages.js";
import { appendComponent, buildComponent } from "../modules/componentfunctions";
import { NoteLogicModule } from "../modules/noteLogic";
import {
  buildToDoNoteCreater,
  appendNotesToPage,
  generateEditableNote,
} from "../modules/noteUI";
import { addContentToMain } from "../index.js";

export const sidebarEventListeners = () => {
  // Clicking the hamburger menu icon toggles the menu on and off
  const addSidebarToggleEventListener = () => {
    const hamburgerMenuBtn = document.querySelector(".hamburger-menu-btn");
    hamburgerMenuBtn.addEventListener("click", () => {
      toggleSidebar();
      toggleHamburgerIcon();
    });
  };

  // Deletes a project from the project menu
  const addDeleteProjectEventListeners = () => {
    const projects = ProjectModule.getProjectTabCollection();

    for (let i = 0; i < projects.length; i++) {
      const elem = projects[i];

      const deletedProject = elem.querySelector(".delete-button");

      deletedProject.addEventListener("click", () => {
        elem.remove();
        ProjectModule.deleteProjectFromArr(elem.textContent);
      });
    }
  };

  // MAYBE: Add project event listeners to a different module
  // Toggles the project menu
  const toggleProjectMenu = () => {
    const projectToggleIcon = document.querySelector(".fa-chevron-down");
    const projectCollection = document.querySelector(".projects-collection");

    projectToggleIcon.addEventListener("click", () => {
      if (projectToggleIcon.style.transform === "rotate(270deg)") {
        projectToggleIcon.style.transform = "rotate(0deg)";
        projectCollection.style.display = "";
      } else {
        projectToggleIcon.style.transform = "rotate(270deg)";
        projectCollection.style.display = "none";
      }
    });
  };

  // Creates a page based on the selected main option
  const generateMainPageEventListeners = () => {
    const mainSidebarContainer = document.querySelector(".main-sidebar");
    const mainSidebarContainerChildren =
      mainSidebarContainer.querySelectorAll("[data-content]");

    mainSidebarContainerChildren.forEach((option) => {
      option.addEventListener("click", () => {
        const pageType = option.getAttribute("class");
        addContentToMain(pageType);
        toggleSidebar();
        toggleHamburgerIcon();
      });
    });
  };

  // Creates a page based on the selected project
  const generateProjectPageEventListeners = () => {
    const projectContainerChildren = ProjectModule.getProjectTabCollection();

    projectContainerChildren.forEach((project) => {
      project.addEventListener("click", (event) => {
        if (!event.target.classList.contains("fa-trash")) {
          const pageType = project.getAttribute("class");
          addContentToMain(pageType);
          toggleSidebar();
          toggleHamburgerIcon();
        }
      });
    });
  };

  // When the + button is clicked, it generates a new pop up to create
  // a new project for the sidebar
  const generateNewProjectInputEventListener = () => {
    const addIcon = document.querySelector(".fa-plus");
    const main = document.querySelector("main");

    addIcon.addEventListener("click", () => {
      toggleSidebar();
      toggleHamburgerIcon();
      main.append(ProjectModule.projectNameInput());
      createNewProjectEventListener();
    });
  };

  /* When a new project is created, it is added to the project object in ProjectModule,
  the UI is updated with the new project, removes the project generator, toggles the menu,
  and redos any necessary event listeners.
  */
  const createNewProjectEventListener = () => {

    const submit = document.querySelector(".submit-project");
    const projectInput = document.querySelector(".project-input");
    const projectGenerator = document.querySelector(".name-generator");

    submit.addEventListener("click", (event) => {
      ProjectModule.addNewProject(projectInput.value);
      ProjectModule.appendProjects();
      projectGenerator.remove();
      addDeleteProjectEventListeners();
      generateProjectPageEventListeners();
      toggleSidebar();
      toggleHamburgerIcon();
      event.preventDefault();
    });

  }

  return {
    addDeleteProjectEventListeners,
    toggleProjectMenu,
    generateMainPageEventListeners,
    generateProjectPageEventListeners,
    addSidebarToggleEventListener,
    generateNewProjectInputEventListener,
    createNewProjectEventListener,
  };
};

// export const NoteEventListenerModule = () => {

//   function createAddTaskEventListeners() {
//     const taskButton = document.querySelector(".add-task");
//     const noteContainerUI = document.querySelector(".note-container");
//     const noteCreationContainerUI = document.querySelector(
//       ".note-creation-container"
//     );
  
//     taskButton.addEventListener("click", function () {
//       appendComponent(noteCreationContainerUI, [buildToDoNoteCreater()]);
//       toggleTaskButton();
//       createNoteCreationEventListeners();
//       noteContainerUI.scrollTop = noteContainerUI.scrollHeight;
//     });
//   };

//   return {
//     createAddTaskEventListeners, 
//   }

// };

// export const NoteEventListenerModule

export const initializeEventListeners = () => {
  const eventListenerModule = sidebarEventListeners();

  eventListenerModule.generateMainPageEventListeners();
  eventListenerModule.addSidebarToggleEventListener();
  eventListenerModule.addDeleteProjectEventListeners();
  eventListenerModule.toggleProjectMenu();
  eventListenerModule.generateNewProjectInputEventListener();

  document.addEventListener("DOMContentLoaded", () => {
    eventListenerModule.generateProjectPageEventListeners();
  });
};
