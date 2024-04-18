import { NoteLogicModule } from "./noteLogic";
import { ProjectModule } from "./pages";

export const WebStorageModule = (() => {
  const setNotesLocalStorage = () => {
    if (!localStorage.getItem("notesArr")) {
      localStorage.setItem("notesArr", JSON.stringify(NoteLogicModule.getNotesArr()));
    }
  };

  const updateNotesLocalStorage = () => {
    localStorage.setItem("notesArr", JSON.stringify(NoteLogicModule.getNotesArr()));
  };

  const setProjectsLocalStorage = () => {
    if (!localStorage.getItem("projectsArr")) {
      localStorage.setItem("projectsArr", JSON.stringify(ProjectModule.getProjectArr()));
    }
    console.log(localStorage.getItem("projectsArr"));
  };

  const updateProjectsLocalStorage = () => {
    localStorage.setItem("projectsArr", JSON.stringify(ProjectModule.getProjectArr()));
  };

  return {
    setNotesLocalStorage,
    updateNotesLocalStorage,
    setProjectsLocalStorage,
    updateProjectsLocalStorage,
  }
})();
