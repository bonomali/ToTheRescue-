const NUM_PATTERNS = 7;
const patternImgSrc = "../../MiniGames/PatternCompletion/img/";
const tangramImgSrc = "../../MiniGames/TangramGame/img/";

var currIndex = 0;
var patternOrderArray = [];
var answer = null;
var numAttempts = 0;
var soundToggle = "False";
var musicToggle = "False";
var ding = new WebAudioAPISound("../../Audio/soundEffects/airPlaneDing.mp3");
var clank = new WebAudioAPISound("../../Audio/soundEffects/metallicClank.mp3");
var numEndGameCalls = 0;

function ZeroPattern() {
    document.getElementById("i1").src = tangramImgSrc + "square.png";
    document.getElementById("i2").src = tangramImgSrc + "square.png";
    document.getElementById("i3").src = tangramImgSrc + "square.png";
    document.getElementById("i4").src = tangramImgSrc + "square.png";
    document.getElementById("i5").src = tangramImgSrc + "square.png";
    document.getElementById("i6").src = tangramImgSrc + "square.png";
    document.getElementById("i7").src = tangramImgSrc + "square.png";
    document.getElementById("i8").src = patternImgSrc + "questionMark.png";
    answer = "square";
}

function FirstPattern() {
    document.getElementById("i1").src = tangramImgSrc + "square.png";
    document.getElementById("i2").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i3").src = tangramImgSrc + "square.png";
    document.getElementById("i4").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i5").src = tangramImgSrc + "square.png";
    document.getElementById("i6").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i7").src = tangramImgSrc + "square.png";
    document.getElementById("i8").src = patternImgSrc + "questionMark.png";
    answer = "greenTri";
}

function SecondPattern() {
    document.getElementById("i1").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i2").src = tangramImgSrc + "square.png";
    document.getElementById("i3").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i4").src = tangramImgSrc + "square.png";
    document.getElementById("i5").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i6").src = tangramImgSrc + "square.png";
    document.getElementById("i7").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i8").src = patternImgSrc + "questionMark.png";
    answer = "square";
}

function ThirdPattern() {
    document.getElementById("i1").src = tangramImgSrc + "square.png";
    document.getElementById("i2").src = tangramImgSrc + "square.png";
    document.getElementById("i3").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i4").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i5").src = tangramImgSrc + "square.png";
    document.getElementById("i6").src = tangramImgSrc + "square.png";
    document.getElementById("i7").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i8").src = patternImgSrc + "questionMark.png";
    answer = "greenTri";
}

function FourthPattern() {
    document.getElementById("i1").src = tangramImgSrc + "square.png";
    document.getElementById("i2").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i3").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i4").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i5").src = tangramImgSrc + "square.png";
    document.getElementById("i6").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i7").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i8").src = patternImgSrc + "questionMark.png";
    answer = "greenTri";
}

function FifthPattern() {
    document.getElementById("i1").src = tangramImgSrc + "square.png";
    document.getElementById("i2").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i3").src = patternImgSrc + "star.png";
    document.getElementById("i4").src = tangramImgSrc + "square.png";
    document.getElementById("i5").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i6").src = patternImgSrc + "star.png";
    document.getElementById("i7").src = tangramImgSrc + "square.png";
    document.getElementById("i8").src = patternImgSrc + "questionMark.png";
    answer = "greenTri";
}

function SixthPattern() {
    document.getElementById("i1").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i2").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i3").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i4").src = tangramImgSrc + "square.png";
    document.getElementById("i5").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i6").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i7").src = tangramImgSrc + "greenTri.png";
    document.getElementById("i8").src = patternImgSrc + "questionMark.png";
    answer = "square";
}

/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function Shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function MakeNotClickable() {
    document.getElementById("square").onclick = null;
    document.getElementById("triangle").onclick = null;
}

function MakeClickable() {
    document.getElementById("square").onclick = function () { ClickedAnswer("square"); };
    document.getElementById("triangle").onclick = function () { ClickedAnswer("greenTri"); };
}

function CreatePattern() {
    var questionMark = document.getElementById("i8");
    var emoji = document.getElementById("emojiImg");
    emoji.src = patternImgSrc + "thinkingEmoji.png";
    questionMark.src = patternImgSrc + "questionMark.png";

    MakeClickable();
    //shows what pattern comes next
    switch (patternOrderArray[currIndex]) {
        case 0:
            ZeroPattern();
            break;
        case 1:
            FirstPattern();
            break;
        case 2:
            SecondPattern();
            break;
        case 3:
            ThirdPattern();
            break;
        case 4:
            FourthPattern();
            break;
        case 5:
            FifthPattern()
            break;
        case 6:
            SixthPattern();
            break;
        case 7:
            MakeNotClickable();
            EndGame();
            break;
        default:
            console.log("error");
    }
}

function ClickedAnswer(attempt) {
    var questionMark = document.getElementById("i8");
    var emoji = document.getElementById("emojiImg");
    numAttempts++;
    MakeNotClickable();

    if (attempt === answer) {
        var tempSrc = answer;
        tempSrc += ".png";

        //play good effect
        if (soundToggle === "False") {
            ding.play(ding);
        }

        currIndex++;
        emoji.src = patternImgSrc + "happyEmoji.png";
        questionMark.src = tangramImgSrc + tempSrc;
        setTimeout(CreatePattern, 1500);
    }
    else {
        if (soundToggle === "False") {
            //play clank effect
            clank.play(clank);
        }

        emoji.src = patternImgSrc + "sadEmoji.png";
        setTimeout(function () {
            emoji.src = patternImgSrc + "thinkingEmoji.png";
            MakeClickable();
        }, 1500)
    }
}

