//Lake Sain-Thomason
//Greater Than, Less Than, Equal To! JavaScript file

var isSelected = false;
var rightSide, leftSide, selectedName;
var numberCorrect = 0;
var numberWrong = 0;

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

    removeChalk();
    setChalk();

    isSelected = false; //allows the user to make a selection again
}

var removeChalk = function () {
    var node = document.getElementById('leftSideContainer');

    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    var node2 = document.getElementById('rightSideContainer');
    while (node2.firstChild) {
        node2.removeChild(node2.firstChild);
    }
}//clean this up!

var setChalk = function () {
    
    var styling = { position: 'absolute', zIndex: '3' };
    var sourcePath = 'images/chalk.jpg';
    var container = 'leftSideContainer';//left container first

    var i, modifier = 1;
    var x = true;
    var side = leftSide; //start with left side

    while (x) {
        for (i = 0; i < side; i++) {
            if (i == 0) {
                styling.top = '145px';
            }
            if (i == 3) {
                modifier -= 3;
                styling.top = '215px';
            }
            if (i == 6) {
                modifier -= 3;
                styling.top = '285px';
            }
            styling.left = ((modifier * 50) + 60) + 'px';          
            createChalk(sourcePath, styling, container);
            modifier++;
        }

        if (side == leftSide) {
            modifier = 14;
            container = 'rightSideContainer';
            side = rightSide;
        }
        else {
            x = false;
        }
    }
}

var createChalk = function (source, styling, container) {
    var container = document.querySelector('#' + container);
    var chalkImg = document.createElement('img');
    chalkImg.src = source;
    for (var key in styling) {
        if (styling.hasOwnProperty(key)) {
            chalkImg.style[key] = styling[key];
        }
    }//loops through the styling object to apply the styles to the chalkImg  
    container.appendChild(chalkImg);
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
        setTimeout(endGame, 4500);
    }
    else setTimeout(setupGame, 4500);
}

var wrongAnswer = function () {
    document.querySelector('#oops').style.visibility = "visible";
    numberCorrect = 0;
    adjustTrophies();
    numberWrong++;// not being used yet, might factor into score/game duration
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
    removeChalk();
    document.querySelector('#content').style.visibility = "hidden";
    document.querySelector('#endGame').style.visibility = "visible";
   //send off score return back to map
}
beginIntro();