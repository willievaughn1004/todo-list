import "./scss/styles.scss";
import { ProjectModule, MainPageModule } from "./modules/pages.js";
import { initializeEventListeners } from "./modules/eventListeners.js";

/*
Future modifications
1. Create/modify a function that specifies what project a note is from.

*/

/*

4. Create functions that allows users to mark projects as complete. // 1 hour
5. Utilize web storage api to allow information to be saved. // Unknown
6. Track amount of notes in each project/main option // 1.5 hours
7. Test// 15 minutes
8. Fix edit note // 15 minutes

*/

MainPageModule.addContentToMain("inbox");
ProjectModule.appendProjectsToSidebar();
initializeEventListeners();

