function SetAnswerLocations(answer)
{
	var answerArr = [null, null, null, null];
	
	var index = GetRandomInt(0, 3);
	
	answerArr[index] = answer;
	
	//randomly place the values of 0-3 into the array
	if (answer <= 2)
	{
		if (answer !== 0)
		{
			while (answerArr[index] !== null)
			{
				index = GetRandomInt(0, 3);
			}
			
			answerArr[index] = 0;
		}
		
		if (answer !== 1)
		{
			while (answerArr[index] !== null)
			{
				index = GetRandomInt(0, 3);
			}
			
			answerArr[index] = 1;
		}
		
		if (answer !== 2)
		{
			while (answerArr[index] !== null)
			{
				index = GetRandomInt(0, 3);
			}
			
			answerArr[index] = 2;
		}
		
		
		for (var i = 0; i < 4; i++)
		{
			if (answerArr[i] === null)
			{
				answerArr[i] = 3;
				break;
			}
		}
	}
	else
	{
		while (answerArr[index] !== null)
		{
			index = GetRandomInt(0, 3);
		}
	
		//handels the "close" amswer
		if (GetRandomInt(1,2) === 1)
		{
			answerArr[index] = answer + 1;
		}
		else
		{
			answerArr[index] = answer - 1;
		}
		
		//handels the two other answers
		for (var i = 0; i < 4; i++)
		{
			if (answerArr[i] === null)
			{
				answerArr[i] = Math.floor(answer / 2);
				break;
			}
		}
	
		for (var i = 0; i < 4; i++)
		{
			if (answerArr[i] === null)
			{
				answerArr[i] = Math.ceil(answer * 1.5);
			}
		}
	}
	
	return answerArr;
}

function SetQuestionContent(num1, num2)
{
	var div = document.getElementById("addr1");
	div.innerHTML = num1;
	div = document.getElementById("addr2");
	div.innerHTML = num2;
}

function SetAnswerContent(answerArr, AdditionGame)
{
	for (var i = 0; i < answerArr.length; i++)
	{
		//give it some 
		var id = "answer";
		var num = i + 1;
		num = num.toString();
		id = id.concat(num);
		var div = document.getElementById(id);
		div.innerHTML = answerArr[i];
		
		//add an onclick event to the answer divs
		div.onclick = (function (id, AdditionGame) {
			return function () { 
			ClickedAnswer(id, AdditionGame);
			}
		})(id, AdditionGame);
	}
}

