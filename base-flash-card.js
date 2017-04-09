class FlashCardBase {
	constructor(question, solution) {
		this.question = question;
		this.solution = solution;
	}

	getSolution() {
		return this.solution;
	}

	getQuestion() {
		return this.question;
	}

	printCardContents() {
		console.log("");
		console.log("--------------------");
		console.log("Flash Card:");
		console.log(this.getSolution());
		console.log(this.getQuestion());
		console.log("--------------------");
	}
}

module.exports = FlashCardBase;