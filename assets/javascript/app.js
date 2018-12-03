var card = $("#quiz-area");

// Question set
var questions = [{
  question: "What is the name of the starship commanded by Cpt. James T. Kirk?",
  answers: ["The Millenium Falcon", "The USS Constitution", "The Discovery", "The USS Enterprise"],
  correctAnswer: "The USS Enterprise"
}, {
  question: "Who is Cpt. Kirk's First Officer?",
  answers: ["Spock", "Tuvok", "Jurok", "Turok"],
  correctAnswer: "Spock"
}, {
  question: "Who was the original captain of the USS Enterprise?",
  answers: ["Spock", "James T. Kirk", "Christopher Pike", "Jack Sparrow"],
  correctAnswer: "Christopher Pike"
}, {
  question: "The phrase \"Beam me up Scotty\" is used most by what character?",
  answers: ["Uhura", "Bones", "Cpt. Kirk", "The exact phrase is never used"],
  correctAnswer: "The exact phrase is never used"
}, {
  question: "Which of these races does not belong to the Federation?",
  answers: ["The Andorians", "The Romulans", "The Vulcans", "The Tellarites"],
  correctAnswer: "The Romulans"
}, {
  question: "What class of starship does the USS Enterprise belong to?",
  answers: ["Constitution Class", "Galaxy Class", "Freighter Class", "Full Stack Flex Class"],
  correctAnswer: "Constitution Class"
}, {
  question: "What color sweater do Enterprise science division crew members wear?",
  answers: ["Red", "Gold", "Green", "Blue"],
  correctAnswer: "Blue"
}, {
  question: "In the episode entitled \"Space Seed\", what Trek villain makes his debut?",
  answers: ["Harry Mudd", "Khan", "JJ Abrams", "Trelane"],
  correctAnswer: "Khan"
}];

document.getElementById('ship').style.cssText = "display: none";

// Variable that will hold the setInterval
var timer;

var game = {

  correct: 0,
  incorrect: 0,
  counter: 120,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      document.getElementById("ship").style.cssText = "display: block";
      $('#ship').animate({height: '500px'});
      $('#ship').animate({height: '0px'});
      $('audio#loseSound')[0].play();
      game.done();
      
    
    
    
       
    }
    if (game.counter === 30){
      $('#counter-number').animate({fontSize: '10em'},"slow");
      $('#counter-number').animate({fontSize: '1em'},"slow");
      $('audio#warnSound')[0].play();

    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>");

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      card.append("<h2>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        card.append("<input type='radio' name='question-" + i +
        "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    card.append("<button id='done'>Done</button>");
  },

  done: function() {

    $.each($("input[name='question-0']:checked"), function() {
      if ($(this).val() === questions[0].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-1']:checked"), function() {
      if ($(this).val() === questions[1].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-2']:checked"), function() {
      if ($(this).val() === questions[2].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-3']:checked"), function() {
      if ($(this).val() === questions[3].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-4']:checked"), function() {
      if ($(this).val() === questions[4].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-5']:checked"), function() {
      if ($(this).val() === questions[5].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-6']:checked"), function() {
      if ($(this).val() === questions[6].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-7']:checked"), function() {
      if ($(this).val() === questions[7].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    this.result();
    

  },

  result: function() {

    clearInterval(timer);

    $("#sub-wrapper h2").remove();
    $('audio#startSound')[0].play();


    card.html("<h2>Your Results:</h2>");
    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    
  }
};

// CLICK EVENTS

$(document).on("click", "#start", function() {
  game.start();
  document.getElementById("ship").style.cssText = "display: block";
  $('#ship').animate({height: '500px'});
  $('#ship').animate({height: '0px'});
  $('audio#startSound')[0].play() 
});


$(document).on("click", "#done", function() {
  game.done();
  document.getElementById("ship").style.cssText = "display: block";
  $('#ship').animate({height: '500px'});
  $('#ship').animate({height: '0px'});
  $('audio#doneSound')[0].play()
});
