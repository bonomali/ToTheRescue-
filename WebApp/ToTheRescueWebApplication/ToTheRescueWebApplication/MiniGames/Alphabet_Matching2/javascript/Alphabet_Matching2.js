﻿/* Lake Sain-Thomason 
 * Alphabet_Matching 
 */


//global path variables

var generalPath = "../../MiniGames/Alphabet_Matching2"; //  ../../MiniGames/Alphabet_Matching2
var mediaPath = generalPath + "/Media"; //to test in browser, had to change from ../../MiniGames/Alphabet_Matching2/Media
var sightWords = [];
var sightWord = -1;
var lettersMatched;

//tiles
var yellowTiles = [];
var blueTiles = [];
var brownTiles = [];
var tiles = [];

//contains all cat expressions
var catPics = [];

//contains all game elements
var container;

//various game variables
var difficulty;
var numberWrong;
var isSelected; //aids in deciding whether or not an event handler should fire
var imgSel; //aids in figuring out what button the user pressed..
var imgSel2;
var letterSel; //defines what element was selected
var letterSel2;

//listener for all dom content
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function GameOver() {
        responsiveVoice.speak("Good Attempt.");
        var finalScore = -5;
        document.getElementById('score').value = finalScore;
        EndofGame();
    }, 300000);
    
});//event listener

var start = function () {
    //Voice intro
    responsiveVoice.speak("Hello! Match the blue letter with same brown letter to make a word!");

    //container needs to be created here because im too lazy to modify copy and pasted code
    container = document.createElement('div');
    container.setAttribute('id', 'container');

    //some game variables
    difficulty = document.getElementById("minigameScript").getAttribute("difficulty");
    numberWrong = 0;
    isSelected = 0;
    imgSel = -1; 
    imgSel2 = -1;
    lettersMatched = 0;
    letterSel = -1;
    letterSel2 = -1;

    //css
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
    fileRef.setAttribute("href", generalPath + "/CSS/Alphabet_Matching2.css");
        //add the css file to the minigame html
    document.getElementsByTagName("head")[0].appendChild(fileRef);


    //make the alphabet path array
    var i = 0;
    for (i; i < 26; i++) {
        yellowTiles[i] = mediaPath + "/yellowTilesN/letter_" + String.fromCharCode(i + 65) + ".png";
        brownTiles[i] = mediaPath + "/brownTiles/letter_" + String.fromCharCode(i + 65) + ".png";
        blueTiles[i] = mediaPath + "/blueTiles/letter_" + String.fromCharCode(i + 65) + ".png";
        //full path to picture using naming format
    }
    tiles[0] = yellowTiles;
    tiles[1] = brownTiles;
    tiles[2] = blueTiles;

    //make the cat path array
    catPics = [generalPath + "/Media/cat1/default.png", generalPath + "/Media/cat1/disapointed.png",
        generalPath + "/Media/cat1/pleased.png", generalPath + "/Media/cat1/surprised.png", generalPath + "/Media/cat1/oo.png"];

    createElements();
    setupGame();
}

var createElements = function () {

    //create cat
    var cat = document.createElement('img');
    cat.setAttribute('id', 'cat'); //css handles styling
    container.appendChild(cat);

    //create letter choices
    var top = 15;
    var left = [25, 125, 50, 330, 270];
    var letter;
    for (i = 1; i <= 20; i++) {
        var letter = document.createElement('img');
        letter.setAttribute('id', 'letter' + i);
        letter.setAttribute('class', 'matchletter');
        letter.style.position = 'absolute';
        if (i <= 5) { letter.style.top = top + "px"; letter.style.left = left[0] + "px"; left[0] += 200;}
        else if (i <= 9) { top = 160; letter.style.top = top + "px"; letter.style.left = left[1] + "px"; left[1] += 200; }
        else if (i <= 13) { top = 315; letter.style.top = top + "px"; letter.style.left = left[2] + "px"; left[2] += 200; }
        else if (i <= 16) { top = 475; letter.style.top = top + "px"; letter.style.left = left[3] + "px"; left[3] += 200; }
        else if (i <= 20) { top = 630; letter.style.top = top + "px"; letter.style.left = left[4] + "px"; left[4] += 200; }
        if (typeof window.addEventListener === 'function') {
            (function (letter) {
                letter.addEventListener('click', function () {
                    if (!isSelected) {
                        if (letterSel != letter.getAttribute('id')) {
                            letter.style.border = "thick solid #ffd800";
                            if (imgSel == -1) {
                                imgSel = letter.getAttribute('tag');
                                letterSel = letter.getAttribute('id');
                            }
                            else {
                                imgSel2 = letter.getAttribute('tag');
                                letterSel2 = letter.getAttribute('id');
                            }
                            imgClicked();
                        }
                        else {
                            imgSel = -1;
                            letterSel = "";
                            letter.style.border = "";
                        }//else
                    }//if
                });//onclick
            })(letter);//function 
        }//eventListener
        container.appendChild(letter);
    }//for
        /*Splash screen and other audio elements should be contained here*/
        //append all elements to blocksgame div
    var divContainer = document.getElementById("BlocksGame");
    divContainer.style.width = "50%";
    divContainer.appendChild(container);

    //testing block
    //document.getElementsByTagName('body')[0].appendChild(container);
}

