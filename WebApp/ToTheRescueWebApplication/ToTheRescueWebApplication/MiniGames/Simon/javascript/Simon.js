//constants
const GREEN_BUTTON = 0;
const RED_BUTTON = 1;
const PURPLE_BUTTON = 2;
const BLUE_BUTTON = 3;
const LOST_GAME = 4;

//A game object that holds key variables used for the game's logic
var Simon = {
    //contains the element numbers of squares the player clicked
    playerClickedElementNums: [],

    //contains the element numbers of squares the AI clicked
    buttonsAIClicked: [],

    //holds the humber of buttons the player needs to click each turn
    numOfButtonsToClick: 0,

    //holds the current number of buttons that the player clicked
    numOfPlayerClicks: 0,

    //holds the current score that the user has
    score: 0,

    //used to hold the listeners on the canvas
    simonButtons: document.getElementsByClassName("simonSquares"),

    //current index into aiClickded array
    index: -1,

    //will hold the best score the user has
    bestScore: 0
};

function MakeNotClickable() {
    document.getElementById("red").onclick = null;
    document.getElementById("green").onclick = null;
    document.getElementById("purple").onclick = null;
    document.getElementById("blue").onclick = null;
}

function MakeClickable() {
    document.getElementById("red").onclick = function () { UserClickedButton(1); };
    document.getElementById("green").onclick = function () { UserClickedButton(0); };
    document.getElementById("purple").onclick = function () { UserClickedButton(2); };
    document.getElementById("blue").onclick = function () { UserClickedButton(3); };
}

function SayColor(elementNum) {
    if (elementNum === RED_BUTTON)
        responsiveVoice.speak("Red", "US English Female");
    else if (elementNum === BLUE_BUTTON)
        responsiveVoice.speak("Blue", "US English Female");
    else if (elementNum === GREEN_BUTTON)
        responsiveVoice.speak("Green", "US English Female");
    else
        responsiveVoice.speak("Purple", "US English Female");
}

//checks to see if the user clicked the correct button
//will end the game if the user did not
function ClickedCorrectButton(elementNum) {
    SayColor(elementNum);

    Simon.index++;

    if (elementNum !== Simon.buttonsAIClicked[Simon.index]) {
        MakeNotClickable();
        return false;
    }

    return true;
}

//handles button clicking for the AI
function AIClickedButton(elementNum) {
    SayColor(elementNum);

    var div = Simon.simonButtons[elementNum];

    if (elementNum === GREEN_BUTTON) {
        //runs the function after 250 ms, changes the button back to the color green
        setTimeout(function () {
            div.style.backgroundColor = "green";
        }, 250);

        //changes the color of the button to a brighter color
        div.style.backgroundColor = "#00e600";
    }
    else if (elementNum === RED_BUTTON) {
        //runs the function after 250 ms, changes the button back to the color green
        setTimeout(function () {
            div.style.backgroundColor = "#cc0000";
        }, 250);

        //changes the color of the button to a brighter color
        div.style.backgroundColor = "red";
    }
    else if (elementNum === PURPLE_BUTTON) {
        //runs the function after 250 ms, changes the button back to the color green
        setTimeout(function () {
            div.style.backgroundColor = "purple";
        }, 250);

        //changes the color of the button to a brighter color
        div.style.backgroundColor = "#cc00cc";
    }
    else if (elementNum === BLUE_BUTTON) {
        //runs the function after 250 ms, changes the button back to the color green
        setTimeout(function () {
            div.style.backgroundColor = "#2e2eb8";
        }, 250);

        //changes the color of the button to a brighter color
        div.style.backgroundColor = "blue";
    }
}

function ResetSimonObject() {
    Simon.playerClickedElementNums = [];
    Simon.buttonsAIClicked = [];
    Simon.numOfButtonsToClick = 0;
    Simon.numOfPlayerClicks = 0;
    Simon.score = 0;
    Simon.index = -1;
}

