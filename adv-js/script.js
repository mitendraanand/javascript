/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

//(function() {var QuestionDescription = function(question, choices, answer) {
//    this.question = question;
//    this.choices = choices;
//    this.answer = answer;
//    this.print = function() {
//        i = 0;
//        this.choices.forEach((obj) => { console.log(i++ + ': ' + obj);})
//    };
//    this.isCorrectAnswer = function(choice) {
//        (choice === this.answer) ? console.log('correct') : console.log('incorrect');
//    };
//}
//
//var question1 = new QuestionDescription('who invented telephone?', ['Mark', 'Josh', 'Edision'], 2);
//var question2 = new QuestionDescription('who invented aeroplane?', ['Wright', 'Josh', 'Edision'], 0);
//var question3 = new QuestionDescription('who invented computer?', ['Mark', 'Turing', 'Charles'], 1);
//
//questions = [question1, question2, question3];
//
//var randomNum = Math.floor(Math.random() * questions.length);
//console.log(randomNum);
//             
//console.log('Question: ' + questions[randomNum].question);
//             
//console.log('Choices: ');
//questions[randomNum].print();
//             
//var userAnswer = parseInt(prompt('Please provide the index of the answer.'));             
//console.log(userAnswer);
//             
//questions[randomNum].isCorrectAnswer(userAnswer);})()


/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/



(function() {var QuestionDescription = function(question, choices, answer) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
    this.print = function() {
        i = 0;
        this.choices.forEach((obj) => { console.log(i++ + ': ' + obj);})
    };
    this.isCorrectAnswer = function(choice) {
        return (choice === this.answer) ? true : false;
    };
}

var question1 = new QuestionDescription('who invented telephone?', ['Mark', 'Josh', 'Edision'], 2);
var question2 = new QuestionDescription('who invented aeroplane?', ['Wright', 'Josh', 'Edision'], 0);
var question3 = new QuestionDescription('who invented computer?', ['Mark', 'Turing', 'Charles'], 1);

questions = [question1, question2, question3];

             
             
function puzzleScorer() {
    var score = 0;
    return function() {
        var userAnswer;
        while (userAnswer != 'exit') {
            var randomNum = Math.floor(Math.random() * questions.length);
            console.log(randomNum);

            console.log('Question: ' + questions[randomNum].question);

            console.log('Choices: ');
            questions[randomNum].print();

            userAnswer = prompt('Please provide the index of the answer.');             
            console.log(userAnswer);

            if (questions[randomNum].isCorrectAnswer(parseInt(userAnswer))) {
                console.log('correct');
                ++score;
            } else {
                console.log('incorrect');
            }
            console.log('total score: ' + score);
        }
    }
}
             
puzzleScorer()();


})()

             
             