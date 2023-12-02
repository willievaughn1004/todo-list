import { addEventListenersForSidebar } from "..";
import { appendComponent, buildComponent } from "./componentfunctions";
import { createAddTaskButton } from "./noteUI";

export function createMainPage(page) {
  const mainPage = buildComponent("div", "", {
    class: `${page}-page current-page`, id: `${page}`
  });

  const mainElement = buildComponent("h1", `${page}`, { class: "note-header" });

  const noteContainer = buildComponent("div", "", {
    class: "note-container",
  });

  const noteCreationContainer = buildComponent("div", "", {
    class: "note-creation-container",
  });

  appendComponent(noteCreationContainer, [createAddTaskButton()]);

  appendComponent(mainPage, [
    mainElement,
    noteContainer,
    noteCreationContainer,
  ]);

  return mainPage;
}

// Use these if need be, though you can try to refactor the
// other function to allow for note/page creation.
// export function createProjects()
// TODO: Write code that checks whether or not a project being created as the same name as another
// Make it pop up during the pop up menu when you create the project name

export const ProjectModule = (function () {
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
