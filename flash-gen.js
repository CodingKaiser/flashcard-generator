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
      if (answer.prompt === 'Review your cards') {
        this.flashcards.getClozeCards().forEach((card) => card.printCardContents());
        this.flashcards.getBasicCards().forEach((card) => card.printCardContents());
        this.promptUserForAction();
      } else if (answer.prompt === 'Make a Cloze flash card') {
        this.promptUserForClozeCardInputs();
      } else {
        this.promptUserForBasicCardInputs();
      }
    });
  }

  promptUserForClozeCardInputs() {
    inquirer.prompt([
      {
        type: "input",
        name: "prompt",
        message: "Enter the card question and cloze, like: [question],[cloze]",
        validate: (input) => {
          var inputArray = input.split(",");
          if (inputArray.length === 2 && inputArray[0].includes(inputArray[1].trim())) return true;
          return false;
        },
      }
    ]).then((answer) => {
      var inputArray = answer.prompt.split(",");
      this.flashcards.addClozeCard(inputArray[0], inputArray[1].trim());
      this.promptUserForAction();
    });
  }

  promptUserForBasicCardInputs() {
    inquirer.prompt([
      {
        type: "input",
        name: "prompt",
        message: "Enter the card question and cloze, like: [question],[cloze]",
        validate: (input) => {
          if (input.split(",").length === 2) return true;
          return false;
        },
      }
    ]).then((answer) => {
      var inputArray = answer.prompt.split(",");
      this.flashcards.addBasicCard(inputArray[0], inputArray[1].trim());
      this.promptUserForAction();
    });
  }
}

var manager = new ProgramManager();
manager.promptUserForAction();
