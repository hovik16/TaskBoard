import App from "./app.js";

const main = () => {
  let app = new App();

  /* Add dumbie card so linter doesn't get mad*/
  let card = app.addCard("todo", "Dumbie Card", "lightblue");
  card.duplicatedElement.remove();
  card.saveNotes();
};

main();
