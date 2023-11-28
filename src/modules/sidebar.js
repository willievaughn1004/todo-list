import { ProjectModule, createProjects } from "./pages";

export function toggleProjectMenu() {
  const toggleIcon = document.querySelector(".fa-chevron-down");
  const projectCollection = document.querySelector(".projects-collection")

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

export function addDeleteProjectEventListener() {

  const projectArr = ProjectModule.getProjectTab();

  const projects = projectArr.getElementsByClassName("project");
  
  for (let i = 0; i < projects.length; i++) {
    const elem = projects[i];

    console.log(elem);
    console.log(elem.textContent)

    const deletedProject = elem.querySelector(".delete-button");

    deletedProject.addEventListener("click", function () {
      elem.remove();
      ProjectModule.deleteProjectFromArr(elem.textContent);
    })

  }

}
