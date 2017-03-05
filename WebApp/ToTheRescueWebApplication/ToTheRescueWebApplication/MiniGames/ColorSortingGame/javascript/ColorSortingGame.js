const NUM_IMGS = 30;

var soundToggle = "False";
var musicToggle = "False";

//used for game logic
var mostRecentDragColor = null;

//used to calculate performance stat
var numCorrectDrags = 0;
var totalDrags = 0;

var audio = new Audio();

//ensures that the good job voice doesn't 
//go off twice
var endGameFuncCalls = 0;

//allows the dropping ability
function AllowDrop(ev) 
{
	ev.preventDefault();
}

//allows the ghost image to be dragged across the screen
function Drag(ev) 
{
    var dragID = ev.target.id;

    //if true, user dragged something valid, if false, the 
    //user tried to drag something illegal
	var flag = false;
	
    //regular expression to see what color is being dragged
	if (/^red/.test(dragID) === true)
	{
		mostRecentDragColor = "red";
		flag = true;
	}
	else if (/^green/.test(dragID) === true)
	{
		mostRecentDragColor = "green";
		flag = true;
	}
	else if (/^blue/.test(dragID) === true)
	{
		mostRecentDragColor = "blue";
		flag = true;
	}
	else if (/^yellow/.test(dragID) === true)
	{
		mostRecentDragColor = "yellow";
		flag = true;
	}
	else if (/^purple/.test(dragID) === true)
	{
		mostRecentDragColor = "purple";
		flag = true;
	}
		
	if (flag === true) {
	    responsiveVoice.speak(mostRecentDragColor, "US English Female");
	    ev.dataTransfer.setData("content", ev.target.id);
	}
	else
	    mostRecentDragColor = null;
		
}

//Allows the actual dorp to happen
function Drop(ev) 
{
    var targetColor = '';

    //increment the number of drags the user had
    totalDrags++;

	//if the class is a drop area that is being dropped into
	if (/.*DropAreas.*/.test(ev.target.className) === true)
	{
		//determine the color of the img being dropped
		if (/^red/.test(ev.target.id) === true)
		{
			targetColor = "red";
		}
		else if (/^green/.test(ev.target.id) === true)
		{
			targetColor = "green";
		}
		else if (/^blue/.test(ev.target.id) === true)
		{
			targetColor = "blue";
		}
		else if (/^yellow/.test(ev.target.id) === true)
		{
			targetColor = "yellow";
		}
		else if (/^purple/.test(ev.target.id) === true)
		{
			targetColor = "purple";
		}
	
		//if the two colors are the same
		if (targetColor === mostRecentDragColor)
		{
		    if (soundToggle === "False") {
		        //play the correct drop sound
		        audio.src = "../../Audio/soundEffects/airPlaneDing.mp3";
		        audio.play();
		    }

			//allow the drop to happen
			ev.preventDefault();
			var data = ev.dataTransfer.getData("content");
			ev.target.appendChild(document.getElementById(data));
			
            //increment the number of correct drags
			numCorrectDrags++;

            //don't allow the old div to be dragged
			PreventClickInEmptyDiv();

            //see if the user won the game
			CheckIfWon();
		}
		else
		{
		    if (soundToggle === "False") {
		        //play the incorrect drop sound
		        audio.src = "../../Audio/soundEffects/metalClang.mp3";
		        audio.play();
		    }
		}
	}
	mostRecentDragColor = null;
}

//Doesn't allow the  user to click where the old img was located
function PreventClickInEmptyDiv()
{
	for (var i = 1; i < NUM_IMGS + 1; i++)
	{
		var id = "d";
		var num = i.toString();
		id = id.concat(num);
		var div = document.getElementById(id);
		
		//check to see if it has an image
		if (/.*<img.*/.test(div.innerHTML) === false)
		{
			//if not, don't allow that area to be clicked to prevent
			//weird dragging bug
			div.addEventListener('mousedown', function(ev){
				ev.preventDefault();
			}, false);
		}
	}
}

