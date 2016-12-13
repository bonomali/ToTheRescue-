//Author: Matthew Del Fante

//constants
const GREEN_BUTTON = 1;
const RED_BUTTON = 2;
const YELLOW_BUTTON = 3;
const BLUE_BUTTON = 4;
const LOST_GAME = 5;

//Does the animation for when someone clicks a button or when the AI is simulating clicking
//the button
function ClickedButton(simonButtons, elementNum, ctx)
{
    if (elementNum === GREEN_BUTTON)
    {       
        //runs the function after 250 ms, changes the button back to the color green
        setTimeout(function () {
            ctx.fillStyle = "green";
            ctx.fillRect(simonButtons[GREEN_BUTTON].left, simonButtons[GREEN_BUTTON].top, simonButtons[GREEN_BUTTON].width, simonButtons[GREEN_BUTTON].height);
        }, 250);

        //plays the sound for the green button
        PlaySound(GREEN_BUTTON);

        //changes the color of the button to a brighter color
        ctx.fillStyle = "#00e600";
        ctx.fillRect(simonButtons[GREEN_BUTTON].left, simonButtons[GREEN_BUTTON].top, simonButtons[GREEN_BUTTON].width, simonButtons[GREEN_BUTTON].height);
    }
    else if (elementNum === RED_BUTTON)
    {
        setTimeout(function () {
            ctx.fillStyle = "#cc0000";
            ctx.fillRect(simonButtons[RED_BUTTON].left, simonButtons[RED_BUTTON].top, simonButtons[RED_BUTTON].width, simonButtons[RED_BUTTON].height);
        }, 250);

        PlaySound(RED_BUTTON);

        ctx.fillStyle = "red";
        ctx.fillRect(simonButtons[RED_BUTTON].left, simonButtons[RED_BUTTON].top, simonButtons[RED_BUTTON].width, simonButtons[RED_BUTTON].height);
    }
    else if (elementNum === YELLOW_BUTTON)
    {
        setTimeout(function () {
            ctx.fillStyle = "#e6e600";
            ctx.fillRect(simonButtons[YELLOW_BUTTON].left, simonButtons[YELLOW_BUTTON].top, simonButtons[YELLOW_BUTTON].width, simonButtons[YELLOW_BUTTON].height);
        }, 250);

        PlaySound(YELLOW_BUTTON);

        ctx.fillStyle = "yellow";
        ctx.fillRect(simonButtons[YELLOW_BUTTON].left, simonButtons[YELLOW_BUTTON].top, simonButtons[YELLOW_BUTTON].width, simonButtons[YELLOW_BUTTON].height);
    }
    else if (elementNum === BLUE_BUTTON)
    {
        setTimeout(function () {
            ctx.fillStyle = "#2e2eb8";
            ctx.fillRect(simonButtons[BLUE_BUTTON].left, simonButtons[BLUE_BUTTON].top, simonButtons[BLUE_BUTTON].width, simonButtons[BLUE_BUTTON].height);
        }, 250);

        PlaySound(BLUE_BUTTON);

        ctx.fillStyle = "blue";
        ctx.fillRect(simonButtons[BLUE_BUTTON].left, simonButtons[BLUE_BUTTON].top, simonButtons[BLUE_BUTTON].width, simonButtons[BLUE_BUTTON].height);
    }
}

//Updates the score in the bottom left of the canvas
function UpdateScore(ctx, Simon)
{
    //erase over the old score
    ctx.clearRect(0, 490, 200, 30);

    //increase the score
    Simon.score = Simon.score + 1;

    //rewrite the score
    ctx.fillStyle = "black";
    ctx.font = "30px Georgia";
    ctx.fillText("Score: " + Simon.score, 10, 510);
}

