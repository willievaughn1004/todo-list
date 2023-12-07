import { appendComponent, buildComponent } from "./componentfunctions";
import { createAddTaskButton, appendNotesToPage } from "./noteUI";

export const MainPageModule = (() => {
  const createCurrentPage = (page) => {
    const mainPage = buildComponent("div", "", {
      class: `${page}-page current-page`,
      id: `${page}`,
    });

    const mainElement = buildComponent("h1", `${page}`, {
      class: "note-header",
    });

    const noteContainer = buildComponent("div", "", {
      class: "note-container",
    });

    const noteCreationContainer = buildComponent("div", "", {
      class: "note-creation-container",
    });

    appendComponent(noteCreationContainer, [createAddTaskButton()]);

    appendComponent(mainPage, [mainElement, noteContainer, noteCreationContainer]);

    return mainPage;
  };

  const addContentToCurrent = (content) => {
    const currentPage = document.querySelector(".current-page");
    currentPage && currentPage.remove();
    appendComponent("main", [createCurrentPage(`${content}`)]);
    appendNotesToPage();
  };

  const toggleTaskButton = () => {
    const taskButton = document.querySelector(".add-task");
  
    if (taskButton.style.display === "none") {
      taskButton.style.display = "flex";
    } else {
      taskButton.style.display = "none";
    }
  };

  return {
    createCurrentPage,
    addContentToCurrent,
    toggleTaskButton
  };
})();

// TODO: Write code that checks whether or not a project being created as the same name as another
// Make it pop up during the pop up menu when you create the project name

// Look over names of functions also refacter code
export const ProjectModule = (() => {
  let projectCollection = ["Exercise", "Pee"];

  function getProjectTab() {
    const projectTab = document.querySelector(".projects-collection");

    return projectTab;
  }

  function getProjectTabCollection() {
    const projectTabCollection = getProjectTab().childNodes;

    return projectTabCollection;
  }

  function deleteProjectFromArr(project) {
    projectCollection = projectCollection.filter((word) => word !== project);
  }

  function projectNameInput() {
    const projectNameGenerator = buildComponent("form", "", {
      class: "name-generator",
    });

    const generatorText = buildComponent("label", "Name your new project...", {
      for: "project-name",
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
  }

  function createProject(name) {
    const newProject = buildComponent("div", "", { class: `${name}` });

    const projectName = buildComponent("div", name);

    const deleteIcon = buildComponent("i", "", {
      class: "fa-solid fa-trash delete-button",
    });

    appendComponent(newProject, [projectName, deleteIcon]);

    return newProject;
  }

  function appendProjects() {
    getProjectTab().innerHTML = "";

    for (let i = 0; i < projectCollection.length; i++) {
      const elem = projectCollection[i];

      getProjectTab().appendChild(createProject(elem));
    }
  }

  function addNewProject(project) {
    projectCollection.push(project);
  }

  return {
    getProjectTab,
    getProjectTabCollection,
    appendProjects,
    projectNameInput,
    deleteProjectFromArr,
    addNewProject,
  };
})();
