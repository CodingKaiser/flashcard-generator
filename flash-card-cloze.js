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
		console.log("");
		console.log("--------------------");
		console.log("Cloze Flash Card:");
		console.log(this.getSolution());
		console.log(this.getQuestion());
		console.log(this.getPartialQuestion());
		console.log("--------------------");
	}
}

module.exports = ClozeFlashCard;
