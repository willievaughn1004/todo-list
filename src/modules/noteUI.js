import { appendComponent, buildComponent } from "./componentfunctions";
import { NoteLogicModule } from "./noteLogic";
import { getCurrentDatesInfo, formatDate } from "./dateFunctions";

export const NoteUIModule = (()=> {

  // Creates UI for the button that allows users to add tasks
  const createAddTaskButton = () => {
    const taskButton = buildComponent("button", "", { class: "add-task" });
    const taskSign = buildComponent("i", "", { class: "fa-solid fa-plus" });
    const taskText = buildComponent("p", "Add Task");
    appendComponent(taskButton, [taskSign, taskText]);
  
    return taskButton;
  };
  
  // Creates UI that allows users to submit info for a new note
  const buildToDoNoteCreater = () => {
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
  
  // Builds the note that is later appended to the main page
  const buildToDoNote = (note) => {
    const toDoNote = buildComponent("div", "", {
      class: "todo-note",
      id: `${note.order}`,
    });
  
    const checkBox = buildComponent("button", "", { class: "checkbox" });
    const checkMark = buildComponent("i", "", { class: "fa-solid fa-check"});

    appendComponent(checkBox, [checkMark])
  
    if (note.priority === "low") {
      checkBox.style.backgroundColor = "rgba(76, 175, 80, 0.3)";
      checkBox.style.borderColor = "green";
    } else if (note.priority === "medium") {
      checkBox.style.backgroundColor = "rgba(255,165,0, 0.3)";
      checkBox.style.borderColor = "orange";
    } else if (note.priority === "high") {
      checkBox.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
      checkBox.style.borderColor = "red";
    } else {
      checkBox.style.backgroundColor = "white";
      checkBox.style.borderColor = "gray";
    }

    console.log(checkBox.classList)
  
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
  
  // Updates UI with notes from the note array
  const appendNotesToPage = () => {
    const currentNotes = NoteLogicModule.filterNotes(NoteLogicModule.getNotesArr());
    const noteContainer = document.querySelector(".note-container");
    noteContainer.textContent = "";
  
    for (let i = 0; i < currentNotes.length; i++) {
      appendComponent(noteContainer, [buildToDoNote(currentNotes[i])]);
    }
  }
  
  // Update UI with the edited note
  const generateEditableNote = (id) => {
    const newNoteCreater = buildToDoNoteCreater();
    newNoteCreater.setAttribute("class", "note-creation editable-note");
  
    const index = NoteLogicModule.findNote(id);
  
    const editableTaskName = newNoteCreater.querySelector(".task-name");
    const editableDescription = newNoteCreater.querySelector(".description");
    const editableDueDate = newNoteCreater.querySelector("#due-date");
  
    editableTaskName.innerText = NoteLogicModule.notes[index].taskname;
    editableDescription.innerText = NoteLogicModule.notes[index].description;
    editableDueDate.value = NoteLogicModule.notes[index].date;
  
    return newNoteCreater;
  };
  
  // Collects data that the user inputs in the note creater
  const getNoteInput = () => {
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
  };

  // Retrieves the priority selected in the todo note element
  const findPrioritySelection = () => {
    const priorityOptions = document.getElementsByName("priority-selecter");
    const selectedOption = Array.from(priorityOptions).find(
      (selection) => selection.checked
    ) || '';
  
    return selectedOption.value;
  }

  return {
    createAddTaskButton,
    buildToDoNote,
    buildToDoNoteCreater,
    generateEditableNote,
    appendNotesToPage,
    getNoteInput,
    
  }
})()                                                                                                                      