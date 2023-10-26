import { appendComponent, buildComponent } from "./componentfunctions";
import { createAddTaskButton } from "./noteUI";

export function createMainPage(page) {
  const mainPage = buildComponent("div", "", {
    class: `${page}-page current-page`,
  });

  const mainElement = buildComponent("h1", `${page}`, { class: "note-header" });

  const noteContainer = buildComponent("div", "", {
    class: "note-container",
  });

  const noteCreationContainer = buildComponent("div", "", {
    class: "note-creation-container",
  });

  appendComponent(noteCreationContainer, [createAddTaskButton()]);

  appendComponent(mainPage, [
    mainElement,
    noteContainer,
    noteCreationContainer,
  ]);

  return mainPage;
}

// Use these if need be, though you can try to refactor the
// other function to allow for note/page creation.
function createProjects() {}

function createNotes() {}
