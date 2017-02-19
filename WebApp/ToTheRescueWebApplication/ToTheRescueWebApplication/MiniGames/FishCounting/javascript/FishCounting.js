var answer = null;
var totalClicks = 0;
var correctClicks = 0;

function GetRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ClickedAnswer(clickedDiv) {
    responsiveVoice.speak(clickedDiv.innerHTML, "US English Female");
    totalClicks++;
    if (clickedDiv.innerHTML === answer.toString()) {
        correctClicks++;
        GameLoop();
    }
}

function TranslateFish() {
    var one = document.getElementById("one");
    var two = document.getElementById("two");
    var three = document.getElementById("three");
    var four = document.getElementById("four");
    var five = document.getElementById("five");
    var six = document.getElementById("six");
    var seven = document.getElementById("seven");
    var eight = document.getElementById("eight");
    var nine = document.getElementById("nine");
    var ten = document.getElementById("ten");
    var timeOutAmount = 0;

    if (one.style.visibility === "visible") {
        timeOutAmount += 1000;
        setTimeout(function () {
            one.style.transform = "translate(555%, 8%)";
        }, timeOutAmount);
    }
    if (two.style.visibility === "visible") {
        timeOutAmount += 1000;
        setTimeout(function () {
            two.style.transform = "translate(443%, 0%)";
        }, timeOutAmount);
    }
    if (three.style.visibility === "visible") {
        timeOutAmount += 1000;
        setTimeout(function () {
            three.style.transform = "translate(454%, 0%)";
        }, timeOutAmount);
    }
    if (four.style.visibility === "visible") {
        timeOutAmount += 1000;
        setTimeout(function () {
            four.style.transform = "translate(590%, -110%)";
        }, timeOutAmount);
    }
    if (five.style.visibility === "visible") {
        timeOutAmount += 1000;
        setTimeout(function () {
            five.style.transform = "translate(-555%, -110%)";
        }, timeOutAmount);
    }
    if (six.style.visibility === "visible") {
        timeOutAmount += 1000;
        setTimeout(function () {
            six.style.transform = "translate(-420%, 0%)";
        }, timeOutAmount);
    }
    if (seven.style.visibility === "visible") {
        timeOutAmount += 1000;
        setTimeout(function () {
            seven.style.transform = "translate(-465%, 0%)";
        }, timeOutAmount);
    }
    if (eight.style.visibility === "visible") {
        timeOutAmount += 1000;
        setTimeout(function () {
            eight.style.transform = "translate(-580%, 8%)";
        }, timeOutAmount);
    }
    if (nine.style.visibility === "visible") {
        timeOutAmount += 1000;
        setTimeout(function () {
            nine.style.transform = "translate(0%, 280%)";
        }, timeOutAmount);
    }
    if (ten.style.visibility === "visible") {
        timeOutAmount += 1000;
        setTimeout(function () {
            ten.style.transform = "translate(0%, -420%)";
        }, timeOutAmount);
    }
}

function SetAnswerContent(waitTime) {
    var answerLocation = GetRandomInt(0, 2);
    var answerDivs = document.getElementsByClassName("answers");

    setTimeout(function () {
        answerDivs[answerLocation].innerHTML = answer;

        if (answerLocation === 0) {
            if (GetRandomInt(1, 2) === 1) {
                answerDivs[1].innerHTML = answer - 1;
                answerDivs[2].innerHTML = answer + 1;
            }
            else {
                answerDivs[2].innerHTML = answer - 1;
                answerDivs[1].innerHTML = answer + 1;
            }
        }
        else if (answerLocation === 1) {
            if (GetRandomInt(1, 2) === 1) {
                answerDivs[0].innerHTML = answer - 1;
                answerDivs[2].innerHTML = answer + 1;
            }
            else {
                answerDivs[2].innerHTML = answer - 1;
                answerDivs[0].innerHTML = answer + 1;
            }
        }
        else {
            if (GetRandomInt(1, 2) === 1) {
                answerDivs[0].innerHTML = answer - 1;
                answerDivs[1].innerHTML = answer + 1;
            }
            else {
                answerDivs[1].innerHTML = answer - 1;
                answerDivs[0].innerHTML = answer + 1;
            }
        }
    }, waitTime * 1000);


}

function ResetFish() {
    var answerAreas = document.getElementsByClassName("answers");
    var fish = document.getElementsByClassName("fish");

    for (var i = 0; i < 3; i++) {
        answerAreas[i].innerHTML = null;
    }

    for (var i = 0; i < 10; i++) {
        fish[i].style.transform = null;
    }

    setTimeout(function () {
        for (var i = 0; i < 10; i++) {
            fish[i].style.visibility = "hidden";
        }
    }, 1000);

}

