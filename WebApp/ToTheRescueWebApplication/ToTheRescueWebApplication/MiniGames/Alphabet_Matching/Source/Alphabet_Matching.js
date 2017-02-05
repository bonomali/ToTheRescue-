/* Lake Sain-Thomason 
 * Alphabet_Matching 
 */


//global path variables

var mediaPath = "../Media";
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

//listener for all dom content
document.addEventListener('DOMContentLoaded', function () {
    
});

var start = function () {
    //container needs to be created here because im too lazy to modify copy and pasted code
    container = document.createElement('div');
    container.setAttribute('id', 'container');


    //css
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
        //gonnna be stored on the server at some point
    fileRef.setAttribute("href", "../CSS/Alphabet_Matching.css");
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
    catPics = ["../Media/cat1/default.png", "../Media/cat1/disapointed.png",
        "../Media/cat1/pleased.png", "../Media/cat1/surprised.png", "../Media/cat1/oo.png"];

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
    //var divContainer = document.getElementById("BlocksGame");
    //divContainer.style.width = "50%";
    //divContainer.appendChild(container);

    //testing block
    document.getElementsByTagName('body')[0].appendChild(container);
}

var setupGame = function () {
    //reset cat
    var cat = document.getElementById('cat');
    cat.src = catPics[0];//default cat

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
    setBlueLetter();

    //set letter tree
        //start with an array of possible letter blocks
    var blocks = [1, 2, 3, 4, 5, 6, 7];

    //set all of the letters in the sight word into random tree locations
    for (i = 1; i <= sightWords[sightWord].length; i++) {
        var index = Math.floor(Math.random() * blocks.length)
        var letter = document.getElementById("letter" + blocks[index]);
        letter.src = brownTiles[((sightWords[sightWord].charAt(i-1)).charCodeAt() - 97)];
        blocks.splice(index, 1);
        
    }//gets a random number based on number of letter blocks
        //gets a sightWord letter
        // applies letter to random block, removes block from availble blocks

    //fill in the remaining blocks
    for (i = 1; i <= blocks.length; i++) {
        var letter = document.getElementById("letter" + blocks[i - 1]);
        var rand = Math.floor(Math.random() * 25); //a number between 0 and 25
        letter.src = brownTiles[rand];
    }
}

var setBlueLetter = function () {
    var blueLetter = document.getElementById('matchLetter');
    blueLetter.src = blueTiles[((sightWords[sightWord].charAt(counter)).charCodeAt() - 97)];
    //really just feel like typing out what the above does
    //takes the sightword's character in question, gets the ascii value of the char,
    //  subtracts that number by the capital letters starting point in ascii
    //  and results in the exact array location for that letter in the blueTiles array
}
start();
