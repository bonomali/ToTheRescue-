const ANT = 0;
const BIRD = 1;
const GRAPE = 2;
const ELEPHANT = 3;
const BEE = 4;
const BUTTERFLY = 5;
const FROG = 6;
const OWL = 7;
const NUM_ANIMALS = 8;

var index = -1;
var animalArr = [];
var difficulty = 1;
var numIncorrectClicks = 0;
var soundToggle = "False";
var musicToggle = "False";
var endGameFuncCalls = 0;

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
    document.getElementById("antContainer").onclick = null;
    document.getElementById("birdContainer").onclick = null;
    document.getElementById("grapeContainer").onclick = null;
    document.getElementById("elephantContainer").onclick = null;

    document.getElementById("beeContainer").onclick = null;
    document.getElementById("butterflyContainer").onclick = null;
    document.getElementById("frogContainer").onclick = null;
    document.getElementById("owlContainer").onclick = null;
}

function MakeClickable() {
    document.getElementById("antContainer").onclick = function () { Clicked(0); };
    document.getElementById("birdContainer").onclick = function () { Clicked(1); };
    document.getElementById("grapeContainer").onclick = function () { Clicked(2); };
    document.getElementById("elephantContainer").onclick = function () { Clicked(3); };

    document.getElementById("beeContainer").onclick = function () { Clicked(4); };
    document.getElementById("butterflyContainer").onclick = function () { Clicked(5); };
    document.getElementById("frogContainer").onclick = function () { Clicked(6); };
    document.getElementById("owlContainer").onclick = function () { Clicked(7); };
}

function Clicked(clickedAnimal) {
    var soundEffect;

    if (clickedAnimal === animalArr[index]) {

        if (soundToggle === "False") {
            soundEffect = new WebAudioAPISound("../../Audio/soundEffects/airPlaneDing.mp3");
            soundEffect.play(soundEffect);
        }

        setTimeout(function () {
            if (difficulty <= 1)
                GameLoopEasy();
            else
                GameLoopHard();
        }, 950);
    }
    else {
        if (soundToggle === "False") {
            //make the clank sound effect
            soundEffect = new WebAudioAPISound("../../Audio/soundEffects/metallicClank.mp3");
            soundEffect.play(soundEffect);
        }

        numIncorrectClicks++;

        //if the user incorrectly clicked 3 times, resay
        //what they are spying for
        if (numIncorrectClicks === 3) {
            index--;

            numIncorrectClicks = 0;

            setTimeout(function () {
                if (difficulty <= 1) {
                    GameLoopEasy();
                }
                else {
                    GameLoopHard();
                }
            }, 1000);
        }
    }

    setTimeout(function () {
        switch (clickedAnimal) {
            case ANT:
                responsiveVoice.speak("Ant.", "US English Female");
                break;
            case BIRD:
                responsiveVoice.speak("Bird.", "US English Female");
                break;
            case GRAPE:
                responsiveVoice.speak("Grape.", "US English Female");
                break;
            case ELEPHANT:
                responsiveVoice.speak("Elephant.", "US English Female");
                break;
            case BEE:
                responsiveVoice.speak("Bee.", "US English Female");
                break;
            case BUTTERFLY:
                responsiveVoice.speak("Butterfly.", "US English Female");
                break;
            case FROG:
                responsiveVoice.speak("Frog.", "US English Female");
                break;
            default:
                responsiveVoice.speak("Owl.", "US English Female");
        }
    }, 100);
}

function GameLoopHard() {
    MakeNotClickable();

    index++;

    if (index < 8) {
        switch (animalArr[index]) {
            case ANT:
                responsiveVoice.speak("I spy something red with antennas.", "US English Female");
                break;
            case BIRD:
                responsiveVoice.speak("I spy something blue with small eyes.", "US English Female");
                break;
            case GRAPE:
                responsiveVoice.speak("I spy something purple.", "US English Female");
                break;
            case ELEPHANT:
                responsiveVoice.speak("I spy something green with a trunk.", "US English Female");
                break;
            case BEE:
                responsiveVoice.speak("I spy something yellow that flys and can sting people.", "US English Female");
                break;
            case BUTTERFLY:
                responsiveVoice.speak("I spy something red that can fly.", "US English Female");
                break;
            case FROG:
                responsiveVoice.speak("I spy something green that leaps.", "US English Female");
                break;
            default:
                responsiveVoice.speak("I spy something blue that has big eyes.", "US English Female");
        }

        setTimeout(function () {
            MakeClickable();
        }, 2000);
    }
    else {
        //end the game
        EndGame();
    }
}

