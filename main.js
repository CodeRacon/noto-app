///////////////
/// ARRAYS ///
/////////////

let noteTitle = [];
let noteText = [];

let deletedNoteTitle = [];
let deletedNoteText = [];

let archivedNoteTitle = [];
let archivedNoteText = [];

//////////////////
/// VARAIBLES ///
////////////////

//  #storing the current menu-folder & row/tile-arrangement of notes
let currentView = 'row';
let currentFolder = 'notes';

// #general note
let pinboard = document.getElementById('pinboard');
const notes = document.querySelectorAll('.note');

// #special behavior / treatment of element to generate a new note
const newNote = document.getElementById('newnote');
const newNoteTitleTextarea = document.getElementById('new-note-title');
const newNoteTextTextarea = document.getElementById('new-note-text');

// #tools in the bottom section of each note
const toolbar = document.getElementById('toolbar');

// #row/tile-arrangement of notes
const rowIcon = document.getElementById('row-icon');
const tileIcon = document.getElementById('tile-icon');

load();
render();

//////////////////
/// FUNCTIONS ///
////////////////

/// HTML-GENERATING FUNCTIONS ///

//  = this function renders and populates the pinboard with notes,
//    including new notes and existing ones
//  - sets the currentFolder variable to 'notes'
//  - clears the inner HTML of the 'pinboard' element, effectively removing all existing
//    content to provide a clean start
//  - creates HTML markup for a new note input section:
//      * two <textarea> elements for adding a new note title and text
//      * a <div> element with a toolbar containing buttons for saving and canceling the new note entry
//  - for each note in the noteTitle array, a loop generates HTML markup to display each note
//    the loop iterates through noteTitle and noteText arrays and creates the following for each note:
//      * two <textarea> elements for displaying the note title and text, set as read-only.
//      * a <div> element with a toolbar containing buttons for
//        saving, editing, undoing changes, archiving, and deleting the note
//  - the generated HTML markup is appended to the 'pinboard' element, effectively displaying
//    all the notes and the new note input section
//  - depending on the currentView, it displays notes in either a 'row' or 'tile' layout
function render() {
  currentFolder = 'notes';

  pinboard.innerHTML = '';
  pinboard.innerHTML += renderNewNote(currentView);

  for (let i = 0; i < noteTitle.length; i++) {
    const title = noteTitle[i];
    const text = noteText[i];

    pinboard.innerHTML += renderNormalNote(currentView, title, text, i);
  }
}

//  = this function populates the pinboard with archived notes, allowing the user to view and perform actions
//    on these archived notes, such as unarchiving or permanently deleting them
//    depending on whether the archive is empty, it generates different HTML elements
//  - sets the currentFolder variable to 'archive' to indicate the current folder being displayed
//  - checks if the archive is empty by examining the archivedNoteTitle and archivedNoteText arrays
//  - clears the existing content in the pinboard element
//  - if the archive is empty:
//      * displays a message indicating that the archive is currently empty
//  - if the archive is not empty:
//      * iterates through the archivedNoteTitle and archivedNoteText arrays to display archived notes
//      * for each archived note, it displays the title and text within textareas
//      * provides tools for actions like unarchiving and permanently deleting each archived note
function openArchive() {
  currentFolder = 'archive';

  const isArchiveEmpty =
    archivedNoteTitle.length === 0 && archivedNoteText.length === 0;

  pinboard.innerHTML = '';

  if (isArchiveEmpty) {
    pinboard.innerHTML = /*html*/ `
      
      <div class="folder-status"> 
        <p class="folder-status__p"  >your archive is currently empty</p>
      </div>   
    `;
  } else {
    for (let i = 0; i < archivedNoteTitle.length; i++) {
      const archivedTitle = archivedNoteTitle[i];
      const archivedText = archivedNoteText[i];

      pinboard.innerHTML += renderArchiveNote(
        currentView,
        archivedTitle,
        archivedText,
        i
      );
    }
  }
}

