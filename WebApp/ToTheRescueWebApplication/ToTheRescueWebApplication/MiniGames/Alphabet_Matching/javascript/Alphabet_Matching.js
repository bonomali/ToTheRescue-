/* Lake Sain-Thomason 
 * Alphabet_Matching 
 */


//global path variables

var generalPath = "../../MiniGames/Alphabet_Matching";
var mediaPath = "../../MiniGames/Alphabet_Matching/Media";
var sightWords = [];
var sightWord = -1;
var counter = 0;

//tiles
var yellowTiles = [];
var blueTiles = [];
var brownTiles = [];

//contains all cat expressions
var catPics = [];

//contains all game elements
var container;

//various game variables
var difficulty;
var numberWrong;
var isSelected; //aids in deciding whether or not an event handler should fire
var imgSel; //aids in figuring out what button the user pressed..
var soundToggle;
var musicToggle;

//listener for all dom content
document.addEventListener('DOMContentLoaded', function () {
    //event handlers
    var letter1 = document.getElementById("letter1");
    letter1.onclick = function () {
        if (!isSelected) {
            var blueTile = document.querySelector('#matchLetter');
            blueTile.src = brownTiles[letter1.getAttribute('tag')];
            blueTile.setAttribute('tag', letter1.getAttribute('tag'));
            imgSel = 1;
            imgClicked();
        }
    };
    var letter2 = document.getElementById("letter2");
    letter2.onclick = function () {
        if (!isSelected) {
            var blueTile = document.querySelector('#matchLetter');
            blueTile.src = brownTiles[letter2.getAttribute('tag')];
            blueTile.setAttribute('tag', letter2.getAttribute('tag'));
            imgSel = 2;
            imgClicked();
        }
    };
    var letter3 = document.getElementById("letter3");
    letter3.onclick = function () {
        if (!isSelected) {
            var blueTile = document.querySelector('#matchLetter');
            blueTile.src = brownTiles[letter3.getAttribute('tag')];
            blueTile.setAttribute('tag', letter3.getAttribute('tag'));
            imgSel = 3;
            imgClicked();
        }
    };
    var letter4 = document.getElementById("letter4");
    letter4.onclick = function () {
        if (!isSelected) {
            var blueTile = document.querySelector('#matchLetter');
            blueTile.src = brownTiles[letter4.getAttribute('tag')];
            blueTile.setAttribute('tag', letter4.getAttribute('tag'));
            imgSel = 4;
            imgClicked();
        }
    };
    var letter5 = document.getElementById("letter5");
    letter5.onclick = function () {
        if (!isSelected) {
            var blueTile = document.querySelector('#matchLetter');
            blueTile.src = brownTiles[letter5.getAttribute('tag')];
            blueTile.setAttribute('tag', letter5.getAttribute('tag'));
            imgSel = 5;
            imgClicked();
        }
    };
    var letter6 = document.getElementById("letter6");
    letter6.onclick = function () {
        if (!isSelected) {
            var blueTile = document.querySelector('#matchLetter');
            blueTile.src = brownTiles[letter6.getAttribute('tag')];
            blueTile.setAttribute('tag', letter6.getAttribute('tag'));
            imgSel = 6;
            imgClicked();
        }
    };
    var letter7 = document.getElementById("letter7");
    letter7.onclick = function () {
        if (!isSelected) {
            var blueTile = document.querySelector('#matchLetter');
            blueTile.src = brownTiles[letter7.getAttribute('tag')];
            blueTile.setAttribute('tag', letter7.getAttribute('tag'));
            imgSel = 7;
            imgClicked();
        }
    };
    setTimeout(function GameOver() {
        if (soundToggle == "False") responsiveVoice.speak("Good Attempt.");
        var finalScore = -5;
        document.getElementById('score').value = finalScore;
        EndofGame();
    }, 60000);
});

var start = function () {
    //Voice intro
    responsiveVoice.speak("Hello! Match the blue letter with the same brown letter to make a word!");   

    //container needs to be created here because im too lazy to modify copy and pasted code
    container = document.createElement('div');
    container.setAttribute('id', 'container');

    //some game variables
    //difficulty = document.getElementById("minigameScript").getAttribute("difficulty");
    numberWrong = 0;
    isSelected = 0;
    imgSel = 0;
    soundToggle = document.getElementById("minigameScript").getAttribute("toggleSound"); //True = sound off, False = sound on
    musicToggle = document.getElementById("minigameScript").getAttribute("toggleMusic");

    //css
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
        //gonnna be stored on the server at some point
    fileRef.setAttribute("href", generalPath + "/CSS/Alphabet_Matching.css");
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
    yellowTiles[26] = mediaPath + "/yellowTilesN/letter.png";//empty letter box for sight word
    

    //make the cat path array
    catPics = [generalPath + "/Media/cat1/default.png", generalPath + "/Media/cat1/disapointed.png",
        generalPath + "/Media/cat1/pleased.png", generalPath + "/Media/cat1/surprised.png", generalPath + "/Media/cat1/oo.png"];

    //single difficulty for now. I didn't like typing this
    sightWords = ["all", "am", "are", "at", "ate", "be", "black", "brown", "but", "came", "did", "do", "eat", "four", "get", "good",
        "have", "he", "into", "like", "must", "new", "no", "now", "on", "our", "out", "please", "pretty", "ran", "ride", "saw", "say",
        "she", "so", "soon", "that", "there", "they", "this", "too", "under", "want", "was", "well", "went", "what", "white", "who",
        "will", "with", "yes"];
    
    createElements();
    setupGame();
}

