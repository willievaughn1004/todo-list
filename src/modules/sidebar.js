import { addContentToMain } from "..";
import { toggleSidebar } from "./hamburger";
import { ProjectModule } from "./pages";

export function toggleProjectMenu() {
  const toggleIcon = document.querySelector(".fa-chevron-down");
  const projectCollection = document.querySelector(".projects-collection");

  toggleIcon.addEventListener("click", function () {
    if (toggleIcon.style.transform === "rotate(270deg)") {
      toggleIcon.style.transform = "rotate(0deg)";
      projectCollection.style.display = "";
    } else {
      toggleIcon.style.transform = "rotate(270deg)";
      projectCollection.style.display = "none";
    }
  });
}

// TODO: Create project Event Listener module maybe

export function addDeleteProjectEventListener() {
  const projects = ProjectModule.getProjectTabCollection();

  for (let i = 0; i < projects.length; i++) {
    const elem = projects[i];

    const deletedProject = elem.querySelector(".delete-button");

    deletedProject.addEventListener("click", function () {
      elem.remove();
      ProjectModule.deleteProjectFromArr(elem.textContent);
    });
  }
}

export function addProjectEventListeners() {
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
}

export function addNewProjectEventListener() {
  const projectPlus = document.querySelector(".fa-plus");
  const main = document.querySelector("main");

  projectPlus.addEventListener("click", function () {
    toggleSidebar();
    main.append(ProjectModule.projectNameInput());
    submitNewProjectEventListener();
  });
}

export function submitNewProjectEventListener() {
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
}
