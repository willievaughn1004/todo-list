import {
  startOfWeek,
  isAfter,
  isBefore,
  endOfWeek,
  parseISO,
  isSameDay,
} from "date-fns";

// Notes array
const notes = [
  {
    taskname: "Jog",
    description: "I need to jog",
    date: "2023-10-24",
    priority: "low",
    order: 0,
  },
  {
    taskname: "Jog",
    description: "I need to jog",
    date: "2023-10-24",
    priority: "low",
    order: 0,
  },
  {
    taskname: "Jog",
    description: "I need to jog",
    date: "2023-10-24",
    priority: "low",
    order: 0,
  },
  {
    taskname: "Jog",
    description: "I need to jog",
    date: "2023-10-24",
    priority: "low",
    order: 0,
  },
  {
    taskname: "Jog",
    description: "I need to jog",
    date: "2023-10-24",
    priority: "low",
    order: 0,
  },
];

export function deleteNoteFromObject(orderNumber) {
  const noteList = notes;
  const deletedNote = noteList.find((note) => note.order == orderNumber);
  const index = notes.indexOf(deletedNote);

  notes.splice(index, 1);
}

// Formatting dates

export function formatDate(date) {
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
    confirmToday,
    confirmWeek,
  };
}

// For filtering notes
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
