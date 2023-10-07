import { appendComponent, buildComponent } from "./componentfunctions";
import { createAddTaskButton } from "./notecreation";

export function createTodayPage() {
  const todayElement = buildComponent("h1", "Today");
  const todayMainPage = buildComponent("div", "", { class: "today-page" });

  appendComponent(todayMainPage, [todayElement, createAddTaskButton()]);

  return todayMainPage;
}