//  = this function populates the pinboard with deleted notes, allowing the user to view
//    and perform actions on these deleted notes, such as restoring them, archiving them, or permanently deleting them
//    depending on whether the bin is empty and the number of items in the bin, it generates different HTML elements
//  - sets the currentFolder variable to 'bin' to indicate the current folder being displayed
//  - checks if the bin is empty by examining the deletedNoteTitle and deletedNoteText arrays
//  - clears the existing content in the pinboard element
//  - if the bin is empty:
//      * displays a message indicating that the bin is empty
//  - if the bin is not empty and contains at least 5 items:
//      * displays a "delete-all" button
//      * iterates through the deletedNoteTitle and deletedNoteText arrays to display notes with tools for actions like restoring, archiving, and permanently deleting.
//  - if the bin is not empty but contains fewer than 5 items:
//      * displays the notes in the bin without the "delete-all" button
function openBin() {
  currentFolder = 'bin';

  const isBinEmpty =
    deletedNoteTitle.length === 0 && deletedNoteText.length === 0;

  pinboard.innerHTML = '';

  if (isBinEmpty) {
    pinboard.innerHTML = /*html*/ `
      <div class="folder-status"> 
        <p class="folder-status__p"  >your bin is currently empty</p>
      </div>
    `;
  } else if (deletedNoteTitle.length >= 5 && deletedNoteText.length >= 5) {
    pinboard.innerHTML += renderDeleteAllBtn();

    for (let i = 0; i < deletedNoteTitle.length; i++) {
      const deletedTitle = deletedNoteTitle[i];
      const deletedText = deletedNoteText[i];

      pinboard.innerHTML += renderBinNote(
        currentView,
        deletedTitle,
        deletedText,
        i
      );
    }
  } else {
    for (let i = 0; i < deletedNoteTitle.length; i++) {
      const deletedTitle = deletedNoteTitle[i];
      const deletedText = deletedNoteText[i];

      pinboard.innerHTML += renderBinNote(
        currentView,
        deletedTitle,
        deletedText,
        i
      );
    }
  }
}

/// NEW-NOTE BEHAVIOR ///

//  = expands the new note input section, allowing users to add a new note title and text
//  - checks the current view mode ('row' or 'tile') to determine how to expand the new note
//  - if the current view mode is 'row':
//    * removes the 'shrink-new' and 'shrinked' classes from the new note, making it expand
//    * adds the 'expand-new' class to animate the expansion
//    * after a delay, displays the toolbar and fully expands the new note
//  - if the current view mode is 'tile':
//    * simply displays the toolbar for tile view without animation
function expandNewNote() {
  const newNote = document.getElementById('newnote');
  const toolBar = document.getElementById('toolbar');

  if (newNote.classList.contains('note__row')) {
    newNote.classList.remove('shrink-new');
    newNote.classList.remove('shrinked');
    newNote.classList.add('expand-new');

    setTimeout(() => {
      toolBar.classList.add('tools');
      toolBar.classList.remove('d-none');
      newNote.classList.add('expanded');
      newNote.classList.remove('expand-new');
    }, 285);
  } else if (newNote.classList.contains('note__tile')) {
    toolBar.classList.add('tools');
    toolBar.classList.remove('d-none');
  }
}
render();

//  = this function shrinks the new note input section, hiding it from view
//  - it checks the current view mode ('row' or 'tile') to determine how to shrink the new note
//  - if the current view mode is 'row':
//    * hides the toolbar by removing the 'tools' class and adding the 'd-none' class
//    * removes the 'expanded', 'expand-new', 'shrink-new', and 'shrinked' classes from the new note
//    * adds the 'shrink-new' class to animate the shrinking effect
//  - if the current view mode is 'tile':
//    * hides the toolbar for tile view by removing the 'tools' class and adding the 'd-none' class
function shrinkNewNote() {
  const newNote = document.getElementById('newnote');
  const toolBar = document.getElementById('toolbar');

  if (newNote.classList.contains('note__row')) {
    toolBar.classList.remove('tools');
    toolBar.classList.add('d-none');
    newNote.classList.remove('expanded', 'expand-new');

    setTimeout(() => {
      newNote.classList.add('shrink-new');
      newNote.classList.add('shrinked');
      newNote.classList.remove('shrink-new');
    }, 285);
  } else if (newNote.classList.contains('note__tile')) {
    toolBar.classList.remove('tools');
    toolBar.classList.add('d-none');
  }
}
render();

//  = this function clears the content of the new note input section and then shrinks it
//  - selects the new note element and all the textareas within it
//  - iterates through the textareas and sets their values to an empty string, clearing the content
//  - calls the 'shrinkNewNote' function to shrink and hide the new note input section
function refreshNewNote() {
  const newNote = document.getElementById('newnote');
  const textareas = newNote.querySelectorAll('textarea');

  textareas.forEach((textarea) => {
    textarea.value = '';
  });

  shrinkNewNote();
}

