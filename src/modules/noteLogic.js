import { getCurrentDatesInfo } from "./dateFunctions";

export const NoteLogicModule = (() => {
  // Array that contains objects of notes
  let notes = [
    {
      taskname: "Inbox",
      description: "I need to jog",
      date: "2023-10-25",
      priority: "low",
      order: 0,
      type: "main",
    },
    {
      taskname: "Workout",
      description: "This should appear in the Exercise Tab",
      date: "2023-10-25",
      priority: "low",
      order: 1,
      type: "Exercise",
    },
    {
      taskname: "Todo app",
      description: "Complete todo application",
      date: "2023-12-25",
      priority: "high",
      order: 2,
      type: "Coding",
    },
    {
      taskname: "Review how to make comments in code",
      description: "",
      date: "2023-12-25",
      priority: "",
      order: 3,
      type: "Coding",
    },
    {
      taskname: "Finish Odin Project",
      description: "",
      date: "2023-12-25",
      priority: "high",
      order: 4,
      type: "Coding",
    },
    {
      taskname: "Join coding discord",
      description: "",
      date: "2023-12-20",
      priority: "low",
      order: 5,
      type: "Coding",
    },
  ];

  // Delete a specific note in the note array
  const deleteNoteFromObject = (index) => {
    getNotesArr().splice(index, 1);
  };

  // Deletes notes based on project type
  const deleteNoteByType = (projectType) => {
    const updatedNotes = getNotesArr().filter(
      (note) => note.type !== projectType
    );
    notes = updatedNotes;
  };

  const getNotesArr = () => {
    return notes;
  };

  // Sorts notes to find a specific one based on the order number
  const findNoteInObject = (orderNumber) => {
    const selecteNote = getNotesArr().find((note) => note.order == orderNumber);
    const index = getNotesArr().indexOf(selecteNote);

    return index;
  };

  // Edits a specific note in the array
  const editNoteInObject = (index, newNote) => {
    notes[index].taskname = newNote.taskname;
    notes[index].description = newNote.description;
    notes[index].date = newNote.date;
    notes[index].priority = newNote.priority;
  };

  // Maintains history of notes and updates everytime it is ran.
  // This is helpful to assign order to notes, which helps other
  // functions find the note later to remove or edit.
  const noteHistory = (() => {
    let noteHistory = getNotesArr().length;

    return () => {
      noteHistory++;
      return noteHistory;
    };
  })();

  // Updates notes array with a new note
  const uploadNoteInput = (data) => {
    const newNote = {
      taskname: data.taskname,
      description: data.description,
      date: data.date,
      priority: data.priority,
      order: noteHistory(),
      type: data.type,
    };

    getNotesArr().push(newNote);
  };

  // For filtering notes to the corresponding main page.
  const filterNotes = (noteList) => {
    const selectedPage = document.querySelector(".current-page");
    let filteredNotes;
    const currentDateaInfo = getCurrentDatesInfo();

    if (/inbox-page/i.test(selectedPage.classList[0])) {
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
  };

  return {
    notes,
    getNotesArr,
    deleteNoteByType,
    deleteNoteFromObject,
    uploadNoteInput,
    findNoteInObject,
    editNoteInObject,
    filterNotes,
    noteHistory,
  };
})();
