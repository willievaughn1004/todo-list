import { NoteLogicModule } from "./noteLogic";

export const WebStorageModule = (() => {
  const setNotesLocalStorage = () => {
    console.log(!localStorage.getItem("notesArr"));
    
    if (!localStorage.getItem("notesArr")) {
      localStorage.setItem("notesArr", JSON.stringify(NoteLogicModule.getNotesArr()));
    }
  };

  const updateNotesLocalStorage = () => {
    localStorage.setItem("notesArr", JSON.stringify(NoteLogicModule.getNotesArr()))
  }

  return {
    setNotesLocalStorage,
    updateNotesLocalStorage
  }
})();
