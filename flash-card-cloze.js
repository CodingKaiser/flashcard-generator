var FlashCardBase = require("./base-flash-card.js");

class ClozeFlashCard extends FlashCardBase {
	constructor(question, solution) {
		super(question, solution);
		this.partial = "";
		this._generatePartialQuestion();
	}

	_generatePartialQuestion() {
		if (this.question.includes(this.solution)) {
			var re = new RegExp(this.solution);
			this.partial = this.question.replace(re, "...");
		}
	}

	getPartialQuestion() {
		return this.partial;
	}

	printCardContents() {
		var questionString = "Question: " + this.getPartialQuestion();
		var answerString = "Answer: " + this.getSolution();
		var longestLineLength = (questionString.length >= answerString.length) ?
														questionString.length : answerString.length;
		console.log("");
		console.log("-".repeat(longestLineLength));
		console.log("Cloze Flash Card - ");
		console.log(questionString);
		console.log(answerString);
		console.log("-".repeat(longestLineLength));
	}
}

module.exports = ClozeFlashCard;
