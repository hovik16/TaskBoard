import Card from "./card.js";
import Mover from "./mover.js";

export default class App {
  constructor() {
    this.mover = new Mover();
    const form = document.getElementById('addCard');
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the form from submitting

      const title = document.getElementById('cardTitle').value;
      const color = document.getElementById('cardColor').value;

      this.addCard("todo", title, color);

      form.reset(); // Reset the form inputs
    });

    this.loadNotes();
  }

  addCard(col, title, color) {
    let newCard = new Card(title, color);
    newCard.addToCol(document.getElementById(col), this.mover);
    return newCard;
  }

  loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const notesData = JSON.parse(savedNotes);
      let columnNames = ["todo", "doing", "done"];
      notesData.forEach((notes, index) => {
        const columnName = columnNames[index];
        notes.forEach(noteData => {
          let card = this.addCard(columnName, noteData.title, noteData.color);
          card.setDescription(noteData.description);
        });
      });
    }
  }
}
