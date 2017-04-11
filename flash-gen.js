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
        choices: ['Display your cards', 'Review your cards','Make a Cloze flash card', 'Make a Basic flash card']
      }
    ]).then((answer) => {
      if (answer.prompt === 'Display your cards') {
        this.printAllCardsToStdout();
      } else if (answer.prompt === 'Review your cards') {
        var mixedCardArray = this.flashcards.getBasicCards().concat(this.flashcards.getClozeCards());
        if (mixedCardArray.length) {
          this.reviewFlashCards(mixedCardArray);
        } else {
          this.tellUserNoCardsFound();
        }
      } else if (answer.prompt === 'Make a Cloze flash card') {
        this.promptUserForClozeCardInputs();
      } else {
        this.promptUserForBasicCardInputs();
      }
    });
  }

  tellUserNoCardsFound() {
    console.log("You currently don't have any cards saved.")
    console.log("");
    this.promptUserForAction();
  }

  printAllCardsToStdout() {
    if (this.flashcards.getClozeCards().length ||
        this.flashcards.getBasicCards().length) {
      this.flashcards.getClozeCards().forEach((card) => card.printCardContents());
      this.flashcards.getBasicCards().forEach((card) => card.printCardContents());
      this.promptUserForAction();
    } else {
      this.tellUserNoCardsFound();
    }
  }

  reviewFlashCards(arrayOfCards) {
    if (arrayOfCards.length) {
      var indexOfCardToRemove = Math.floor(Math.random() * arrayOfCards.length);
      var cardToRemove = arrayOfCards[indexOfCardToRemove];
      arrayOfCards.splice(indexOfCardToRemove, 1);
      inquirer.prompt([
        {
          type: "input",
          name: "prompt",
          message: (() => {
            if (cardToRemove instanceof ClozeFlashCard) {
              return "Fill in the blank: " + cardToRemove.getPartialQuestion();
            }
            return "What's the answer?: " + cardToRemove.getQuestion();
          })(),
          validate: (input) => {
            if (input.toLowerCase() ===
                cardToRemove.getSolution().toLowerCase().trim()) {
              return true;
            }
            console.log("   Try again!");
            return false;
          }
        },
      ]).then((answer) => {
        console.log("Correct!");
        this.reviewFlashCards(arrayOfCards);
      });
    } else {
      console.log("You are done reviewing your cards.");
      console.log("");
      this.promptUserForAction();
    }
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