var setupGame = function () {
    
    //set cat
    var cat = document.getElementById('cat');
    cat.src = catPics[0];
    //set letter tree
    //start with an array of possible letter blocks
    var blocks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    var availableLetters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

    //set all of the letters in the sight word into random tree locations 
    for (i = 1; i <= 10; i++) {
        var blocksIndex = Math.floor(Math.random() * blocks.length);
        var letter = document.getElementById("letter" + blocks[blocksIndex]); //gets random letter tile to use
        var tileIndex = Math.floor(Math.random() * availableLetters.length); 
        var tileColor = Math.floor(Math.random() * 3);
        letter.setAttribute('tag', availableLetters[tileIndex]); //set the tag to the letter tile index number
        letter.src = tiles[tileColor][availableLetters[tileIndex]]; //apply the letter to the letter tile
        blocks.splice(blocksIndex, 1); //remove the letter tile from the list of availble tiles

        blocksIndex = Math.floor(Math.random() * blocks.length);
        letter = document.getElementById("letter" + blocks[blocksIndex]); //gets random letter tile to use
        letter.setAttribute('tag', availableLetters[tileIndex]); //set the tag to the letter tile index number
        letter.src = tiles[tileColor][availableLetters[tileIndex]]; //apply the letter to the letter tile
        blocks.splice(blocksIndex, 1); //remove the letter tile from the list of availble tiles
        availableLetters.splice(tileIndex, 1);// remove any possibility of getting duplicate letters that
    }//makes pairs of blocks to match  
}

var checkWin = function () {
    if (lettersMatched == 10) {
        var stat = 5 - numberWrong;
        if (stat < -5) stat = -5;
        responsiveVoice.speak("The word is " + sightWords[sightWord]);
        responsiveVoice.speak("Great Job!");
        document.getElementById("score").value = stat;
        setTimeout(EndofGame, 2500);
    }//if the user won
    else {
        numberWrong++;
        document.getElementById("cat").src = catPics[0];
        isSelected = 0;
    }
}

var imgClicked = function () {
    if (imgSel2 == -1) responsiveVoice.speak(String.fromCharCode(parseInt((document.getElementById(letterSel).getAttribute('tag'))) + 97));
    if (imgSel2 != -1) {
        responsiveVoice.speak(String.fromCharCode(parseInt((document.getElementById(letterSel2).getAttribute('tag'))) + 97));
        var letter;
        if (letterSel2 != 1) letter = document.getElementById(letterSel2);
        else letter = document.getElementById(letterSel);
        document.getElementById("cat").src = catPics[4]; //transition cat
        isSelected = 1;
        setTimeout(checkAnswer, 1500);
    }//if its the second image
}

var checkAnswer = function () {
    if (imgSel == imgSel2) {
        lettersMatched++;
        document.getElementById("cat").src = catPics[2]; //happy cat  
        document.getElementById(letterSel).style.visibility = "hidden";
        document.getElementById(letterSel2).style.visibility = "hidden";        responsiveVoice.speak("Nice!");
    }//if the user selected the correct letter tile
    else {
        numberWrong++;
        if ((Math.floor(Math.random() * 3)) == 0)
            document.getElementById("cat").src = catPics[3]; //surprised cat
        else document.getElementById("cat").src = catPics[1]; //dissapointed cat     
        responsiveVoice.speak("Oh no");
    }
    imgSel = -1;
    imgSel2 = -1;
    document.getElementById(letterSel).style.border = "hidden";
    document.getElementById(letterSel2).style.border = 'hidden';
    letterSel = -1;
    letterSel2 = -1;
    setTimeout(checkWin, 2000);
}
start();