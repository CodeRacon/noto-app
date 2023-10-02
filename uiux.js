// #side-menu (styling & fold/unfold-animation)
const unfoldIcon = document.getElementById('unfold-icon');
const foldIcon = document.getElementById('fold-icon');
const sideMenu = document.getElementById('sidemenu');
const sideMenuTxt = document.getElementsByClassName('side-menu__p');
const sideMenuTags = document.querySelectorAll('.side-menu__tag');

/// UI/MENU - BEHAVIOR ///

//  = this function toggles between tile view and row view based on the visibility of the
//    corresponding icons:
//    if the row view is active, it switches to tile view, else, it switches to row view
//  - checks whether the row icon is visible (!rowIcon.classList.contains('d-none'))
//    and the tile icon is hidden (tileIcon.classList.contains('d-none'))
//      * if the conditions in the 1st if statement are met, it calls showTiles() to display notes in a tile format
//      * if the conditions in the 2nd if statement are met, it calls showRows() to display notes in a row format
function toggleTileRow() {
  if (
    !rowIcon.classList.contains('d-none') &&
    tileIcon.classList.contains('d-none')
  ) {
    showTiles();
  } else if (
    rowIcon.classList.contains('d-none') &&
    !tileIcon.classList.contains('d-none')
  ) {
    showRows();
  }
}

//  = this function switches the interface to display notes in a row view, updating the classes
//    and visibility of icons and elements accordingly
//  - sets the currentView variable to 'tile'
//  - removes the 'd-none' class from the row icon (making it visible) and adds the 'd-none'
//    class to the tile icon (making it hidden), whateffectivly switches the visibility of the view icons
//  - removes the 'pin-board__tile' class from the pinboard element and adds
//    the 'pin-board__row' class, changing the layout to a row view
//  - iterates through the notes array and changes the classes of individual note elements
//    from 'note__tile' to 'note__row' which ensures that the notes are displayed in the selected row view
//  - sets the currentView variable to 'row' to reflect the current view mode
//  - checks the current folder and triggers the appropriate rendering function or folder opening function
function showRows() {
  currentView = 'tile';

  rowIcon.classList.remove('d-none');
  tileIcon.classList.add('d-none');
  pinboard.classList.remove('pin-board__tile');
  pinboard.classList.add('pin-board__row');
  notes.forEach((note) => {
    note.classList.remove('note__tile');
    note.classList.add('note__row');
  });
  currentView = 'row';

  if (currentFolder !== 'bin' && currentFolder !== 'archive') {
    render();
  } else if (currentFolder === 'bin') {
    openBin(currentView);
  } else if (currentFolder === 'archive') {
    openArchive(currentView);
  }
}

//  = this function switches the UI to display notes in tile view, updating the classes
//    and visibility of the right icon and elements accordingly
//  - sets the currentView variable to 'row'
//  - gets the newNote element by its ID
//  - checks if newNote exists:
//      * if it does, it removes the 'shrinked' and 'shrink-new' classes from newNote
//        this ensures that the new-note-section isn't in 'shrink' state when switching to tile view
//  - adds 'd-none' class to the row icon (making it hidden) and removes it from the
//    tile icon (making it visible) what switches the visibility of the view icons
//  - removes the 'pin-board__row' class from the pinboard element and adds
//    the 'pin-board__tile' class, changing the layout to a tile view
//  - iterates through the notes array and changes the classes of individual note elements
//    from 'note__row' to 'note__tile' what ensures that the notes are displayed in the selected tile view
//  - checks if newNote exists and has specific classes:
//      * if it does and is in a 'note__tile' state, it removes the 'shrinked' and
//        'shrink-new' classes from newNote
//  - sets the currentView variable to 'tile' to reflect the current view mode
//  - checks the current folder and triggers the appropriate rendering function or folder opening function
function showTiles() {
  currentView = 'row';

  const newNote = document.getElementById('newnote');

  if (newNote) {
    newNote.classList.remove('shrinked');
    newNote.classList.remove('shrink-new');
  }

  rowIcon.classList.add('d-none');
  tileIcon.classList.remove('d-none');
  pinboard.classList.remove('pin-board__row');
  pinboard.classList.add('pin-board__tile');
  notes.forEach((note) => {
    note.classList.remove('note__row');
    note.classList.add('note__tile');
  });

  if (newNote && newNote.classList) {
    if (newNote.classList.contains('note__tile')) {
      newNote.classList.remove('shrinked');
      newNote.classList.remove('shrink-new');
    }
  }
  currentView = 'tile';

  if (currentFolder !== 'bin' && currentFolder !== 'archive') {
    render();
  } else if (currentFolder === 'bin') {
    openBin(currentView);
  } else if (currentFolder === 'archive') {
    openArchive(currentView);
  }
}

