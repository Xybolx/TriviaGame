// define id quiz-area as a variable 
var card = $("#quiz-area");
// define variable countStartNumber as 30
var countStartNumber = 30;

// question set as an object
var questions = [{
  question: "What is the name of the starship commanded by Cpt. James T. Kirk?",
  answers: ["The Millenium Falcon", "The USS Constitution", "The Discovery", "The USS Enterprise"],
  correctAnswer: "The USS Enterprise",
  image: "assets/images/enterprise2.gif"
}, {
  question: "Who is Cpt. Kirk's First Officer?",
  answers: ["Spock", "Tuvok", "Jurok", "Turok"],
  correctAnswer: "Spock",
  image: "assets/images/spock.gif"
}, {
  question: "Who was the original captain of the USS Enterprise?",
  answers: ["Spock", "James T. Kirk", "Christopher Pike", "Jack Sparrow"],
  correctAnswer: "Christopher Pike",
  image: "assets/images/pike.gif"
}, {
  question: "The phrase \"Beam me up Scotty\" is used most by what character?",
  answers: ["Uhura", "Bones", "Cpt. Kirk", "The exact phrase is never used"],
  correctAnswer: "The exact phrase is never used",
  image: "assets/images/enterprise2.gif"
}, {
  question: "Which of these races does not belong to the Federation?",
  answers: ["The Andorians", "The Romulans", "The Vulcans", "The Tellarites"],
  correctAnswer: "The Romulans",
  image: "assets/images/romulan2.gif"
}, {
  question: "What class of starship does the USS Enterprise belong to?",
  answers: ["Constitution Class", "Galaxy Class", "Freighter Class", "Full Stack Flex Class"],
  correctAnswer: "Constitution Class",
  image: "assets/images/enterprise2.gif"
}, {
  question: "What color sweater do Enterprise science division crew members wear?",
  answers: ["Red", "Gold", "Green", "Blue"],
  correctAnswer: "Blue",
  image: "assets/images/blue.gif"
}, {
  question: "In the episode entitled \"Space Seed\", what Trek villain makes his debut?",
  answers: ["Harry Mudd", "Khan", "JJ Abrams", "Trelane"],
  correctAnswer: "Khan",
  image: "assets/images/khan.gif"
}, {
  question: "what Hollywood legend was influential in bringing Star Trek to television?",
  answers: ["Lucille Ball", "John Wayne", "Jackie Gleason", "Kermit The Frog"],
  correctAnswer: "Lucille Ball",
  image: "assets/images/lucille.gif"
}, {
  question: "In the episode entitled \"Plato's Children\", which two cast members shared what was believed to be the first interracial kiss on televion?",
  answers: ["DeForrest Kelley & George Takei", "Majel Barrett-Roddenberry & William Marshall", "William Shatner & Nichelle Nichols", "Booker Bradshaw & Grace Lee Whitney"],
  correctAnswer: "William Shatner & Nichelle Nichols",
  image: "assets/images/kiss.gif"
}, {
  question: "Dr. McCoy actor DeForrest Kelley originally auditioned for what part?",
  answers: ["Scotty", "Sulu", "Kirk", "Spock"],
  correctAnswer: "Spock",
  image: "assets/images/blue.gif"
}, {
  question: "What was the title of the \"lost\" Star Trek pilot episode, not seen on television?",
  answers: ["\"Court Martial\"", "\"The Cage\"", "\"Where No Man Has Gone Before\"", "\"Pilot\""],
  correctAnswer: "\"The Cage\"",
  image: "assets/images/cage.gif"
}, {
  question: "In what country was Star Trek first aired on TV?",
  answers: ["Canada", "United States", "Germany", "Mexico"],
  correctAnswer: "Canada",
  image: "assets/images/canada.gif"         
}];

// hide our enterprise image id for our ship animation
document.getElementById('ship').style.cssText = "display: none";

