var card = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
  question:"What is the name of the starship commanded by Cpt. James T. Kirk?",
  answers: ["The Millenium Falcon", "The USS Constitution", "The Discovery", "The USS Enterprise"],
  correctAnswer: "The USS Enterprise",
  image:"assets/images/enterprise2.gif"
}, {
  question: "Who is Cpt. Kirk's First Officer?",
  answers: ["Spock", "Tuvok", "Jurok", "Turok"],
  correctAnswer: "Spock",
  image:"assets/images/spock.gif"
}, {
  question: "Who was the original captain of the USS Enterprise?",
  answers: ["Spock", "James T. Kirk", "Christopher Pike", "Jack Sparrow"],
  correctAnswer: "Christopher Pike",
  image:"assets/images/pike.gif"
}, {
  question: "The phrase \"Beam me up Scotty\" is used most by what character?",
  answers: ["Uhura", "Bones", "Cpt. Kirk", "The exact phrase is never used"],
  correctAnswer: "The exact phrase is never used",
  image:"assets/images/enterprise2.gif"
}, {
  question: "Which of these races does not belong to the Federation?",
  answers: ["The Andorians", "The Romulans", "The Vulcans", "The Tellarites"],
  correctAnswer: "The Romulans",
  image:"assets/images/romulan2.gif"
}, {
  question: "What class of starship does the USS Enterprise belong to?",
  answers: ["Constitution Class", "Galaxy Class", "Freighter Class", "Full Stack Flex Class"],
  correctAnswer: "Constitution Class",
  image:"assets/images/enterprise2.gif"
}, {
  question: "What color sweater do Enterprise science division crew members wear?",
  answers: ["Red", "Gold", "Green", "Blue"],
  correctAnswer: "Blue",
  image:"assets/images/blue.gif"
}, {
  question: "In the episode entitled \"Space Seed\", what Trek villain makes his debut?",
  answers: ["Harry Mudd", "Khan", "JJ Abrams", "Trelane"],
  correctAnswer: "Khan",
  image:"assets/images/khan.gif"
}];

document.getElementById('ship').style.cssText = "display: none";

// Variable that will hold the setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,


  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      document.getElementById("ship").style.cssText = "display: block";
      $('#ship').animate({height: '500px'});
      $('#ship').animate({height: '0px'});
      $('audio#warnSound')[0].play();
      game.timeUp();
      $('#test').animate({opacity: '0'}, "slow");
      $('#test').animate({opacity: '0.3'});
      $('#test').animate({opacity: '0'}, "slow");
      $('#test').animate({opacity: '0.2'});
        $('#test').animate({opacity: '0'}, "slow");
        $('#test').animate({opacity: '100'});
      

      
      
      
      
      
      
    }
    
  },
  
  loadQuestion: function() {
    timer = setInterval(game.countdown, 1000);
    
    
    
    $("#start").remove();
    
    
    
    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
    
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='"+ questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
    
  },
  
  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  
  timeUp: function() {
    clearInterval(timer);

    $("#counter-number").html(game.counter);

    card.html("<h2>What do we do?!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    card.append("<img id='test' src='" + questions[this.currentQuestion].image + "' />");
    $('audio#startSound')[0].play();
    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 5 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },


  results: function() {
    $("audio#doneSound")[0].play();

    clearInterval(timer);

    card.html("<h2>You mind telling me what this is all about, mister?!</h2>");

    $("#counter-number").text(game.counter);

    card.append("<h3>Correct Answers: " + game.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    card.append("<br><button id='start-over'>Start Over?</button>");
  },


  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },


  answeredIncorrectly: function() {
    $("audio#wrongSound")[0].play();
    
    game.incorrect++;
    
    clearInterval(timer);
    
    card.html("<h2>Inaccurate! Inaccurate!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    card.append("<img id='test' src='"+ questions[game.currentQuestion].image + "' />");
    
    $('#test').animate({opacity: '0'}, "slow");
    $('#test').animate({opacity: '0.3'});
    $('#test').animate({opacity: '0'}, "slow");
    $('#test').animate({opacity: '0.2'});
      $('#test').animate({opacity: '0'}, "slow");
      $('#test').animate({opacity: '100'});
    
    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 6 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 6 * 1000);
    }
  },


  answeredCorrectly: function() {
    $("audio#winSound")[0].play();
    document.getElementById("ship").style.cssText = "display: block";
    // $('#sub-wrapper').animate({opacity: '0'}, "slow");
    // $('#sub-wrapper').animate({opacity: '0.3'});
    // $('#sub-wrapper').animate({opacity: '0'}, "slow");
    // $('#sub-wrapper').animate({opacity: '0.2'});
    //   $('#sub-wrapper').animate({opacity: '0'}, "slow");
    //   $('#sub-wrapper').animate({opacity: '100'});
    
    
    
    
    clearInterval(timer);
    
    game.correct++;
    
    
    card.html("<h2>Verified!</h2>");
    card.append("<img id='test' src='" + questions[game.currentQuestion].image + "' />");
    $('#test').animate({opacity: '0'}, "slow");
    $('#test').animate({opacity: '0.3'});
    $('#test').animate({opacity: '0'}, "slow");
    $('#test').animate({opacity: '0.2'});
      $('#test').animate({opacity: '0'}, "slow");
      $('#test').animate({opacity: '100'});

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 6 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 6 * 1000);
    }
  },


  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();

  }
};














  

    
    
    
    
        

    

    
    


  
  

  

// CLICK EVENTS
$(document).on("click", "#start-over", function() {
  game.reset();
  document.getElementById("ship").style.cssText = "display: block";
  $('#ship').animate({height: '500px'}, "slow");
  $('#ship').animate({height: '0px'}, "slow");
  $('audio#startSound')[0].play() 
});
  
$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
  document.getElementById("ship").style.cssText = "display: block";
  $('#ship').animate({height: '500px'}, "slow");
  $('#ship').animate({height: '0px'}, "slow");
  $('audio#startSound')[0].play();
});






$(document).on("click", "#start", function() {
  document.getElementById("ship").style.cssText = "display: block";
  $('#ship').animate({height: '500px'}, "slow");
  $('#ship').animate({height: '0px'}, "slow");
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
  $('audio#bgSound')[0].play();
  $('audio#startSound')[0].play(); 

  
  
}); 





