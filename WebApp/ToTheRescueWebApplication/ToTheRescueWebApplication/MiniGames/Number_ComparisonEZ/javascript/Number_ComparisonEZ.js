//Lake Sain-Thomason
//Greater Than, Less Than, Equal To! JavaScript file

var isSelected = false;
var difficulty = document.getElementById("minigameScript").getAttribute("difficulty");
var maxNumber = difficulty * 2;
var rightSide, leftSide, selectedName;
var numberCorrect = 0;
var numberWrong = 0;
var imgPath = '../../MiniGames/Number_ComparisonEZ/';
var soundToggle;
var musicToggle;

//Wait till the browser has parsed all html and turned in to document tree.
document.addEventListener('DOMContentLoaded', function () {
    //attach event listeners to any DOM elements...
    $('#leftSideContainer').click(function() {
        if (!isSelected) {
            var selected = document.querySelector('#questionMark');
            var greaterThanImg = document.querySelector('#greaterThan');
            selected.src = greaterThanImg.src
            selectedName = "greaterThan";
            checkAnswer();
        }
    });

    $('#rightSideContainer').click(function () {
        if (!isSelected) {
            var selected = document.querySelector('#questionMark');
            var lessThanImg = document.querySelector('#lessThan');
            selected.src = lessThanImg.src;
            selectedName = "lessThan"
            checkAnswer();
        }
    });
    var equalToImg = document.querySelector('#equalTo');
    equalToImg.onclick = function () {
        if (!isSelected) {
            var selected = document.querySelector('#questionMark');
            selected.src = equalToImg.src;
            selectedName = "equalTo";
            checkAnswer();
        }
    };
    
});
var setupGame = function () {

    leftSide = Math.floor(Math.random() * maxNumber) + 1; //a number from 1 - 10
    rightSide = Math.floor(Math.random() * maxNumber) + 1;
  
    console.log("leftSide: " + leftSide);
    console.log("rightSide: " + rightSide);

    document.querySelector('#oops').style.visibility = "hidden";
    document.querySelector('#goodJob').style.visibility = "hidden"; //hides goodJob if it came out
    document.querySelector('#questionMark').src = imgPath + "images/question.png"; //puts the question mark back out in center   

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
}

var setChalk = function () {
    
    var styling = { position: 'absolute', zIndex: '3' };
    var sourcePath = imgPath + 'images/chalk.png';
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
    var prng = document.getElementById("prng");
    if (soundToggle == "False") prng.play();
    if (numberCorrect == 5) {
        setTimeout(endGame, 3500);
    }
    else setTimeout(setupGame, 3500);
}

var wrongAnswer = function () {
    document.querySelector('#oops').style.visibility = "visible";
    numberCorrect = 0;
    adjustTrophies();
    var woops = document.getElementById("woopsAudio");
    if (soundToggle == "False") woops.play();
    numberWrong++;// not being used yet, might factor into score/game duration
    setTimeout(setupGame, 3500);
}

var beginIntro = function () {
    document.querySelector('#contents').style.visibility = "hidden";
    document.querySelector('#intro').style.visibility = "visible";
    document.querySelector('#endGame').style.visibility = "hidden";
    setTimeout(hideIntro, 5000);
    var bigGroup = document.getElementById("bigGroup");
    bigGroup.play();
    setTimeout(setupGame, 5000);
}