//Plays the sounds for each square click and when losing the game
function PlaySound(elementNum)
{
    var audio = new Audio();
    if (elementNum === GREEN_BUTTON)
    {
        audio.src = "audio/greenSound.mp3";
    }
    else if (elementNum === RED_BUTTON)
    {
        audio.src = "audio/redSound.mp3";
    }
    else if (elementNum === YELLOW_BUTTON)
    {
        audio.src = "audio/yellowSound.mp3";
    }
    else if (elementNum === BLUE_BUTTON)
    {
        audio.src = "audio/blueSound.mp3";
    }
    else if (elementNum === LOST_GAME)
    {
        audio.src = "audio/endGameSound.mp3";
    }
    audio.play();
}

//Adds the Squares needed for the game to the simonButtons array
function AddSimonElements(simonButtons)
{
    //Add the black background
    simonButtons.push({
        colour: "black",
        width: 370,
        height: 400,
        top: 50,
        left: 75
    });

    //Add the green square
    simonButtons.push({
        colour: "green",
        width: 150,
        height: 150,
        top: 70,
        left: 95
    });

    //Add the red square
    simonButtons.push({
        colour: "#cc0000",
        width: 150,
        height: 150,
        top: 70,
        left: 275
    });

    //Add the yellow square
    simonButtons.push({
        colour: "#e6e600",
        width: 150,
        height: 150,
        top: 280,
        left: 95
    });

    //Add the blue square
    simonButtons.push({
        colour: "#2e2eb8",
        width: 150,
        height: 150,
        top: 280,
        left: 275
    });
}