//  = this function saves a new note by capturing the title and text entered by the user
//  - retrieves the title and note text from the corresponding textareas in the new note input section
//  - checks if both the title and note are not empty or contain only whitespace characters
//  - if both the title and note are non-empty:
//      * adds the title and note to the noteTitle and noteText arrays respectively
//      * triggers the 'save' function to save the changes
//  - calls the 'refreshNewNote' function to reset the new note input section
//  - depending on the current view mode:
//      * if the current view mode is 'tile', calls the 'showTiles' function to display notes in tile view
//      * if the current view mode is 'row', calls the 'showRows' function to display notes in row view
function saveNewNote() {
  const titleTextarea = document.getElementById('new-note-title');
  const noteTextarea = document.getElementById('new-note-text');

  const title = titleTextarea.value;
  const note = noteTextarea.value;

  if (title.trim() !== '' && note.trim() !== '') {
    noteTitle.push(title);
    noteText.push(note);
    save();
  }
  refreshNewNote();

  if (currentView === 'tile') {
    showTiles();
  } else if (currentView === 'row') {
    showRows();
  }
}

/// TOOL-BAR - FUNCTIONS ///

//  = this function saves a new note by capturing the title and text entered by the user
//  - retrieves the title and note text from the corresponding textareas in the new note input section
//  - checks if both the title and note are not empty or contain only whitespace characters
//  - if both the title and note are non-empty:
//      * adds the title and note to the noteTitle and noteText arrays respectively
//      * triggers the 'save' function to save the changes
//  - calls the 'refreshNewNote' function to reset the new note input section
//  - depending on the current view mode:
//      * if the current view mode is 'tile', calls the 'showTiles' function to display notes in tile view
//      * if the current view mode is 'row', calls the 'showRows' function to display notes in row view
function saveNote(i) {
  if (currentFolder === 'notes' && i >= 0 && i < noteTitle.length) {
    const titleTextarea = document.getElementById(`note-title-${i}`);
    const textTextarea = document.getElementById(`note-text-${i}`);

    const newTitle = titleTextarea.value;
    const newText = textTextarea.value;

    if (newTitle.trim() !== '' && newText.trim() !== '') {
      noteTitle[i] = newTitle;
      noteText[i] = newText;
      save();
    }

    titleTextarea.setAttribute('readonly', 'true');
    textTextarea.setAttribute('readonly', 'true');
  }
}

//  = this function restores a deleted note from the bin based on the provided index 'i'
//  - checks if the provided index 'i' is within valid bounds, ensuring it's not negative and does not exceed the length of the deletedNoteTitle and deletedNoteText arrays
//  - if the index 'i' is valid:
//      * removes the restored title and text from the deletedNoteTitle and deletedNoteText arrays respectively using 'splice', and stores them in 'restoredTitle' and 'restoredText' variables
//      * adds the restored title and text to the noteTitle and noteText arrays respectively
//      * triggers the 'save' function to save the changes
//      * calls the 'openBin' function to update the bin view
function restoreFromBin(i) {
  if (i >= 0 && i < deletedNoteTitle.length && i < deletedNoteText.length) {
    let restoredTitle = deletedNoteTitle.splice(i, 1)[0];
    let restoredText = deletedNoteText.splice(i, 1)[0];

    noteTitle.push(restoredTitle);
    noteText.push(restoredText);

    save();
    openBin();
  }
}

//  = this function unarchives a note from the archive based on the provided index 'i'
//  - checks if the provided index 'i' is within valid bounds, ensuring it's not negative and does not exceed the length of the archivedNoteTitle and archivedNoteText arrays
//  - if the index 'i' is valid:
//      * removes the unarchived title and text from the archivedNoteTitle and archivedNoteText arrays respectively using 'splice', and stores them in 'unarchivedTitle' and 'unarchivedText' variables
//      * adds the unarchived title and text to the noteTitle and noteText arrays respectively
//      * triggers the 'save' function to save the changes
//      * calls the 'openArchive' function to update the archive view
function unarchiveNote(i) {
  if (i >= 0 && i < archivedNoteTitle.length && i < archivedNoteText.length) {
    let unarchivedTitle = archivedNoteTitle.splice(i, 1)[0];
    let unarchivedText = archivedNoteText.splice(i, 1)[0];

    noteTitle.push(unarchivedTitle);
    noteText.push(unarchivedText);

    save();
    openArchive();
  }
}