var hideIntro = function () {
    var bgMusic = document.getElementById('bgMusic');
    if (musicToggle == "False") bgMusic.play();
    document.querySelector('#intro').style.visibility = "hidden";
    document.querySelector('#contents').style.visibility = "visible";
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
    var wow = document.getElementById("wow");
    if (soundToggle == "False") wow.play();
    removeChalk();
    document.querySelector('#contents').style.visibility = "hidden";
    document.querySelector('#endGame').style.visibility = "visible";
    
    var performanceStat = 5 - numberWrong;
    if (performanceStat < -5) performanceStat = -5;
    document.getElementById("score").value = performanceStat;
    setTimeout(EndofGame, 4000); //function displays good job message and returns to map
    //send off score return back to map
}
var createHtmlElement = function () {

    //set the toggles
    soundToggle = document.getElementById("minigameScript").getAttribute("toggleSound"); //True = sound off, False = sound on
    musicToggle = document.getElementById("minigameScript").getAttribute("toggleMusic");

    //css
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
        //gonnna be stored on the server at some point
    fileRef.setAttribute("href", "../../Minigames/Number_ComparisonEZ/CSS/NumberComparisonEZ.css");
        //add the css file to the html
    document.getElementsByTagName("head")[0].appendChild(fileRef);

    var divContainer = document.getElementById("BlocksGame");
    divContainer.style.width = "50%";
    //contents of divContainer
        //intro header
    var header = document.createElement("h1");
    header.setAttribute("id", "intro");
    header.setAttribute("class", "message");
    header.innerHTML = "Greater Than, Less Than, Equal To!";

        //end game header
    var header1 = document.createElement("h1");
    header1.setAttribute("id", "endGame");
    header1.setAttribute("class", "message");
    header1.innerHTML = "Wow! Great Job!";

        //background
    var background = document.createElement("img");
    background.setAttribute("id", "background");
    background.setAttribute("src", imgPath + "images/chalkboard.png");

        //content div
    var contentDiv = document.createElement("div");
    contentDiv.setAttribute("id", "contents");

        //images belonging in the content div
            //question mark
    var questionMark = document.createElement("img");
    questionMark.setAttribute("id", "questionMark");
    questionMark.setAttribute("src", imgPath + "images/question.png");
            //oops
    var oops = document.createElement("img");
    oops.setAttribute("id", "oops");
    oops.setAttribute("src", imgPath + "images/oops.png");
            //goodJob
    var goodJob = document.createElement("img");
    goodJob.setAttribute("id", "goodJob");
    goodJob.setAttribute("src", imgPath + "images/goodJob.png");
        //trophies
    var id = "trophy";
    for (var i = 0; i < 5; i++) {
        var trophy = document.createElement("img");
        
        trophy.setAttribute("id", id + i);
        trophy.setAttribute("src", imgPath + "images/trophy.png");
        contentDiv.appendChild(trophy);
    }
            //greater than
    var greaterThan = document.createElement("img");
    greaterThan.setAttribute("id", "greaterThan");
    greaterThan.setAttribute("class", "comparison");
    greaterThan.setAttribute("src", imgPath + "images/greaterThan.png");
            //less than
    var lessThan = document.createElement("img");
    lessThan.setAttribute("id", "lessThan");
    lessThan.setAttribute("class", "comparison");
    lessThan.setAttribute("src", imgPath + "images/lessThan.png");
            //equal to
    var equalTo = document.createElement("img");
    equalTo.setAttribute("id", "equalTo");
    equalTo.setAttribute("class", "comparison");
    equalTo.setAttribute("src", imgPath + "images/equalTo.png");

    contentDiv.appendChild(questionMark);
    contentDiv.appendChild(lessThan);
    contentDiv.appendChild(greaterThan);
    contentDiv.appendChild(oops);
    contentDiv.appendChild(goodJob);
    contentDiv.appendChild(equalTo);
        //end contentDiv

        //leftside container
    var rightSideContainer = document.createElement("div");
    rightSideContainer.setAttribute("id", "rightSideContainer");

        //rightside container
    var leftSideContainer = document.createElement("div");
    leftSideContainer.setAttribute("id", "leftSideContainer");

    //audio content
    var audioDiv = document.createElement("div");
    audioDiv.setAttribute("id", "audioDiv");

    var backgroundMusic = document.createElement('audio');
    backgroundMusic.setAttribute('src', imgPath + 'sounds/background.mp3');
    backgroundMusic.setAttribute('id', 'bgMusic');
    //backgroundMusic.setAttribute('autoplay', 'autoplay');
    backgroundMusic.loop = true;
    backgroundMusic.volume = '0.3';

    backgroundMusic.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
        this.volume = '0.3';
    }, false);//keeps background music alive

    var prng = document.createElement('audio');
    prng.setAttribute('src', imgPath + 'sounds/prng.m4a');
    prng.setAttribute('id', 'prng');

    var woopsAudio = document.createElement('audio');
    woopsAudio.setAttribute('src', imgPath + 'sounds/woops.m4a');
    woopsAudio.setAttribute('id', 'woopsAudio');

    var wow = document.createElement('audio');
    wow.setAttribute('src', imgPath + 'sounds/wow.m4a');
    wow.setAttribute('id', 'wow');

    var biggestGroup = document.createElement('audio');
    biggestGroup.setAttribute('src', imgPath + 'sounds/tryToClickTheBiggestGroup.m4a');
    biggestGroup.setAttribute('id', 'bigGroup');

    audioDiv.appendChild(backgroundMusic);
    audioDiv.appendChild(prng);
    audioDiv.appendChild(wow);
    audioDiv.appendChild(woopsAudio);
    audioDiv.appendChild(biggestGroup);


    //append all content 
    divContainer.appendChild(background);
    divContainer.appendChild(header);
    divContainer.appendChild(header1);
    divContainer.appendChild(contentDiv);
    divContainer.appendChild(leftSideContainer);
    divContainer.appendChild(rightSideContainer);
    divContainer.appendChild(audioDiv);
}
createHtmlElement();
beginIntro();