function GameLoop() {
    ResetFish();

    answer = GetRandomInt(0, 9);

    var fish = document.getElementsByClassName("fish");

    setTimeout(function () {
        for (var i = 0; i <= answer; i++) {
            fish[i].style.visibility = "visible";
        }
        answer++;
        TranslateFish();
        SetAnswerContent(answer + 1);
    }, 1100);
}

function ResizeText(elementID) {
    var div = document.getElementById(elementID);
    var height = div.clientHeight / 2;
    height = height.toString();
    height = height.concat("px");

    div.style.fontSize = height;

    height = div.clientHeight;
    height = height.toString();
    height = height.concat("px");

    div.style.lineHeight = height;
}

function MakeScalable() {
    var allAnswerDivs = document.getElementsByClassName("answers");

    //for all of the drop areas
    for (var i = 0; i < 3; i++) {
        ResizeText(allAnswerDivs[i].id);
    }
}

function CreateHtmlElements() {
    //going to be stored on the server at some point
    var imgSrc = "../../MiniGames/FishCounting/img/";

    //set up the CSS file needed for this minigame
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");

    fileRef.setAttribute("href", "../../MiniGames/FishCounting/css/FishCounting.css");
    //add the css file to the html
    document.getElementsByTagName("head")[0].appendChild(fileRef);

    //the container that will hold the game
    var divContainer = document.getElementById("BlocksGame");

    //the header
    var header = document.createElement("h1");
    header.setAttribute("id", "header");
    header.style.textAlign = "center";
    header.innerHTML = "Counting!";

    var fishContainer = document.createElement("div");
    fishContainer.setAttribute("id", "fishContainer");

    var one = document.createElement("div");
    one.setAttribute("id", "one");
    one.setAttribute("class", "fish")

    var img1 = document.createElement("img");
    img1.setAttribute("src", imgSrc + "octopus.png");
    img1.setAttribute("width", "100%");
    img1.setAttribute("height", "100%");

    one.appendChild(img1);

    var two = document.createElement("div");
    two.setAttribute("id", "two");
    two.setAttribute("class", "fish")

    var img2 = document.createElement("img");
    img2.setAttribute("src", imgSrc + "greenFish.png");
    img2.setAttribute("width", "100%");
    img2.setAttribute("height", "100%");

    two.appendChild(img2);

    var three = document.createElement("div");
    three.setAttribute("id", "three");
    three.setAttribute("class", "fish")

    var img3 = document.createElement("img");
    img3.setAttribute("src", imgSrc + "redSeaHorse.png");
    img3.setAttribute("width", "100%");
    img3.setAttribute("height", "100%");

    three.appendChild(img3);

    var four = document.createElement("div");
    four.setAttribute("id", "four");
    four.setAttribute("class", "fish")

    var img4 = document.createElement("img");
    img4.setAttribute("src", imgSrc + "yellowStarFish.png");
    img4.setAttribute("width", "100%");
    img4.setAttribute("height", "100%");

    four.appendChild(img4);

    var five = document.createElement("div");
    five.setAttribute("id", "five");
    five.setAttribute("class", "fish")

    var img5 = document.createElement("img");
    img5.setAttribute("src", imgSrc + "turtle.png");
    img5.setAttribute("width", "100%");
    img5.setAttribute("height", "100%");

    five.appendChild(img5);

    var six = document.createElement("div");
    six.setAttribute("id", "six");
    six.setAttribute("class", "fish")

    var img6 = document.createElement("img");
    img6.setAttribute("src", imgSrc + "blueFish.png");
    img6.setAttribute("width", "100%");
    img6.setAttribute("height", "100%");

    six.appendChild(img6);

    var seven = document.createElement("div");
    seven.setAttribute("id", "seven");
    seven.setAttribute("class", "fish")

    var img7 = document.createElement("img");
    img7.setAttribute("src", imgSrc + "yellowSeaHorse.png");
    img7.setAttribute("width", "100%");
    img7.setAttribute("height", "100%");

    seven.appendChild(img7);

    var eight = document.createElement("div");
    eight.setAttribute("id", "eight");
    eight.setAttribute("class", "fish")

    var img8 = document.createElement("img");
    img8.setAttribute("src", imgSrc + "redStarFish.png");
    img8.setAttribute("width", "100%");
    img8.setAttribute("height", "100%");

    eight.appendChild(img8);

    var nine = document.createElement("div");
    nine.setAttribute("id", "nine");
    nine.setAttribute("class", "fish")

    var img9 = document.createElement("img");
    img9.setAttribute("src", imgSrc + "crab.png");
    img9.setAttribute("width", "100%");
    img9.setAttribute("height", "100%");

    nine.appendChild(img9);

    var ten = document.createElement("div");
    ten.setAttribute("id", "ten");
    ten.setAttribute("class", "fish")

    var img10 = document.createElement("img");
    img10.setAttribute("src", imgSrc + "whale.png");
    img10.setAttribute("width", "100%");
    img10.setAttribute("height", "100%");

    ten.appendChild(img10);

    fishContainer.appendChild(one);
    fishContainer.appendChild(two);
    fishContainer.appendChild(three);
    fishContainer.appendChild(four);
    fishContainer.appendChild(five);
    fishContainer.appendChild(six);
    fishContainer.appendChild(seven);
    fishContainer.appendChild(eight);
    fishContainer.appendChild(nine);
    fishContainer.appendChild(ten);

    var answerContainer = document.createElement("div");
    answerContainer.setAttribute("id", "answerContainer");

    var answerOne = document.createElement("div");
    answerOne.setAttribute("id", "answerOne");
    answerOne.setAttribute("class", "answers");
    answerOne.setAttribute("onClick", "ClickedAnswer(answerOne)");

    var answerTwo = document.createElement("div");
    answerTwo.setAttribute("id", "answerTwo");
    answerTwo.setAttribute("class", "answers");
    answerTwo.setAttribute("onClick", "ClickedAnswer(answerTwo)");

    var answerThree = document.createElement("div");
    answerThree.setAttribute("id", "answerThree");
    answerThree.setAttribute("class", "answers");
    answerThree.setAttribute("onClick", "ClickedAnswer(answerThree)");

    answerContainer.appendChild(answerOne);
    answerContainer.appendChild(answerTwo);
    answerContainer.appendChild(answerThree);

    ///////////////////////////////////////////////////
    var endGameDiv = document.createElement("div");
    endGameDiv.setAttribute("id", "endGameDiv");
    endGameDiv.innerHTML = "Great Job!";
    endGameDiv.appendChild(document.createElement("br"));

    var endGameDivPic = document.createElement("img");
    endGameDivPic.setAttribute("id", "endGameDivPic");
    endGameDivPic.setAttribute("src", "../../Images/gameOver.png");

    endGameDiv.appendChild(endGameDivPic);
    endGameDiv.appendChild(document.createElement("br"));

    var doneButton = document.createElement("button");
    doneButton.innerHTML = "Done";
    doneButton.setAttribute("id", "doneButton");

    endGameDiv.appendChild(doneButton);
    ////////////////////////////////////////////////

    divContainer.appendChild(header);
    divContainer.appendChild(fishContainer);
    divContainer.appendChild(answerContainer);
    divContainer.appendChild(endGameDiv);
}

