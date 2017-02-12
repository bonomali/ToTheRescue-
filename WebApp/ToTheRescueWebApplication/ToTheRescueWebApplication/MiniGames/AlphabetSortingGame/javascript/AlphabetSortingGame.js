const HALF_ALPHA = 13;
const FUlL_ALPHA = 26;

function AllowDrop(ev) {
    ev.preventDefault();
}

function Drag(ev) {
	var letterDiv = document.getElementById(ev.target.id);
	
	//act as if the user is dragging the shape
	setTimeout(function () {
			letterDiv.style.opacity = "0";
		},1);
	
	//ensure that the div is visible after it is dropped
	letterDiv.setAttribute("ondragend", "ChangeOpacity(" + letterDiv.id + ")");
	
    ev.dataTransfer.setData("text", letterDiv.id);
}

function ChangeOpacity(div)
{
	document.getElementById(div.id).style.opacity = "1";
}

function Drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
	
	var draggedDiv = document.getElementById(data);
	
	var letterBeingDragged = draggedDiv.innerHTML.toLowerCase();
	var dropAreaID = ev.target.id;
	
	//if the correct letter is being dropped into a correct drop area
	if (letterBeingDragged[0] === dropAreaID[0])
	{
		//change the styling of the dragged div so it will drop nicely
		draggedDiv.style.width = "100%";
		draggedDiv.style.height = "100%";
		draggedDiv.style.marginLeft = "0";
		draggedDiv.style.marginTop = "0";
		draggedDiv.removeAttribute("ondragstart");
		draggedDiv.removeAttribute("draggable");

		
		//get rid of the old innerHTML to make room for the new
		ev.target.innerHTML = null;
		ev.target.appendChild(draggedDiv);
		
		if (WonGame())
		{
		    EndGame();
		}
	}
	else{
		console.log("Incorrect letter");
	}
}

function EndGame()
{
    console.log("won");

    //play the abc song then gtfo

    //not working properly
    EndofGame();
}

