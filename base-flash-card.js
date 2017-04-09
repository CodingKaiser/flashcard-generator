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
		var questionString = "Question: " + this.getQuestion();
		var answerString = "Answer: " + this.getSolution();
		var longestLineLength = (questionString.length >= answerString.length) ?
														questionString.length : answerString.length;
		console.log("");
		console.log("-".repeat(longestLineLength));
		console.log("Base Flash Card - ");
		console.log(questionString);
		console.log(answerString);
		console.log("-".repeat(longestLineLength));
	}
}

module.exports = FlashCardBase;
