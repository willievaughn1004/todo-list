import { getCurrentDatesInfo } from "./dateFunctions";

//TODO:
// Make sure to change notes so that the noteapplicaiton function isn't used everytime
// Use remove function to remove note element, then delete the note in the logic
// Like with pages.

//TODO: Fix error with selection. If you submit a note without a priority, then an error occurs


// Maybe undo this module. Not really needed as this module is by itself.
export const NoteLogicModule = (function () {
// Notes array
const notes = [
  {
    taskname: "Inbox",
    description: "I need to jog",
    date: "2023-10-25",
    priority: "low",
    order: 0,
    type: "main",
  },
  {
    taskname: "Pee",
    description: "I need to pee",
    date: "2023-10-25",
    priority: "low",
    order: 1,
    type: "Exercise",
  },
  {
    taskname: "Exercise",
    description: "I need to exercise",
    date: "2023-10-25",
    priority: "low",
    order: 3,
    type: "Pee",
  },
];

// Delete notes array
function deleteNoteFromObject(index) {
  notes.splice(index, 1);
}

// Sorts note to find a specific one based on the order number
function findNote(orderNumber) {
  const selecteNote = notes.find((note) => note.order == orderNumber);
  const index = notes.indexOf(selecteNote);

  return index;
}

function editNoteObject(index, newNote) {
  notes[index].taskname = newNote.taskname;
  notes[index].description = newNote.description;
  notes[index].date = newNote.date;
  notes[index].priority = newNote.priority;
}

// Retrieves the priority selected in the todo note element
// MOVE TO UI MODULE
function findPrioritySelection() {
  const priorityOptions = document.getElementsByName("priority-selecter");
  const selectedOption = Array.from(priorityOptions).find(
    (selection) => selection.checked
  );

  return selectedOption.value;
}

// Collects data from inputs
// MOVE TO UI MODULE
function getNoteInput() {
  const taskName = document.querySelector(".task-name");
  const description = document.querySelector(".description");
  const dueDate = document.querySelector("#due-date");
  const currentPage = document.querySelector(".current-page");

  return {
    taskname: taskName.textContent,
    description: description.textContent,
    date: dueDate.value,
    priority: findPrioritySelection(),
    type: currentPage.getAttribute("id"),
  };
}

const noteHistory = (function () {
  let noteHistory = notes.length;

  return function () {
    noteHistory++;
    return noteHistory;
  };
})();

// Updates notes array
function uploadNoteInput(data) {
  const newNote = {
    taskname: data.taskname,
    description: data.description,
    date: data.date,
    priority: data.priority,
    order: noteHistory(),
    type: data.type,
  };

  notes.push(newNote);
}

// For filtering notes to the corresponding page.
function filterNotes(noteList) {
  const selectedPage = document.querySelector(".current-page");
  let filteredNotes;
  const currentDateaInfo = getCurrentDatesInfo();

  if (selectedPage.classList[0] === "inbox-page") {
    filteredNotes = noteList.filter(
      (note) => note.type === "inbox" || "today" || "week"
    );
  } else if (selectedPage.classList[0] === "today-page") {
    filteredNotes = noteList.filter((note) =>
      currentDateaInfo.confirmToday(note.date)
    );
  } else if (selectedPage.classList[0] === "week-page") {
    filteredNotes = noteList.filter((note) =>
      currentDateaInfo.confirmWeek(note.date)
    );
  } else if (selectedPage.classList[1] === "current-page") {
    filteredNotes = noteList.filter(
      (note) => note.type === selectedPage.getAttribute("id")
    );
  }

  return filteredNotes;
}

  return {
    notes,
    deleteNoteFromObject,
    uploadNoteInput,
    findNote,
    editNoteObject,
    getNoteInput,
    filterNotes,
    noteHistory,
    findPrioritySelection,
  };
})();
