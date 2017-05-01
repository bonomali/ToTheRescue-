// Number_Find minigame
// Lake Sain-Thomason
// 
//

//globals
var difficulty;
var imgPath;
var soundToggle;
var musicToggle;
var finalScore;
var catPics = [];
var numsToFind = [];
var container;
var numToBeFound;
var numsFound;
var maxNumber;
var isSelected;
var selectedNum;
var performanceStat;


var main = function () {
    initializeVars();
    createHTMLElements();
    setupGame();
}

var initializeVars = function () {
    //grab the difficulty
    difficulty = document.getElementById("minigameScript").getAttribute("difficulty");

    //setting some helper variables
    imgPath = '../../MiniGames/Number_Find/images/';
    var finalScore = 0;
    numsFound = 0;
    (difficulty == 0) ? maxNumber = 5
        : maxNumber = 5 + (difficulty * 2);
    isSelected = false;
    selectedNum = 0;
    performanceStat = 5;

    //setting sound/music toggles
    soundToggle = document.getElementById("minigameScript").getAttribute("toggleSound");
    musicToggle = document.getElementById("minigameScript").getAttribute("toggleMusic");
    
    //changing string values to more manageable int values
    (soundToggle == "False") ? soundToggle = 1 : soundToggle = 0;
    (musicToggle == "False") ? musicToggle = 1 : musicToggle = 0;

    //set the nums to be found for the game
    for (var i = 0; i < maxNumber; i++)
    {
        numsToFind[i] = Math.floor(Math.random() * 100) + 1;
    }
    //set the cat expression pictures
    catPics = [imgPath + "default.png", imgPath + "disapointed.png"
        , imgPath + "pleased.png", imgPath + "surprised.png", imgPath + "oo.png"];

    //set the minigame timeout 
    setTimeout(function GameOver() {
        if (soundToggle) responsiveVoice.speak("Good Attempt.");
        var finalScore = -5;
        document.getElementById('score').value = finalScore;
        EndofGame();
    }, 300000);
}

var createHTMLElements = function () {
    //create encapsulating container
    container = document.createElement('div');
    container.setAttribute('id', 'container');

    //reference css
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
    fileRef.setAttribute("href", "../../MiniGames/Number_Find/CSS/Number_Find.css");
    document.getElementsByTagName("head")[0].appendChild(fileRef);

    //set background img
    var background = document.createElement("img");
    background.setAttribute("id", "background");
    background.setAttribute("src", imgPath + "background.png");
    container.appendChild(background);


    //create the empty number grid and numbers divs
    for (var i = 1; i <= 100; i++) {
        var tileDiv = document.createElement('div');
        tileDiv.setAttribute('id', 'tileDiv' + i);
        tileDiv.setAttribute('class', 'gridTileDiv');

        var wordLetter = document.createElement('img');
        wordLetter.setAttribute('id', 'tile' + i);
        wordLetter.setAttribute('class', 'gridTile');
        
        var number = document.createElement('p');
        var node = document.createTextNode(i);
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

    //var node = document.createTextNode();
    tileDiv.appendChild(number);
    container.appendChild(tileDiv);

    //create cat
    var cat = document.createElement('img');
    cat.setAttribute('id', 'cat');
    container.appendChild(cat);

    //set background sound
    var backgroundMusic =
        new WebAudioAPISound('../../MiniGames/Number_Find/sounds/background.mp3'
        , { loop: true });
    backgroundMusic.setVolume(30);
    if (musicToggle) setTimeout(function ()
        { backgroundMusic.play(backgroundMusic); }, 3000);

    document.getElementById("BlocksGame").appendChild(container);

}

var setupGame = function () {
    //set cat to default
    setCatPic(0);

    //place an empty tile grid
    initializeGrid();

    //place numbers on grid
    initializeNumbers();

    //set the number to be found on the grid
    initializeNumToBeFound();

    //hide the numbers that need to be found
    hideNumsToFind();

    //set the event handlers for the nums to be found
    initializeEventHandlers();

}

var initializeGrid = function () {
    var xStart = 615;
    var yStart = 21;
    var column = 0;
    var row = 0;
    for (var i = 1; i <= 100; i++) {
        var tileDiv = document.getElementById("tileDiv" + i);
        tileDiv.style.left = xStart + (column * 80) + "px";
        tileDiv.style.top = yStart + (row * 80) + "px";

        //must set gridTile pos as well to center the numbers :/
        var tile = document.getElementById("tile" + i);
        tile.src = imgPath + "brownSquare.png";
        tile.style.left = xStart + (column * 80) + "px";
        tile.style.top = yStart + (row * 80) + "px";
        
        column++;
        if (column === 10) {
            column = 0;
            row++;
        }
    }
}

var initializeNumbers = function () {
    var column = 0;
    var row = 0;
    for (var i = 1; i <= 100; i++) {
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
    document.getElementById("tileToFind").src = imgPath + "yellowSquare.png";
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

var hideNumsToFind = function () {
    for (var i = 0; i < numsToFind.length; i++)
    {
        hideNumber(numsToFind[i]);
    }
}

var initializeEventHandlers = function () {
    for (var i = 0; i < maxNumber; i++)
    {
        var tileDiv = document.getElementById("tileDiv" + numsToFind[i].toString());
        createHandler(tileDiv);
    }
}

var createHandler = function(tileDiv)
{
    tileDiv.addEventListener("click", function() {
        if (!isSelected) {
            imgClicked(parseInt(tileDiv.lastChild.innerHTML));
        }
    });
}

var imgClicked = function (num)
{
    if (!checkIfClickable(num)) return;
    isSelected = true;
    showNumber(num);
    setCatPic(4);

    //if correct
    if (numsToFind[numsFound] == num)
    {
        //document.getElementById("tileDiv" + num).removeEventListener("click", tileClicked);
        setTimeout(function () {
            setCatPic(2);
            numsFound++;
            document.getElementById("tile" + num).src = imgPath + "yellowSquare.png";

            setTimeout(function () {
                checkWin();
                setCatPic(0);
                isSelected = false;
            }, 1200);

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
            hideNumber(num);
            setTimeout(function () {
                setCatPic(0);
                isSelected = false;
            }, 1200);
        }, 1500);
    }
}

var checkIfClickable = function (num) {
    var tileDiv = document.getElementById("tileDiv" + num).lastChild.style.visibility;
    if (tileDiv === "visible")
        return false;
    else
        return true;
}

var checkWin = function () {
    if (numsFound === maxNumber) {
        if (performanceStat < -5) performanceStat = -5;
        document.getElementById("score").value = performanceStat;
        EndofGame();
    }
}

main();
//window.onbeforeunload = function () {
//    responsiveVoice.cancel();
//    return null;
//}

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
