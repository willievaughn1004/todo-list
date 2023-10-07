import "./scss/styles.scss";
import initializeToggle from "./modules/hamburger.js";
import { createTodayPage } from "./modules/today.js";
import { createEventListeners } from "./modules/eventlisteners.js";
import { appendComponent } from "./modules/componentfunctions";

initializeToggle();

function addTodayToMain() {
  const todayPage = createTodayPage();
  appendComponent("main", [todayPage]);
}

addTodayToMain();
createEventListeners();
