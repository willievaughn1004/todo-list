import { appendComponent, buildComponent } from "./componentfunctions";

// creating UI Components
export const createAddTaskButton = () => {
  const taskButton = buildComponent("button", "", { class: "add-task" });
  const taskSign = buildComponent("i", "", { class: "fa-solid fa-plus" });
  const taskText = buildComponent("p", "Add Task");
  appendComponent(taskButton, [taskSign, taskText]);

  return taskButton;
};

// TODO: Seperate UI and logic related tasks and assign them to their own module.
// Needs to be more seperated into UI and logic. Two different modules for UI and logic.
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

  const createPriorAndSubDiv = () => {

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

    return divForSubAndPrior;

  }

  appendComponent(toDoNoteCreater, [
    createInputContainer(),
    createDateFieldset(),
    createPriorAndSubDiv(),
  ]);

  return toDoNoteCreater;
}

export function buildToDoNote(note) {
  const toDoNote = buildComponent("div", "", { class: "todo-note" });

  const checkBox = buildComponent("button", "", { class: "checkbox" });
  const taskNameText = buildComponent("div", note.taskname, {
    class: "task-name-text",
  });
  const descriptionText = buildComponent("div", note.description, {
    class: "description-text",
  });
  const dateText = buildComponent("div", note.date, { class: "date-text" });

  appendComponent(toDoNote, [
    checkBox,
    taskNameText,
    descriptionText,
    dateText,
  ]);

  return toDoNote;
}

// Notes array
const notes = [
    {
      taskname: "Jog",
      description: "I need to jog",
      date: "10/24/2023",
      priority: "low",
    },
  ];

// Collects data from inputs
export function getNoteInput() {
    const taskName = document.querySelector(".task-name");
    const description = document.querySelector(".description");
    const dueDate = document.querySelector("#due-date");
    const priority = document.querySelector(".task-name");

    return {
        taskname: taskName.textContent,
        description: description.textContent,
        date: dueDate.value,
        priority: priority,
    }
}

// Updates notes array
export function uploadNoteInput(data) {
    const newNote = {
        taskname: data.taskname,
        description: data.description,
        date: data.date,
        priority: data.priority,
      };

      notes.push(newNote);
};

// Updates UI with notes
export function appendNotesToPage() {
    const currentNotes = notes;

    const noteContainer = document.querySelector(".note-container");

    noteContainer.textContent = "";

    for (let i = 0; i < currentNotes.length; i++) {
      appendComponent(noteContainer, [buildToDoNote(currentNotes[i])]);
    }
  }