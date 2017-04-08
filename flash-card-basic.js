var FlashCardBase = require("./base-flash-card.js");

class BasicFlashCard extends FlashCardBase {
	constructor(question, solution) {
		super(question, solution);
	}

	printCardContents() {
		console.log("--------------------");
		console.log("Basic Flash Card:");
		console.log(this.getSolution());
		console.log(this.getQuestion());
		console.log("--------------------");
	}
}

module.exports = BasicFlashCard;