//Does the animation for when someone clicks a button or when the AI is simulating clicking
//the button
function UserClickedButton(elementNum) {
    if (!ClickedCorrectButton(elementNum)) {
        responsiveVoice.speak("Simon didn't say to click that color. Try again!", "US English Female");
        ResetSimonObject();

        document.getElementById("currentScore").innerHTML = "Current Score: 0";

        setTimeout(function () {
            RunAILogic();
        }, 6000);
        return;
    }

    //increase the number of clicks
    Simon.numOfPlayerClicks = Simon.numOfPlayerClicks + 1;

    var div = Simon.simonButtons[elementNum];

    if (elementNum === GREEN_BUTTON) {
        //runs the function after 250 ms, changes the button back to the color green
        setTimeout(function () {
            div.style.backgroundColor = "green";
        }, 250);

        //changes the color of the button to a brighter color
        div.style.backgroundColor = "#00e600";
    }
    else if (elementNum === RED_BUTTON) {
        //runs the function after 250 ms, changes the button back to the color green
        setTimeout(function () {
            div.style.backgroundColor = "#cc0000";
        }, 250);

        //changes the color of the button to a brighter color
        div.style.backgroundColor = "red";
    }
    else if (elementNum === PURPLE_BUTTON) {
        //runs the function after 250 ms, changes the button back to the color purple
        setTimeout(function () {
            div.style.backgroundColor = "purple";
        }, 250);


        //changes the color of the button to a brighter color
        div.style.backgroundColor = "#cc00cc";
    }
    else if (elementNum === BLUE_BUTTON) {
        //runs the function after 250 ms, changes the button back to the color blue
        setTimeout(function () {
            div.style.backgroundColor = "#2e2eb8";
        }, 250);


        //changes the color of the button to a brighter color
        div.style.backgroundColor = "blue";
    }

    if (Simon.numOfPlayerClicks === Simon.numOfButtonsToClick) {
        MakeNotClickable();

        Simon.index = -1;

        //increase the amount of items the AI and the player needs to click
        Simon.numOfPlayerClicks = Simon.numOfPlayerClicks + 1;
        //Go through the AI logic
        RunAILogic();
    }
}

//Returns a random integer between min (inclusive) and max (inclusive)
function GetRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Runs the AI logic behind this game. Essentially it clicks random buttons
//for the player to click in the same order
function RunAILogic() {
    //For the first AI move
    if (Simon.numOfButtonsToClick === 0) {
        responsiveVoice.speak("Simon says to click the button with the color",
		"US English Female");
        setTimeout(function () {
            //increment the number of buttons to click
            Simon.numOfButtonsToClick = Simon.numOfButtonsToClick + 1;

            //get a random number between 1 and 4 that represents which button the AI will click
            var randomButtonElement = GetRandomInt(0, 3);

            //After one second run the ClickedButton function
            setTimeout(function () {
                AIClickedButton(randomButtonElement);
            }, 1000);

            //Add that element number to an array that keeps track of all the buttons the AI clicked
            Simon.buttonsAIClicked.push(randomButtonElement);

            setTimeout(function () {
                MakeClickable();
            }, 250);
            //MakeClickable();
        }, 2000);
    }
    else {
        responsiveVoice.speak("Simon says to click the buttons with the colors",
		"US English Female");

        //update the score becuase the user didn't lose
        UpdateScore();

        setTimeout(function () {
            //increment the number of buttons to click
            Simon.numOfButtonsToClick = Simon.numOfButtonsToClick + 1;

            //get a random number between 1 and 4 that represents which button the AI will click
            var randomButtonElement = GetRandomInt(0, 3);

            //Add that element number to an array that keeps track of all the buttons the AI clicked
            Simon.buttonsAIClicked.push(randomButtonElement);

            //Run the GameLoop function
            GameLoop(0);
        }, 3000);
    }

    //reset the count of clicked buttons for the player 
    Simon.numOfPlayerClicks = 0;
}

function UpdateScore() {
    Simon.score++;

    if (Simon.score > Simon.bestScore) {
        Simon.bestScore++;
        var bestScore = document.getElementById("bestScore");
        bestScore.innerHTML = "Best Score: " + Simon.score;
    }

    var currentScore = document.getElementById("currentScore");
    currentScore.innerHTML = "Current Score: " + Simon.score;
}

