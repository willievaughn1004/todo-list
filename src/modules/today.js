import { appendComponent, buildComponent } from "./componentfunctions";

export function createTodayPage() {
  const todayMainPage = buildComponent("div", "", { class: "today-page" });

  const plusSign = buildComponent("i", "", { class: "fa-solid fa-plus"})

  const todayElement = buildComponent("h1", "Today");
  appendComponent(todayMainPage, [ todayElement, plusSign]);

  return todayMainPage
};
