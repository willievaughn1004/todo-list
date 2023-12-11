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
7. Write code that checks whether or not a project being created as the same name as another. 
Make it pop up during the pop up menu when you create the project name // 30 minutes

*/

MainPageModule.addContentToMain("inbox");
ProjectModule.appendProjectsToSidebar();
initializeEventListeners();

