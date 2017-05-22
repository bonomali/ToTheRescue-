// Bingo MiniGame
// Lake Sain-Thomason
// 
//

//globals

//images
var catPics = [];

//game
var numsToFind = [];
var numToBeFound;
var numsFound;
var maxNumber;
var isSelected;
var selectedNum;
var randArray;
var numArray;
var activeArr;

//app
var performanceStat;
var difficulty;
var container;
var finalScore;
var soundToggle;
var musicToggle;
var imgPath;

//sounds
var bgMusic;
var intro;
var prng;
var bingo;


var main = function () {
    initializeVars();
    createHTMLElements();
    setupGame();
}

var initializeVars = function () {
    //grab the difficulty
    difficulty = document.getElementById("minigameScript").getAttribute("difficulty");

    //setting some helper variables
    imgPath = '../../MiniGames/Bingo/images/';
    var finalScore = 0;
    numsFound = 0;
    (difficulty == 0) ? maxNumber = 5
        : maxNumber = 5 + (difficulty * 2);
    isSelected = false;
    selectedNum = 0;
    performanceStat = 5;
    intro = new WebAudioAPISound('../../MiniGames/Bingo/sounds/mrKitty.m4a');
    prng = new WebAudioAPISound('../../MiniGames/Bingo/sounds/prng.m4a');
    bingo = new WebAudioAPISound('../../MiniGames/Bingo/sounds/Bingo.m4a');
    bgMusic = new WebAudioAPISound('../../MiniGames/Bingo/sounds/background_music.mp3'
        , { loop: true });
    bgMusic.setVolume(30);
    prng.setVolume(25);

    //create array of random numbers to be filled in bingo
    randArray = [];
    numArray = [];
    for (var i = 1; i <= 25; i++) {
        randArray.push(i);
        numArray.push(i);
    }

    //setting sound/music toggles
    soundToggle = document.getElementById("minigameScript").getAttribute("toggleSound");
    musicToggle = document.getElementById("minigameScript").getAttribute("toggleMusic");

    //changing string values to more manageable int values
    (soundToggle == "False") ? soundToggle = 1 : soundToggle = 0;
    (musicToggle == "False") ? musicToggle = 1 : musicToggle = 0;

    //set the cat expression pictures
    catPics = [imgPath + "default.png", imgPath + "disapointed.png"
        , imgPath + "pleased.png", imgPath + "surprised.png", imgPath + "oo.png"];

    //set the minigame timeout 
    setTimeout(function GameOver() {
        if (soundToggle) responsiveVoice.speak("Good Attempt.");
        var finalScore = -5;
        document.getElementById('score').value = finalScore;
        EndofGame();
    }, 120000);
}

var createHTMLElements = function () {
    //create encapsulating container
    container = document.createElement('div');
    container.setAttribute('id', 'container');

    //reference css
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
    fileRef.setAttribute("href", "../../MiniGames/Bingo/CSS/Bingo.css");
    document.getElementsByTagName("head")[0].appendChild(fileRef);

    //set background img
    var background = document.createElement("img");
    background.setAttribute("id", "background");
    background.setAttribute("src", imgPath + "background.jpg");
    container.appendChild(background);

    //create the empty number grid and numbers divs
    for (var i = 1; i <= 25; i++) {
        var tileDiv = document.createElement('div');
        tileDiv.setAttribute('id', 'tileDiv' + i);
        tileDiv.setAttribute('class', 'gridTileDiv');

        var wordLetter = document.createElement('img');
        wordLetter.setAttribute('id', 'tile' + i);
        wordLetter.setAttribute('class', 'gridTile');

        var number = document.createElement('p');

        //get random index of dynamic arary
        var randIndex = Math.floor(Math.random() * randArray.length);
        var randNum = randArray[randIndex];
        randArray.splice(randIndex, 1);

        randIndex = Math.floor(Math.random() * numArray.length);
        var randrandNum = numArray[randIndex];
        numArray.splice(randIndex, 1);
        numsToFind.push(randrandNum);

        var node = document.createTextNode(randNum);
        number.setAttribute('id', 'number' + i);
        number.setAttribute('class', 'numberOnTile');
        number.appendChild(node);


        tileDiv.appendChild(number);
        container.appendChild(tileDiv);
        container.appendChild(wordLetter)
    }

    //create tile to be found in grid
    var numToBeMatched = document.createElement('img');
    numToBeMatched.setAttribute('id', 'tileToFind');
    container.appendChild(numToBeMatched);

    //create number to be found 
    var tileDiv = document.createElement('div');
    tileDiv.setAttribute('id', 'numToBeFoundDiv');

    var number = document.createElement('p');
    number.setAttribute('id', 'numberToFind');

    tileDiv.appendChild(number);
    container.appendChild(tileDiv);

    //create cat
    var cat = document.createElement('img');
    cat.setAttribute('id', 'cat');
    container.appendChild(cat);

    document.getElementById("BlocksGame").appendChild(container);

}

