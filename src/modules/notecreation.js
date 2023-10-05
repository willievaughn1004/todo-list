import { appendComponent, buildComponent } from "./componentfunctions";

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
      name: "low",
    });
    const createLowLabel = buildComponent("label", "Low", { for: "low" });

    const createMediumInput = buildComponent("input", "", {
      type: "radio",
      value: "medium",
      id: "medium",
      name: "medium",
    });
    const createMediumLabel = buildComponent("label", "Medium", {
      for: "medium",
    });

    const createHighInput = buildComponent("input", "", {
      type: "radio",
      value: "high",
      id: "high",
      name: "high",
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
    input: "submit",
    value: "Submit",
    id: "submit",
  });
  appendComponent(divForSubAndPrior, [
    createPriorityFieldset(),
    formSubmitButton,
  ]);

  appendComponent(toDoNoteCreater, [
    createInputContainer(),
    createDateFieldset(),
    divForSubAndPrior,
  ]);

  return toDoNoteCreater;
}