// variable that will hold the setInterval
var timer;
// define our whole game as an object
var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  // function to control our countdown
  countdown: function () {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
  // show our enterprise image id for ship animation    
      document.getElementById("ship").style.cssText = "display: block";
  // our jquery to call our ship animation    
      $('#ship').animate({ height: '500px' });
      $('#ship').animate({ height: '0px' });
  // jquery to call the sound that plays when a question times out due to no answer    
      $('audio#warnSound')[0].play();
      game.timeUp();
  // jquery to animate our "you took too long to answer" message    
      $('#test').animate({ opacity: '0' }, "slow");
      $('#test').animate({ opacity: '0.3' });
      $('#test').animate({ opacity: '0' }, "slow");
      $('#test').animate({ opacity: '0.2' });
      $('#test').animate({ opacity: '0' }, "slow");
      $('#test').animate({ opacity: '100' });
    }
  },

  // function that loads the first question
  loadQuestion: function () {
  // set our countdown interval to one second  
    timer = setInterval(game.countdown, 1000);
  // remove our start button from quiz-area div
    $("#start").remove();
  // put the first question in our quiz-area div 
    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
  // for loop to append the current question's answer options to our buttons
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
        + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }

  },

  // function to change to the next question
  nextQuestion: function () {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  // function to control what happens when a question is not answered within the time limit
  timeUp: function () {
    clearInterval(timer);

    $("#counter-number").html(game.counter);
  // append the quiz-area div to display our "you took too long" message and display the correct answer
    card.html("<h2>You took too long to answer!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    card.append("<img id='test' src='" + questions[this.currentQuestion].image + "' />");
  // jquery to call our transporter sound  
    $('audio#startSound')[0].play();
  // if statement to control how long our "you took too long" message appears in quiz-area div 
    if (game.currentQuestion === questions.length - 1) {
  // show game results if last question    
    setTimeout(game.results, 5 * 1000);
    }
  // show next question if not last question  
    else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },

  // function to control what happens at the end of the quiz
  results: function () {
  // jquery that calls our sound that plays when the quiz is finished  
    $("audio#doneSound")[0].play();

    clearInterval(timer);
  // appends our quiz-area div with our quiz finished message
    card.html("<h2>You Mind Telling Me What This Is All About, Mister?!</h2>");


    $("#counter-number").text(game.counter);
  // append results and our start over button to our quiz-area div
    card.append("<h3>Correct Answers: " + game.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    card.append("<br><button id='start-over'>Start Over?</button>");
  },
  
  // function that controls what happens when a correct or incorrect answer button is clicked
  clicked: function (e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  // function that controls what happens when a question is answered incorrectly
  answeredIncorrectly: function () {
  // jquery that calls our sound that plays when a question is answered incorrectly  
    $("audio#wrongSound")[0].play();

    game.incorrect++;

    clearInterval(timer);
  
  // append our inaccurate message, our correct answer was message, and display our correct answer image    
    card.html("<h2>Inaccurate! Inaccurate!</h2>");
    card.append("<h3>The Correct Answer Was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    card.append("<img id='test' src='" + questions[game.currentQuestion].image + "' />");
  // jquery to call our incorrect answer image animation
    $('#test').animate({ opacity: '0' }, "slow");
    $('#test').animate({ opacity: '0.3' });
    $('#test').animate({ opacity: '0' }, "slow");
    $('#test').animate({ opacity: '0.2' });
    $('#test').animate({ opacity: '0' }, "slow");
    $('#test').animate({ opacity: '100' });
  // if statement that controls how long our incorrect answer message, correct answer was message, and correct answer image are shown 
    if (game.currentQuestion === questions.length - 1) {
  // if last question then show results    
      setTimeout(game.results, 6 * 1000);
    }
  // if not last question then load next question  
    else {
      setTimeout(game.nextQuestion, 6 * 1000);
    }
  },

  // function that controls what happens when a question is answered correctly
  answeredCorrectly: function () {
  // jquery to call the sound that plays when a question is answered correctly  
    $("audio#winSound")[0].play();
  // show our enterprise image id for ship animation  
    document.getElementById("ship").style.cssText = "display: block";
    
    clearInterval(timer);

    game.correct++;

  // append our "verified" message, "good guess you nerd" message, and our correct answer image to quiz-area div
    card.html("<h2>Verified!</h2>");
    card.append("<h3>Good Guess, You Nerd!</h3>");
    card.append("<img id='test' src='" + questions[game.currentQuestion].image + "' />");
    
  // jquery to call our correct answer image animations
    $('#test').animate({ opacity: '0' }, "slow");
    $('#test').animate({ opacity: '0.3' });
    $('#test').animate({ opacity: '0' }, "slow");
    $('#test').animate({ opacity: '0.2' });
    $('#test').animate({ opacity: '0' }, "slow");
    $('#test').animate({ opacity: '100' });
  // if statement that controls how long our "verified" and "good guess" messages and correct answer image are displayed
    if (game.currentQuestion === questions.length - 1) {
  // if last question then show quiz results    
      setTimeout(game.results, 6 * 1000);
    }
  // if not last question then load next question  
    else {
      setTimeout(game.nextQuestion, 6 * 1000);
    }
  },

  // function to control resetting the game 
  reset: function () {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();

  }
};


// all of our on click events
$(document).on("click", "#start-over", function () {
  game.reset();
// show our enterprise image id for our ship animation  
  document.getElementById("ship").style.cssText = "display: block";
// jquery to call our enterprise ship animation  
  $('#ship').animate({ height: '500px' }, "slow");
  $('#ship').animate({ height: '0px' }, "slow");
// jquery to call our transporter sound  
  $('audio#startSound')[0].play()
});
$(document).on("click", ".answer-button", function (e) {
  game.clicked(e);
// show our enterprise image id for our ship animation  
  document.getElementById("ship").style.cssText = "display: block";
// jquery to call our ship animation  
  $('#ship').animate({ height: '500px' }, "slow");
  $('#ship').animate({ height: '0px' }, "slow");
// jquery to call our transporter sound  
  $('audio#startSound')[0].play();
});
$(document).on("click", "#start", function () {
// show our enterprise image id for ship animation  
  document.getElementById("ship").style.cssText = "display: block";
// jquery to call our ship animation  
  $('#ship').animate({ height: '500px' }, "slow");
  $('#ship').animate({ height: '0px' }, "slow");
// prepend time remaining to sub-wrapper <h2> id   
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
// jquery to call our background noises and our transporter sound  
  $('audio#bgSound')[0].play();
  $('audio#startSound')[0].play();
});

































































