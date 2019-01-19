$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAHjbtsCXA2QXkaLghiKa0SP7bqOzWA9c8",
    authDomain: "trek-trivia-high-scores.firebaseapp.com",
    databaseURL: "https://trek-trivia-high-scores.firebaseio.com",
    projectId: "trek-trivia-high-scores",
    storageBucket: "",
    messagingSenderId: "938274226121"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  
  
  
  
  
  database.ref("/scores").on("child_added", function(snapChild){
    console.log(snapChild.val().correct);
    console.log(snapChild.val().initials);
    if (snapChild.val().correct >= 20) {
    var row = $("<tr>");
    var initialsTd = $("<td>").text(snapChild.val().initials);
    var correctTd = $("<td>").text(snapChild.val().correct);
    row.append(initialsTd).append(correctTd);
    $("tbody").append(row);
    }
  
  });


// define id form-area as a variable 
var board = $("#form-area");
// define variable countStartNumber as 15
var countStartNumber =15;

// question set as an object
var questions = [{
  question: "What is the name of the starship commanded by Cpt. James T. Kirk?",
  answers: ["The Millenium Falcon", "The USS Constitution", "The Discovery", "The USS Enterprise"],
  correctAnswer: "The USS Enterprise",
  image: "assets/images/enterprise2.gif"
},
 {
  question: "Who is Cpt. Kirk's First Officer?",
  answers: ["Spock", "Tuvok", "Jurok", "Turok"],
  correctAnswer: "Spock",
  image: "assets/images/spock.gif"
}, 
{
  question: "Who was the original captain of the USS Enterprise?",
  answers: ["Spock", "James T. Kirk", "Christopher Pike", "Jack Sparrow"],
  correctAnswer: "Christopher Pike",
  image: "assets/images/cage.gif"
}, 
{
  question: "The phrase \"Beam me up Scotty\" is used most by what character?",
  answers: ["Uhura", "Bones", "Cpt. Kirk", "The exact phrase is never used"],
  correctAnswer: "The exact phrase is never used",
  image: "assets/images/enterprise2.gif"
}, 
{
  question: "Which of these races does not belong to the Federation?",
  answers: ["The Andorians", "The Romulans", "The Vulcans", "The Tellarites"],
  correctAnswer: "The Romulans",
  image: "assets/images/romulan2.gif"
}, {
  question: "What is Captain Kirk's middle name?",
  answers: ["Tony", "Thomas", "Tiberius", "Teddy"],
  correctAnswer: "Tiberius",
  image: "assets/images/jhands.gif"
}, 
{
  question: "What class of starship does the USS Enterprise belong to?",
  answers: ["Constitution Class", "Galaxy Class", "Freighter Class", "Full Stack Flex Class"],
  correctAnswer: "Constitution Class",
  image: "assets/images/enterprise2.gif"
}, 
{
  question: "What color sweater do Enterprise science division crew members wear?",
  answers: ["Red", "Gold", "Green", "Blue"],
  correctAnswer: "Blue",
  image: "assets/images/blue.gif"
}, 
{
  question: "In the episode entitled \"Space Seed\", what Trek villain makes his debut?",
  answers: ["Harry Mudd", "Khan", "JJ Abrams", "Trelane"],
  correctAnswer: "Khan",
  image: "assets/images/khan.gif"
}, 
{
  question: "what Hollywood legend was influential in bringing Star Trek to television?",
  answers: ["Lucille Ball", "John Wayne", "Jackie Gleason", "Kermit The Frog"],
  correctAnswer: "Lucille Ball",
  image: "assets/images/lucille.gif"
}, 
{
  question: "Which two cast members shared the supposed first interracial kiss on TV?",
  answers: ["DeForrest Kelley & George Takei", "Majel Barrett-Roddenberry & William Marshall", "William Shatner & Nichelle Nichols", "Booker Bradshaw & Grace Lee Whitney"],
  correctAnswer: "William Shatner & Nichelle Nichols",
  image: "assets/images/kiss.gif"
}, 
{
  question: "Dr. McCoy actor DeForrest Kelley originally auditioned for what part?",
  answers: ["Scotty", "Sulu", "Kirk", "Spock"],
  correctAnswer: "Spock",
  image: "assets/images/blue.gif"
}, 
{
  question: "What was the title of the \"lost\" Star Trek pilot episode, not seen on TV?",
  answers: ["\"Court Martial\"", "\"The Cage\"", "\"Where No Man Has Gone Before\"", "\"Pilot\""],
  correctAnswer: "\"The Cage\"",
  image: "assets/images/cage.gif"
}, 
{
  question: "In what country was Star Trek first aired on TV?",
  answers: ["Canada", "United States", "Germany", "Mexico"],
  correctAnswer: "Canada",
  image: "assets/images/canada.gif"
}, 
{
  question: "Which of these James's played the role of Chief Engineer Scotty?",
  answers: ["James Hayward", "James Doohan", "James Brolin", "James Avery"],
  correctAnswer: "James Doohan",
  image: "assets/images/scotty.gif"
}, 
{
  question: "How many seasons of Star Trek: The Original Series are there?",
  answers: ["7", "10", "8", "3"],
  correctAnswer: "3",
  image: "assets/images/three.gif"
}, 
{
  question: "In the episode \"Journey To Babel\", Which actress played Amanda Grayson, Spock's mother?",
  answers: ["Jane Wyatt", "Jane Seymour", "Grace Lee Whitney", "Shirley Temple"],
  correctAnswer: "Jane Wyatt",
  image: "assets/images/spock_mom.gif"
}, 
{
  question: "What is the registry number for the starship Enterprise?",
  answers: ["NCC-1701-D", "NCC-1701-C", "NCC-1701-B", "NCC-1701"],
  correctAnswer: "NCC-1701",
  image: "assets/images/enterprise2.gif"
}, 
{
  question: "During a battle with the Enterprise in the episode \"Balance of Terror\", the commander of the Romulan Bird of Prey does what out of desperation?",
  answers: ["Calls for a truce", "Launches a nuclear weapon", "Calls for red alert", "Eats a sandwich"],
  correctAnswer: "Launches a nuclear weapon",
  image: "assets/images/mushroom_cloud.gif"
}, 
{
  question: "Zefram Cochrane was the inventor of warp drive. In what episode did he first appear along with his companion?",
  answers: ["\"Space Stuff\"", "\"Mirror, Mirror\"", "\"Our Yesterdays\"", "\"Metamorphosis\""],
  correctAnswer: "\"Metamorphosis\"",
  image: "assets/images/cochrane.gif"
}];

