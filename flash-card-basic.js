var FlashCardBase = require("./base-flash-card.js");

class BasicFlashCard extends FlashCardBase {
	constructor(question, solution) {
		super(question, solution);
	}

	printCardContents() {
		var questionString = "Question: " + this.getQuestion();
		var answerString = "Answer: " + this.getSolution();
		var longestLineLength = (questionString.length >= answerString.length) ?
														questionString.length : answerString.length;
		console.log("");
		console.log("-".repeat(longestLineLength));
		console.log("Basic Flash Card - ");
		console.log(questionString);
		console.log(answerString);
		console.log("-".repeat(longestLineLength));
	}
}

module.exports = BasicFlashCard;
