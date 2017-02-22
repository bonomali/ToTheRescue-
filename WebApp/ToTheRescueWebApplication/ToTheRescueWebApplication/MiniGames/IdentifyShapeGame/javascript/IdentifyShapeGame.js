const SQUARE = 0;
const RECTANGLE = 1;
const TRIANGLE = 2;
const CIRCLE = 3;
const PENTAGON = 4;
const HEXAGON = 5;
const OCTAGON = 6;

//global variable needed to keep track of the number of shapes the 
//user clicked correctly
var numOfCorrectClicks = 0;

//counts the number of times the user clicked
var clickCount = 0;
var clickable = true;

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function GetRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function MakeShapes(difficulty) {
    var shapeArr = [];

    var Square = {
        x: 0,
        y: 0,
        xIncrement: 3,
        yIncrement: 3,
        width: 0,
        height: 0,
        right: true,
        down: true,
        color: "green",
        currentShape: false,

        Draw: function (canvas, ctx) {
            ctx.fillStyle = this.color;
            ctx.lineWidth = 3;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.strokeRect(this.x, this.y, this.width, this.height);

            if (this.right === true)
                this.x += this.xIncrement;
            else
                this.x -= this.xIncrement;

            if (this.down === true)
                this.y += this.yIncrement;
            else
                this.y -= this.yIncrement;

            if (this.x + this.width >= canvas.width)
                this.right = false;
            else if (this.x <= 0)
                this.right = true;

            if (this.y + this.height >= canvas.height)
                this.down = false;
            else if (this.y <= 0)
                this.down = true;
        },

        IsClicked: function (mouseX, mouseY) {
            //true if clicked in the shape, false if not
            return (mouseX >= this.x) && (mouseX <= this.x + this.width) && (mouseY >= this.y) && (mouseY <= this.y + this.height);
        }
    };

    var Rectangle = {
        x: window.innerWidth,
        y: window.innerHeight,
        xIncrement: 3,
        yIncrement: 3,
        width: 0,
        height: 0,
        right: false,
        down: false,
        color: "blue",
        currentShape: false,

        Draw: function (canvas, ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.strokeRect(this.x, this.y, this.width, this.height);

            if (this.right === true)
                this.x += this.xIncrement;
            else
                this.x -= this.xIncrement;

            if (this.down === true)
                this.y += this.yIncrement;
            else
                this.y -= this.yIncrement;

            if (this.x + this.width >= canvas.width)
                this.right = false;
            else if (this.x <= 0)
                this.right = true;

            if (this.y + this.height >= canvas.height)
                this.down = false;
            else if (this.y <= 0)
                this.down = true;
        },

        IsClicked: function (mouseX, mouseY) {
            //true if clicked in the shape, false if not
            return (mouseX >= this.x) && (mouseX <= this.x + this.width) && (mouseY >= this.y) && (mouseY <= this.y + this.height);
        }
    };

    var Triangle = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        xIncrement: 3,
        yIncrement: 1,
        width: 0,
        height: 0,
        right: true,
        down: true,
        color: "orange",
        currentShape: false,

        Draw: function (canvas, ctx) {
            ctx.fillStyle = this.color;

            //draws a triangle
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y + this.height);
            ctx.lineTo(this.x - this.width, this.y + this.height);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            if (this.right === true)
                this.x += this.xIncrement;
            else
                this.x -= this.xIncrement;

            if (this.down === true)
                this.y += this.yIncrement;
            else
                this.y -= this.yIncrement;

            if (this.x + this.width >= canvas.width)
                this.right = false;
            else if (this.x - this.width <= 0)
                this.right = true;

            if (this.y + this.height >= canvas.height)
                this.down = false;
            else if (this.y <= 0)
                this.down = true;
        },

        IsClicked: function (mouseX, mouseY) {
            //true if clicked in the shape, false if not
            return (mouseX >= (this.x - this.width)) && (mouseX <= (this.x + this.width)) && (mouseY >= this.y) && (mouseY <= this.y + this.height);
        }
    };

    var Circle = {
        x: window.innerWidth / 2,
        y: 0,
        xIncrement: 1,
        yIncrement: 3,
        radius: 0,
        right: false,
        down: true,
        color: "purple",

        Draw: function (canvas, ctx) {
            ctx.fillStyle = this.color;

            //draws a circle
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            if (this.right === true)
                this.x += this.xIncrement;
            else
                this.x -= this.xIncrement;

            if (this.down === true)
                this.y += this.yIncrement;
            else
                this.y -= this.yIncrement;

            if (this.x + this.radius >= canvas.width)
                this.right = false;
            else if (this.x - this.radius <= 0)
                this.right = true;

            if (this.y + this.radius >= canvas.height)
                this.down = false;
            else if (this.y - this.radius <= 0)
                this.down = true;
        },

        IsClicked: function (mouseX, mouseY) {
            //true if clicked in the shape, false if not
            return Math.sqrt((mouseX - this.x) * (mouseX - this.x) + (mouseY - this.y) * (mouseY - this.y)) < this.radius;
        }
    };

    var Pentagon = {
        x: 0,
        y: window.innerHeight / 1.25,
        xIncrement: 2,
        yIncrement: 2,
        widthTop: 0,
        heightTop: 0,
        widthBottom: 0,
        heightBottom: 0,
        right: true,
        down: false,
        color: "yellow",

        Draw: function (canvas, ctx) {
            ctx.fillStyle = this.color;

            //draws a pentagon
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.widthTop, this.y + this.heightTop);
            ctx.lineTo(this.x + this.widthBottom, this.y + this.heightBottom);
            ctx.lineTo(this.x - this.widthBottom, this.y + this.heightBottom);
            ctx.lineTo(this.x - this.widthTop, this.y + this.heightTop);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            if (this.right === true)
                this.x += this.xIncrement;
            else
                this.x -= this.xIncrement;

            if (this.down === true)
                this.y += this.yIncrement;
            else
                this.y -= this.yIncrement;

            if (this.x + this.widthTop >= canvas.width)
                this.right = false;
            else if (this.x - this.widthTop <= 0)
                this.right = true;

            if (this.y + this.heightBottom >= canvas.height)
                this.down = false;
            else if (this.y <= 0)
                this.down = true;
        },

        IsClicked: function (mouseX, mouseY) {
            //true if clicked in the shape, false if not
            return (mouseX >= (this.x - this.widthTop)) && (mouseX <= (this.x + this.widthTop)) && (mouseY >= this.y) && (mouseY <= this.y + this.heightBottom);
        }
    };

    var Hexagon = {
        x: window.innerWidth,
        y: 0,
        xIncrement: 2,
        yIncrement: 4,
        topWidth: 0,
        midWidth: 0,
        midHeight: 0,
        bottomHeight: 0,
        right: false,
        down: true,
        color: "#F08080",
        currentShape: false,

        Draw: function (canvas, ctx) {
            ctx.fillStyle = this.color;

            //draws a hexagon
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.topWidth, this.y);
            ctx.lineTo(this.x + this.midWidth + this.topWidth, this.y + this.midHeight);
            ctx.lineTo(this.x + this.topWidth, this.y + this.bottomHeight);
            ctx.lineTo(this.x, this.y + this.bottomHeight);
            ctx.lineTo(this.x - this.midWidth, this.y + this.midHeight);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            if (this.right === true)
                this.x += this.xIncrement;
            else
                this.x -= this.xIncrement;

            if (this.down === true)
                this.y += this.yIncrement;
            else
                this.y -= this.yIncrement;

            if (this.x + this.midWidth + this.topWidth >= canvas.width)
                this.right = false;
            else if (this.x - this.midWidth <= 0)
                this.right = true;

            if (this.y + this.bottomHeight >= canvas.height)
                this.down = false;
            else if (this.y <= 0)
                this.down = true;
        },

        IsClicked: function (mouseX, mouseY) {
            //true if clicked in the shape, false if not
            return (mouseX >= (this.x - this.midWidth)) && (mouseX <= (this.x + this.midWidth + this.topWidth))
					&& (mouseY >= this.y) && (mouseY <= this.y + this.bottomHeight);
        }
    };

    var Octagon = {
        x: window.innerWidth / 2.25,
        y: window.innerHeight,
        xIncrement: 4,
        yIncrement: 2,
        topWidth: 0,
        midWidth: 0,
        midHeightOne: 0,
        midHeightTwo: 0,
        bottomHeight: 0,
        right: false,
        down: false,
        color: "#C0C0C0",
        currentShape: false,

        Draw: function (canvas, ctx) {
            ctx.fillStyle = this.color;

            //draws an octagon
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.topWidth, this.y);
            ctx.lineTo(this.x + this.midWidth + this.topWidth, this.y + this.midHeightOne);
            ctx.lineTo(this.x + this.midWidth + this.topWidth, this.y + this.midHeightTwo);
            ctx.lineTo(this.x + this.topWidth, this.y + this.bottomHeight);
            ctx.lineTo(this.x, this.y + this.bottomHeight);
            ctx.lineTo(this.x - this.midWidth, this.y + this.midHeightTwo);
            ctx.lineTo(this.x - this.midWidth, this.y + this.midHeightOne);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            if (this.right === true)
                this.x += this.xIncrement;
            else
                this.x -= this.xIncrement;

            if (this.down === true)
                this.y += this.yIncrement;
            else
                this.y -= this.yIncrement;

            if (this.x + this.midWidth + this.topWidth >= canvas.width)
                this.right = false;
            else if (this.x - this.midWidth <= 0)
                this.right = true;

            if (this.y + this.bottomHeight >= canvas.height)
                this.down = false;
            else if (this.y <= 0)
                this.down = true;
        },

        IsClicked: function (mouseX, mouseY) {
            //true if clicked in the shape, false if not
            return (mouseX >= (this.x - this.midWidth)) && (mouseX <= (this.x + this.midWidth + this.topWidth))
					&& (mouseY >= this.y) && (mouseY <= this.y + this.bottomHeight);
        }
    };

    shapeArr.push(Square);
    shapeArr.push(Rectangle);
    shapeArr.push(Triangle);
    shapeArr.push(Circle);

    if (difficulty > 2)
    {
        shapeArr.push(Pentagon);
        shapeArr.push(Hexagon);
        shapeArr.push(Octagon);
    }

    return shapeArr;
}