//  = this function enables editing of notes within the 'notes' folder
//  - takes an index 'i' as a parameter and, if the current folder is 'notes',
//    and the index is in valid bounds, it finds the corresponding title and text textarea elements,
//    removes the readonly attribute from both, and allows the user to edit the content of the selected note
//  - inside Inside the if block:
//      * const titleTextarea: selects the textarea element with an ID that corresponds to the title
//        of the note the user wants to edit, based on the provided index 'i'
//        it stores a reference to this textarea element in the titleTextarea variable
//      * const textTextarea: in the same way, this selects the textarea element with an ID
//        corresponding to the text of the note the user wants to edit, based on the provided index 'i'
//        and stores it in the textTextarea variable
//  - removes the readonly attribute from both textareas, so the user is able to edit the content of the selected note
function editNote(i) {
  const checkButtons = document.querySelectorAll('.tools-check');
  const cancelButtons = document.querySelectorAll('.tools-cancel');

  if (currentFolder === 'notes' && i >= 0 && i < noteTitle.length) {
    const titleTextarea = document.getElementById(`note-title-${i}`);
    const textTextarea = document.getElementById(`note-text-${i}`);

    titleTextarea.removeAttribute('readonly');
    textTextarea.removeAttribute('readonly');

    checkButtons.forEach((button) => button.classList.remove('d-none'));
    cancelButtons.forEach((button) => button.classList.remove('d-none'));
  }
}

//  = this function archives a note from the main notes view based on the provided index 'i'
//  - checks if the provided index 'i' is within valid bounds, ensuring it's not negative and does not exceed the length of the noteTitle and noteText arrays
//  - if the index 'i' is valid:
//      * removes the archived title and text from the noteTitle and noteText arrays respectively using 'splice', and stores them in 'archivedTitle' and 'archivedText' variables
//      * adds the archived title and text to the archivedNoteTitle and archivedNoteText arrays respectively
//      * triggers the 'save' function to save the changes
//      * calls the 'render' function to update the UI to reflect the changes
function archiveFromNotes(i) {
  if (i >= 0 && i < noteTitle.length && i < noteText.length) {
    let archivedTitle = noteTitle.splice(i, 1)[0];
    let archivedText = noteText.splice(i, 1)[0];

    archivedNoteTitle.push(archivedTitle);
    archivedNoteText.push(archivedText);

    save();
    render();
  }
}

//  = this function archives a note from the bin view based on the provided index 'i'
//  - checks if the provided index 'i' is within valid bounds, ensuring it's not negative and does not exceed the length of the deletedNoteTitle and deletedNoteText arrays
//  - if the index 'i' is valid:
//      * removes the archived title and text from the deletedNoteTitle and deletedNoteText arrays respectively using 'splice', and stores them in 'archivedTitle' and 'archivedText' variables
//      * adds the archived title and text to the archivedNoteTitle and archivedNoteText arrays respectively
//      * triggers the 'save' function to save the changes
//      * calls the 'openBin' function to refresh the bin view and reflect the changes
function archiveFromBin(i) {
  if (i >= 0 && i < deletedNoteTitle.length && i < deletedNoteText.length) {
    let archivedTitle = deletedNoteTitle.splice(i, 1)[0];
    let archivedText = deletedNoteText.splice(i, 1)[0];

    archivedNoteTitle.push(archivedTitle);
    archivedNoteText.push(archivedText);

    save();
    openBin();
  }
}

//  = this function permanently deletes a note from the main notes view based on the provided index 'i'
//  - checks if the provided index 'i' is within valid bounds, ensuring it's not negative and does not exceed the length of the noteTitle and noteText arrays
//  - if the index 'i' is valid:
//      * removes the deleted title and text from the noteTitle and noteText arrays respectively using 'splice', and stores them in 'deletedTitle' and 'deletedText' variables
//      * adds the deleted title and text to the deletedNoteTitle and deletedNoteText arrays respectively
//      * triggers the 'save' function to save the changes
//      * calls the 'render' function to refresh the view and reflect the changes
function deleteFromNotes(i) {
  if (i >= 0 && i < noteTitle.length && i < noteText.length) {
    let deletedTitle = noteTitle.splice(i, 1)[0];
    let deletedText = noteText.splice(i, 1)[0];

    deletedNoteTitle.push(deletedTitle);
    deletedNoteText.push(deletedText);

    save();
    render();
  }
}