function ShuffleArr(arr)
{
	var j = -1;
	var x = -1;
	var i = -1;
	
    for (i = arr.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function GetRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function PopulateDragAreas(letters)
{	
	//give the current row it's data
	var currRow = document.getElementsByClassName("dragRow1");
	var i = 0;
	
	//first half of the alphabet
	for (i; i < HALF_ALPHA; i++)
	{
		currRow[i].innerHTML = letters[i];
	}
	
	currRow = document.getElementsByClassName("dragRow2");
	
	//the other half of the alphabet
	for (var x = 0; x < HALF_ALPHA; x++)
	{
		currRow[x].innerHTML = letters[i];
		i++;
	}
}

function WonGame()
{
	var won = true;

	//give the current row it's data
	var allDropDivs = document.getElementsByClassName("rowDropAreas");
	
	//for all of the drop areas
	for (var i = 0; i < FUlL_ALPHA && won; i++)
	{
		//make sure they have divs inside of them
		if (/.*<div.*/.test(allDropDivs[i].innerHTML) === false)
		{
			won = false;
		}
	}
	
	return won;
}

function ResizeText(elementID)
{
	var div = document.getElementById(elementID);
	var height = div.clientHeight / 2;
	height = height.toString();
	height = height.concat("px");
		
	div.style.fontSize = height;
		
	height = div.clientHeight;
	height = height.toString();
	height = height.concat("px");
		
	div.style.lineHeight = height;
}

function MakeScalable()
{
	for (var i = 1; i < HALF_ALPHA + 1; i++)
	{
		var id = "R1";
		id += i.toString();
		ResizeText(id);
	}
	
	for (var i = 1; i < HALF_ALPHA + 1; i++)
	{
		var id = "R2";
		id += i.toString();
		ResizeText(id);
	}
	
	var allDropDivs = document.getElementsByClassName("rowDropAreas");
	
	//for all of the drop areas
	for (var i = 0; i < FUlL_ALPHA; i++)
	{
		ResizeText(allDropDivs[i].id);
	}
}

function CreateHtmlElements(letters)
{
    var dropArrId = ["aDrop", "bDrop", "cDrop", "dDrop", "eDrop", "fDrop", "gDrop", "hDrop", "iDrop", "jDrop", "kDrop", "lDrop", "mDrop",
                    "nDrop", "oDrop", "pDrop", "qDrop", "rDrop", "sDrop", "tDrop", "uDrop", "vDrop", "wDrop", "xDrop", "yDrop", "zDrop"];

    //set up the CSS file needed for this minigame
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
    //gonnna be stored on the server at some point
    fileRef.setAttribute("href", "../../MiniGames/AlphabetSortingGame/css/AlphabetSortingGame.css");
    //add the css file to the html
    document.getElementsByTagName("head")[0].appendChild(fileRef);

    //the container that will hold the game
    var divContainer = document.getElementById("BlocksGame");

    //the header
    var header = document.createElement("h1");
    header.setAttribute("id", "header");
    header.setAttribute("draggable", "false");
    header.setAttribute("ondragstart", "return false;");
    header.style.textAlign = "center";
    header.innerHTML = "Alphabet Sorting!";


    var dropAreaContainer = document.createElement("div");
    dropAreaContainer.setAttribute("id", "dropAreaContainer");
    dropAreaContainer.setAttribute("draggable", "false");
    dropAreaContainer.setAttribute("ondragstart", "return false;");

    var dropAreaRow1 = document.createElement("div");
    dropAreaRow1.setAttribute("id", "dropAreaRow1");
    dropAreaRow1.setAttribute("class", "dropRows");

    var i = 0;

    for (i; i < 6; i++)
    {
        var div = document.createElement("div");
        div.setAttribute("id", dropArrId[i]);
        div.setAttribute("class", "rowDropAreas");
        div.setAttribute("ondrop", "Drop(event)");
        div.setAttribute("ondragover", "AllowDrop(event)");
        div.innerHTML = letters[i];
        dropAreaRow1.appendChild(div);
    }

    var dropAreaRow2 = document.createElement("div");
    dropAreaRow2.setAttribute("id", "dropAreaRow2");
    dropAreaRow2.setAttribute("class", "dropRows");

    for (i; i < 14; i++) {
        var div = document.createElement("div");
        div.setAttribute("id", dropArrId[i]);
        div.setAttribute("class", "rowDropAreas");
        div.setAttribute("ondrop", "Drop(event)");
        div.setAttribute("ondragover", "AllowDrop(event)");
        div.innerHTML = letters[i];
        dropAreaRow2.appendChild(div);
    }

    var dropAreaRow3 = document.createElement("div");
    dropAreaRow3.setAttribute("id", "dropAreaRow3");
    dropAreaRow3.setAttribute("class", "dropRows");

    for (i; i < 22; i++) {
        var div = document.createElement("div");
        div.setAttribute("id", dropArrId[i]);
        div.setAttribute("class", "rowDropAreas");
        div.setAttribute("ondrop", "Drop(event)");
        div.setAttribute("ondragover", "AllowDrop(event)");
        div.innerHTML = letters[i];
        dropAreaRow3.appendChild(div);
    }

    var dropAreaRow4 = document.createElement("div");
    dropAreaRow4.setAttribute("id", "dropAreaRow4");
    dropAreaRow4.setAttribute("class", "dropRows");

    for (i; i < 26; i++) {
        var div = document.createElement("div");
        div.setAttribute("id", dropArrId[i]);
        div.setAttribute("class", "rowDropAreas");
        div.setAttribute("ondrop", "Drop(event)");
        div.setAttribute("ondragover", "AllowDrop(event)");
        div.innerHTML = letters[i];
        dropAreaRow4.appendChild(div);
    }

    dropAreaContainer.appendChild(dropAreaRow1);
    dropAreaContainer.appendChild(dropAreaRow2);
    dropAreaContainer.appendChild(dropAreaRow3);
    dropAreaContainer.appendChild(dropAreaRow4);

    var dragAreaContainer = document.createElement("div");
    dragAreaContainer.setAttribute("id", "dragAreaContainer");

    var dragAreaRow1 = document.createElement("div");
    dragAreaRow1.setAttribute("id", "dragAreaRow1");
    dragAreaRow1.setAttribute("class", "dragRows");

    for (var x = 1; x < 14; x++)
    {
        var div = document.createElement("div");
        var id = "R1";
        id += x.toString();
        div.setAttribute("id", id);
        div.setAttribute("class", "dragRow1");
        div.setAttribute("draggable", "true");
        div.setAttribute("ondragstart", "Drag(event)");
        dragAreaRow1.appendChild(div);
    }

    var dragAreaRow2 = document.createElement("div");
    dragAreaRow2.setAttribute("id", "dragAreaRow2");
    dragAreaRow2.setAttribute("class", "dragRows");

    for (var x = 1; x < 14; x++) {
        var div = document.createElement("div");
        var id = "R2";
        id += x.toString();
        div.setAttribute("id", id);
        div.setAttribute("class", "dragRow2");
        div.setAttribute("draggable", "true");
        div.setAttribute("ondragstart", "Drag(event)");
        dragAreaRow2.appendChild(div);
    }

    dragAreaContainer.appendChild(dragAreaRow1);
    dragAreaContainer.appendChild(dragAreaRow2);

    divContainer.appendChild(header);
    divContainer.appendChild(dropAreaContainer);
    divContainer.appendChild(dragAreaContainer);
}

function Main()
{
	var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
				   'O','P','Q','R','S','T','U','V','W','X','Y','Z'];

	CreateHtmlElements(letters);

	ShuffleArr(letters);
	
	PopulateDragAreas(letters);
	
	window.addEventListener('resize', function(){
		MakeScalable();
	}, false);
	
	window.onload = function () {
	    document.getElementById("dragAreaContainer").style.visibility = "visible";
	    document.getElementById("dropAreaContainer").style.visibility = "visible";
	    MakeScalable();
	}
}

Main();