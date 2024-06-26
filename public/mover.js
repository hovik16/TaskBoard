/* Text to add to the move here button */
const MOVE_HERE_TEXT = "— Move here —";

export default class Mover {
  constructor() {
  }

  startMoving(card) {
    let realCard = card;
    card = card.duplicatedElement;
    card.classList.add('moving');
    let columns = document.getElementsByClassName('column');
    for(let i = 0; i < columns.length; i++) {
      // Create button element
      let button = document.createElement('button');
      button.textContent = MOVE_HERE_TEXT;
      button.classList.add('moveButton');

      // Add button after column title
      columns[i].insertBefore(button, columns[i].firstElementChild.nextSibling);
      button.addEventListener('click', () => {this.stopMoving(button, realCard);});
      let cards = columns[i].querySelectorAll('.card');
      for(let i = 0; i < cards.length; i++) {
          //Create Button
          let button = document.createElement('button');
          button.textContent = MOVE_HERE_TEXT;
          button.classList.add('moveButton');
    
          //Add button after card
          cards[i].parentElement.insertBefore(button, cards[i].nextSibling);
          button.addEventListener('click', () => {this.stopMoving(button, realCard);});
        }
    }
  }

  stopMoving(button, card) {
    let realCard = card;
    card = card.duplicatedElement;
    button.parentElement.insertBefore(card, button);
    card.classList.remove('moving');
    let buttons = document.getElementsByClassName('moveButton');
    
    Array.from(buttons).forEach(button => {
      button.remove();
    });
    realCard.saveNotes();
  }
}