//  = this function archives a note from the main notes view based on the provided index 'i'
//  - checks if the provided index 'i' is within valid bounds, ensuring it's not negative and does not exceed the length of the noteTitle and noteText arrays
//  - if the index 'i' is valid:
//      * removes the archived title and text from the noteTitle and noteText arrays respectively using 'splice', and stores them in 'archivedTitle' and 'archivedText' variables
//      * adds the archived title and text to the archivedNoteTitle and archivedNoteText arrays respectively
//      * triggers the 'save' function to save the changes
//      * calls the 'render' function to refresh the view and reflect the changes
function archiveNote(i) {
  if (i >= 0 && i < noteTitle.length && i < noteText.length) {
    let archivedTitle = noteTitle.splice(i, 1)[0];
    let archivedText = noteText.splice(i, 1)[0];

    archivedNoteTitle.push(archivedTitle);
    archivedNoteText.push(archivedText);

    save();
    render();
  }
}

//  = this function permanently deletes an archived note based on the provided index 'i' from the archive view
//  - checks if the provided index 'i' is within valid bounds, ensuring it's not negative and does not exceed the length of the archivedNoteTitle and archivedNoteText arrays
//  - if the index 'i' is valid:
//      * removes the deleted title and text from the archivedNoteTitle and archivedNoteText arrays respectively using 'splice', and stores them in 'deletedTitle' and 'deletedText' variables
//      * adds the deleted title and text to the deletedNoteTitle and deletedNoteText arrays respectively
//      * triggers the 'save' function to save the changes
//      * calls the 'openArchive' function to refresh and display the updated archive view
function deleteFromArchive(i) {
  if (i >= 0 && i < archivedNoteTitle.length && i < archivedNoteText.length) {
    let deletedTitle = archivedNoteTitle.splice(i, 1)[0];
    let deletedText = archivedNoteText.splice(i, 1)[0];

    deletedNoteTitle.push(deletedTitle);
    deletedNoteText.push(deletedText);

    save();
    openArchive();
  }
}

//  = this function permanently deletes a note from the bin view based on the provided index 'i'
//  - checks if the current folder is 'bin' and if the provided index 'i' is within valid bounds, ensuring it's not negative and does not exceed the length of the deletedNoteTitle array
//  - if the conditions are met:
//      * removes the deleted title and text from the deletedNoteTitle and deletedNoteText arrays respectively using 'splice'
//      * triggers the 'save' function to save the changes
//      * calls the 'openBin' function to refresh and display the updated bin view
function deletePermanently(i) {
  if (currentFolder === 'bin' && i >= 0 && i <= deletedNoteTitle.length) {
    deletedNoteTitle.splice(i, 1)[0];
    deletedNoteText.splice(i, 1)[0];
    save();
    openBin();
  }
}

//  = this function allows the user to cancel any edits made to a note, restoring it
//    to its last saved state and preventing further changes
//  - the function takes the parameter i, which represents the index of the note to reset to its previous state
//  - starts by checking if the current folder is 'notes' and if i is a valid index within the noteTitle array using a condition
//    to ensures that the operation is only performed when the current folder is 'notes' and the index is within bounds
//  - inside the 'if' block (when the conditions are met):
//      * retrieves the title and text textareas from the HTML DOM using their IDs, which include
//        the corresponding index 'i'
//        (for example, if i is 2, it will retrieve the textareas with IDs 'note-title-2' and 'note-text-2')
//      * sets the value of the title textarea to the corresponding value in the noteTitle array
//        using titleTextarea.value = noteTitle[i]
//      * sets the value of the text textarea to the corresponding value in the noteText array using textTextarea.value = noteText[i]
//      * sets the 'readonly' attribute to 'true' for both textareas which prevents further edits
function cancelChanges(i) {
  const titleTextarea = document.getElementById(`note-title-${i}`);
  const textTextarea = document.getElementById(`note-text-${i}`);

  const checkButtons = document.querySelectorAll('.tools-check');
  const cancelButtons = document.querySelectorAll('.tools-cancel');

  if (currentFolder === 'notes' && i >= 0 && i < noteTitle.length) {
    titleTextarea.value = noteTitle[i];
    textTextarea.value = noteText[i];

    titleTextarea.setAttribute('readonly', 'true');
    textTextarea.setAttribute('readonly', 'true');

    checkButtons.forEach((button) => button.classList.add('d-none'));
    cancelButtons.forEach((button) => button.classList.add('d-none'));
  }
}