function Draw(shapeArr) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.save();
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (var i = 0; i < shapeArr.length; i++) {
        shapeArr[i].Draw(canvas, ctx);
    }

    if (window.innerWidth < 400)
    {
        var loopTimer = setTimeout(function () {
            Draw(shapeArr);
        }, 45);
    }
    else if (window.innerWidth < 760)
    {
        var loopTimer = setTimeout(function () {
            Draw(shapeArr);
        }, 40);
    }
    else
    {
        var loopTimer = setTimeout(function () {
            Draw(shapeArr);
        }, 30);
    }
}

function ResizeCanvas(canvas, ctx, shapeArr) {
    canvas.width = window.innerWidth * .9;
    canvas.height = window.innerHeight * .9;

    shapeArr[SQUARE].width = window.innerWidth / 7;
    shapeArr[SQUARE].height = window.innerWidth / 7;

    shapeArr[RECTANGLE].width = window.innerWidth / 4;
    shapeArr[RECTANGLE].height = window.innerHeight / 5.5;

    shapeArr[TRIANGLE].width = window.innerWidth / 7;
    shapeArr[TRIANGLE].height = window.innerHeight / 5;

    shapeArr[CIRCLE].radius = window.innerWidth / 11;

    if (shapeArr.length > 4)
    {
        shapeArr[PENTAGON].widthTop = window.innerWidth / 12;
        shapeArr[PENTAGON].heightTop = window.innerHeight / 7;
        shapeArr[PENTAGON].widthBottom = window.innerWidth / 16;
        shapeArr[PENTAGON].heightBottom = window.innerHeight / 3;


        shapeArr[HEXAGON].topWidth = window.innerWidth / 12;
        shapeArr[HEXAGON].midWidth = window.innerWidth / 25;
        shapeArr[HEXAGON].midHeight = window.innerHeight / 7;
        shapeArr[HEXAGON].bottomHeight = window.innerHeight / 3.5;

        shapeArr[OCTAGON].topWidth = window.innerWidth / 13;
        shapeArr[OCTAGON].midWidth = window.innerWidth / 28;
        shapeArr[OCTAGON].midHeightOne = window.innerHeight / 13.5;
        shapeArr[OCTAGON].midHeightTwo = window.innerHeight / 4.5;
        shapeArr[OCTAGON].bottomHeight = window.innerHeight / 3.25;
    }
}

