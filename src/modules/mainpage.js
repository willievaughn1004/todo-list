import { appendComponent, buildComponent } from "./componentfunctions";
import { createAddTaskButton } from "./notes";

export function createMainPage(page) {
  const mainPage = buildComponent("div", "", {
    class: `${page}-page current-page`,
  });

  const mainElement = buildComponent("h1", `${page}`);

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
};