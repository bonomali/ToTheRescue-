
//Number Comparison Game

var mediaFilePath = "C:/Users/lakethomason/Documents/GitHub/ToTheRescue-/WebApp/ToTheRescueWebApplication/ToTheRescueWebApplication/MiniGames/Number_Comparison";

// Create the canvas
var canvas = document.createElement("canvas");
canvas.style.zIndex = 1;
var ctx = canvas.getContext("2d");
canvas.width = 990;
canvas.height = 699;
document.body.appendChild(canvas);

//IMAGE LOADING
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = mediaFilePath + "/images/chalkboard.png";

// lessThan image
var lessThanReady = false;
var lessThanImage = new Image();
lessThanImage.onload = function () {
    lessThanReady = true;
};
lessThanImage.src = mediaFilePath + "/images/lessThan.png";

// greaterThan image
var greaterThanReady = false;
var greaterThanImage = new Image();
greaterThanImage.onload = function () {
    greaterThanReady = true;
};
greaterThanImage.src = mediaFilePath + "/images/greaterThan.png";

// equalTo image
var equalToReady = false;
var equalToImage = new Image();
equalToImage.onload = function ()
{
    equalToReady = true;
};
equalToImage.src = mediaFilePath + "/images/equalTo.png";

var questionReady = false;
var questionImage = new Image();
questionImage.onload = function () {
    questionReady = true;
};
questionImage.src = mediaFilePath + "/images/question.png";


// Draw everything
var render = function () {
    if (bgReady)
    {
        ctx.drawImage(bgImage, 0, 0);
        bgReady = false;
    }

    if (lessThanReady)
    {
        ctx.drawImage(lessThanImage, 100, 430);
        lessThanReady = false;
    }

    if (greaterThanReady) {
        ctx.drawImage(greaterThanImage, 740, 430);
        greaterThanReady = false;
    }

    if (equalToReady)
    {
        ctx.drawImage(equalToImage, 425, 480);
        greaterThanReady = false;
    }

    if (questionReady)
    {
        ctx.drawImage(questionImage, 450, 200);
        questionReady = false;
    }
};

//Main game loop
var main = function ()
{   
    render();
    requestAnimationFrame(main);
}

//compatibility
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

main();
