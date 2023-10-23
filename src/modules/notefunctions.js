import {
  startOfWeek,
  isAfter,
  isBefore,
  endOfWeek,
  parseISO,
  parse,
  isSameDay,
} from "date-fns";
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

    const dd = getCurrentDatesInfo().todayDate.getDate();
    const mm = getCurrentDatesInfo().todayDate.getMonth() + 1;
    const yyyy = getCurrentDatesInfo().todayDate.getFullYear();

    const dateInput = buildComponent("input", "", {
      type: "date",
      name: "due-date",
      id: "due-date",
      min: `${yyyy}-${mm}-${dd}`
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
  const dateText = buildComponent("div", formatDate(note.date), { class: "date-text" });

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

// Notes array
const notes = [
  {
    taskname: "Jog",
    description: "I need to jog",
    date: "2023-10-24",
    priority: "low",
    order: 0,
  },
];

// For creating event listeners to delete notes
export function createdDeleteNoteEventListeners() {
  const noteCollection = document.getElementsByClassName("todo-note");

  for (let i = 0; i < noteCollection.length; i++) {
    const selectedNote = noteCollection[i];

    const deleteButton = selectedNote.querySelector(".delete-button");
    const noteID = selectedNote.id;

    deleteButton.addEventListener("click", function () {
      selectedNote.remove();
      deleteNoteFromObject(noteID);
    });
  }
}

function deleteNoteFromObject(orderNumber) {
  const noteList = notes;
  const deletedNote = noteList.find((note) => note.order == orderNumber);
  const index = notes.indexOf(deletedNote);

  notes.splice(index, 1);
}

// Formatting dates

function formatDate(date) {
  const splitDate = date.split("-");

  const newDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;

  return newDate;
}

// Finds the priority that was selected

function findPrioritySelection() {
  const priorityOptions = document.getElementsByName("priority-selecter");
  const selectedOption = Array.from(priorityOptions).find(
    (selection) => selection.checked
  );

  return selectedOption.value;
}

// Collects data from inputs
export function getNoteInput() {
  const taskName = document.querySelector(".task-name");
  const description = document.querySelector(".description");
  const dueDate = document.querySelector("#due-date");

  return {
    taskname: taskName.textContent,
    description: description.textContent,
    date: dueDate.value,
    priority: findPrioritySelection(),
  };
}

function keepNoteHistory() {
  let noteHistory = 0;

  return function () {
    noteHistory++;
    return noteHistory;
  };
}
let noteHistory = keepNoteHistory();

// Updates notes array
export function uploadNoteInput(data) {
  const newNote = {
    taskname: data.taskname,
    description: data.description,
    date: data.date,
    priority: data.priority,
    order: noteHistory(),
  };

  notes.push(newNote);
}

function getCurrentDatesInfo() {
  const todayDate = new Date();
  const startOfThisWeek = startOfWeek(todayDate);
  const endOfThisWeek = endOfWeek(todayDate);

  function confirmToday(date) {
    const parsedToday = parseISO(date);

    return isSameDay(parsedToday, todayDate);
  }

  function confirmWeek(date) {
    const currentDate = parseISO(date);

    return (
      isBefore(currentDate, endOfThisWeek) &&
      isAfter(currentDate, startOfThisWeek)
    );
  }

  return {
    todayDate,
    confirmToday,
    confirmWeek,
  }
};

// For filtering notes
export function filterNotes(noteList) {
  const selectedPage = document.querySelector(".current-page");
  let filteredNotes;
  const currentDateaInfo = getCurrentDatesInfo();

  if (selectedPage.classList[0] === "inbox-page") {
    filteredNotes = noteList;
  } else if (selectedPage.classList[0] === "today-page") {
    filteredNotes = noteList.filter((note) => currentDateaInfo.confirmToday(note.date));
  } else if (selectedPage.classList[0] === "week-page") {
    filteredNotes = noteList.filter((note) => currentDateaInfo.confirmWeek(note.date));
  }

  return filteredNotes;
}

// Updates UI with notes
export function appendNotesToPage() {
  const currentNotes = filterNotes(notes);

  const noteContainer = document.querySelector(".note-container");

  noteContainer.textContent = "";

  for (let i = 0; i < currentNotes.length; i++) {
    appendComponent(noteContainer, [buildToDoNote(currentNotes[i])]);
  }
}