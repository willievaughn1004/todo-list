export default function toggleSidebar() {
  const hamburgerMenuBtn = document.querySelector(".hamburger-menu-btn");
  const sidebar = document.querySelector(".sidebar");
  const main = document.querySelector("main");

  // Adds classes that make the sidebar appear and darkens the background
  hamburgerMenuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
    main.classList.toggle("active-background");
    changeHamburgerIcon();
  });
}

export function changeHamburgerIcon() {
  const sliceOne = document.querySelector(".slice.one");
  const sliceTwo = document.querySelector(".slice.two");
  const sliceThree = document.querySelector(".slice.three");

  if (!sliceOne.style.transform) {
    sliceOne.style.transform =
      "rotate(45deg) translateY(0.35rem) translateX(0.15rem)";
    // rotate(45deg)
    sliceThree.style.transformOrigin = "center";
    sliceThree.style.transform =
      "rotate(135deg) translateY(0.3rem) translateX(-0.15rem)";
    // rotate(135deg) translateY(-0.36rem)
    sliceTwo.style.visibility = "hidden";
  } else {
    sliceOne.style.transform = "";
    sliceThree.style.transform = "";
    sliceTwo.style.visibility = "";
  }
}
