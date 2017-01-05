//Lake Sain-Thomason
//Greater Than, Less Than, Equal To! JavaScript file

var isSelected = false;
var rightSide, leftSide, selectedName;
var numberCorrect = 0;

//Wait till the browser has parsed all html and turned in to document tree.
document.addEventListener('DOMContentLoaded', function () {
    //attach event listeners to any DOM elements...

    var selected = document.querySelector('#questionMark');

    var greaterThanImg = document.querySelector('#greaterThan');
    greaterThanImg.onclick = function () {
        if (!isSelected) {
            selected.src = greaterThanImg.src;
            selectedName = "greaterThan";
            checkAnswer();
        }
    };

    var lessThanImg = document.querySelector('#lessThan');
    lessThanImg.onclick = function () {
        if (!isSelected) {
            selected.src = lessThanImg.src;
            selectedName = "lessThan"
            checkAnswer();
        }
    };

    var equalToImg = document.querySelector('#equalTo');
    equalToImg.onclick = function () {
        if (!isSelected) {
            selected.src = equalToImg.src;
            selectedName = "equalTo";
            checkAnswer();
        }
    };
    //you can also attach a click listener using this syntax
    //greaterThanImg.addEventListener('click', function () {
    //    console.log('alternate way to attach an event handler.');
    //});
});
var setupGame = function () {
    var maxNumber = 9; //subject to change, will probably use dataset for minigame

    leftSide = Math.floor(Math.random() * maxNumber) + 1; //a number from 1 - 10
    rightSide = Math.floor(Math.random() * maxNumber) + 1;
  
    console.log("leftSide: " + leftSide);
    console.log("rightSide: " + rightSide);

    document.querySelector('#oops').style.visibility = "hidden";
    document.querySelector('#goodJob').style.visibility = "hidden"; //hides goodJob if it came out
    document.querySelector('#questionMark').src = "images/question.png"; //puts the question mark back out in center
    
    setChalk();

    isSelected = false; //allows the user to make a selection again
}

var setChalk = function () {

}

var checkAnswer = function () {
    isSelected = true;
    var selected = document.querySelector('#questionMark');
    if ((leftSide === rightSide && selectedName == "equalTo") ||
        (leftSide > rightSide && selectedName == "greaterThan") ||
        (leftSide < rightSide && selectedName == "lessThan")) {
        setTimeout(correctAnswer, 1500);
    }
    else setTimeout(wrongAnswer, 1500);
}

var correctAnswer = function () {
    var goodJob = document.querySelector('#goodJob');
    goodJob.style.visibility = "visible";
    numberCorrect++;
    adjustTrophies();
    if (numberCorrect == 5) {
        endGame();
    }
    setTimeout(setupGame, 4500);
}

var wrongAnswer = function () {
    document.querySelector('#oops').style.visibility = "visible";
    numberCorrect = 0;
    adjustTrophies();
    setTimeout(setupGame, 4500);
}

var beginIntro = function () {
    document.querySelector('#content').style.visibility = "hidden";
    document.querySelector('#intro').style.visibility = "visible";
    document.querySelector('#endGame').style.visibility = "hidden";
    setTimeout(hideIntro, 5000);
    setTimeout(setupGame, 5000);
}

var hideIntro = function () {
    document.querySelector('#intro').style.visibility = "hidden";
    document.querySelector('#content').style.visibility = "visible";
}

var adjustTrophies = function () {
    var i = 0;
    for (i = 0; i < numberCorrect; i++) {
        document.querySelector('#trophy' + i).style.opacity = 1;
    }
    if (numberCorrect == 0) {
        while (i != 5) {
            document.querySelector('#trophy' + i).style.opacity = .4;
            i++;
        }
    }
}

var endGame = function() {
    document.querySelector('#content').style.visibility = "hidden";
    document.querySelector('#endGame').style.visibility = "visible";
   //send off score return back to map
}
beginIntro();