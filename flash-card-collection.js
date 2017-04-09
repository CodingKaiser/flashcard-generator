var fs = require("fs");
var ClozeFlashCard = require("./flash-card-cloze.js");
var BasicFlashCard = require("./flash-card-basic.js");

class FlashCardCollection {
  constructor() {
    this.clozeCards = [];
    this.basicCards = [];
    this._loadCardsFromHardDrive();
  }

  _loadCardsFromHardDrive() {
    fs.readFile("cards.txt", "utf8", (err, data) => {
      if (!err && data) {
        var cardsIterable = data.split("\n");
        cardsIterable.forEach((line) => {
          var lineSplit = line.split("|");
          if (lineSplit[0] === "Basic") {
            this.basicCards.push(new BasicFlashCard(lineSplit[1].trim(),
                                                    lineSplit[2].trim()));
          } else if (lineSplit[0] === "Cloze") {
            this.clozeCards.push(new ClozeFlashCard(lineSplit[1].trim(),
                                                    lineSplit[2].trim()));
          }
        })
      }
    });
  }

  addClozeCard(question, solution) {
    this.clozeCards.push(new ClozeFlashCard(question, solution));
    fs.appendFile("cards.txt", "Cloze|" + question + "|" + solution + "\n", (err) => { if (err) console.log(err) });
  }

  addBasicCard(question, solution) {
    this.basicCards.push(new BasicFlashCard(question, solution));
    fs.appendFile("cards.txt", "Basic|" + question + "|" + solution + "\n", (err) => { if (err) console.log(err) });
  }

  getClozeCards() {
    return this.clozeCards;
  }

  getBasicCards() {
    return this.basicCards;
  }
}

module.exports = FlashCardCollection;