var createElements = function () {

    //create cat
    var cat = document.createElement('img');
    cat.setAttribute('id', 'cat'); //css handles styling
    container.appendChild(cat);

    //create letter to be matched
    var letterToBeMatched = document.createElement('img');
    letterToBeMatched.setAttribute('id', 'matchLetter'); //css handles styling
    container.appendChild(letterToBeMatched);

    //create sight word letter block
    var i = 1;
    for (i; i <= 6; i++) {
        var wordLetter = document.createElement('img');
        wordLetter.setAttribute('id', 'word' + i);
        wordLetter.setAttribute('class', 'wordLetter')
        container.appendChild(wordLetter);
    }

    //create letter choices
    for (i = 1; i <= 7; i++) {
        var wordLetter = document.createElement('img');
        wordLetter.setAttribute('id', 'letter' + i);
        container.appendChild(wordLetter);
    }   
        /*Splash screen and other audio elements should be contained here*/
        //append all elements to blocksgame div
    var divContainer = document.getElementById("BlocksGame");
    divContainer.appendChild(container);

    var backgroundMusic = document.createElement('audio');
    backgroundMusic.setAttribute('src', mediaPath + '/Sounds/backgroundMusic.mp3');
    backgroundMusic.setAttribute('id', 'bgMusic');
    backgroundMusic.loop = true;
    backgroundMusic.volume = '0.3';

    if (musicToggle == "False") setTimeout(backgroundMusic.play(), 3000);

    backgroundMusic.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
        this.volume = '0.3';
    }, false);//keeps background music alive
}

var setupGame = function () {

    //hide old sightword images
    var i = 1;
    if (sightWord != -1) {
        for (i; i <= sightWords[sightWord].length; i++) {
            var letterWord = document.getElementById('word' + i);
            letterWord.style.visibility = 'hidden';
        }
    }//first case if

    //set sight word block
    sightWord = Math.floor(Math.random() * sightWords.length); //random sightword array index
    
    for (i = 1; i <= sightWords[sightWord].length; i++) {
        var letterWord = document.getElementById('word' + i);
        letterWord.src = yellowTiles[26]; //empty block
        letterWord.style.visibility = 'visible';
    }

    //set letter to be matched
    setCatLetter();

    //set letter tree
        //start with an array of possible letter blocks
    var blocks = [1, 2, 3, 4, 5, 6, 7];

    //set all of the letters in the sight word into random tree locations 
    for (i = 1; i <= sightWords[sightWord].length; i++) {
        var blocksIndex = Math.floor(Math.random() * blocks.length)
        var letter = document.getElementById("letter" + blocks[blocksIndex]);
        var tileIndex = ((sightWords[sightWord].charAt(i - 1)).charCodeAt() - 97);
        letter.setAttribute('tag', tileIndex); // save the index
        letter.src = brownTiles[tileIndex];
        blocks.splice(blocksIndex, 1);
    }//gets a random number based on number of letter blocks
        //gets a sightWord letter
        // applies letter to random block, removes block from availble blocks

    //fill in the remaining blocks
    for (i = 1; i <= blocks.length; i++) {
        var letter = document.getElementById("letter" + blocks[i - 1]);
        var rand = Math.floor(Math.random() * 25); //a number between 0 and 25
        letter.src = brownTiles[rand];
        letter.setAttribute('tag', rand); // save index
    }
}

var setCatLetter = function () {
    if (sightWords[sightWord].length == counter) {
        var stat = 5 - numberWrong;
        if (stat < -5) stat = -5;
        if (soundToggle == "False") {
            responsiveVoice.speak("The word is, " + sightWords[sightWord]);
            responsiveVoice.speak("Great Job!");
        }
        document.getElementById("score").value = stat;
        setTimeout(EndofGame, 2500);
    }//if the user won
    else {
        document.getElementById("cat").src = catPics[0];
        var blueLetter = document.getElementById('matchLetter');
        blueLetter.src = blueTiles[(sightWords[sightWord].charAt(counter).charCodeAt() - 97)];
        if (soundToggle == "False") responsiveVoice.speak("The letter is, " + sightWords[sightWord].charAt(counter));
        isSelected = 0;
    }
}

var imgClicked = function () {

    document.getElementById("cat").src = catPics[4]; //transition cat
    isSelected = 1;
    setTimeout(checkAnswer, 2500);
}

var checkAnswer = function () {

    var matchLetter = document.getElementById("matchLetter");
    if (matchLetter.getAttribute('tag') == (sightWords[sightWord].charAt(counter).charCodeAt() - 97)) {
        var matchedTile = document.getElementById("word" + (counter + 1));
        matchedTile.src = yellowTiles[matchLetter.getAttribute('tag')];
        matchedTile.style.opacity = 1;
        counter++ //moves the location of the sightword letter
        document.getElementById("cat").src = catPics[2]; //happy cat
        var rand = Math.floor(Math.random() * 25);
        document.getElementById("letter" + imgSel).src = brownTiles[rand];
        document.getElementById("letter" + imgSel).setAttribute("tag", rand);
        if (soundToggle == "False") responsiveVoice.speak("Nice!");
    }//if the user selected the correct letter tile
    else {
        numberWrong++;
        if ((Math.floor(Math.random() * 3)) == 0)
            document.getElementById("cat").src = catPics[3]; //surprised cat
        else document.getElementById("cat").src = catPics[1]; //dissapointed cat     
        if (soundToggle == "False") responsiveVoice.speak("Uh oh");
    }
    setTimeout(setCatLetter, 2000);
}


start();