function ClickedAnswer(id, AdditionGame)
{
	AdditionGame.numClicks++;
	
	var div = document.getElementById(id);
	var num = div.innerHTML;
	num = Number(num);
	
	if (num === AdditionGame.answer)
		AdditionGame.numCorrect++;
	
	//recall the game loop
	GameLoop(AdditionGame);
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
	ResizeText("addr1");
	ResizeText("plus");
	ResizeText("addr2");
	ResizeText("equal");
	ResizeText("question");
	
	ResizeText("answer1");
	ResizeText("answer2");
	ResizeText("answer3");
	ResizeText("answer4");
	
	ResizeText("imgPlus");
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function GetRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function SetImageContent(num1, num2)
{	
	//make all of the old images invisible
	for (var i = 1; i <= 20; i++)
	{
		var id = "i1";
		var num = i;
		num = Number(i);
		id = id.concat(num);
		
		var img = document.getElementById(id);
		img.style.visibility = "hidden";
	}
	
	for (var i = 1; i <= 20; i++)
	{
		var id = "i2";
		var num = i;
		num = Number(i);
		id = id.concat(num);
		
		var img = document.getElementById(id);
		img.style.visibility = "hidden";
	}
	
	//show the giraffs for num1
	for (var i = 1; i <= num1; i++)
	{
		var id = "i1";
		var num = i;
		num = Number(i);
		id = id.concat(num);
		
		var img = document.getElementById(id);
		img.style.visibility = "visible";
	}
	
	//show the giraffs for num2
	for (var i = 1; i <= num2; i++)
	{
		var id = "i2";
		var num = i;
		num = Number(i);
		id = id.concat(num);
		
		var img = document.getElementById(id);
		img.style.visibility = "visible";
	}
}

function GameLoop(AdditionGame)
{
	//get the two numbers to add together
	var num1 = GetRandomInt(AdditionGame.lowerBound, AdditionGame.upperBound);
	var num2 = GetRandomInt(AdditionGame.lowerBound, AdditionGame.upperBound);
	
	//shows the giraffs for each number
	SetImageContent(num1, num2);
	
	//fill the question divs with content
	SetQuestionContent(num1, num2);

	AdditionGame.answer = num1 + num2;
	
	//logic array of what the answers should be 
	var answerArr = SetAnswerLocations(AdditionGame.answer);
	
	//fill the answer divs with content
	SetAnswerContent(answerArr, AdditionGame);
}

function CreateHtmlElements()
{
    //going to be stored on the server at some point
    var imgSrc = "../../MiniGames/AdditionMiniGame/img/giraffeImg.png";

    //set up the CSS file needed for this minigame
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
    //gonnna be stored on the server at some point
    fileRef.setAttribute("href", "../../MiniGames/AdditionMiniGame/css/AdditionMiniGame.css");
    //add the css file to the html
    document.getElementsByTagName("head")[0].appendChild(fileRef);

    //the container that will hold the game
    var divContainer = document.getElementById("BlocksGame");

    //the header
    var header = document.createElement("h1");
    header.setAttribute("id", "header");
    header.style.textAlign = "center";
    header.innerHTML = "Addition";

    var questionContainer = document.createElement("div");
    questionContainer.setAttribute("id", "questionContainer");

    //all the stuff needed for the question container
    var addr1 = document.createElement("div");
    addr1.setAttribute("id", "addr1");
    addr1.setAttribute("class", "question");

    var plus = document.createElement("div");
    plus.setAttribute("id", "plus");
    plus.setAttribute("class", "question");
    plus.innerHTML = "+";

    var addr2 = document.createElement("div");
    addr2.setAttribute("id", "addr2");
    addr2.setAttribute("class", "question");

    var equal = document.createElement("div");
    equal.setAttribute("id", "equal");
    equal.setAttribute("class", "question");
    equal.innerHTML = "=";

    var question = document.createElement("div");
    question.setAttribute("id", "question");
    question.setAttribute("class", "question");
    question.innerHTML = "?";

    //add all those elements to the question container
    questionContainer.appendChild(addr1);
    questionContainer.appendChild(plus);
    questionContainer.appendChild(addr2);
    questionContainer.appendChild(equal);
    questionContainer.appendChild(question);

    //container for the visual container
    var visualContainer = document.createElement("div");
    visualContainer.setAttribute("id", "visualContainer");

    var numOneImgContainer = document.createElement("div");
    numOneImgContainer.setAttribute("id", "numOneImgContainer");

    var helper1 = document.createElement("span");
    helper1.setAttribute("id", "helper1");
    helper1.setAttribute("class", "helpers");

    numOneImgContainer.appendChild(helper1);

    visualContainer.appendChild(numOneImgContainer);

    //add the giraffs for num1
    for (var i = 20; i > 0; i--) {
        var id = "i1";
        var num = i;
        num = Number(i);
        id = id.concat(num);

        var img = document.createElement("img");
        img.setAttribute("id", id);
        img.setAttribute("class", "giraffeImgs");
        img.setAttribute("src", imgSrc);

        numOneImgContainer.appendChild(img);
    }

    //add the imgPlus
    var imgPlus = document.createElement("div");
    imgPlus.setAttribute("id", "imgPlus");
    imgPlus.innerHTML = "+";
    visualContainer.appendChild(imgPlus);

    var numTwoImgContainer = document.createElement("div");
    numTwoImgContainer.setAttribute("id", "numTwoImgContainer");

    var helper2 = document.createElement("span");
    helper2.setAttribute("id", "helper2");
    helper2.setAttribute("class", "helpers");

    numTwoImgContainer.appendChild(helper2);

    visualContainer.appendChild(numTwoImgContainer);

    //add the giraffs for num2
    for (var i = 1; i < 21; i++) {
        var id = "i2";
        var num = i;
        num = Number(i);
        id = id.concat(num);

        var img = document.createElement("img");
        img.setAttribute("id", id);
        img.setAttribute("class", "giraffeImgs");
        img.setAttribute("src", imgSrc);

        numTwoImgContainer.appendChild(img);
    }

    var answerContainer = document.createElement("div");
    answerContainer.setAttribute("id", "answerContainer");

    //all the stuff needed for the answer container
    var answer1 = document.createElement("div");
    answer1.setAttribute("id", "answer1");
    answer1.setAttribute("class", "answer");

    var answer2 = document.createElement("div");
    answer2.setAttribute("id", "answer2");
    answer2.setAttribute("class", "answer");

    var answer3 = document.createElement("div");
    answer3.setAttribute("id", "answer3");
    answer3.setAttribute("class", "answer");

    var answer4 = document.createElement("div");
    answer4.setAttribute("id", "answer4");
    answer4.setAttribute("class", "answer");

    //add  those elements to the answer container
    answerContainer.appendChild(answer1);
    answerContainer.appendChild(answer2);
    answerContainer.appendChild(answer3);
    answerContainer.appendChild(answer4);

    //add everything to the play area
    divContainer.appendChild(header);
    divContainer.appendChild(questionContainer);
    divContainer.appendChild(visualContainer);
    divContainer.appendChild(answerContainer);
}

function Main()
{
    var audioSrc = "../../MiniGames/AdditionMiniGame/audio/intro.m4a";
	var audio = new Audio();
	
	//object that keeps track of all the important
	//information in the game
	var AdditionGame = {
		lowerBound: 0,
		upperBound: -1,
		answer: -1,
		numCorrect: 0,
		numClicks: 0
	};
	
    //get the game's difficulty level and modify the dataset for that difficulty level
	var difficulty = document.getElementById("minigameScript").getAttribute("difficulty");

	 if (difficulty <= 3)
	     AdditionGame.upperBound = 5;
	 else
	     AdditionGame.upperBound = 10;

    //create the html
	CreateHtmlElements();

	window.addEventListener('resize', function(){
		MakeScalable();
	}, false);
		
	window.onload = function () {
		//play the audio
	    audio.src = audioSrc;
		audio.play();
		
		MakeScalable();
		
		//allows the audio to play before the user plays the game
		setTimeout(function () {
			document.getElementById("visualContainer").style.visibility = "visible";
			document.getElementById("plus").style.visibility = "visible";
			document.getElementById("equal").style.visibility = "visible";
			document.getElementById("question").style.visibility = "visible";

			GameLoop(AdditionGame);
		},3500);
		
	};
	
	//play the game for 1 minuet and then end the game
	setTimeout(function () {
			document.getElementById("questionContainer").style.zIndex = "-1";
			document.getElementById("answerContainer").style.zIndex = "-1";
			document.getElementById("visualContainer").style.zIndex = "-1";
			
			var totalCorrect = AdditionGame.numCorrect;
			var totalAttempts = AdditionGame.numClicks;
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
			else if (percentage > 0.90 && percentage <= 0.95){
			    returnVal = 4;
			}
			else if (percentage < 0.10) {
			    returnVal = -5;
			}
			else{
			    returnVal = 5;
			}

			if (totalAttempts === 0)
			    returnVal = 0;

			document.getElementById("score").value = returnVal;
			EndofGame(); //function displays good job message and returns to map
       }, 60000);	
}

Main();