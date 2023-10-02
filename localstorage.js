/// LOCAL STORAGE ///

//  = function to save changes on notes (generate new, deleting, archiving)
//  - converts the noteTitle array into a JSON-formatted string representation
//    and assigns it to the titleAsText variable
//  - stores the JSON-formatted titleAsText string in the web browser's local storage
//    under the key 'noteTitle', which allows the note titles to be persisted locally in the user's browser
//  - repeats the same procedure with the remaining arrays for deleted and archived note-items
function save() {
  let titleAsText = JSON.stringify(noteTitle);
  localStorage.setItem('noteTitle', titleAsText);

  let textAsText = JSON.stringify(noteText);
  localStorage.setItem('noteText', textAsText);

  let deletedTitleAsText = JSON.stringify(deletedNoteTitle);
  localStorage.setItem('deletedNoteTitle', deletedTitleAsText);

  let deletedTextAsText = JSON.stringify(deletedNoteText);
  localStorage.setItem('deletedNoteText', deletedTextAsText);

  let archivedTitleAsText = JSON.stringify(archivedNoteTitle);
  localStorage.setItem('archivedNoteTitle', archivedTitleAsText);

  let archivedTextAsText = JSON.stringify(archivedNoteText);
  localStorage.setItem('archivedNoteText', archivedTextAsText);

  render();
}

//  = the load() function retrieves previously saved data from local storage and updates the
//    corresponding arrays with that data if it exists in local storage This allows the
//    application to load previously saved notes and deleted notes when the user accesses the page
//  - retrieving the serialized JSON string for noteTitle from local storage and assigns it to the titleAsText variable
//  - retrieving the serialized JSON string for noteText from local storage and assigns it to the textAsText variable
//  - checks if both titleAsText and textAsText have values
//  - if both titleAsText and textAsText have values, it means there is data stored in local storage
//    for note titles and note contents - in this case:
//    parses the JSON string titleAsText and update the noteTitle array with the stored data
//    parses the JSON string textAsText and updates the noteText array with the stored data
//  - repeats the same procedure with the remaining arrays for deleted and archived note-items
function load() {
  let titleAsText = localStorage.getItem('noteTitle');
  let textAsText = localStorage.getItem('noteText');

  if (titleAsText && textAsText) {
    noteTitle = JSON.parse(titleAsText);
    noteText = JSON.parse(textAsText);
  }

  let deletedTitleAsText = localStorage.getItem('deletedNoteTitle');
  let deletedTextAsText = localStorage.getItem('deletedNoteText');

  if (deletedTitleAsText && deletedTextAsText) {
    deletedNoteTitle = JSON.parse(deletedTitleAsText);
    deletedNoteText = JSON.parse(deletedTextAsText);
  }

  let archivedTitleAsText = localStorage.getItem('archivedNoteTitle');
  let archivedTextAsText = localStorage.getItem('archivedNoteText');

  if (archivedTitleAsText && archivedTextAsText) {
    archivedNoteTitle = JSON.parse(archivedTitleAsText);
    archivedNoteText = JSON.parse(archivedTextAsText);
  }
}
