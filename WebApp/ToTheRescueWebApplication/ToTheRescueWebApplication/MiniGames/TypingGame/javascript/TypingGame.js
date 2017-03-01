var totalKeyPresses = 0;
var correctKeyPresses = 0;
var usedArr = [];

var audio = new Audio();

var endGameFuncCalls = 0;

var soundToggle = "False";
var musicToggle = "False";

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function GetRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function AskQuestion(usedArr) {
    var index = GetRandomInt(0, usedArr.length - 1);
    var count = 0;

    responsiveVoice.speak(usedArr[index], "US English Female");

    for (var i = 1; i < usedArr[index].length + 1; i++) {
        var pId = "p";
        pId += i.toString();

        //fill the p tags with each letter of the word
        document.getElementById(pId).innerHTML = usedArr[index][i - 1];

        count++;
    }

    //reset the remaining p tags
    for (var i = count + 1; i < 7; i++) {
        var pId = "p";
        pId += i.toString();
        document.getElementById(pId).innerHTML = "";
    }
}

function IsCorrectTypedLetter(typedChar) {
    var correct = false;

    var currLetter = '';
    for (var i = 1; i < 7; i++) {
        var pId = "p";
        pId += i.toString();

        if (document.getElementById(pId).style.color === "red") {
            currLetter = document.getElementById(pId).innerHTML;
            break;
        }
    }

    if (typedChar === currLetter)
    {
        correct = true;
    }

    return correct;
}

function MakeNextLetterRed() {
    var index = 0;
    for (var i = 1; i < 7; i++) {
        var pId = "p";
        pId += i.toString();

        //find the red letter
        if (document.getElementById(pId).style.color === "red") {
            //make the red letter black
            index = i;
            var p = document.getElementById(pId);
            p.style.color = "black";
            p.style.textDecoration = "none";
            break;
        }
    }

    index++;
    var pId = "p";
    pId += index.toString();

    if (index <= 6 && document.getElementById(pId).innerHTML !== "") {
        var p = document.getElementById(pId);
        p.style.color = "red";
        p.style.textDecoration = "underline";
    }
    else {

        if (soundToggle === "False") {
            //make a correct answer sound
            audio.src = "../../Audio/soundEffects/elevatorDing.mp3";
            audio.play();
        }

        //allows the audio to play before the user plays the game
        setTimeout(function () {
            AskQuestion(usedArr);
            var p = document.getElementById("p1");
            p.style.color = "red";
            p.style.textDecoration = "underline";
            document.getElementById("input").value = "";
            return false;
        }, 250);
    }
    return true;
}

function CreateHTMLElements() {
    var imgSrc = "../../MiniGames/ColorSortingGame/img/";

    ///set up the CSS file needed for this minigame
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
    //gonnna be stored on the server at some point
    fileRef.setAttribute("href", "../../MiniGames/TypingGame/css/TypingGame.css");
    //add the css file to the html
    document.getElementsByTagName("head")[0].appendChild(fileRef);

    //the container that will hold the entire game
    var divContainer = document.getElementById("BlocksGame");

    var container = document.createElement("div");
    container.setAttribute("id", "container");

    var question = document.createElement("p");
    question.setAttribute("id", "question");
    question.innerHTML = "Type the word:";
    container.appendChild(question);

    for (var i = 1; i < 7; i++) {
        var p = document.createElement("p");
        var id = "p";
        id += i.toString();
        p.setAttribute("id", id);
        p.setAttribute("class", "letters");
        container.appendChild(p);
    }

    var input = document.createElement("input");
    input.setAttribute("id", "input");
    input.setAttribute("name", "name");
    input.setAttribute("type", "text");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("onblur", "this.focus()");

    var antContainer = document.createElement("div");
    antContainer.setAttribute("id", "antContainer");
    antContainer.setAttribute("class", "imgContainers");

    var img = document.createElement("img");
    img.setAttribute("id", "ant");
    img.setAttribute("src", imgSrc + "/red/ant.png");
    img.style.width = "100%";
    img.style.height = "100%";

    antContainer.appendChild(img);

    var octopusContainer = document.createElement("div");
    octopusContainer.setAttribute("id", "octopusContainer");
    octopusContainer.setAttribute("class", "imgContainers");

    var img2 = document.createElement("img");
    img2.setAttribute("id", "octopus");
    img2.setAttribute("src", imgSrc + "/blue/octopus.png");
    img2.style.width = "100%";
    img2.style.height = "100%";

    octopusContainer.appendChild(img2);

    var beeContainer = document.createElement("div");
    beeContainer.setAttribute("id", "beeContainer");
    beeContainer.setAttribute("class", "imgContainers");

    var img3 = document.createElement("img");
    img3.setAttribute("id", "bee");
    img3.setAttribute("src", imgSrc + "/yellow/bee.png");
    img3.style.width = "100%";
    img3.style.height = "100%";

    beeContainer.appendChild(img3);

    var turtleContainer = document.createElement("div");
    turtleContainer.setAttribute("id", "turtleContainer");
    turtleContainer.setAttribute("class", "imgContainers");

    var img4 = document.createElement("img");
    img4.setAttribute("id", "turtle");
    img4.setAttribute("src", imgSrc + "/green/turtle.png");
    img4.style.width = "100%";
    img4.style.height = "100%";

    turtleContainer.appendChild(img4);

    divContainer.appendChild(container);
    divContainer.appendChild(input);
    divContainer.appendChild(antContainer);
    divContainer.appendChild(octopusContainer);
    divContainer.appendChild(beeContainer);
    divContainer.appendChild(turtleContainer);
}