function UpdateSimon(canvas, ctx, simonButtons, Simon)
{
    var elemLeft = canvas.offsetLeft;
    var elemTop = canvas.offsetTop;

    //add the Simon squares used in the game to the simonButtons array
    AddSimonElements(simonButtons);

    // Add event listener for `click` events.
    canvas.addEventListener('click', function (event) {
        var x = event.pageX - elemLeft,
            y = event.pageY - elemTop;

        //If the player still has squares to click and hasn't lost the game
        if (Simon.numOfPlayerClicks <= Simon.numOfButtonsToClick && Simon.playerLost === false)
        {           
            // Collision detection between clicked offset and simonButtons.
            for (var i = GREEN_BUTTON; i < simonButtons.length; i++)
            {
                //green square
                if (i === GREEN_BUTTON)
                {
                    //if the player clicks within the green square
                    if (y > simonButtons[i].top && y < simonButtons[i].top + simonButtons[i].height && x > simonButtons[i].left && x < simonButtons[i].left + simonButtons[i].width)
                    {
                        //increase the number of clicks
                        Simon.numOfPlayerClicks = Simon.numOfPlayerClicks + 1;
                        //push the element number of the square the player clicked to the playerClickedElementNums array
                        Simon.playerClickedElementNums.push(GREEN_BUTTON);

                        //if the player didn't click the same button as the AI
                        if (Simon.playerClickedElementNums[Simon.numOfPlayerClicks - 1] !== Simon.buttonsAIClicked[Simon.numOfPlayerClicks - 1])
                        {
                            //then the player lost
                            Simon.playerLost = true;                
                        }
                        else
                        {
                            //run the ClickedButton function
                            ClickedButton(simonButtons, GREEN_BUTTON, ctx);
                        }

                    }
                }
                    //red square
                else if (i === RED_BUTTON)
                {
                    if (y > simonButtons[i].top && y < simonButtons[i].top + simonButtons[i].height && x > simonButtons[i].left && x < simonButtons[i].left + simonButtons[i].width)
                    {
                        
                        Simon.numOfPlayerClicks = Simon.numOfPlayerClicks + 1;
                        Simon.playerClickedElementNums.push(RED_BUTTON);

                        if (Simon.playerClickedElementNums[Simon.numOfPlayerClicks - 1] !== Simon.buttonsAIClicked[Simon.numOfPlayerClicks - 1])
                        {
                            Simon.playerLost = true;
                        }
                        else
                        {
                            ClickedButton(simonButtons, RED_BUTTON, ctx);
                        }
                    }
                }
                    //yellow square
                else if (i === YELLOW_BUTTON)
                {
                    if (y > simonButtons[i].top && y < simonButtons[i].top + simonButtons[i].height && x > simonButtons[i].left && x < simonButtons[i].left + simonButtons[i].width)
                    {               
                        Simon.numOfPlayerClicks = Simon.numOfPlayerClicks + 1;
                        Simon.playerClickedElementNums.push(YELLOW_BUTTON);

                        if (Simon.playerClickedElementNums[Simon.numOfPlayerClicks - 1] !== Simon.buttonsAIClicked[Simon.numOfPlayerClicks - 1])
                        {
                            Simon.playerLost = true;
                        }
                        else
                        {
                            ClickedButton(simonButtons, YELLOW_BUTTON, ctx);
                        }
                    }
                }
                    //blue square
                else if (i === BLUE_BUTTON)
                {
                    if (y > simonButtons[i].top && y < simonButtons[i].top + simonButtons[i].height && x > simonButtons[i].left && x < simonButtons[i].left + simonButtons[i].width)
                    {             
                        Simon.numOfPlayerClicks = Simon.numOfPlayerClicks + 1;
                        Simon.playerClickedElementNums.push(BLUE_BUTTON);

                        if (Simon.playerClickedElementNums[Simon.numOfPlayerClicks - 1] !== Simon.buttonsAIClicked[Simon.numOfPlayerClicks - 1])
                        {
                            Simon.playerLost = true;
                        }
                        else
                        {
                            ClickedButton(simonButtons, BLUE_BUTTON, ctx);
                        }
                    }
                }
            }

            //if the player lost
            if (Simon.playerLost === true)
            {
                //Play the sound effect for when the user loses the game
                PlaySound(LOST_GAME);

                //Run the EndGame function
                EndGame(Simon);
            }
            //if the player clicked the same amount of times as the AI did
            else if (Simon.numOfPlayerClicks === Simon.numOfButtonsToClick)
            {
                //increase the amount of items the AI and the player needs to click
                Simon.numOfPlayerClicks = Simon.numOfPlayerClicks + 1;
                //Go through the AI logic
                RunAILogic(simonButtons, ctx, Simon);
            }       
        }
    }, false);

    // Render simonButtons
    simonButtons.forEach(function(element) {
        ctx.fillStyle = element.colour;
        ctx.fillRect(element.left, element.top, element.width, element.height);
    });

    //Write simon in the center of the game board
    ctx.fillStyle = "white";
    ctx.font = "30px Georgia";
    ctx.fillText("SIMON", 210, 260);
}

//Returns a random integer between min (inclusive) and max (inclusive)
function GetRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Essentially runs the ClickedButton function every 1/2 second
//in a loop to show the buttons that the AI clicked
function AnimationLoop(count, simonButtons, ctx, Simon)
{
    //On the first recursion wait one second before calling the ClickedButton function
    if (count === 0)
    {
        setTimeout(function () {
            ClickedButton(simonButtons, Simon.buttonsAIClicked[count], ctx);
            count++;
            if (count < Simon.numOfButtonsToClick) {
                AnimationLoop(count, simonButtons, ctx, Simon);
            }
        }, 1000);
    }
    //On the other recursions wait half a second before the ClickedButton function is called
    else
    {
        setTimeout(function () {      
            ClickedButton(simonButtons, Simon.buttonsAIClicked[count], ctx);
            count++;
            if (count < Simon.numOfButtonsToClick) {
                AnimationLoop(count, simonButtons, ctx, Simon);
            }
        }, 500);
    }   
}

