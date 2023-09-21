export default function addHamburgerEventlistener() {
  const hamburger = document.querySelector(".hamburger");

  hamburger.addEventListener("click", function () {
    console.log("Hey");
  });
}
