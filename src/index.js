import "./scss/styles.scss";
import { ProjectModule, MainPageModule } from "./modules/pages.js";
import { initializeEventListeners } from "./modules/eventListeners.js";

/*
Future modifications
1. Create/modify a function that specifies what project a note is from.

*/

/*

5. Utilize web storage api to allow information to be saved. // 1.5 hours
6. Track amount of notes in each project/main option // 1.5 hours
*/

MainPageModule.addContentToMain("inbox");
ProjectModule.appendProjectsToSidebar();
initializeEventListeners();