//Essentially runs the ClickedButton function every 1/2 second
//in a loop to show the buttons that the AI clicked
function GameLoop(count) {
    //MakeNotClickable();
    //On the first recursion wait one second before calling the ClickedButton function
    if (count === 0) {
        setTimeout(function () {
            AIClickedButton(Simon.buttonsAIClicked[count]);
            count++;
            if (count < Simon.numOfButtonsToClick) {
                GameLoop(count);
            }
        }, 1000);
    }
        //On the other recursions wait half a second before the ClickedButton function is called
    else {
        setTimeout(function () {
            AIClickedButton(Simon.buttonsAIClicked[count]);
            count++;
            if (count < Simon.numOfButtonsToClick) {
                GameLoop(count);
            }
            else {
                setTimeout(function () {
                    MakeClickable();
                }, 250);
            }
        }, 750);
    }
}

function CreateHtmlElements() {
    //set up the CSS file needed for this minigame
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
    //gonnna be stored on the server at some point
    fileRef.setAttribute("href", "../../MiniGames/Simon/css/Simon.css");
    //add the css file to the html
    document.getElementsByTagName("head")[0].appendChild(fileRef);

    //the container that will hold the game
    var divContainer = document.getElementById("BlocksGame");

    var gameBoardContainer = document.createElement("div");
    gameBoardContainer.setAttribute("id", "gameBoardContainer");

    var simon = document.createElement("div");
    simon.setAttribute("id", "simon");
    simon.innerHTML = "SIMON";

    var green = document.createElement("div");
    green.setAttribute("id", "green");
    green.setAttribute("class", "simonSquares");

    var red = document.createElement("div");
    red.setAttribute("id", "red");
    red.setAttribute("class", "simonSquares");

    var purple = document.createElement("div");
    purple.setAttribute("id", "purple");
    purple.setAttribute("class", "simonSquares");

    var blue = document.createElement("div");
    blue.setAttribute("id", "blue");
    blue.setAttribute("class", "simonSquares");

    gameBoardContainer.appendChild(simon);
    gameBoardContainer.appendChild(green);
    gameBoardContainer.appendChild(red);
    gameBoardContainer.appendChild(purple);
    gameBoardContainer.appendChild(blue);

    var bestScore = document.createElement("h1");
    bestScore.setAttribute("id", "bestScore");
    bestScore.innerHTML = "Best Score: 0";

    var currentScore = document.createElement("h1");
    currentScore.setAttribute("id", "currentScore");
    currentScore.innerHTML = "Current Score: 0";

    divContainer.appendChild(gameBoardContainer);
    divContainer.appendChild(bestScore);
    divContainer.appendChild(currentScore);
}

function EndGame() {
    responsiveVoice.speak("Great job!", "US English Female");

    var returnVal = null;

    if (Simon.bestScore === 0)
        returnVal = -5;
    else if (Simon.bestScore === 1)
        returnVal = -4;
    else if (Simon.bestScore === 2)
        returnVal = -3;
    else if (Simon.bestScore === 3)
        returnVal = -2;
    else if (Simon.bestScore === 4)
        returnVal = 0;
    else if (Simon.bestScore === 5)
        returnVAl = 1;
    else if (Simon.bestScore === 6)
        returnVal = 3;
    else if (Simon.bestScore === 7)
        returnVal = 4;
    else
        returnVAl = 5;

    document.getElementById("score").value = returnVal;
    EndofGame(); //function displays good job message and returns to map
}

function Main() {
    var backgroundMusic = new Audio("../../Audio/backgroundMusic/bgSong3.mp3");
    backgroundMusic.volume = "0.1";

    var soundToggle = document.getElementById("minigameScript").getAttribute("toggleSound"); //True = sound off, False = sound on
    var musicToggle = document.getElementById("minigameScript").getAttribute("toggleMusic"); // I don't use sound affects in this game

    //need to get the difficulty and set up the difficulty in the database

    CreateHtmlElements();

    window.onload = function () {
        MakeNotClickable();

        if (musicToggle === "False") {
            //play background music
            backgroundMusic.play();
        }

        responsiveVoice.OnVoiceReady = function () {
            responsiveVoice.speak("Click in order the colors that Simon says to click.",
			"US English Female");
        };

        setTimeout(function () {
            RunAILogic();
        }, 4000);
    }

    //if the user leaves the page
    window.onbeforeunload = function () {
        responsiveVoice.cancel(); //quit doing text to speech
        return null;
    };

    setTimeout(function () {
        MakeNotClickable();
        EndGame();
    }, 120000)
}

Main();