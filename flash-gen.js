var ClozeFlashCard = require("./flash-card-cloze.js");
var BasicFlashCard = require("./flash-card-basic.js");

var hello = new ClozeFlashCard("Yup, there is definitely NOOOO something here.", "NOOOO");
hello.printCardContents();
console.log(hello.getQuestion());
console.log(hello.getSolution());
console.log(hello.getPartialQuestion());

var hello1 = new BasicFlashCard("Who was the first president of the United States?", "Jooberdy Jefferson");
hello1.printCardContents();

