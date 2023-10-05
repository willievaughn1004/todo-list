import { appendComponent, buildComponent } from "./componentfunctions";
import { buildToDoNoteCreater } from "./notecreation";

export function createTodayPage() {
  const todayMainPage = buildComponent("div", "", { class: "today-page" });

  const todayElement = buildComponent("h1", "Today");
  appendComponent(todayMainPage, [todayElement, createAddTaskButton(), buildToDoNoteCreater()]);

  return todayMainPage;
}

const createAddTaskButton = () => {
  const addTaskButton = buildComponent("button", "", { class: "add-task" });
  const addTaskSign = buildComponent("i", "", { class: "fa-solid fa-plus" });
  const addTaskText = buildComponent("p", "Add Task");
  appendComponent(addTaskButton, [addTaskSign, addTaskText]);

  // addTaskButton.addEventListener("click", function(){
  //   addTaskButton.innerHTML = "";
  //   appendComponent("main", [buildToDoNoteCreater()])
  // });

  return addTaskButton;
}