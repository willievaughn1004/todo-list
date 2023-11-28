import { appendComponent, buildComponent } from "./componentfunctions";
import { createAddTaskButton } from "./noteUI";

export function createMainPage(page) {
  const mainPage = buildComponent("div", "", {
    class: `${page}-page current-page`,
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

  
  export const ProjectModule = (function() {
    
    let projectCollection = ["Exercise", "Pee"];

    function getProjectTab() {
      const projectTab = document.querySelector(".projects-collection");
  
      return projectTab;
    }
  
    function deleteProjectFromArr(project) {
      projectCollection = projectCollection.filter((word) => word !== project);
  
      console.log(projectCollection)
    }
  
    function createProject(name) {
      const newProject = buildComponent("div", "", { class: "project" });
  
      const projectName = buildComponent("div", name);
  
      const deleteIcon = buildComponent("i", "", {
        class: "fa-solid fa-trash delete-button",
      });
  
      appendComponent(newProject, [projectName, deleteIcon]);
  
      return newProject;
    }
  
    function appendProjects() {
      for (let i = 0; i < projectCollection.length; i++) {
        const elem = projectCollection[i];
  
        getProjectTab().appendChild(createProject(elem));
      }
    }
  
    return {
      getProjectTab,
      appendProjects,
      deleteProjectFromArr
    };

  })();

