// notes - folder

function renderNewNote(currentView) {
  return /*html*/ `
    <div class="new note__${currentView}  note" id="newnote">
      <textarea id="new-note-title" placeholder="add new title" onclick="expandNewNote()"></textarea>
      <textarea id="new-note-text" placeholder="write a new note..." onclick="expandNewNote()"></textarea>
      <div id="toolbar" class="tools d-none">
        <div class="tools-check" id="check-btn" onclick="saveNewNote()">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
            fill="#c5c5c5"
            d="M18.9 8.1L9 18l-4.95-4.95l.71-.71L9 16.59l9.19-9.2l.71.71Z" />
          </svg>
        </div>

        <div class="tools-cancel" id="cancel-btn" onclick="refreshNewNote()">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
            fill="#c5c5c5"
            d="M6 20v-1h1v1H6m7-12a6 6 0 0 1 6 6a6 6 0 0 1-6 6H9v-1h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5H5.91l3.04 3.04l-.71.7L4 8.5l4.24-4.24l.71.7L5.91 8H13Z" />
          </svg>
        </div>
      </div>
    </div>
  `;
}

function renderNormalNote(currentView, title, text, i) {
  return /*html*/ `
      <div class="note__${currentView}  note" id="note">
          <textarea readonly id="note-title-${i}">${title}</textarea>
          <textarea readonly id="note-text-${i}">${text}</textarea>
          <div class="tools">
            <div class="tools-check d-none" id="save-btn" onclick="saveNote(${i})">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#c5c5c5"
                  d="M18.9 8.1L9 18l-4.95-4.95l.71-.71L9 16.59l9.19-9.2l.71.71Z" />
              </svg>
            </div>
          
            <div class="tools-cancel d-none" id="undo-btn" onclick="cancelChanges(${i})">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#c5c5c5"
                  d="M6 20v-1h1v1H6m7-12a6 6 0 0 1 6 6a6 6 0 0 1-6 6H9v-1h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5H5.91l3.04 3.04l-.71.7L4 8.5l4.24-4.24l.71.7L5.91 8H13Z" />
              </svg>
            </div>

            <div class="tools-edit" id="edit-btn" onclick="editNote(${i})">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#c5c5c5"
                  d="m19.71 8.04l-2.34 2.33l-3.75-3.75l2.34-2.33c.39-.39 1.04-.39 1.41 0l2.34 2.34c.39.37.39 1.02 0 1.41M3 17.25L13.06 7.18l3.75 3.75L6.75 21H3v-3.75M16.62 5.04l-1.54 1.54l2.34 2.34l1.54-1.54l-2.34-2.34M15.36 11L13 8.64l-9 9.02V20h2.34l9.02-9Z" />
              </svg>
            </div>

            <div class="tools-archive" id="archive-btn" onclick="archiveNote(${i})">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#c5c5c5"
                  d="M6 4h11a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3m0 1a2 2 0 0 0-2 2v8h5v.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5V15h5V7a2 2 0 0 0-2-2H6M4 18a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2h-4.04c-.24 1.7-1.7 3-3.46 3s-3.22-1.3-3.46-3H4v2Z" />
              </svg>
            </div>

            <div class="tools-bin" id="delete-btn" onclick="deleteFromNotes(${i})">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                fill="#c5c5c5"
                d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1v12M6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7H6m12-1V5h-4l-1-1h-3L9 5H5v1h13M8 9h1v10H8V9m6 0h1v10h-1V9Z" />
              </svg>
            </div>
          </div>
        </div>
  `;
}

// archive - folder

function renderArchiveNote(currentView, archivedTitle, archivedText, i) {
  return /*html*/ `         
      <div class="note__${currentView}  note" id="note">
        <textarea readonly id="note-title">${archivedTitle}</textarea>
        <textarea readonly id="note-text">${archivedText}</textarea>
        <div class="tools">                     

            <div class="tools-cancel" id="restore-btn" onclick="unarchiveNote(${i})">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#c5c5c5"
                  d="M6 20v-1h1v1H6m7-12a6 6 0 0 1 6 6a6 6 0 0 1-6 6H9v-1h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5H5.91l3.04 3.04l-.71.7L4 8.5l4.24-4.24l.71.7L5.91 8H13Z" />
              </svg>
            </div>
          
            <div class="tools-bin" id="delete-btn" onclick="deleteFromArchive(${i})">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                fill="#c5c5c5"
                d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1v12M6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7H6m12-1V5h-4l-1-1h-3L9 5H5v1h13M8 9h1v10H8V9m6 0h1v10h-1V9Z" />
              </svg>
            </div>
          </div>
      </div>
    `;
}

// bin - folder

function renderDeleteAllBtn() {
  return /*html*/ `
      <div class="delete-all-container">
        <div class="delete-all" onclick="emptyBin()">
          <svg width="48" height="48" viewBox="0 0 24 24">
            <path
                fill="#c5c5c5"
                d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1v12M6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7H6m12-1V5h-4l-1-1h-3L9 5H5v1h13M8 9h1v10H8V9m6 0h1v10h-1V9Z" />
          </svg>
        </div>
      </div>
    `;
}

function renderBinNote(currentView, deletedTitle, deletedText, i) {
  return /*html*/ `
      
      <div class="note__${currentView}  note bin-note__style ">
        <textarea readonly id="note-title">${deletedTitle}</textarea>
        <textarea readonly id="note-text">${deletedText}</textarea>
        <div class="tools">                     

            <div class="tools-cancel" id="restore-btn" onclick="restoreFromBin(${i})">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#c5c5c5"
                  d="M6 20v-1h1v1H6m7-12a6 6 0 0 1 6 6a6 6 0 0 1-6 6H9v-1h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5H5.91l3.04 3.04l-.71.7L4 8.5l4.24-4.24l.71.7L5.91 8H13Z" />
              </svg>
            </div>

            <div class="tools-archive" id="archive-btn" onclick="archiveFromBin(${i})">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#c5c5c5"
                  d="M6 4h11a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3m0 1a2 2 0 0 0-2 2v8h5v.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5V15h5V7a2 2 0 0 0-2-2H6M4 18a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2h-4.04c-.24 1.7-1.7 3-3.46 3s-3.22-1.3-3.46-3H4v2Z" />
              </svg>
            </div>

            <div class="tools-bin" id="delete-btn" onclick="deletePermanently(${i})">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                fill="#c5c5c5"
                d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1v12M6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7H6m12-1V5h-4l-1-1h-3L9 5H5v1h13M8 9h1v10H8V9m6 0h1v10h-1V9Z" />
              </svg>
            </div>
          </div>
      </div>
    `;
}

//  = this function empties the bin by clearing the deleted note titles and texts
//  - sets the deletedNoteTitle and deletedNoteText arrays to empty arrays, effectively removing all deleted notes
//  - triggers the 'save' function to save the changes
//  - calls the 'openBin' function to refresh and display the updated bin view
function emptyBin() {
  deletedNoteTitle = [];
  deletedNoteText = [];
  save();
  openBin();
}
