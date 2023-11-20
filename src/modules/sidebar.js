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