//  - this function toggles between folding and unfolding the menu based on the visibility
//    of the fold and unfold icons:
//      * if the fold icon is visible, it folds the menu
//      * if the unfold icon is visible, it unfolds the menu
//  - checks if the foldIcon element is not hidden (!foldIcon.classList.contains('d-none'))
//    and the unfoldIcon element is hidden (unfoldIcon.classList.contains('d-none')):
//      * if the above condition is true, it calls the foldMenu() function
//        meaning, if the menu is currently unfolded, clicking the toggle button will fold the menu
//      * if the first condition is not met (the fold icon is not visible or the unfold icon
//        is not hidden), it checks the second condition
//  - verifies if the foldIcon element is hidden (foldIcon.classList.contains('d-none'))
//    and the unfoldIcon element is not hidden (!unfoldIcon.classList.contains('d-none'))
//  - if the second condition is true, it calls the unfoldMenu() function, meaning that if
//    the menu is currently folded, clicking the toggle button will unfold the menu
function toggleMenu() {
  if (
    !foldIcon.classList.contains('d-none') &&
    unfoldIcon.classList.contains('d-none')
  ) {
    foldMenu();
  } else if (
    foldIcon.classList.contains('d-none') &&
    !unfoldIcon.classList.contains('d-none')
  ) {
    unfoldMenu();
  }
}

//  = this function is responsible for animating the folding of the side-menu
//    hides the fold icon, shows the unfold icon, hides text elements, adjusts the width
//    of the menu, and applies CSS classes for styling the folded menu
//  - switches from fold icon to unfold icon by hiding the foldIcon by adding 'd-none' &
//    showing the unfoldIcon by removing 'd-none'
//  - adds the 'fold-menu' class to the sideMenu element to start smooth animation of width-change
//  - loops through all the sideMenuTxt - elements and hides them by adding the 'd-none' class
//    effectively hiding the text content of the menu items
//  - uses a setTimeout function to delay the following actions by 285 ms.
//  - within the setTimeout callback function:
//      * removes class 'unfolded' = width 12.5rem
//      * simultaneously sets the width of the sideMenu element to 4.5rem by adding 'folded'
//      * removes the 'fold-menu' class from the sideMenu element, which reveals the folded menu
function foldMenu() {
  sideMenu.classList.remove('unfolded');
  foldIcon.classList.add('d-none');
  unfoldIcon.classList.remove('d-none');

  sideMenu.classList.add('fold-menu');

  for (let i = 0; i < sideMenuTxt.length; i++) {
    sideMenuTxt[i].classList.add('d-none');
  }
  setTimeout(function () {
    sideMenu.classList.add('folded');

    sideMenu.classList.remove('fold-menu');
  }, 285);
}
foldMenu();

//  = this function is responsible for animating the unfolding of the side-menu,
//    hides the unfold icon, shows the fold icon, adjusts the width of the side-menu,
//    reveals text elements and applies classes for animation purpose
//  - hides the unfoldIcon by adding 'd-none' and shows the foldIcon by removing 'd-none'
//  - removes the 'folded' class, adds the 'unfold-menu' class to the sideMenu element to start animation
//  - uses setTimeout function to perform the following actions with a delay of 285ms for smooth unfolding animation
//  - Within the setTimeout callback function:
//      * loops through all elements in the sideMenuTxt array and shows them by removing 'd-none'
//      * removes the 'unfold-menu' class from the sideMenu element to complete unfolding animation
//      * adds the 'unfolded' class to the sideMenu element to set it to a width of 12.5rem
function unfoldMenu() {
  unfoldIcon.classList.add('d-none');
  foldIcon.classList.remove('d-none');
  sideMenu.classList.remove('folded');
  sideMenu.classList.add('unfold-menu');

  setTimeout(function () {
    for (let i = 0; i < sideMenuTxt.length; i++) {
      sideMenuTxt[i].classList.remove('d-none');
      sideMenu.classList.remove('unfold-menu');
      sideMenu.classList.add('unfolded');
    }
  }, 285);
}

/// SIDE-MENU HIGHLIGHTING ///

//  = this code is responsible for toggling the 'active' class on clicked menu tags
//    resulting in highlighting the selected tag by applying specific styling
//  - iterates through all elements in the sideMenuTags array using a forEach-loop
//  - adds a click event listener for each tag element, using addEventListener
//  - when a tag is clicked the event handler function is executed:
//      * removes the 'active' class from all other sideMenuTags elements
//        (ensures that only one element at a time can have the 'active' class)
//      * adds the 'active' class to the clicked tag element (visually highlights the clicked tag)
//      * checks if there is an SVG element within the clicked tag:
//         if an SVG element is found, it applies a drop shadow filter to it, adding a shadow effect to the SVG.
//  - checks if there is a paragraph element with the class 'side-menu__p' within the clicked tag:
//      * if such paragraph element exists, it applies certain highlighting

sideMenuTags.forEach((tag) => {
  tag.addEventListener('click', () => {
    sideMenuTags.forEach((otherTag) => {
      if (otherTag !== tag) {
        otherTag.classList.remove('active');
      }
    });

    tag.classList.add('active');

    const svg = tag.querySelector('svg');
    const paragraph = tag.querySelector('.side-menu__p');

    if (svg) {
      svg.classList.add('menu-highlight__svg');
    }

    if (paragraph) {
      paragraph.classList.add('menu-highlight__p');
    }
  });
});

/// SIDE-MENU RESPONSIVNESS ///

window.addEventListener('resize', function () {
  const windowWith = window.innerWidth;

  if (windowWith <= 767) {
    foldMenu();
  }
});
