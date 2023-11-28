import {
  getCurrentDatesInfo,
} from "./dateFunctions";

//TODO:
// Make sure to change notes so that the noteapplicaiton function isn't used everytime
// Use remove function to remove note element, then delete the note in the logic
// Like with pages.

const NoteLogicModule = (function() {

  const notes = [
    {
      taskname: "Jog",
      description: "I need to jog",
      date: "2023-10-25",
      priority: "low",
      order: 0,
    },
  ];

  // Delete notes array
function deleteNoteFromObject(index) {
  notes.splice(index, 1);
};

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
};

// Collects data from inputs
function getNoteInput() {
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

const noteHistory = (function()  {
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
    order: noteHistory,
  };

  notes.push(newNote);
}

// For filtering notes to the corresponding page.
function filterNotes(noteList) {
  const selectedPage = document.querySelector(".current-page");
  let filteredNotes;
  const currentDateaInfo = getCurrentDatesInfo();

  if (selectedPage.classList[0] === "inbox-page") {
    filteredNotes = noteList;
  } else if (selectedPage.classList[0] === "today-page") {
    filteredNotes = noteList.filter((note) =>
      currentDateaInfo.confirmToday(note.date)
    );
  } else if (selectedPage.classList[0] === "week-page") {
    filteredNotes = noteList.filter((note) =>
      currentDateaInfo.confirmWeek(note.date)
    );
  }

  return filteredNotes;
}

return {

deleteNoteFromObject,
uploadNoteInput,
findNote,
editNoteObject,
getNoteInput,
filterNotes,

}

})()

// Notes array
export const notes = [
  {
    taskname: "Jog",
    description: "I need to jog",
    date: "2023-10-25",
    priority: "low",
    order: 0,
  },
];

// Delete notes array
export function deleteNoteFromObject(index) {
  notes.splice(index, 1);
};

// Sorts note to find a specific one based on the order number
export function findNote(orderNumber) {
  const selecteNote = notes.find((note) => note.order == orderNumber);
  const index = notes.indexOf(selecteNote);

  return index;
}

export function editNoteObject(index, newNote) {
  notes[index].taskname = newNote.taskname;
  notes[index].description = newNote.description;
  notes[index].date = newNote.date;
  notes[index].priority = newNote.priority;
};

// Retrieves the priority selected in the todo note element
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
  let noteHistory = notes.length;

  return function () {
    noteHistory++;
    return noteHistory;
  };
};

const noteHistory = keepNoteHistory();

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

// For filtering notes to the corresponding page.
export function filterNotes(noteList) {
  const selectedPage = document.querySelector(".current-page");
  let filteredNotes;
  const currentDateaInfo = getCurrentDatesInfo();

  if (selectedPage.classList[0] === "inbox-page") {
    filteredNotes = noteList;
  } else if (selectedPage.classList[0] === "today-page") {
    filteredNotes = noteList.filter((note) =>
      currentDateaInfo.confirmToday(note.date)
    );
  } else if (selectedPage.classList[0] === "week-page") {
    filteredNotes = noteList.filter((note) =>
      currentDateaInfo.confirmWeek(note.date)
    );
  }

  return filteredNotes;
}