//Runs the AI logic behind this game. Essentially it clicks random buttons
//for the player to click in the same order
function RunAILogic(simonButtons, ctx, Simon)
{
    //For the first AI move
    if (Simon.numOfButtonsToClick === 0)
    {
        //increment the number of buttons to click
        Simon.numOfButtonsToClick = Simon.numOfButtonsToClick + 1;

        //get a random number between 1 and 4 that represents which button the AI will click
        var randomButtonElement = GetRandomInt(1, 4);

        //After one second run the ClickedButton function
        setTimeout(function () {
            ClickedButton(simonButtons, randomButtonElement, ctx);
        }, 1000);

        //Add that element number to an array that keeps track of all the buttons the AI clicked
        Simon.buttonsAIClicked.push(randomButtonElement);
    }
    else
    {
        //update the score becuase the user didn't lose
        UpdateScore(ctx, Simon);

        //increment the number of buttons to click
        Simon.numOfButtonsToClick = Simon.numOfButtonsToClick + 1;

        //get a random number between 1 and 4 that represents which button the AI will click
        var randomButtonElement = GetRandomInt(1, 4);

        //Add that element number to an array that keeps track of all the buttons the AI clicked
        Simon.buttonsAIClicked.push(randomButtonElement);

        //Run the AnimationLoop function
        AnimationLoop(0, simonButtons, ctx, Simon);
    }
            
    //reset the count of clicked buttons for the player 
    Simon.numOfPlayerClicks = 0;
    
    //clear the array of the player clicked elements
    Simon.playerClickedElementNums = [];
}

//Displays a div with a button inside it that will restart the game 
//if the button is clicked
function EndGame(Simon)
{
    //create a div
    var div = document.createElement("div");
    //Add style elements to that div
    div.style.top = "50%";
    div.id = "endGameDiv";
    div.style.position = "absolute";
    div.style.marginTop = "-45px";
    div.style.left = "50%";
    div.style.marginLeft = "-100px";
    div.style.width = "200px";
    div.style.height = "90px";
    div.textContent = "You Lost :(";
    div.style.opacity = "1";
    div.style.zIndex = "2";
    div.style.background = "navy";
    div.style.textAlign = "center";
    div.style.fontSize = "125";
    div.style.color = "#FFFFFF";

    //add that div to the body of the document
    document.body.appendChild(div);
    
    //Create a button so when it is clicked, the ResetGame function is run
    var btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Click To Play Again!";
    btn.setAttribute("onclick", "ResetGame()");

    //create a line break
    var br = document.createElement("br");

    //add the line break and the button to the div
    div.appendChild(br);
    div.appendChild(btn);
}

//Restarts the game by refeshing the page
function ResetGame()
{
    //refesh the page to reset the game 
    window.location.reload();
}

//Runs the entire program
function main()
{
    //used to make a dynamic canvas
    var canvas = null;
    //used to render 2d shapes to the screen
    var ctx = null;
    //used to hold the listeners on the canvas
    var simonButtons = [];

    //A game object that holds key variables used for the game's logic
    var Simon = {
        //contains the element numbers of squares the player clicked
        playerClickedElementNums: [],
        //contains the element numbers of squares the AI clicked
        buttonsAIClicked: [],
        //boolean that whether or not the player lost the game
        playerLost: false,
        //holds the humber of buttons the player needs to click each turn
        numOfButtonsToClick: 0,
        //holds the current number of buttons that the player clicked
        numOfPlayerClicks: 0,
        //holds the score that the user has
        score: -1
    };

    //create and initialize the canvas element
    canvas = document.createElement("canvas");
    canvas.width = 520;
    canvas.height = 520;

    //make it so 2d things can be rendered to the canvas
    ctx = canvas.getContext("2d");
    
    // add the canvas element to the body of the document
    document.body.appendChild(canvas);

    //Creates the Simon Game on the canvas
    UpdateSimon(canvas, ctx, simonButtons, Simon);

    //Make it so the score is displayed to the screen
    UpdateScore(ctx, Simon);

    //Starts the Simon game by having the AI click a button
    RunAILogic(simonButtons, ctx, Simon);
}

main();