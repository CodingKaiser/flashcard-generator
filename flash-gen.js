var ClozeFlashCard = require("./flash-card-cloze.js");
var BasicFlashCard = require("./flash-card-basic.js");
var FlashCardCollection = require("./flash-card-collection.js");
var inquirer = require("inquirer");

class ProgramManager {
  constructor() {
    this.flashcards = new FlashCardCollection();
  }
  promptUserForAction() {
    inquirer.prompt([
      {
        type: "list",
        name: "prompt",
        message: "What would you like to do?",
        choices: ['Review your cards', 'Make a Cloze flash card', 'Make a Basic flash card']
      }
    ]).then((answer) => {

    });
  }
}

var manager = new ProgramManager();
setTimeout(() => { manager.flashcards.clozeCards.forEach((card) => card.printCardContents()); manager.flashcards.basicCards.forEach((card) => card.printCardContents());}, 1000);

// var hello = new ClozeFlashCard("Yup, there is definitely NOOOO something here.", "NOOOO");
// hello.printCardContents();
//
// var hello1 = new BasicFlashCard("Who was the first president of the United States?", "Jooberdy Jefferson");
// hello1.printCardContents();