function GameLoopEasy() {
    MakeNotClickable();
    index++;

    if (index < 8) {
        switch (animalArr[index]) {
            case ANT:
                responsiveVoice.speak("I spy a red ant.", "US English Female");
                break;
            case BIRD:
                responsiveVoice.speak("I spy a blue bird with small eyes", "US English Female");
                break;
            case GRAPE:
                responsiveVoice.speak("I spy purple grapes.", "US English Female");
                break;
            case ELEPHANT:
                responsiveVoice.speak("I spy a green elephant.", "US English Female");
                break;
            case BEE:
                responsiveVoice.speak("I spy a yellow bee.", "US English Female");
                break;
            case BUTTERFLY:
                responsiveVoice.speak("I spy a red butterfly.", "US English Female");
                break;
            case FROG:
                responsiveVoice.speak("I spy a green frog.", "US English Female");
                break;
            default:
                responsiveVoice.speak("I spy a blue owl with big eyes.", "US English Female");
        }

        setTimeout(function () {
            MakeClickable();
        }, 2000);

    }
    else {
        //end the game
        EndGame();
    }
}

function CreateHtmlElemets() {
    var imgSrc = "../../MiniGames/ISpyGame/img/bg1.jpeg";

    //set up the CSS file needed for this minigame
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");

    fileRef.setAttribute("href", "../../MiniGames/ISpyGame/css/ISpy.css");
    //add the css file to the html
    document.getElementsByTagName("head")[0].appendChild(fileRef);

    //the container that will hold the game
    var divContainer = document.getElementById("BlocksGame");

    var bgContainer = document.createElement("div");
    bgContainer.setAttribute("id", "bgContainer");

    //the header
    var header = document.createElement("h1");
    header.setAttribute("id", "header");
    header.innerHTML = "i Spy!";

    bgContainer.appendChild(header);

    var bg = document.createElement("img");
    bg.setAttribute("id", "bg");
    bg.setAttribute("class", "imgs");
    bg.setAttribute("src", imgSrc);

    imgSrc = "../../MiniGames/ColorSortingGame/img/";

    bgContainer.appendChild(bg);

    //add the i spy animals
    var antContainer = document.createElement("div");
    antContainer.setAttribute("id", "antContainer");
    antContainer.setAttribute("onclick", "Clicked(0)");
    antContainer.setAttribute("class", "containers");

    var img1 = document.createElement("img");
    img1.setAttribute("class", "imgs");
    img1.setAttribute("src", imgSrc + "red/ant.png");

    antContainer.appendChild(img1);

    bgContainer.appendChild(antContainer);


    var birdContainer = document.createElement("div");
    birdContainer.setAttribute("id", "birdContainer");
    birdContainer.setAttribute("onclick", "Clicked(1)");
    birdContainer.setAttribute("class", "containers");

    var img2 = document.createElement("img");
    img2.setAttribute("class", "imgs");
    img2.setAttribute("src", imgSrc + "blue/bird.png");

    birdContainer.appendChild(img2);

    bgContainer.appendChild(birdContainer);


    var grapeContainer = document.createElement("div");
    grapeContainer.setAttribute("id", "grapeContainer");
    grapeContainer.setAttribute("onclick", "Clicked(2)");
    grapeContainer.setAttribute("class", "containers");

    var img3 = document.createElement("img");
    img3.setAttribute("class", "imgs");
    img3.setAttribute("src", imgSrc + "purple/grapes.png");

    grapeContainer.appendChild(img3);

    bgContainer.appendChild(grapeContainer);


    var elephantContainer = document.createElement("div");
    elephantContainer.setAttribute("id", "elephantContainer");
    elephantContainer.setAttribute("onclick", "Clicked(3)");
    elephantContainer.setAttribute("class", "containers");

    var img4 = document.createElement("img");
    img4.setAttribute("class", "imgs");
    img4.setAttribute("src", imgSrc + "green/elephant.png");

    elephantContainer.appendChild(img4);

    bgContainer.appendChild(elephantContainer);


    var beeContainer = document.createElement("div");
    beeContainer.setAttribute("id", "beeContainer");
    beeContainer.setAttribute("onclick", "Clicked(4)");
    beeContainer.setAttribute("class", "containers");

    var img5 = document.createElement("img");
    img5.setAttribute("class", "imgs");
    img5.setAttribute("src", imgSrc + "yellow/bee.png");

    beeContainer.appendChild(img5);

    bgContainer.appendChild(beeContainer);


    var butterflyContainer = document.createElement("div");
    butterflyContainer.setAttribute("id", "butterflyContainer");
    butterflyContainer.setAttribute("onclick", "Clicked(5)");
    butterflyContainer.setAttribute("class", "containers");

    var img6 = document.createElement("img");
    img6.setAttribute("class", "imgs");
    img6.setAttribute("src", imgSrc + "red/butterfly.png");

    butterflyContainer.appendChild(img6);

    bgContainer.appendChild(butterflyContainer);


    var frogContainer = document.createElement("div");
    frogContainer.setAttribute("id", "frogContainer");
    frogContainer.setAttribute("onclick", "Clicked(6)");
    frogContainer.setAttribute("class", "containers");

    var img7 = document.createElement("img");
    img7.setAttribute("class", "imgs");
    img7.setAttribute("src", imgSrc + "green/frog.png");

    frogContainer.appendChild(img7);

    bgContainer.appendChild(frogContainer);


    var owlContainer = document.createElement("div");
    owlContainer.setAttribute("id", "owlContainer");
    owlContainer.setAttribute("onclick", "Clicked(7)");
    owlContainer.setAttribute("class", "containers");

    var img8 = document.createElement("img");
    img8.setAttribute("class", "imgs");
    img8.setAttribute("src", imgSrc + "blue/owl.png");

    owlContainer.appendChild(img8);

    bgContainer.appendChild(owlContainer);


    divContainer.appendChild(bgContainer);
}

