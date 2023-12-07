import "./scss/styles.scss";
import { ProjectModule, MainPageModule } from "./modules/pages.js";
import { initializeEventListeners } from "./modules/eventListeners.js";

MainPageModule.addContentToCurrent("inbox");
ProjectModule.appendProjects();
initializeEventListeners();