//do what you need to do here with regards to clicking
//not very accurate dectection at the moment
function Clicked(mouseX, mouseY, shapeArr)
{
	for (var i = shapeArr.length - 1; i >= 0; i--)
	{
		var tempX = -1;
		var tempY = -1;
		
		if (this.right === true)
			tempX = mouseX + shapeArr[i].xIncrement;
		else
			tempX = mouseX - shapeArr[i].xIncrement;
			
		if (this.down === true)
			tempY = mouseY + shapeArr[i].yIncrement;
		else
			tempY = mouseY - shapeArr[i].yIncrement;
		
		if ((shapeArr[i].IsClicked(mouseX, mouseY) && shapeArr[i].currentShape) === true || (shapeArr[i].IsClicked(tempX, tempY) && shapeArr[i].currentShape) === true)
		{
			numOfCorrectClicks++;
			SetCurrentShape(shapeArr);
			break;
		}
	}
}

function SetCurrentShape(shapeArr)
{
	
	for (var i = 0; i < shapeArr.length; i++)
	{
		shapeArr[i].currentShape = false;
	}
	
	var currShapeIndex = GetRandomInt(0, shapeArr.length - 1);
	
	shapeArr[currShapeIndex].currentShape = true;
	
	if (currShapeIndex === SQUARE)
	{
	    document.getElementById("header").innerHTML = "Click The Square!";

	    responsiveVoice.speak("Square", "US English Female");
	}
	else if (currShapeIndex === RECTANGLE)
	{
		document.getElementById("header").innerHTML = "Click The Rectangle!";
		responsiveVoice.speak("Rectangle", "US English Female");
	}
	else if (currShapeIndex === TRIANGLE)
	{
		document.getElementById("header").innerHTML = "Click The Triangle!";
		responsiveVoice.speak("Triangle", "US English Female");
	}
	else if (currShapeIndex === CIRCLE)
	{
		document.getElementById("header").innerHTML = "Click The Circle!";
		responsiveVoice.speak("Circle", "US English Female");
	}
	else if (currShapeIndex === PENTAGON)
	{
		document.getElementById("header").innerHTML = "Click The Pentagon!";
		responsiveVoice.speak("Pentagon", "US English Female");
	}
	else if (currShapeIndex === HEXAGON)
	{
		document.getElementById("header").innerHTML = "Click The Hexagon!";
		responsiveVoice.speak("Hexagon", "US English Female");
	}
	else if (currShapeIndex === OCTAGON)
	{
		document.getElementById("header").innerHTML = "Click The Octagon!";
		responsiveVoice.speak("Octagon", "US English Female");
	}
}

