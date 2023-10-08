import { appendComponent, buildComponent } from "./componentfunctions";

export const createAddTaskButton = () => {
    const taskButton = buildComponent("button", "", { class: "add-task" });
    const taskSign = buildComponent("i", "", { class: "fa-solid fa-plus" });
    const taskText = buildComponent("p", "Add Task");
    appendComponent(taskButton, [taskSign, taskText]);
  
    return taskButton;
  };

export function buildToDoNoteCreater() {
  const toDoNoteCreater = buildComponent("form", "", {
    class: "note-creation",
  });

  const createInputContainer = () => {
    const inputContainer = buildComponent("div", "", {
      class: "input-container",
    });

    const taskNameInput = buildComponent("span", "", {
      class: "input task-name",
      role: "textbox",
      contenteditable: "",
      placeholder: "Task name",
    });

    const descriptionInput = buildComponent("span", "", {
      class: "input description",
      role: "textbox",
      contenteditable: "",
      placeholder: "Description",
    });

    appendComponent(inputContainer, [taskNameInput, descriptionInput])

    return inputContainer
  };

  const createDateFieldset = () => {
    const dateFieldset = buildComponent("fieldset", "", { class: "date" });
    const dateLabel = buildComponent("label", "Due Date:", { for: "due-date" });
    const dateInput = buildComponent("input", "", {
      type: "date",
      name: "due-date",
      id: "due-date",
    });

    appendComponent(dateFieldset, [dateLabel, dateInput]);

    return dateFieldset;
  };

  const createPriorityFieldset = () => {
    const priorityFieldset = buildComponent("fieldset", "", {
      class: "priority",
    });
    const priorityLegend = buildComponent("span", "Priority:", {
      class: "legend",
    });

    const createLowInput = buildComponent("input", "", {
      type: "radio",
      value: "low",
      id: "low",
      name: "priority-selecter",
    });
    const createLowLabel = buildComponent("label", "Low", { for: "low" });

    const createMediumInput = buildComponent("input", "", {
      type: "radio",
      value: "medium",
      id: "medium",
      name: "priority-selecter",
    });
    const createMediumLabel = buildComponent("label", "Medium", {
      for: "medium",
    });

    const createHighInput = buildComponent("input", "", {
      type: "radio",
      value: "high",
      id: "high",
      name: "priority-selecter",
    });
    const createHighLabel = buildComponent("label", "High", { for: "high" });

    appendComponent(priorityFieldset, [
      priorityLegend,
      createLowInput,
      createLowLabel,
      createMediumInput,
      createMediumLabel,
      createHighInput,
      createHighLabel,
    ]);

    return priorityFieldset;
  };

  const divForSubAndPrior = buildComponent("div", "", { class: "priorAndSub" });
  const formSubmitButton = buildComponent("input", "", {
    type: "submit",
    value: "Submit",
    id: "submit",
  });
  const formExitButton = buildComponent("button", "", {
    class: "exit-button"
  })
  const xIcon = buildComponent("i", "", {class: "fa-solid fa-x"})

  appendComponent(formExitButton, [xIcon])
  appendComponent(divForSubAndPrior, [
    createPriorityFieldset(),
    formExitButton,
    formSubmitButton,
  ]);

  appendComponent(toDoNoteCreater, [
    createInputContainer(),
    createDateFieldset(),
    divForSubAndPrior,
  ]);

  return toDoNoteCreater;
}
