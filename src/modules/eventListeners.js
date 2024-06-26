import { toggleSidebar, toggleHamburgerIcon } from "../modules/hamburger.js";
import { ProjectModule, MainPageModule } from "../modules/pages.js";
import { appendComponent } from "../modules/componentfunctions";
import { NoteLogicModule } from "../modules/noteLogic";
import { NoteUIModule } from "../modules/noteUI";
import { WebStorageModule } from "./webstorage.js";

const MainEventListenerModule = (() => {
  const main = document.querySelector("main");
  const sidebar = document.querySelector(".sidebar");
  const addIcon = document.querySelector(".fa-plus");

  // Allows user to toggle sidebar off when main is clicked when sidebar is active
  const addMainSidebarToggle = () => {
    main.addEventListener("click", (event) => {
      if (
        sidebar.classList.contains("active") &&
        event.target !== sidebar &&
        !event.target.classList.contains("submit-project") &&
        !event.target.classList.contains("fa-chevron-down")
      ) {
        toggleSidebar();
        toggleHamburgerIcon();
      }
    });
  };

  // Allows user to toggle project input menu off when main is clicked when the project input menu is active
  const addMainProjectInputToggle = () => {
    main.addEventListener("click", (event) => {
      if (
        !event.target.classList.contains("name-generator") &&
        !event.target.classList.contains("project-input") &&
        !event.target.classList.contains("submit-project") &&
        event.target !== addIcon
      ) {
        ProjectModule.removeNewProjectInputToPage();
      }
    });
  };

  return {
    addMainSidebarToggle,
    addMainProjectInputToggle,
  };
})();

const SidebarEventListenerModule = (() => {
  // Clicking the hamburger menu icon toggles the menu on and off
  const addSidebarToggleEventListener = () => {
    const hamburgerMenuBtn = document.querySelector(".hamburger-menu-btn");

    hamburgerMenuBtn.addEventListener("click", () => {
      toggleSidebar();
      toggleHamburgerIcon();
      // Removes the new project input if it is on screen.
      ProjectModule.removeNewProjectInputToPage();
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
        WebStorageModule.updateProjectsLocalStorage();
        NoteLogicModule.deleteNoteByType(elem.textContent);
        WebStorageModule.updateNotesLocalStorage();
        NoteUIModule.uploadNoteAmount();
        const currentPage = document.querySelector(".current-page");
        currentPage.classList = "";
        currentPage.classList.add("inbox-page");
        currentPage.classList.add("current-page");
        MainPageModule.addContentToMain("Inbox");
        createAddTaskEventListeners();
        NoteEventListenerModule.addEditDeleteNoteEventListeners();
        toggleSidebar();
        toggleHamburgerIcon();
      });
    }
  };

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
        MainPageModule.addContentToMain(pageType);
        createAddTaskEventListeners();
        NoteEventListenerModule.addEditDeleteNoteEventListeners();
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
          MainPageModule.addContentToMain(pageType);
          createAddTaskEventListeners();
          NoteEventListenerModule.addEditDeleteNoteEventListeners();
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

    addIcon.addEventListener("click", () => {
      toggleSidebar();
      toggleHamburgerIcon();
      ProjectModule.addNewProjectInputToPage();
      createNewProjectEventListener();
    });
  };

  /* 
  When a new project is created, it is added to the project object in ProjectModule,
  the UI is updated with the new project, removes the project generator, toggles the menu,
  and redos any necessary event listeners.
  */
  const createNewProjectEventListener = () => {
    const submit = document.querySelector(".submit-project");
    const generatorText = document.querySelector("#generater-text");
    const projectInput = document.querySelector(".project-input");

    submit.addEventListener("click", (event) => {
      if (projectInput.value === "") {
        return;
      }

      if (ProjectModule.getProjectArr().includes(projectInput.value)) {
        generatorText.textContent = "Project already created";
        event.preventDefault();
        return;
      }

      if (/\b(inbox|today|week)\b/i.test(projectInput.value)) {
        generatorText.textContent = "Please choose a different name";
        event.preventDefault();
        return;
      }

      ProjectModule.addNewProjectToArr(projectInput.value);
      WebStorageModule.updateProjectsLocalStorage();
      ProjectModule.appendProjectsToSidebar();
      addDeleteProjectEventListeners();
      generateProjectPageEventListeners();
      toggleSidebar();
      toggleHamburgerIcon();
      ProjectModule.removeNewProjectInputToPage();
      event.preventDefault();
    });
  };

  return {
    addDeleteProjectEventListeners,
    toggleProjectMenu,
    generateMainPageEventListeners,
    generateProjectPageEventListeners,
    addSidebarToggleEventListener,
    generateNewProjectInputEventListener,
    createNewProjectEventListener,
  };
})();

