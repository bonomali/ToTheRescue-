const NUM_TOPPINGS = 12;
const PEP = 0;
const GREEN = 1;
const OLIVE = 2;
const SHROOM = 3;
const imgSrc = "../../MiniGames/PizzaCounting/img/";

var blopSoundEfct = new WebAudioAPISound("../../Audio/soundEffects/blop.mp3");
blopSoundEfct.setVolume(100);

var toppingArr = [];
var answerArr = [];
var numClicks = 0;
var soundToggle = "False";
var musicToggle = "False";
var numCorrect = 0;
var numAttempted = 0;


function FinishedPizza() {
    var string = "Yuck! ";
    var correct = true;
    var time = 2000;

    MakeNotClickable();

    numAttempted++;

    if (toppingArr[PEP] !== answerArr[PEP]) {
        correct = false;
        time += 1250;

        if (toppingArr[PEP] < answerArr[PEP])
            string += "Too many pepperoni, ";
        else
            string += "Not enough pepperoni, ";
    }

    if (toppingArr[GREEN] !== answerArr[GREEN]) {
        correct = false;
        time += 1250;

        if (toppingArr[GREEN] < answerArr[GREEN])
            string += "Too many green peppers. ";
        else
            string += "Not enough green peppers. ";
    }

    if (toppingArr[OLIVE] !== answerArr[OLIVE]) {
        correct = false;
        time += 1250;

        if (toppingArr[OLIVE] < answerArr[OLIVE])
            string += "Too many olives. ";
        else
            string += "Not enough olives. ";
    }

    if (toppingArr[SHROOM] !== answerArr[SHROOM]) {
        correct = false;
        time += 1250;

        if (toppingArr[SHROOM] < answerArr[SHROOM])
            string += "Too many mushrooms. ";
        else
            string += "Not enough mushrooms. ";
    }

    if (correct === true) {
        numCorrect++;
        string = "Delicioso!"
    }

    responsiveVoice.speak(string, "US English Female");

    setTimeout(function () {
        ResetData();
        SetUpData();
        GiveInstructions();
        MakeClickable();
    }, time);

}

function ResetData() {
    //get rid of toppings
    for (var i = 0; i < 12; i++) {
        var num = i + 1;
        num = num.toString();

        var id = "d";
        id += num;

        document.getElementById(id).innerHTML = null;
    }

    //reset globals
    for (var i = 0; i < 4; i++) {
        toppingArr[i] = 0;
        answerArr[i] = 0;
    }

    numClicks = 0;
}

function GetDivId() {
    var num = numClicks.toString();
    var id = "d";
    id += num;
    return id;
}

function ClickedPep() {

    if (soundToggle === "False")
        blopSoundEfct.play(blopSoundEfct);

    numClicks += 1;

    if (numClicks <= 12) {
        var id = GetDivId();

        var img = document.createElement("img");
        img.setAttribute("src", imgSrc + "pepperoni.png")

        document.getElementById(id).appendChild(img);

        answerArr[PEP] += 1;
    }

    if (numClicks === 12) {
        FinishedPizza();
    }


}

function ClickedGreen() {

    if (soundToggle === "False")
        blopSoundEfct.play(blopSoundEfct);

    numClicks += 1;

    if (numClicks <= 12) {
        var id = GetDivId();

        var img = document.createElement("img");
        img.setAttribute("src", imgSrc + "pepper.png")

        document.getElementById(id).appendChild(img);

        answerArr[GREEN] += 1;
    }

    if (numClicks === 12) {
        FinishedPizza();
    }
}

function ClickedOlive() {

    if (soundToggle === "False")
        blopSoundEfct.play(blopSoundEfct);

    numClicks += 1;

    if (numClicks <= 12) {
        var id = GetDivId();

        var img = document.createElement("img");
        img.setAttribute("src", imgSrc + "olives.png")

        document.getElementById(id).appendChild(img);

        answerArr[OLIVE] += 1;
    }

    if (numClicks === 12) {
        FinishedPizza();
    }
}

function ClickedShroom() {

    if (soundToggle === "False")
        blopSoundEfct.play(blopSoundEfct);

    numClicks += 1;

    if (numClicks <= 12) {
        var id = GetDivId();

        var img = document.createElement("img");
        img.setAttribute("src", imgSrc + "mushroom.png")

        document.getElementById(id).appendChild(img);

        answerArr[SHROOM] += 1;
    }

    if (numClicks === 12) {
        FinishedPizza();
    }
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
    for (var i = 0; i < 4; i++) {
        var id = document.getElementsByClassName("numbers")[i].id;
        ResizeText(id);
    }
}

function GetRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function SetUpData() {
    var numToppings = GetRandomInt(1, 4);

    if (numToppings == 1) {
        var topping = GetRandomInt(0, 3);

        toppingArr[topping] = 12;

    }
    else if (numToppings == 2) {
        var topping1 = GetRandomInt(0, 3);
        var topping2;

        while ((topping2 = GetRandomInt(0, 3)) === topping1) { }

        var num1 = GetRandomInt(1, 11);
        var num2 = NUM_TOPPINGS - num1;

        toppingArr[topping1] = num1;
        toppingArr[topping2] = num2;
    }
    else if (numToppings == 3) {
        var toppingNotToUse = GetRandomInt(0, 3);

        var num1 = GetRandomInt(1, 10);

        var remainingAmount = NUM_TOPPINGS - num1;

        var num2 = GetRandomInt(1, remainingAmount - 1);

        var num3 = remainingAmount - num2;

        if (toppingNotToUse === PEP) {
            toppingArr[1] = num1;
            toppingArr[2] = num2;
            toppingArr[3] = num3;
        }
        else if (toppingNotToUse === GREEN) {
            toppingArr[0] = num1;
            toppingArr[2] = num2;
            toppingArr[3] = num3;
        }
        else if (toppingNotToUse === OLIVE) {
            toppingArr[0] = num1;
            toppingArr[1] = num2;
            toppingArr[3] = num3;
        }
        else {
            toppingArr[0] = num1;
            toppingArr[1] = num2;
            toppingArr[2] = num3;
        }
    }
    else {
        var num1 = GetRandomInt(1, 9);

        var remainingAmount = NUM_TOPPINGS - num1;

        var num2 = GetRandomInt(1, remainingAmount - 2);

        remainingAmount -= num2;

        var num3 = GetRandomInt(1, remainingAmount - 1);

        var num4 = remainingAmount - num3;

        toppingArr[0] = num1;
        toppingArr[1] = num2;
        toppingArr[2] = num3;
        toppingArr[3] = num4;
    }

    for (var i = 0; i < 4; i++) {
        document.getElementsByClassName("numbers")[i].innerHTML = toppingArr[i];
    }
}

function GiveInstructions() {
    var str = "Make a pizza with ";
    var pep = toppingArr[PEP].toString();
    str += pep;
    str += " pepperoni, ";
    var green = toppingArr[GREEN].toString();
    str += green;

    if (green === "1")
        str += " green pepper, ";
    else
        str += " green peppers, ";

    var olives = toppingArr[OLIVE].toString();
    str += olives;

    if (olives === "1")
        str += " olive and ";
    else
        str += " olives and ";

    var shrooms = toppingArr[SHROOM].toString();
    str += shrooms;

    if (shrooms === "1")
        str += " mushroom.";
    else
        str += " mushrooms.";

    responsiveVoice.speak(str, "US English Female");
}

function MakeNotClickable() {
    document.getElementById("pepperoni").onclick = null;
    document.getElementById("greenPepper").onclick = null;
    document.getElementById("olives").onclick = null;
    document.getElementById("mushrooms").onclick = null;
}

function MakeClickable() {
    document.getElementById("pepperoni").onclick = function () { ClickedPep(); };
    document.getElementById("greenPepper").onclick = function () { ClickedGreen(); };
    document.getElementById("olives").onclick = function () { ClickedOlive(); };
    document.getElementById("mushrooms").onclick = function () { ClickedShroom(); };
}

