import { appendComponent, buildComponent } from "./componentfunctions";
import { NoteUIModule } from "./noteUI";

export const MainPageModule = (() => {
  // Creates UI element that will be the main page shown. This changes depending on which
  // sidebar option is selected.
  const createMainPage = (page) => {
    const mainPage = buildComponent("div", "", {
      class: `${page}-page current-page`,
      id: `${page}`,
    });

    const mainElement = buildComponent("h1", `${page.split("-").join(" ")}`, {
      class: "note-header",
    });

    const noteContainer = buildComponent("div", "", {
      class: "note-container",
    });

    const noteCreationContainer = buildComponent("div", "", {
      class: "note-creation-container",
    });

    appendComponent(noteCreationContainer, [
      NoteUIModule.createAddTaskButton(),
    ]);

    appendComponent(mainPage, [
      mainElement,
      noteContainer,
      noteCreationContainer,
    ]);

    return mainPage;
  };

  // Adds the necessary content to the main page and appends it to the main element in HTML.
  const addContentToMain = (content) => {
    const current = document.querySelector(".current-page");
    current && current.remove();
    appendComponent("main", [createMainPage(`${content}`)]);
    NoteUIModule.appendNotesToPage();
  };

  // Makes the "Add Task" button appear and reappear.
  const toggleTaskButton = () => {
    const taskButton = document.querySelector(".add-task");

    if (taskButton.style.display === "none") {
      taskButton.style.display = "flex";
    } else {
      taskButton.style.display = "none";
    }
  };

  const toggleDarkBackground = () => {
    const darkBackground = document.querySelector(".darkened-screen");
    darkBackground.classList.toggle("active-background");

    if (darkBackground.classList.contains("active-background")) {
      darkBackground.style["z-index"] = 1;
    } else {
      darkBackground.style["z-index"] = -1;
    }
  };

  return {
    createMainPage,
    addContentToMain,
    toggleTaskButton,
    toggleDarkBackground,
  };
})();

// Look over names of functions also refacter code
export const ProjectModule = (() => {
  let projectCollection = ["Exercise", "School", "Coding"];

  const getProjectArr = () => {
    return projectCollection;
  }

  // Gets the element that holds the projects
  const getProjectTab = () => {
    const projectTab = document.querySelector(".projects-collection");

    return projectTab;
  };

  // Gets the element that holds the collection of projects
  const getProjectTabCollection = () => {
    const projectTabCollection = getProjectTab().childNodes;

    return projectTabCollection;
  };

  // Deletes project from projectCollection
  const deleteProjectFromArr = (project) => {
    projectCollection = projectCollection.filter((word) => word !== project);
  };

  // Creates UI that allows new project creation
  const createProjectNameInput = () => {
    const projectNameGenerator = buildComponent("form", "", {
      class: "name-generator",
    });

    const generatorText = buildComponent("label", "Name your new project...", {
      for: "project-name",
      id: "generater-text"
    });
    const projectNameInput = buildComponent("input", "", {
      class: "project-input",
      name: "project-name",
      id: "project-name",
      placeholder: "Name",
      required: "",
    });
    const projectNameSubmit = buildComponent("input", "Submit", {
      type: "submit",
      class: "submit-project",
    });

    appendComponent(projectNameGenerator, [
      generatorText,
      projectNameInput,
      projectNameSubmit,
    ]);

    return projectNameGenerator;
  };

  // Creates project selection UI
  const createNewProjectSelection = (name) => {
    const newProject = buildComponent("div", "", { class: `${name}` });

    const projectName = buildComponent("div", name.split("-").join(" "));

    const deleteIcon = buildComponent("i", "", {
      class: "fa-solid fa-trash delete-button",
    });

    appendComponent(newProject, [projectName, deleteIcon]);

    return newProject;
  };

  // Appends projects to their section in the sidebar
  const appendProjectsToSidebar = () => {
    getProjectTab().innerHTML = "";

    for (let i = 0; i < projectCollection.length; i++) {
      const elem = projectCollection[i];

      getProjectTab().appendChild(createNewProjectSelection(elem));
    }
  };

  // Adds new project to project array
  const addNewProjectToArr = (project) => {
    const formattedProject = project.split(" ").join("-")
    projectCollection.push(formattedProject);
  };

  const addNewProjectInputToPage = () => {
    const main = document.querySelector("main");

    main.append(createProjectNameInput());
    MainPageModule.toggleDarkBackground();
  };

  const removeNewProjectInputToPage = () => {
    const projectGenerator = document.querySelector(".name-generator");

    if (projectGenerator) {
      projectGenerator.remove();
      MainPageModule.toggleDarkBackground();
    }
  };

  const updateProjectArr = () => {
    projectCollection = JSON.parse(localStorage.getItem("projectsArr"));
  }

  return {
    getProjectArr,
    getProjectTab,
    getProjectTabCollection,
    appendProjectsToSidebar,
    deleteProjectFromArr,
    addNewProjectToArr,
    createProjectNameInput,
    removeNewProjectInputToPage,
    addNewProjectInputToPage,
    updateProjectArr,
  };
})();