const NoteEventListenerModule = (() => {
  // Adds the event listeners to notes that are on the page
  const addEditDeleteNoteEventListeners = () => {
    const noteUICollection = document.getElementsByClassName("todo-note");

    for (let i = 0; i < noteUICollection.length; i++) {
      const selectedNote = noteUICollection[i];

      const deleteButton = selectedNote.querySelector(".delete-button");
      const editButton = selectedNote.querySelector(".edit-button");
      const checkBox = selectedNote.querySelector(".checkbox");
      const noteID = selectedNote.id;

      // Allows user to delete note
      deleteButton.addEventListener("click", () => {
        selectedNote.remove();
        NoteLogicModule.deleteNoteFromObject(
          NoteLogicModule.findNoteInObject(noteID)
        );

        WebStorageModule.updateNotesLocalStorage();
        NoteUIModule.uploadNoteAmount();
      });

      checkBox.addEventListener("click", () => {
        selectedNote.remove();
        NoteLogicModule.deleteNoteFromObject(
          NoteLogicModule.findNoteInObject(noteID)
        );
      });

      // Allows user to generate the edit note UI and add the necessary event listeners
      editButton.addEventListener("click", () => {
        selectedNote.innerHTML = "";
        selectedNote.appendChild(NoteUIModule.generateEditableNote(noteID));
        createEditableNoteEventListeners(noteID);
      });
    }
  };

  // Generates event listeners for the note creation UI
  const createNoteCreationEventListeners = () => {
    const exitButton = document.querySelector(".exit-button");
    const noteCreationElement = document.querySelector(".note-creation");
    const submitButton = document.querySelector("#submit");

    // Allows user to exit out of note creation UI
    exitButton.addEventListener("click", () => {
      noteCreationElement.remove();
      MainPageModule.toggleTaskButton();
    });

    // Creates a new note and appends it to page
    submitButton.addEventListener("click", (event) => {
      NoteLogicModule.uploadNoteInput(NoteUIModule.getNoteInput());
      WebStorageModule.updateNotesLocalStorage();
      NoteUIModule.appendNotesToPage();
      addEditDeleteNoteEventListeners();
      noteCreationElement.remove();
      MainPageModule.toggleTaskButton();
      NoteUIModule.uploadNoteAmount();
      event.preventDefault();
    });
  };

  // Adds event listener to the editing note UI
  const createEditableNoteEventListeners = (id) => {
    const editableNote = document.querySelector(".editable-note");
    const editableSubmit = editableNote.querySelector("#submit");
    const editableExit = editableNote.querySelector(".exit-button");

    // Rewrites the note both in UI and logic
    editableSubmit.addEventListener("click", () => {
      NoteLogicModule.editNoteInObject(
        NoteLogicModule.findNoteInObject(id),
        NoteUIModule.getNoteInput()
      );
      WebStorageModule.updateNotesLocalStorage();
      NoteUIModule.appendNotesToPage();
      addEditDeleteNoteEventListeners();
    });

    // Removes the editable note UI and resets the page
    editableExit.addEventListener("click", () => {
      NoteUIModule.appendNotesToPage();
      addEditDeleteNoteEventListeners();
    });
  };

  return {
    addEditDeleteNoteEventListeners,
    createEditableNoteEventListeners,
    createNoteCreationEventListeners,
  };
})();

// Allow task button to bring up note creation UI
const createAddTaskEventListeners = () => {
  const taskButton = document.querySelector(".add-task");
  const noteContainerUI = document.querySelector(".note-container");
  const noteCreationContainerUI = document.querySelector(
    ".note-creation-container"
  );

  taskButton.addEventListener("click", () => {
    appendComponent(noteCreationContainerUI, [
      NoteUIModule.buildToDoNoteCreater(),
    ]);
    MainPageModule.toggleTaskButton();
    NoteEventListenerModule.createNoteCreationEventListeners();
    noteContainerUI.scrollTop = noteContainerUI.scrollHeight;
  });
};

// Loads event listeners that are needed at the time the page is first loaded
export const initializeEventListeners = () => {
  createAddTaskEventListeners();
  NoteEventListenerModule.addEditDeleteNoteEventListeners();

  SidebarEventListenerModule.generateMainPageEventListeners();
  SidebarEventListenerModule.addSidebarToggleEventListener();
  MainEventListenerModule.addMainSidebarToggle();
  MainEventListenerModule.addMainProjectInputToggle();
  SidebarEventListenerModule.addDeleteProjectEventListeners();
  SidebarEventListenerModule.toggleProjectMenu();
  SidebarEventListenerModule.generateNewProjectInputEventListener();

  document.addEventListener("DOMContentLoaded", () => {
    SidebarEventListenerModule.generateProjectPageEventListeners();
    NoteUIModule.uploadNoteAmount();
  });
};