function EndGame() {
    numEndGameCalls++;

    if (numEndGameCalls === 1) {
        responsiveVoice.speak("Great job!", "US English Female");
        MakeNotClickable();
        document.getElementById("patternContainer").style.visibility = "hidden";
        document.getElementById("emojiImg").src = patternImgSrc + "happyEmoji.png";

        var percentage = currIndex + 1 / numAttempts;

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
            returnVal = 0;
        }
        else if (percentage > 0.50 && percentage <= 0.60) {
            returnVal = 1;
        }
        else if (percentage > 0.60 && percentage <= 0.70) {
            returnVal = 2;
        }
        else if (percentage > 0.70 && percentage <= 0.80) {
            returnVal = 3;
        }
        else if (percentage > 0.80 && percentage <= 0.90) {
            returnVal = 4;
        }
        else if (percentage > 0.90 && percentage <= 0.95) {
            returnVal = 5;
        }
        else if (percentage < 0.10) {
            returnVal = -5;
        }
        else {
            returnVal = 5;
        }

        if (numAttempts === 0)
            returnVal = 0;

        document.getElementById("score").value = returnVal;
        EndofGame(); //function displays good job message and returns to map
    }
}

function CreateHtmlElements() {
    //set up the CSS file needed for this minigame
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
    //gonnna be stored on the server at some point
    fileRef.setAttribute("href", "../../MiniGames/PatternCompletion/css/PatternCompletion.css");
    //add the css file to the html
    document.getElementsByTagName("head")[0].appendChild(fileRef);

    //the container that will hold the game
    var divContainer = document.getElementById("BlocksGame");

    //the header
    var header = document.createElement("h1");
    header.setAttribute("id", "header");
    header.innerHTML = "Pattern Completion!";

    var contentContainer = document.createElement("div");
    contentContainer.setAttribute("id", "contentContainer");

    var patternContainer = document.createElement("div");
    patternContainer.setAttribute("id", "patternContainer");

    for (var i = 1; i < 8; i++) {
        var pid = "p";
        var iid = "i";
        pid += i.toString();
        iid += i.toString();

        var div = document.createElement("div");
        div.setAttribute("id", pid);
        div.setAttribute("class", "pattern");

        var img = document.createElement("img");
        img.setAttribute("id", iid);
        img.setAttribute("width", "100%");
        img.setAttribute("height", "100%");

        div.appendChild(img);
        patternContainer.appendChild(div);
    }

    var question = document.createElement("div");
    question.setAttribute("id", "question");
    question.setAttribute("class", "pattern");

    var img = document.createElement("img");
    img.setAttribute("id", "i8");
    img.setAttribute("src", patternImgSrc + "questionMark.png");
    img.setAttribute("width", "100%");
    img.setAttribute("height", "100%");

    question.appendChild(img);

    patternContainer.appendChild(question);

    contentContainer.appendChild(patternContainer);

    //square
    var square = document.createElement("div");
    square.setAttribute("id", "square");
    square.setAttribute("class", "bottomRow");

    var squareImg = document.createElement("img");
    squareImg.setAttribute("id", "squareImg");
    squareImg.setAttribute("src", tangramImgSrc + "square.png");
    squareImg.setAttribute("width", "100%");
    squareImg.setAttribute("height", "100%");

    square.appendChild(squareImg);

    var emoji = document.createElement("div");
    emoji.setAttribute("id", "emoji");
    emoji.setAttribute("class", "bottomRow");

    var emojiImg = document.createElement("img");
    emojiImg.setAttribute("id", "emojiImg");
    emojiImg.setAttribute("src", patternImgSrc + "thinkingEmoji.png");
    emojiImg.setAttribute("width", "100%");
    emojiImg.setAttribute("height", "100%");

    emoji.appendChild(emojiImg);

    var triangle = document.createElement("div");
    triangle.setAttribute("id", "triangle");
    triangle.setAttribute("class", "bottomRow");

    var triangleImg = document.createElement("img");
    triangleImg.setAttribute("id", "triangleImg");
    triangleImg.setAttribute("src", tangramImgSrc + "greenTri.png");
    triangleImg.setAttribute("width", "100%");
    triangleImg.setAttribute("height", "100%");

    triangle.appendChild(triangleImg);

    divContainer.appendChild(header);
    divContainer.appendChild(contentContainer);
    divContainer.appendChild(square);
    divContainer.appendChild(emoji);
    divContainer.appendChild(triangle);
}

function Main() {
    var difficulty = document.getElementById("minigameScript").getAttribute("difficulty");

    //get the sound
    soundToggle = document.getElementById("minigameScript").getAttribute("toggleSound"); //True = sound off, False = sound on
    musicToggle = document.getElementById("minigameScript").getAttribute("toggleMusic");

    CreateHtmlElements();
    for (var i = 0; i < NUM_PATTERNS; i++) {
        patternOrderArray[i] = i;
    }

    //NEED TO DO BACKGROUND MUSIC AND MUSIC TOGGLES AND SOUND EFFECTS ON CORRECT AND WRONG
    var backgroundMusic = new WebAudioAPISound("../../Audio/backgroundMusic/bgSong3.mp3", { loop: true });
    backgroundMusic.setVolume(10);

    window.onload = function () {
        if (musicToggle === "False") {
            //play background music
            backgroundMusic.play(backgroundMusic);
        }

        responsiveVoice.speak("Patterns are sets of things that repeat. Pick the shape to complete the pattern.", "US English Female");
        Shuffle(patternOrderArray);
        patternOrderArray[NUM_PATTERNS] = 7;
        CreatePattern();
        MakeNotClickable();

        setTimeout(function () {
            MakeClickable();
        }, 4500);
    }

    //if the user didn't finish the game in 2 minuets
    setTimeout(function () {
        MakeNotClickable();
        EndGame();
    }, 120000);
}

Main();