//checks to see if the user won the game
function CheckIfWon()
{
	var won = true;
	
	var reds = document.getElementsByClassName("redDropAreas");
	for (var i = 0; i < reds.length && won; i++)
	{
		//check to see if the div doesn't have an image
		if (/.*<img.*/.test(reds[i].innerHTML) === false)
		{
			//if not, user hasn't won the game
			won = false;
		}
	}
	
	var greens = document.getElementsByClassName("greenDropAreas");
	for (var i = 0; i < greens.length && won; i++)
	{
		//check to see if the div doesn't have an image
		if (/.*<img.*/.test(greens[i].innerHTML) === false)
		{
			//if not, user hasn't won the game
			won = false;
		}
	}
	
	var blues = document.getElementsByClassName("blueDropAreas");
	for (var i = 0; i < blues.length && won; i++)
	{
		//check to see if the div doesn't have an image
		if (/.*<img.*/.test(blues[i].innerHTML) === false)
		{
			//if not, user hasn't won the game
			won = false;
		}
	}
	
	var yellows = document.getElementsByClassName("yellowDropAreas");
	for (var i = 0; i < yellows.length && won; i++)
	{
		//check to see if the div doesn't have an image
		if (/.*<img.*/.test(yellows[i].innerHTML) === false)
		{
			//if not, user hasn't won the game
			won = false;
		}
	}
	
	var purples = document.getElementsByClassName("purpleDropAreas");
	for (var i = 0; i < purples.length && won; i++)
	{
		//check to see if the div doesn't have an image
		if (/.*<img.*/.test(purples[i].innerHTML) === false)
		{
			//if not, user hasn't won the game
			won = false;
		}
	}
	
	if (won === true)
	{
        //stop the game
	    StopGame();
	}
}

//Displays the ending game div and allows the user to exit
//the game
function StopGame()
{
    endGameFuncCalls++;

    //makes suure that great job is only said once
    if (endGameFuncCalls === 1)
        responsiveVoice.speak("Great job!", "US English Female");

    var percentage = numCorrectDrags / totalDrags;
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

    if (totalDrags === 0)
        returnVal = 0;

    document.getElementById("score").value = returnVal;
    EndofGame(); //function displays good job message and returns to map
}

//used for placeing all of the images in the correct places
function GetImgSrcArray()
{
    var imgArr = ["red/apple.png", "blue/bear.png", "blue/key.png", "purple/grapes.png", "yellow/bee.png"
                 , "green/elephant.png", "purple/fish.png", "red/pencil.png", "red/heart.png", "green/frog.png"
                , "blue/guitar.png", "yellow/car.png", "purple/flower.png", "yellow/duck.png", "green/jalepeno.png"
                , "red/butterfly.png", "blue/owl.png", "purple/shoe.png", "yellow/schoolBus.png", "green/turtle.png"
                , "red/umbrella.png", "green/shirt.png", "blue/octopus.png", "purple/hand.png", "yellow/dress.png"
                , "purple/bone.png", "green/leaf.png", "yellow/mouse.png", "blue/bird.png", "red/ant.png"];

    return imgArr;
}