var setupGame = function () {
    //begin instructions, background music, set cat pic
    beginIntro();

    //place an empty tile grid
    initializeGrid();

    //place numbers on grid
    initializeNumbers();

    //set the number to be found on the grid
    initializeNumToBeFound();

    //set the event handlers for the nums to be found
    initializeEventHandlers();

}

var beginIntro = function () {
    setCatPic(0);
    if (soundToggle) intro.play(intro);
    if (musicToggle) setTimeout(function ()
    { bgMusic.play(bgMusic); }, 3500);
}

var initializeGrid = function () {
    var xStart = 645;
    var yStart = 101;
    var column = 0;
    var row = 0;
    for (var i = 1; i <= 25; i++) {
        var tileDiv = document.getElementById("tileDiv" + i);
        tileDiv.style.left = xStart + (column * 120) + "px";
        tileDiv.style.top = yStart + (row * 120) + "px";

        //must set gridTile pos as well to center the numbers :/
        var tile = document.getElementById("tile" + i);
        tile.src = imgPath + "brownSquare.png";
        tile.style.left = xStart + (column * 120) + "px";
        tile.style.top = yStart + (row * 120) + "px";

        column++;
        if (column === 5) {
            column = 0;
            row++;
        }
    }
}

var initializeNumbers = function () {
    var column = 0;
    var row = 0;
    for (var i = 1; i <= 25; i++) {
        var number = document.getElementById("number" + i);
        number.src = imgPath + "brownSquare.png";
        column++;
        if (column === 10) {
            column = 0;
            row++;
        }
    }
}

var initializeNumToBeFound = function () {
    document.getElementById("tileToFind").src = imgPath + "blueSquare.png";
    var num = document.getElementById("numberToFind");
    if (numsFound < numsToFind.length) num.innerHTML = numsToFind[numsFound];
}

var hideNumber = function (number) {
    document.getElementById("number" + number).style.visibility = "hidden";
}

var showNumber = function (number) {
    document.getElementById("number" + number).style.visibility = "visible";
}

var setCatPic = function (pic) {
    document.getElementById("cat").src = catPics[pic];
}

var initializeEventHandlers = function () {
    for (var i = 1; i <= 25; i++) {
        var tileDiv = document.getElementById("tileDiv" + i);
        createHandler(tileDiv);
    }
}

var createHandler = function (tileDiv) {
    tileDiv.addEventListener("click", function () {
        if (!isSelected) {
            imgClicked(parseInt(tileDiv.lastChild.innerHTML));
        }
    });
}