function EndGame()
{
    responsiveVoice.speak("Great job!", "US English Female");

    document.getElementById("container").style.visibility = "hidden";
    document.getElementById("input").style.visibility = "hidden";

    var percentage = correctKeyPresses / totalKeyPresses;

    var returnVal = null;

    if (percentage >= 0.10 && percentage <= 0.20) {
        returnVal = -4;
    }
    else if (percentage > 0.20 && percentage <= 0.30) {
        returnVal = -3;
    }
    else if (percentage > 0.30 && percentage <= 0.40) {
        returnVal = -2;
    }
    else if (percentage > 0.40 && percentage <= 0.50) {
        returnVal = -1;
    }
    else if (percentage > 0.50 && percentage <= 0.60) {
        returnVal = 0;
    }
    else if (percentage > 0.60 && percentage <= 0.70) {
        returnVal = 1;
    }
    else if (percentage > 0.70 && percentage <= 0.80) {
        returnVal = 2;
    }
    else if (percentage > 0.80 && percentage <= 0.90) {
        returnVal = 3;
    }
    else if (percentage > 0.90 && percentage <= 0.95) {
        returnVal = 4;
    }
    else if (percentage < 0.10) {
        returnVal = -5;
    }
    else {
        returnVal = 5;
    }

    if (totalKeyPresses === 0)
        returnVal = 0;

    document.getElementById("score").value = returnVal;
    EndofGame();
}

function Main() {
    //sight words for the kids to type
    var preKWords = ["a", "and", "big", "can", "come", "down", "find", "for", "funny",
					"go", "help", "here", "i", "in", "is", "it", "jump", "little",
					"look", "make", "me", "my", "not", "one", "play", "red", "run", "said",
					"see", "the", "three", "to", "two", "up", "we", "where", "yellow", "you"];

    var kWords = ["all", "am", "are", "at", "ate", "be", "black", "brown",
				  "but", "came", "did", "do", "eat", "four", "get", "good",
				  "have", "he", "into", "like", "must", "new", "no", "now", "on",
				  "our", "out", "please", "pretty", "ran", "ride", "saw", "say",
				  "she", "so", "soon", "that", "there", "they", "this", "too", "under",
				  "want", "was", "well", "went", "what", "white", "who", "will",
				  "with", "yes"];

    var backgroundMusic = new Audio("../../Audio/backgroundMusic/bgSong2.mp3");
    backgroundMusic.volume = "0.1";

    //get the game's difficulty level and modify the dataset for that difficulty level
    var difficulty = document.getElementById("minigameScript").getAttribute("difficulty");
    soundToggle = document.getElementById("minigameScript").getAttribute("toggleSound"); //True = sound off, False = sound on
    musicToggle = document.getElementById("minigameScript").getAttribute("toggleMusic");

    if (difficulty <= 2)
        usedArr = preKWords;
    else
        usedArr = kWords;

    //create the elements
    CreateHTMLElements();

    responsiveVoice.OnVoiceReady = function () {
        responsiveVoice.speak("Type the word that appears on the screen.", "US English Female");
    };

    if (musicToggle === "False") {
        //play background music
        backgroundMusic.play();
    }

    //reloop the audio
    backgroundMusic.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

    document.getElementById("p1").style.color = "red";

    setTimeout(function () {
        AskQuestion(usedArr);
    }, 4000);

    $("#input").focus();

    //detects what key was pressed, and allows what to be underlined to be shown
    $(document).keypress(function (event) {
        totalKeyPresses++;
        var typedChar = String.fromCharCode(event.which);

        if (IsCorrectTypedLetter(typedChar) === true) {
            correctKeyPresses++;

            //make the next be red and underline
            if (MakeNextLetterRed() === false) {
                return false;
            }
        }
        else {
            return false;
        }
    });

    //doesn't allow delete characters to be used
    $("html").keydown(function (event) {
        if (event.keyCode === 8 || event.keyCode === 46)
            event.preventDefault();
    });

    //if the user leaves the page
    $(window).on("beforeunload", function () {
        responsiveVoice.cancel(); //quit doing text to speech
    });

    //play the game for 2 minuets and then end the game
    setTimeout(function () {
        EndGame();
    }, 120000);
}

Main();