// hide our enterprise image id for our ship animation
document.getElementById('ship').style.cssText = "display: none";
document.getElementById('initials').style.cssText = "display: none";




// variable that will hold the setInterval
var clock;
// define our whole quiz as an object
var quiz = {
  
  questions: questions,
  heldQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,
  
  
  animate: function(){
    document.getElementById("ship").style.cssText = "display: block";
  $('#ship').animate({ height: '500px' }, "slow");
  $('#ship').animate({ height: '0px' }, "slow");
},
transPort: function() {
  $('#startSound')[0].play();
  $('#test').animate({ opacity: '0' }, "slow");
  $('#test').animate({ opacity: '0.3' });
  $('#test').animate({ opacity: '0' }, "slow");
  $('#test').animate({ opacity: '0.2' });
  $('#test').animate({ opacity: '0' }, "slow");
  $('#test').animate({ opacity: '100' });
  
  
  
  
  
},
// function to control our countdown
  countdown: function () {
    quiz.counter--;
    $("#counter-digit").html(quiz.counter);
    // if statement that plays a warning sound, turns the counter-digit red, and animates it with 5 seconds left  
    if (quiz.counter === 5) {
      $("#counter-digit").css("color", "red");
      
      $("#timeSound")[0].play();
    }
    if (quiz.counter === 0) {
      
      console.log("TIME UP");
      
      
      
      
      
      quiz.animate();
      
      // our jquery to call our ship animation    
      
      quiz.timeOver();
      // jquery to animate our "you took too long to answer" message    
    }  
    
  },
  
  // function that loads the first question
  grabQuestion: function () {
    $("#counter-digit").css("color", "yellow");
    // set our countdown interval to one second  
    clock = setInterval(quiz.countdown, 1000);
    // remove our start button from form-area div
    $("#admiral").hide();
    $("#perfect").hide();
    $("#start").remove();
    // put the first question in our form-area div 
    board.html("<h2>" + questions[this.heldQuestion].question + "</h2>");
    // for loop to append the current question's answer options to our buttons
    for (var i = 0; i < questions[this.heldQuestion].answers.length; i++) {
      board.append("<button class='answer-button' id='button' data-name='" + questions[this.heldQuestion].answers[i]
      + "'>" + questions[this.heldQuestion].answers[i] + "</button>");
      
    }
    
  },
  
  // function to change to the next question
  deckQuestion: function () {
    $("#counter-digit").css("color", "yellow");
    quiz.counter = countStartNumber;
    $("#counter-digit").text(quiz.counter);
    quiz.heldQuestion++;
    quiz.grabQuestion();
  },
  
  // function to control what happens when a question is not answered within the time limit
  
  timeOver: function () {
    
    
    clearInterval(clock);
    
    
    
    
    $("#counter-digit").html(quiz.counter);
    // jquery to call the sound that plays when a question times out due to no answer    
    $('audio#warnSound')[0].play();
    // append the form-area div to display our "you took too long" message and display the correct answer
    board.html("<h2>Up your shaft! You took too long to answer!</h2>");
    board.append("<h3>The Correct Answer was: " + questions[this.heldQuestion].correctAnswer);
    board.append("<img id='test' src='" + questions[this.heldQuestion].image + "' />");
    quiz.transPort();
    // jquery to call our transporter sound  
    // if statement to control how long our "you took too long" message appears in form-area div 
    if (quiz.heldQuestion === questions.length - 1) {
      // show quiz results if last question    
      setTimeout(quiz.results, 5 * 1000);
    }
    // show next question if not last question  
    else {
      setTimeout(quiz.deckQuestion, 5 * 1000);
    }
    
  },
  
  // function to control what happens at the end of the quiz
  results: function () {
    $("#perfect").show();
    $("#admiral").show();

    
    
    
    
    clearInterval(clock);
    
    
    $("#counter-digit").text(quiz.counter);
    if (quiz.correct >= 20 ) {
      document.getElementById('initials').style.cssText = "display: block";
      // jquery that calls our sound that plays when quiz is passed (15 or more correct answers)
          $("#passSound")[0].play();
          // append passed message, results, and our start over? button to our quiz area div
          board.html("<h2>PERFECT SCORE!: Enter Your Initials Below!</h2>");
          board.append("<h3>Correct Answers: " + quiz.correct + "</h3>");
          board.append("<h3>Incorrect Answers: " + quiz.incorrect + "</h3>");
          board.append("<h3>Unanswered: " + (questions.length - (quiz.incorrect + quiz.correct)) + "</h3>");
          board.append("<img id='test' src='assets/images/dancing.gif'/>");
          board.append("<br><button id='start-over'>Start Over?</button>");
        }
        else {
          // jquery that calls our sound that plays when the quiz is failed (5 or more incorrect answers) 
          $("#doneSound")[0].play();
          // append failed message, results, and our start over button to our form-area div
          board.html("<h2>FAILED!:You should study the library tapes!</h2>");
          board.append("<h3>Correct Answers: " + quiz.correct + "</h3>");
          board.append("<h3>Incorrect Answers: " + quiz.incorrect + "</h3>");
          board.append("<h3>Unanswered: " + (questions.length - (quiz.incorrect + quiz.correct)) + "</h3>");
          board.append("<img id='test' src='assets/images/explode.gif'/>");
          board.append("<br><button id='start-over'>Start Over?</button>");
        }
      },
      
      // function that controls what happens when a correct or incorrect answer button is clicked
      clicked: function (e) {
        clearInterval(clock);
        if ($(e.target).attr("data-name") === questions[this.heldQuestion].correctAnswer) {
          this.guessedCorrectly();
        }
        else {
      this.guessedIncorrectly();
    }
  },
  
  // function that controls what happens when a question is answered incorrectly
  guessedIncorrectly: function () {
    // jquery that calls our sound that plays when a question is answered incorrectly  
    $("#wrongSound")[0].play();
    
    //quiz.transPort();
    
    
    
    
    quiz.incorrect++;
    
    clearInterval(clock);
    
    
    
    
    
    
    
    // append our inaccurate message, our correct answer was message, and display our correct answer image    
    board.html("<h2>Inaccurate! Inaccurate!</h2>");
    board.append("<h3>The Correct Answer Was: " + questions[quiz.heldQuestion].correctAnswer + "</h3>");
    board.append("<img id='test' src='" + questions[quiz.heldQuestion].image + "' />");
    // jquery to call our incorrect answer image animation
    
    //quiz.animate();
    // if statement that controls how long our incorrect answer message, correct answer was message, and correct answer image are shown 
    if (quiz.heldQuestion === questions.length - 1) {
      // if last question then show results    
      setTimeout(quiz.results, 5 * 1000);
    }
    // if not last question then load next question  
    else {
      setTimeout(quiz.deckQuestion, 5 * 1000);
    }
  },
  
  // function that controls what happens when a question is answered correctly
  guessedCorrectly: function () {
    // jquery to call the sound that plays when a question is answered correctly  
    $("#winSound")[0].play();
    // show our enterprise image id for ship animation  
    
    clearInterval(clock);
    
    quiz.correct++;
    
    
    //quiz.transPort();
    
    
    // append our "verified" message, "good guess you nerd" message, and our correct answer image to form-area div
    board.html("<h2>Verified!</h2>");
    board.append("<h3>Good Guess, You Nerd!</h3>");
    board.append("<img id='test' src='" + questions[quiz.heldQuestion].image + "' />");
    
    // jquery to call our correct answer image animations
    // if statement that controls how long our "verified" and "good guess" messages and correct answer image are displayed
    if (quiz.heldQuestion === questions.length - 1) {
      // if last question then show quiz results    
      setTimeout(quiz.results, 5 * 1000);
    }
    // if not last question then load next question  
    else {
      setTimeout(quiz.deckQuestion, 5 * 1000);
    }
  },
  
  // function to control resetting the quiz 
  reset: function () {
    $("#counter-digit").css("color", "yellow");
    this.heldQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.grabQuestion();
    
  }
};