//makes the html elements needed for the game
function CreateHtml()
{
    //gonnna be stored on the server at some point
    var imgSrc = "../../MiniGames/ColorSortingGame/img/";

    //get the img source array
    var imgSrcArr = GetImgSrcArray();

    //set up the CSS file needed for this minigame
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
    //gonnna be stored on the server at some point
    fileRef.setAttribute("href", "../../MiniGames/ColorSortingGame/css/ColorSortingGame.css");
    //add the css file to the html
    document.getElementsByTagName("head")[0].appendChild(fileRef);

    //the container that will hold the game
    var divContainer = document.getElementById("BlocksGame");

    //the header
    var header = document.createElement("h1");
    header.setAttribute("id", "header");
    header.setAttribute("align", "center");
    header.setAttribute("draggable", "false");
    header.setAttribute("ondragstart", "return false;");
    header.innerHTML = "Color Sorting";

    var imgContainer = document.createElement("div");
    imgContainer.setAttribute("id", "imgContainer");

    for (var i = 0; i < imgSrcArr.length; i++)
    {
        var div = document.createElement("div");
        var id = "d";
        var num = i + 1;
        num = num.toString();
        id = id.concat(num);
        div.setAttribute("id", id);
        div.setAttribute("class", "imgContainers");
        div.setAttribute("ondrop", "Drop(event)");
        div.setAttribute("ondragover", "AllowDrop(event)");

        var img = document.createElement("img");
        img.setAttribute("id", imgSrcArr[i]);
        img.setAttribute("src", imgSrc + imgSrcArr[i]);
        img.setAttribute("draggable", "true");
        img.setAttribute("ondragstart", "Drag(event)");
        img.setAttribute("width", "100%");
        img.setAttribute("height", "100%");

        //add the img to the div
        div.appendChild(img);

        //add the div to the imgContainer
        imgContainer.appendChild(div);
    }

    var answerContainer = document.createElement("div");
    answerContainer.setAttribute("id", "answerContainer");
    answerContainer.setAttribute("draggable", "false");
    answerContainer.setAttribute("ondragstart", "return false;");

    var red = document.createElement("div");
    red.setAttribute("id", "red");
    red.setAttribute("class", "answerAreas");

    //make the drop areas for the images
    for (var i = 0; i < 6; i++)
    {
        var div = document.createElement("div");

        var id = "redD";
        var num = i + 1;
        num = num.toString();
        id = id.concat(num);

        div.setAttribute("id", id);
        div.setAttribute("class", "redDropAreas");
        div.setAttribute("ondrop", "Drop(event)");
        div.setAttribute("ondragover", "AllowDrop(event)");

        red.appendChild(div);
    }

    //add it to the answerContainer
    answerContainer.appendChild(red);

    var green = document.createElement("div");
    green.setAttribute("id", "green");
    green.setAttribute("class", "answerAreas");

    for (var i = 0; i < 6; i++) {
        var div = document.createElement("div");

        var id = "greenD";
        var num = i + 1;
        num = num.toString();
        id = id.concat(num);

        div.setAttribute("id", id);
        div.setAttribute("class", "greenDropAreas");
        div.setAttribute("ondrop", "Drop(event)");
        div.setAttribute("ondragover", "AllowDrop(event)");

        green.appendChild(div);
    }

    answerContainer.appendChild(green);

    var blue = document.createElement("div");
    blue.setAttribute("id", "blue");
    blue.setAttribute("class", "answerAreas");

    for (var i = 0; i < 6; i++) {
        var div = document.createElement("div");

        var id = "blueD";
        var num = i + 1;
        num = num.toString();
        id = id.concat(num);

        div.setAttribute("id", id);
        div.setAttribute("class", "blueDropAreas");
        div.setAttribute("ondrop", "Drop(event)");
        div.setAttribute("ondragover", "AllowDrop(event)");

        blue.appendChild(div);
    }

    answerContainer.appendChild(blue);

    var yellow = document.createElement("div");
    yellow.setAttribute("id", "yellow");
    yellow.setAttribute("class", "answerAreas");

    for (var i = 0; i < 6; i++) {
        var div = document.createElement("div");

        var id = "yellowD";
        var num = i + 1;
        num = num.toString();
        id = id.concat(num);

        div.setAttribute("id", id);
        div.setAttribute("class", "yellowDropAreas");
        div.setAttribute("ondrop", "Drop(event)");
        div.setAttribute("ondragover", "AllowDrop(event)");

        yellow.appendChild(div);
    }

    answerContainer.appendChild(yellow);

    var purple = document.createElement("div");
    purple.setAttribute("id", "purple");
    purple.setAttribute("class", "answerAreas");

    for (var i = 0; i < 6; i++) {
        var div = document.createElement("div");

        var id = "purpleD";
        var num = i + 1;
        num = num.toString();
        id = id.concat(num);

        div.setAttribute("id", id);
        div.setAttribute("class", "purpleDropAreas");
        div.setAttribute("ondrop", "Drop(event)");
        div.setAttribute("ondragover", "AllowDrop(event)");

        purple.appendChild(div);
    }

    answerContainer.appendChild(purple);

    //add everything to the play area
    divContainer.appendChild(header);
    divContainer.appendChild(imgContainer);
    divContainer.appendChild(answerContainer);
}

function Main()
{
    //this game doesn't have two difficulties so I am not going to do anything with this value
    var difficulty = document.getElementById("minigameScript").getAttribute("difficulty"); // only one difficulty for this game so not needed
    soundToggle = document.getElementById("minigameScript").getAttribute("toggleSound"); //True = sound off, False = sound on
    musicToggle = document.getElementById("minigameScript").getAttribute("toggleMusic");

    var backgroundMusic = new Audio("../../Audio/backgroundMusic/bgSound6(africa).mp3");
    backgroundMusic.volume = "0.1";

    //make the html elements
    CreateHtml();

    window.onload = function () {
        //play the instructions
        responsiveVoice.OnVoiceReady = function () {
            responsiveVoice.speak("Sort the images by dragging them to their corresponding boxes.", "US English Female");
        };

        if (musicToggle === "False") {
            //play background music
            backgroundMusic.play();
        }

    };

    //if the user leaves the page
    $(window).on("beforeunload", function () {
        responsiveVoice.cancel(); //quit doing text to speech
    });

    //reloop the audio
    backgroundMusic.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

    //if the user didn't finish the game in 2 minuets
    setTimeout(function () {
        //end the game
        StopGame();
    }, 123500);
}

Main();