function CreateHtmlElements()
{
    var divContainer = document.getElementById("BlocksGame");

    //set up the CSS file needed for this minigame
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
    //gonnna be stored on the server at some point
    fileRef.setAttribute("href", "../../MiniGames/IdentifyShapeGame/css/IdentifyShapeGame.css");
    //add the css file to the html
    document.getElementsByTagName("head")[0].appendChild(fileRef);

   //create the header
    var header = document.createElement("h1");
    header.setAttribute("id", "header");
    header.style.textAlign = "center";
    header.innerHTML = "Identify The Shape";

    //create the canvas
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");

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

    //add the elements to the page
    divContainer.appendChild(header);
    divContainer.appendChild(canvas);
    divContainer.appendChild(endGameDiv);
}

function EndGame()
{
    $('#doneButton').click(function () {
        window.location.href = '/Play/Play/'
    });

    responsiveVoice.speak("Great job!", "US English Female");

    clickable = false;
    document.getElementById("header").innerHTML = "Identify The Shape!";

    var totalCorrect = numOfCorrectClicks;
    var totalAttempts = clickCount;
    var percentage = totalCorrect / totalAttempts;
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

    if (totalAttempts === 0)
        returnVal = 0;

    document.getElementById('score').value = returnVal;
    EndofGame(); //function displays good job message and returns to map
    setTimeout(function () {
        $('#gameOver').hide();
    }, 500);
    document.getElementById("endGameDiv").style.display = "block";
}

function Main()
{
    var backgroundMusic = new Audio("../../Audio/backgroundMusic/bgSong3.mp3");
    backgroundMusic.volume = "0.1";

    //makes the html elements needed for the game
    CreateHtmlElements();

    var canvas = null;
    //handels 2D rendering
    var ctx = null;

    canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
    //get the game's difficulty level and modify the dataset for that difficulty level
	var difficulty = document.getElementById("minigameScript").getAttribute("difficulty");
	var soundToggle = document.getElementById("minigameScript").getAttribute("toggleSound"); //True = sound off, False = sound on
	var musicToggle = document.getElementById("minigameScript").getAttribute("toggleMusic");

	//need to pass in diffculty to determine the length of shapeArr
	var shapeArr = MakeShapes(difficulty);
	
	window.addEventListener('resize', function(){
		ResizeCanvas(canvas, ctx, shapeArr);
		}, false);
	
	canvas.addEventListener("click", function (e) {
		if (clickable === true)
		{
		    clickCount++;
		    Clicked(e.clientX, e.clientY, shapeArr);
		}
	}, false);

    //reloop the audio
	backgroundMusic.addEventListener('ended', function () {
	    this.currentTime = 0;
	    this.play();
	}, false);

    //if the user leaves the page
	$(window).on("beforeunload", function () {
	    responsiveVoice.cancel(); //quit doing text to speech
	});
	
	ResizeCanvas(canvas, ctx, shapeArr);
	Draw(shapeArr);
	
	//allows the audio to play before the user plays the game
	setTimeout(function () {
	    SetCurrentShape(shapeArr);
	},3000);
	
	responsiveVoice.OnVoiceReady = function () {
	    responsiveVoice.speak("Click the shape that you hear.", "US English Female");
	};

	if (musicToggle === "False") {
	    //play background music
	    backgroundMusic.play();
	}
	
	//play the game for 1 minuet and then end the game
	setTimeout(function () {
	    EndGame()
       }, 60000);	
}

Main();