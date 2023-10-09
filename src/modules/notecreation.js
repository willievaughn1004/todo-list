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

    appendComponent(inputContainer, [taskNameInput, descriptionInput]);

    return inputContainer;
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

    const lowInput = buildComponent("input", "", {
      type: "radio",
      value: "low",
      id: "low",
      name: "priority-selecter",
    });
    const lowLabel = buildComponent("label", "Low", { for: "low" });

    const mediumInput = buildComponent("input", "", {
      type: "radio",
      value: "medium",
      id: "medium",
      name: "priority-selecter",
    });
    const mediumLabel = buildComponent("label", "Medium", {
      for: "medium",
    });

    const highInput = buildComponent("input", "", {
      type: "radio",
      value: "high",
      id: "high",
      name: "priority-selecter",
    });
    const highLabel = buildComponent("label", "High", { for: "high" });

    appendComponent(priorityFieldset, [
      priorityLegend,
      lowInput,
      lowLabel,
      mediumInput,
      mediumLabel,
      highInput,
      highLabel,
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
    class: "exit-button",
  });
  const xIcon = buildComponent("i", "", { class: "fa-solid fa-x" });

  appendComponent(formExitButton, [xIcon]);
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

const notes = {
  taskname: "Jog",
  description: "I need to jog",
  date: "10/24/2023",
  priority: "low",
};

// TODO: Edit to allow any obj to be injected
export function buildToDoNote() {
    const toDoNote = buildComponent("div", "", { class:"todo-note"});
    const noteCopy = notes;

    const checkBox = buildComponent("button", "", { class: "checkbox"})
    const taskNameText = buildComponent("div", noteCopy.taskname, { class: "task-name-text"});
    const descriptionText = buildComponent("div", noteCopy.description, { class: "description-text"});
    const dateText = buildComponent("div", noteCopy.date, { class: "date-text"});
    
    appendComponent(toDoNote, [checkBox, taskNameText, descriptionText, dateText]);

    return toDoNote;

}
