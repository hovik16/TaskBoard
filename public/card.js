/* The text to use when description is empty */
const NO_DESCRIPTION_TEXT = "(No description)";

export default class Card {
  constructor(title, color) {
    this.title = title;
    this.color = color;
    this.description = NO_DESCRIPTION_TEXT;

    // Find the template element
    let template = document.querySelector('.template.card');

    // Duplicate the template element
    this.duplicatedElement = template.cloneNode(true);

    // Remove the "template" class from the duplicated element
    this.duplicatedElement.classList.remove('template');

    // Modify the duplicated element
    let titleElement = this.duplicatedElement.querySelector('.title');
    titleElement.textContent = this.title;

    let descriptionElement = this.duplicatedElement.querySelector('.description');
    descriptionElement.textContent = this.description;

    this.duplicatedElement.style.backgroundColor = this.color;

    // Add event listener to the delete button
    let deleteButton = this.duplicatedElement.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
      this.duplicatedElement.remove();
      this.saveNotes();
    });

    // Add event listener to the edit button
    let editButton = this.duplicatedElement.querySelector('.edit');
    editButton.addEventListener('click', () => {
      let descriptionElement = this.duplicatedElement.querySelector('.description');
      descriptionElement.classList.add('hidden');
      let editArea = this.duplicatedElement.querySelector('.editDescription');
      editArea.classList.remove('hidden');
      editArea.focus();
    });
    // Add event listener to the textarea
    let editArea = this.duplicatedElement.querySelector('.editDescription');
    editArea.addEventListener('blur', () => {
      this.setDescription(editArea.value);
      descriptionElement.classList.remove('hidden');
      editArea.classList.add('hidden');
    });
    
    // Event listeners for hidden buttons
    this.duplicatedElement.addEventListener('mouseover', () => {
      let editButton = this.duplicatedElement.querySelector('.edit');
      let startMoveButton = this.duplicatedElement.querySelector('.startMove');
      let deleteButton = this.duplicatedElement.querySelector('.delete');
      editButton.classList.remove('hidden');
      startMoveButton.classList.remove('hidden');
      deleteButton.classList.remove('hidden');
    });
    this.duplicatedElement.addEventListener('mouseout', () => {
      let editButton = this.duplicatedElement.querySelector('.edit');
      let startMoveButton = this.duplicatedElement.querySelector('.startMove');
      let deleteButton = this.duplicatedElement.querySelector('.delete');
      editButton.classList.add('hidden');
      startMoveButton.classList.add('hidden');
      deleteButton.classList.add('hidden');
    });

    if(this.color === "" || this.isLightColor(color)) {
      this.duplicatedElement.style.color = "black";
    } else {
      this.duplicatedElement.style.color = "#ffffff";
      let editButton = this.duplicatedElement.querySelector('.edit');
      let startMoveButton = this.duplicatedElement.querySelector('.startMove');
      let deleteButton = this.duplicatedElement.querySelector('.delete');
      editButton.classList.add('lightButton');
      startMoveButton.classList.add('lightButton');
      deleteButton.classList.add('lightButton');
      // TODO: button icons are white too
    }
  }

  // Function to convert color name to RGB
  colorNameToRgb(colorName) {
    let tempElement = document.createElement("div");
    tempElement.style.color = colorName;
    document.body.appendChild(tempElement);

    let computedColor = window.getComputedStyle(tempElement).color;

    document.body.removeChild(tempElement);

    let rgbValues = computedColor.match(/\d+/g).map(Number);
    return { r: rgbValues[0], g: rgbValues[1], b: rgbValues[2] };
  }

  // Function to calculate the brightness of an RGB color
  getBrightness({ r, g, b }) {
    // Using the formula for luminance in sRGB color space
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  // Function to determine if a color is light or dark
  isLightColor(colorName) {
    const rgb = this.colorNameToRgb(colorName);
    const brightness = this.getBrightness(rgb);
    return brightness > 128;
  }

  addToCol(colElem, mover) {
    colElem.appendChild(this.duplicatedElement);
    this.mover = mover;
    //Add event listener to move button
    let moveButton = this.duplicatedElement.querySelector('.startMove');
    moveButton.addEventListener('click', () => {
      mover.startMoving(this);
    });
    this.saveNotes();
  }

  setDescription(text) {
    if(text.trim().length === 0) {
      this.description = NO_DESCRIPTION_TEXT;
    }
    else {
      this.description = text;
    }

    let descriptionElement = this.duplicatedElement.querySelector('.description');
    descriptionElement.textContent = this.description;
    this.saveNotes();
  }

  saveNotes() {
    const columns = document.querySelectorAll('.column');
    const notesData = Array.from(columns).map(column => {
      const notes = Array.from(column.querySelectorAll('.card')).map(note => ({
        title: note.querySelector('.title').textContent,
        description: note.querySelector('.description').textContent,
        color: note.style.backgroundColor,
      }));
      return notes;
    });
  
    localStorage.setItem('notes', JSON.stringify(notesData));
  }
}