function EndGame() {
    $('#doneButton').click(function () {
        window.location.href = '/Play/Play/'
    });

    responsiveVoice.speak("Great job!", "US English Female");
    var answerAreas = document.getElementsByClassName("answers");
    var fish = document.getElementsByClassName("fish");

    for (var i = 0; i < 3; i++) {
        answerAreas[i].onclick = null;
    }

    var percentage = correctClicks / totalClicks;

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

    if (totalClicks === 0)
        returnVal = 0;

    document.getElementById("score").value = returnVal;
    EndofGame(); //function displays good job message and returns to map
    setTimeout(function () {
        $('#gameOver').hide();
    }, 500);
    document.getElementById("endGameDiv").style.display = "block";
}

function Main() {
    //this game doesn't have two difficulties so I am not going to do anything with this value
    var difficulty = document.getElementById("minigameScript").getAttribute("difficulty"); // only one difficulty for this game so not needed
    var soundToggle = document.getElementById("minigameScript").getAttribute("toggleSound"); //True = sound off, False = sound on
    var musicToggle = document.getElementById("minigameScript").getAttribute("toggleMusic");

    CreateHtmlElements();

    responsiveVoice.OnVoiceReady = function () {
        responsiveVoice.speak("Click the box that has the correct number of sea creatures that is displayed to the screen.",
		"US English Female");
    };

    window.addEventListener('resize', function () {
        MakeScalable();
    }, false);

    //if the user leaves the page
    $(window).on("beforeunload", function () {
        responsiveVoice.cancel(); //quit doing text to speech
    });

    //allows the instructions to be said before execution
    setTimeout(function () {
        MakeScalable();
        GameLoop();
    }, 3000);

    //end the game after two minutes
    setTimeout(function () {
        EndGame();
    }, 120000);
}

Main();