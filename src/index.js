import "./scss/styles.scss";
import { ProjectModule, MainPageModule } from "./modules/pages.js";
import { initializeEventListeners } from "./modules/eventListeners.js";
import { WebStorageModule } from "./modules/webstorage.js";

/*
Future modifications
1. Create/modify a function that specifies what project a note is from.

*/

/*
Need to some more testing
5. Utilize web storage api to allow information to be saved. // 1.5 hours
*/
// localStorage.clear();
WebStorageModule.setNotesLocalStorage();
MainPageModule.addContentToMain("inbox");
ProjectModule.appendProjectsToSidebar();
initializeEventListeners();
