export function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const sidebarBackground = document.querySelector(".sidebar-background")
  const main = document.querySelector("main");
  const currentPage = document.querySelector(".current-page")
  const currentHeader = currentPage.querySelector(".note-header")

  // Adds classes that make the sidebar appear and darkens the background
  sidebar.classList.toggle("active");
  sidebarBackground.classList.toggle("active-2");
  main.classList.toggle("active-background");
  currentHeader.classList.toggle("active-background");

  toggleHamburgerIcon();
}

export function toggleHamburgerIcon() {
  const sliceOne = document.querySelector(".slice.one");
  const sliceTwo = document.querySelector(".slice.two");
  const sliceThree = document.querySelector(".slice.three");

  if (!sliceOne.style.transform) {
    sliceOne.style.transform =
      "rotate(45deg) translateY(0.35rem) translateX(0.21rem)";
    sliceTwo.style.visibility = "hidden";
    sliceThree.style.transform =
      "rotate(135deg) translateY(0.3rem) translateX(-0.15rem)";
  } else {
    sliceOne.style.transform = "";
    sliceThree.style.transform = "";
    sliceTwo.style.visibility = "";
  };
}

export default function initializeToggle() {
  const hamburgerMenuBtn = document.querySelector(".hamburger-menu-btn");
  hamburgerMenuBtn.addEventListener("click", function () {
    toggleSidebar();
  });
}