var imgClicked = function (num) {
    if (checkIfClickable(num)) return;
    isSelected = true;
    setCatPic(4);

    //if correct
    if (numsToFind[numsFound] == num) {
        var i = 1;

        //converts to tileDiv number
        while (i <= 25)
        {
            var foundNum = parseInt(document.getElementById("tileDiv" + i).lastChild.innerHTML);
            if (foundNum === num) {
                num = i;
                break;
            }
            i++;
        }
        setTimeout(function () {
            if (soundToggle) prng.play(prng);
            setCatPic(2);
            numsFound++;
            document.getElementById("tile" + num).src = imgPath + "yellowSquare.png";

            setTimeout(function () {
                if (checkWin()) {
                    if (soundToggle) bingo.play(bingo);
                    endGame();
                }
                setCatPic(0);
                isSelected = false;
            }, 1000);

            initializeNumToBeFound();
        }, 1000);
        //play some audio congrats and shit
    }
    else //if wrong 
    {
        performanceStat--;
        setTimeout(function () {
            if ((Math.floor(Math.random() * 3)) == 0)
                setCatPic(3) //surprised cat
            else
                setCatPic(1); //dissapointed cat
            setTimeout(function () {
                setCatPic(0);
                isSelected = false;
            }, 1200);
        }, 1500);
    }
}

var checkIfClickable = function (num) {
    var i = 1;
    while (i <= 25) {
        var foundNum = parseInt(document.getElementById("tileDiv" + i).lastChild.innerHTML);
        if (foundNum === num) {
            num = i;
            break;
        }
        i++;
    }

    var tileDiv = document.getElementById("tile" + num).getAttribute('src');
    if (tileDiv.localeCompare((imgPath + "yellowSquare.png")))
        return false;
    else
        return true;
}

var contains = function(needle) {
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

var checkWin = function () {
    var i = 1;
    var tileDiv;
    activeArr = [];
    for (i; i <= 25; i++)
    {
        tileDiv = document.getElementById("tile" + i).getAttribute('src');
        if (!tileDiv.localeCompare((imgPath + "yellowSquare.png")))
            activeArr.push(i);
    }
    if (checkAllConditions(activeArr))
        return true;
    else
        return false;
}

var checkAllConditions = function (activeArr) {
    if (checkColumnWin(activeArr) || checkRowWin(activeArr) || checkDiagWin(activeArr))
        return true;
    else
        return false;
}

var checkColumnWin = function (activeArr) {
    var foundCount = 0;
    for (var i = 1; i <= 5; i++)
    {
        for (var k = 0; k < 5; k++)
        {
            if (contains.call(activeArr, (k * 5 + i)))
                foundCount++;
        }
        if (foundCount === 5)
            return true;
        else
            foundCount = 0;
    }
    return false;
}

var checkRowWin = function (activeArr) {
    var foundCount = 0;
    for (var i = 0; i < 5; i++) {
        for (var k = 1; k <= 5; k++) {
            if (contains.call(activeArr, (k + i * 5)))
                foundCount++;
        }
        if (foundCount === 5)
            return true;
        else
            foundCount = 0;
    }
    return false;
}

var checkDiagWin = function (activeArr) {
    var foundLeft = 0;
    var foundRight = 0;
    var i = 1;
    while (i <= 25)
    {
        if (contains.call(activeArr, i)) foundRight++;
        i+= 6;
    }
    while (i <= 20) {
        if (contains.call(activeArr, i)) foundLeft++;
        i += 4;
    }
    if (foundRight === 5 || foundLeft === 5)
        return true;
    else
        return false;
}

var endGame = function () {
    if (performanceStat < -5) performanceStat = -5;
    document.getElementById("score").value = performanceStat;
    EndofGame();
}

main();

/*Universal Minigame Scaler!*/
var pageWidth, pageHeight;

var basePage = {
    width: 1500,
    height: 842,
    scale: 1,
    scaleX: 1,
    scaleY: 1
};//change the height and width to match your minigame height and width

$(function () {
    //#contents should be the div that contains all visual elements of your minigame
    var pageContent = $('#container');

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
        var bodyWidth = $('body').width();
        var bodyHeight = $('body').height();

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
/*End Universal Minigame Scaler*/
