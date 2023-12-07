import "./scss/styles.scss";
import { ProjectModule, MainPageModule } from "./modules/pages.js";
import { initializeEventListeners } from "./modules/eventListeners.js";

/*

1. Fix the SCSS to properly darken the rest of the page when the sidebar
2. Create a default project and add a couple notes to it. This a sample.
3. Create a function that specifies what project a note is from.
4. Create functions that allows users to mark projects as complete. 
5. Utilize web storage api to allow information to be saved.
6. Track amount of notes in each project/main option

*/

MainPageModule.addContentToMain("inbox");
ProjectModule.appendProjectsToSidebar();
initializeEventListeners();