// all of our on click events
$(document).on("click", "#start-over", function () {
  quiz.reset();
  
  // show our enterprise image id for our ship animation 
  quiz.animate(); 
  
  
  
  // show our enterprise image id for our ship animation  
  //document.getElementById("ship").style.cssText = "display: block";
  // jquery to call our enterprise ship animation  
  //$('#ship').animate({ height: '500px' }, "slow");
  //$('#ship').animate({ height: '0px' }, "slow");
  // jquery to call our transporter sound  
  $('#startSound')[0].play();
  $('#bgSound')[0].play();
  
});
$(document).on("click", ".answer-button", function (e) {
  quiz.clicked(e);
  quiz.transPort();
  $("#timeSound")[0].pause();
  // show our enterprise image id for our ship animation
  quiz.animate();
  
  // jquery to call our ship animation  
  // jquery to call our transporter sound  
  
});

$("#s-button").on("click", function() {
  var initials = $("#initials-input").val().trim();
  console.log(initials);
  
  var correct = quiz.correct;
  console.log(correct);
  database.ref("/scores").push({
      initials: initials,      
      correct: correct
      })
  
  
  
  
  
});



$(document).on("click", "#start", function () {
  
  // jquery to call our ship animation  
  quiz.animate();
  // prepend time remaining to pre-form <h2> id
  $("#pre-form").prepend("<h2>Time Remaining: <span id='counter-digit'>15</span> Seconds</h2>");
  quiz.grabQuestion();
  quiz.transPort();
  
  // jquery to call our background noises and our transporter sound  
  
  $('#bgSound')[0].play();
  //$('#startSound')[0].play();
});

});


































































