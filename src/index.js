import "./scss/styles.scss";
import { ProjectModule, MainPageModule } from "./modules/pages.js";
import { initializeEventListeners } from "./modules/eventListeners.js";
import { WebStorageModule } from "./modules/webstorage.js";
import { NoteLogicModule } from "./modules/noteLogic.js";

/*
Future modifications
1. Create/modify a function that specifies what project a note is from.

*/

/*
Need to some more testing, also need to do this with project list, errors with deleted notes popping up when page is refreshed
5. Utilize web storage api to allow information to be saved. // 1.5 hours
*/

WebStorageModule.setNotesLocalStorage();
WebStorageModule.setProjectsLocalStorage();
NoteLogicModule.updateNotesArr();
ProjectModule.updateProjectArr();
MainPageModule.addContentToMain("inbox");
ProjectModule.appendProjectsToSidebar();
initializeEventListeners();
