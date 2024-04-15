import { NoteLogicModule } from "./noteLogic";

export const WebStorageModule = (() => {
  const setNotesLocalStorage = () => {
    if (!localStorage.getItem("notesArr")) {
      localStorage.setItem("notesArr", JSON.stringify(NoteLogicModule.notes));
    }
    console.log(localStorage.getItem("notesArr"));
  };

  const updateNotesLocalStorage = () => {
    localStorage.setItem("notesArr", JSON.stringify(NoteLogicModule.notes))
    console.log(localStorage.getItem("notesArr"));
  }

  return {
    setNotesLocalStorage,
    updateNotesLocalStorage
  }
})();