function CreateHtmlElements() {
    //set up the CSS file needed for this minigame
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
    //gonnna be stored on the server at some point
    fileRef.setAttribute("href", "../../MiniGames/PizzaCounting/css/PizzaCounting.css");
    //add the css file to the html
    document.getElementsByTagName("head")[0].appendChild(fileRef);

    //the container that will hold the game
    var divContainer = document.getElementById("BlocksGame");

    //the header
    var header = document.createElement("h1");
    header.setAttribute("id", "header");
    header.innerHTML = "Pizza Counting!";

    var pizzaDiv = document.createElement("div");
    pizzaDiv.setAttribute("id", "pizzaDiv");

    var pizzaImgDiv = document.createElement("div");
    pizzaImgDiv.setAttribute("id", "pizzaImgDiv");

    var pizzaImg = document.createElement("img");
    pizzaImg.setAttribute("id", "pizzaImg");
    pizzaImg.setAttribute("src", imgSrc + "pizza.png");
    pizzaImgDiv.appendChild(pizzaImg);

    for (var i = 0; i < 12; i++) {
        var num = i + 1;
        num = num.toString();

        var id = "d";
        id += num;

        var div = document.createElement("div");
        div.setAttribute("id", id);
        div.setAttribute("class", "divToppings");
        pizzaImgDiv.appendChild(div);
    }

    pizzaDiv.appendChild(pizzaImgDiv);

    var numbersDiv = document.createElement("div");
    numbersDiv.setAttribute("id", "numbersDiv");

    for (var i = 0; i < 4; i++) {
        var num = i + 1;
        num = num.toString();

        var id = "n";
        id += num;

        var div = document.createElement("div");
        div.setAttribute("id", id);
        div.setAttribute("class", "numbers");
        numbersDiv.appendChild(div);
    }

    var toppingsDiv = document.createElement("div");
    toppingsDiv.setAttribute("id", "toppingsDiv");

    var pepperoni = document.createElement("div");
    pepperoni.setAttribute("id", "pepperoni");
    pepperoni.setAttribute("class", "toppings");
    toppingsDiv.appendChild(pepperoni);

    var pImg = document.createElement("img");
    pImg.setAttribute("src", imgSrc + "pepperoni.png");
    pepperoni.appendChild(pImg);

    var greenPepper = document.createElement("div");
    greenPepper.setAttribute("id", "greenPepper");
    greenPepper.setAttribute("class", "toppings");
    toppingsDiv.appendChild(greenPepper);

    var gImg = document.createElement("img");
    gImg.setAttribute("src", imgSrc + "pepper.png");
    greenPepper.appendChild(gImg);

    var olives = document.createElement("div");
    olives.setAttribute("id", "olives");
    olives.setAttribute("class", "toppings");
    toppingsDiv.appendChild(olives);

    var oImg = document.createElement("img");
    oImg.setAttribute("src", imgSrc + "olives.png");
    olives.appendChild(oImg);

    var mushrooms = document.createElement("div");
    mushrooms.setAttribute("id", "mushrooms");
    mushrooms.setAttribute("class", "toppings");
    toppingsDiv.appendChild(mushrooms);

    var mImg = document.createElement("img");
    mImg.setAttribute("src", imgSrc + "mushroom.png");
    mushrooms.appendChild(mImg);

    divContainer.appendChild(header);
    divContainer.appendChild(pizzaDiv);
    divContainer.appendChild(numbersDiv);
    divContainer.appendChild(toppingsDiv);
}

function EndGame() {
    responsiveVoice.speak("Great job!", "US English Female");

    var percentage = numCorrect / numAttempted;

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

    if (numAttempted === 0)
        returnVal = 0;

    document.getElementById("score").value = returnVal;
    EndofGame(); //function displays good job message and returns to map
}

function Main() {

    //get the game's difficulty level and modify the dataset for that difficulty level
    var difficulty = document.getElementById("minigameScript").getAttribute("difficulty");
    //get the sound
    soundToggle = document.getElementById("minigameScript").getAttribute("toggleSound"); //True = sound off, False = sound on
    musicToggle = document.getElementById("minigameScript").getAttribute("toggleMusic");

    var backgroundMusic = new WebAudioAPISound("../../Audio/backgroundMusic/bgSong2.mp3", { loop: true });
    backgroundMusic.setVolume(10);

    CreateHtmlElements();

    for (var i = 0; i < 4; i++) {
        toppingArr.push(0);
        answerArr.push(0);
    }

    window.addEventListener('resize', function () {
        MakeScalable();
    }, false);

    window.onload = function () {
        MakeScalable();
        SetUpData();

        if (musicToggle === "False") {
            //play background music
            backgroundMusic.play(backgroundMusic);
        }

        responsiveVoice.speak("Help make pizzas by adding the correct amount of toppings to the pizza by clicking on the toppings.", "US English Female");

        setTimeout(function () {
            GiveInstructions();
            MakeClickable();
        }, 6500);
    };

    //if the user leaves the page
    window.onbeforeunload = function () {
        responsiveVoice.cancel(); //quit doing text to speech
        return null;
    };

    //play the game for 2 minuet and then end the game
    setTimeout(function () {
        MakeNotClickable();
        EndGame();
    }, 120000);
}

Main();