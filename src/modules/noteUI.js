import { appendComponent, buildComponent } from "./componentfunctions";
import { getCurrentDatesInfo, formatDate, filterNotes, notes } from "./noteLogic";

// creating UI Components
export const createAddTaskButton = () => {
  const taskButton = buildComponent("button", "", { class: "add-task" });
  const taskSign = buildComponent("i", "", { class: "fa-solid fa-plus" });
  const taskText = buildComponent("p", "Add Task");
  appendComponent(taskButton, [taskSign, taskText]);

  return taskButton;
};

// ASK GPT about reusability of code and what do to do to perform that
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

    const dd = getCurrentDatesInfo().todayDate.getDate();
    const mm = getCurrentDatesInfo().todayDate.getMonth() + 1;
    const yyyy = getCurrentDatesInfo().todayDate.getFullYear();

    const dateInput = buildComponent("input", "", {
      type: "date",
      name: "due-date",
      id: "due-date",
      min: `${yyyy}-${mm}-${dd}`,
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

  const createPriorAndSubDiv = () => {
    const divForSubAndPrior = buildComponent("div", "", {
      class: "priorAndSub",
    });
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

    return divForSubAndPrior;
  };

  appendComponent(toDoNoteCreater, [
    createInputContainer(),
    createDateFieldset(),
    createPriorAndSubDiv(),
  ]);

  return toDoNoteCreater;
}

export function buildToDoNote(note) {
  const toDoNote = buildComponent("div", "", {
    class: "todo-note",
    id: `${note.order}`,
  });

  const checkBox = buildComponent("button", "", { class: "checkbox" });

  if (note.priority === "low") {
    checkBox.style.backgroundColor = "rgba(76, 175, 80, 0.3)";
    checkBox.style.borderColor = "green";
  } else if (note.priority === "medium") {
    checkBox.style.backgroundColor = "rgba(255,165,0, 0.3)";
    checkBox.style.borderColor = "orange";
  } else {
    checkBox.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
    checkBox.style.borderColor = "red";
  }

  const taskNameText = buildComponent("div", note.taskname, {
    class: "task-name-text",
  });
  const descriptionText = buildComponent("div", note.description, {
    class: "description-text",
  });
  const dateText = buildComponent("div", formatDate(note.date), {
    class: "date-text",
  });

  const deleteIcon = buildComponent("i", "", {
    class: "fa-solid fa-trash delete-button",
  });

  const editIcon = buildComponent("i", "", {
    class: "fa-solid fa-pen-to-square edit-button",
  });

  appendComponent(toDoNote, [
    checkBox,
    taskNameText,
    descriptionText,
    dateText,
    editIcon,
    deleteIcon,
  ]);

  return toDoNote;
}

// Updates UI with notes
export function appendNotesToPage() {
  const currentNotes = filterNotes(notes);
  const noteContainer = document.querySelector(".note-container");
  noteContainer.textContent = "";
  console.log(currentNotes)

  for (let i = 0; i < currentNotes.length; i++) {
    appendComponent(noteContainer, [buildToDoNote(currentNotes[i])]);
  }
}