import "./scss/styles.scss";
import { ProjectModule, MainPageModule } from "./modules/pages.js";
import { initializeEventListeners } from "./modules/eventListeners.js";

// Maybe move project event listeners form eventListeners.js to seperate module
/*

  Look over other modules and make sure the code is refactored and check if 
  you can notice anything that can be improved before you feed the code to chat gpt

*/

MainPageModule.addContentToMain("inbox");
ProjectModule.appendProjectsToSidebar();
initializeEventListeners();
