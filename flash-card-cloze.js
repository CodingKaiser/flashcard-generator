var FlashCardBase = require("./base-flash-card.js");

class ClozeFlashCard extends FlashCardBase {
	constructor(question, solution) {
		super(question, solution);
		this.partial = "";
		var indexClozeStart = this.question.toLowerCase().indexOf(
								this.solution.toLowerCase());
		if (indexClozeStart < 0) {
			throw new Error("Sorry, the cloze was not found.");
		}
		this.partial = this.question.slice(0, indexClozeStart) + 
						"..." + this.question.slice(indexClozeStart + 
						this.solution.length);
	}

	getPartialQuestion() {
		return this.partial;
	}

	printCardContents() {
		console.log("--------------------");
		console.log("Cloze Flash Card:");
		console.log(this.getSolution());
		console.log(this.getQuestion());
		console.log(this.getPartialQuestion());
		console.log("--------------------");
	}
}

module.exports = ClozeFlashCard;