//Lake Sain-Thomason
//Greater Than, Less Than, Equal To! JavaScript file

var isSelected = false;
var difficulty = document.getElementById("minigameScript").getAttribute("difficulty");
var maxNumber = (difficulty = 0) ? 1 + difficulty * 2 : 3;
var rightSide, leftSide, selectedName;
var numberCorrect = 0;
var numberWrong = 0;
var imgPath = '../../MiniGames/Number_ComparisonEZ/';
var soundToggle;
var musicToggle;

//for audio
var wow = null;
var prng = null;
var woops = null;
var bigGroup = null;
var bgMusic = null;

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
    setTimeout(function GameOver() {
        if (soundToggle == "False") responsiveVoice.speak("Good Attempt.");
        var finalScore = -5;
        document.getElementById('score').value = finalScore;
        EndofGame();
    }, 300000);
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
    var sourcePath = imgPath + 'images/Chalk.png';
    var container = 'leftSideContainer';//left container first

    var i, modifier = 1;
    var x = 0;
    var side = leftSide; //start with left side

    while (x < 2) {
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

        if (x == 0) {
            modifier = 14;
            container = 'rightSideContainer';
            side = rightSide;
        }
        x++;
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
    
    if (soundToggle == "False") prng.play(prng);
    if (numberCorrect == 5) {
        setTimeout(endGame, 1500);
    }
    else setTimeout(setupGame, 1500);
}

var wrongAnswer = function () {
    document.querySelector('#oops').style.visibility = "visible";
    numberCorrect = 0;
    adjustTrophies();
    
    if (soundToggle == "False") woops.play(woops);
    numberWrong++;// not being used yet, might factor into score/game duration
    setTimeout(setupGame, 1500);
}

var beginIntro = function () {
    document.querySelector('#contents').style.visibility = "hidden";
    document.querySelector('#intro').style.visibility = "visible";
    document.querySelector('#endGame').style.visibility = "hidden";
    setTimeout(hideIntro, 5000);
    
    bigGroup.play(bigGroup);
    setTimeout(setupGame, 5000);
}

var hideIntro = function () {
    if (musicToggle == "False") bgMusic.play(bgMusic);
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
    if (soundToggle == "False") wow.play(wow);
    removeChalk();
    //document.querySelector('#contents').style.visibility = "hidden";
    //document.querySelector('#endGame').style.visibility = "visible";
    
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

    //audio content using the api
    bgMusic = new WebAudioAPISound(imgPath + 'sounds/background.mp3', { loop: true });
    bgMusic.setVolume(30);

    prng = new WebAudioAPISound(imgPath + 'sounds/prng.m4a');

    woops = new WebAudioAPISound(imgPath + 'sounds/woops.m4a');

    wow = new WebAudioAPISound(imgPath + 'sounds/wow.m4a');

    bigGroup = new WebAudioAPISound(imgPath + 'sounds/tryToClickTheBiggestGroup.m4a');

    //append all content 
    divContainer.appendChild(contentDiv);
    contentDiv.appendChild(background);
    contentDiv.appendChild(header);
    contentDiv.appendChild(header1);
    contentDiv.appendChild(leftSideContainer);
    contentDiv.appendChild(rightSideContainer);
}
createHtmlElement();
beginIntro();

/*Universal Minigame Scaler!*/
var pageWidth, pageHeight;

var basePage = {
    width: 990,
    height: 699,
    scale: 1,
    scaleX: 1,
    scaleY: 1
};//change the height and width to match your minigame height and width

$(function () {
    //#contents should be the div that contains all visual elements of your minigame
    var pageContent = $('#contents');

    getPageSize();
    scalePages(pageContent, pageWidth, pageHeight);

    //using underscore to delay resize method till finished resizing window
    $(window).resize(_.debounce(function () {
        getPageSize();
        scalePages(pageContent, pageWidth, pageHeight);
    }, 150));


    function getPageSize() {
        var blocksDiv = document.getElementById('BlocksGame');

        var playWidth = document.getElementById('playMenu').offsetWidth;

        //offsetLeft refers to the padding set in the BlocksGame css
        var bodyWidth = $('body').width() - (blocksDiv.offsetLeft * 2);
        var bodyHeight = $('body').height() - (blocksDiv.offsetTop * 2);

        //set the blocksDiv width to adjust for the playMenu
        var newWidth = bodyWidth - playWidth;
        blocksDiv.style.width = newWidth.toString() + 'px';
        blocksDiv.style.height = bodyHeight.toString() + 'px';

        pageHeight = $('#BlocksGame').height();
        pageWidth = $('#BlocksGame').width();
    }

    function scalePages(pageContent, maxWidth, maxHeight) {
        var scaleX = 1, scaleY = 1;

        //get the factor we want to scale by
        scaleX = (maxWidth / basePage.width);
        scaleY = (maxHeight / basePage.height);

        //set the new factors
        basePage.scaleX = scaleX;
        basePage.scaleY = scaleY;

        //take the smaller scale factor
        basePage.scale = (scaleX > scaleY) ? scaleY : scaleX;

        //set a new position
        var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth) / 2));
        var newTopPos = Math.abs(Math.floor(((basePage.height * basePage.scale) - maxHeight) / 2));

        //apply the new style
        pageContent.attr('style', '-webkit-transform:scale(' + basePage.scale + ');left:' + newLeftPos + 'px;top:' + newTopPos + 'px;');
    }
});