function EndGame() {
    MakeNotClickable();

    endGameFuncCalls++;

    var returnVal = null;

    //makes suure that great job is only said once
    if (endGameFuncCalls === 1)
        responsiveVoice.speak("Great job!", "US English Female");

    if (index === 0)
        returnVal = -5;
    else if (index === 1)
        returnVal = -3;
    else if (index === 2)
        returnVal = -2;
    else if (index === 3)
        returnVal = -1;
    else if (index === 4)
        returnVal = 0;
    else if (index === 5)
        returnVal = 2;
    else if (index === 6)
        returnVal = 3;
    else if (index === 7)
        returnVal = 4;
    else
        returnVal = 5;

    document.getElementById("score").value = returnVal;
    EndofGame(); //function displays good job message and returns to map
}

function Main() {
    var backgroundMusic = new WebAudioAPISound("../../Audio/backgroundMusic/bgSound6(africa).mp3", { loop: true });
    backgroundMusic.setVolume(10);

    difficulty = document.getElementById("minigameScript").getAttribute("difficulty");
    soundToggle = document.getElementById("minigameScript").getAttribute("toggleSound"); //True = sound off, False = sound on
    musicToggle = document.getElementById("minigameScript").getAttribute("toggleMusic");

    CreateHtmlElemets();

    if (musicToggle === "False") {
        //play background music
        backgroundMusic.play(backgroundMusic);
    }

    //if the user leaves the page
    window.onbeforeunload = function () {
        responsiveVoice.cancel(); //quit doing text to speech
        return null;
    };

    window.onload = function () {
        //play the instructions
        responsiveVoice.OnVoiceReady = function () {
            Shuffle(animalArr);

            responsiveVoice.speak("Click the thing you are spying for.", "US English Female");

            setTimeout(function () {
                if (difficulty <= 1) {
                    GameLoopEasy();
                }
                else {
                    GameLoopHard();
                }
            }, 4000);
        };
    };

    for (var i = 0; i < NUM_ANIMALS; i++) {
        animalArr.push(i);
    }

    //if the user didn't finish the game in 2 minuets
    setTimeout(function () {
        //end the game
        EndGame();
    }, 120000);
}

Main();