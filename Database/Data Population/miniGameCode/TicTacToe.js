//Author: Matthew Del Fante

//draws the tic-tac-toe outline to the screen
function DrawTicTacToeOutline(ctx)
{
    ctx.beginPath();
    //draw the left verticle line
    ctx.moveTo(173, 0);
    ctx.lineTo(173, 520);
    ctx.lineTo(183, 520)
    ctx.lineTo(183, 0);
    ctx.fill();

    ctx.beginPath();
    //draw the right verticle line
    ctx.moveTo(346, 0);
    ctx.lineTo(346, 520);
    ctx.lineTo(356, 520)
    ctx.lineTo(356, 0);
    ctx.fill();

    ctx.beginPath();
    //draw the top horizontal line
    ctx.moveTo(0, 173);
    ctx.lineTo(520, 173);
    ctx.lineTo(520, 183);
    ctx.lineTo(0, 183);
    ctx.fill();

    ctx.beginPath();
    //draw the top horizontal line
    ctx.moveTo(0, 346);
    ctx.lineTo(520, 346);
    ctx.lineTo(520, 356);
    ctx.lineTo(0, 356);
    ctx.fill();
})

//Adds clickable areas to the ticTacToeClickAreas array
function AddTicTacToeClickAreas(ticTacToeClickAreas)
{
    //top left area
    ticTacToeClickAreas.push({
        width: 173,
        height: 173,
        top: 0,
        left: 0
    });

    //center left
    ticTacToeClickAreas.push({
        width: 173,
        height: 163,
        top: 183,
        left: 0
    });

    //bottom left
    ticTacToeClickAreas.push({
        width: 173,
        height: 164,
        top: 356,
        left: 0
    });

    //top center
    ticTacToeClickAreas.push({
        width: 163,
        height: 173,
        top: 0,
        left: 183
    });

    //center center
    ticTacToeClickAreas.push({
        width: 163,
        height: 163,
        top: 183,
        left: 183
    });

    //bottom center
    ticTacToeClickAreas.push({
        width: 163,
        height: 164,
        top: 356,
        left: 183
    });

    //top right
    ticTacToeClickAreas.push({
        width: 173,
        height: 173,
        top: 0,
        left: 356
    });

    //center right
    ticTacToeClickAreas.push({
        width: 173,
        height: 163,
        top: 183,
        left: 356
    });

    //bottom right
    ticTacToeClickAreas.push({
        width: 173,
        height: 164,
        top: 356,
        left: 356
    });
}

//Creates listeners on the canvas for a click and add Xs and Os to those
//areas depending on whose turn it is
function GameLogic(canvas, ctx, ticTacToeClickAreas, TicTacToe)
{
    var elemLeft = canvas.offsetLeft;
    var elemTop = canvas.offsetTop;

    //Add the TicTacToe click areas to the ticTacToeClickAreas array 
    AddTicTacToeClickAreas(ticTacToeClickAreas);

    // Add event listener for `click` events.
    canvas.addEventListener('click', function (event) {
        var x = event.pageX - elemLeft,
            y = event.pageY - elemTop;

        //if the game hasn't ended
        if (TicTacToe.stopClicking === false)
        {
            //Collision detection between clicked offset and ticTacToeClickAreas.
            for (var i = 0; i < ticTacToeClickAreas.length; i++)
            {
                //if the user clicks within any of the click areas
                if (y > ticTacToeClickAreas[i].top && y < ticTacToeClickAreas[i].top + ticTacToeClickAreas[i].height && x > ticTacToeClickAreas[i].left && x < ticTacToeClickAreas[i].left + ticTacToeClickAreas[i].width && TicTacToe.logicArr[i] === null)
                {
                    //if its Xs turn
                    if (TicTacToe.isX === true)
                    {
                        //display an X to that specific click area
                        ctx.fillStyle = "black";
                        ctx.font = "150px Georgia";
                        ctx.fillText(TicTacToe.xString, ticTacToeClickAreas[i].left + ticTacToeClickAreas[i].width / 5, ticTacToeClickAreas[i].top + ticTacToeClickAreas[i].height / 1.25);
                        TicTacToe.logicArr[i] = TicTacToe.xString;

                        //it is no longer Xs turn
                        TicTacToe.isX = false;
                    }
                    else
                    {
                        //display an O to that specific click area
                        ctx.fillStyle = "black";
                        ctx.font = "150px Georgia";
                        ctx.fillText(TicTacToe.oString, ticTacToeClickAreas[i].left + ticTacToeClickAreas[i].width / 5, ticTacToeClickAreas[i].top + ticTacToeClickAreas[i].height / 1.25);
                        TicTacToe.logicArr[i] = TicTacToe.oString;

                        //it is now Xs turn
                        TicTacToe.isX = true;
                    }

                    //find out if anyone won
                    WhoWon(TicTacToe);
                }
            }
        }
    }, false);
}

//Determines who won the game, if there as a tie or if nobody won
function WhoWon(TicTacToe)
{
    //becomes true if player one won
    var playerOneWon = false;
    //becomes true if player two won
    var playerTwoWon = false;
    //becomes true if there is an empty square on the TicTacToe board
    var emptySquare = false;
    
    //top row horizontal
    if (TicTacToe.logicArr[0] === "O" && TicTacToe.logicArr[1] === "O" && TicTacToe.logicArr[2] === "O")
    {
        playerOneWon = true;
    }
    else if (TicTacToe.logicArr[0] === "X" && TicTacToe.logicArr[1] === "X" && TicTacToe.logicArr[2] === "X")
    {
        playerTwoWon = true;
    }
        //middle row horizontal
    else if (TicTacToe.logicArr[3] === "O" && TicTacToe.logicArr[4] === "O" && TicTacToe.logicArr[5] === "O")
    {
        playerOneWon = true;
    }
    else if (TicTacToe.logicArr[3] === "X" && TicTacToe.logicArr[4] === "X" && TicTacToe.logicArr[5] === "X")
    {
        playerTwoWon = true;
    }
        //bottom row horizontal
    else if (TicTacToe.logicArr[6] === "O" && TicTacToe.logicArr[7] === "O" && TicTacToe.logicArr[8] === "O")
    {
        playerOneWon = true;
    }
    else if (TicTacToe.logicArr[6] === "X" && TicTacToe.logicArr[7] === "X" && TicTacToe.logicArr[8] === "X")
    {
        playerTwoWon = true;
    }
        //first column vertical
    else if (TicTacToe.logicArr[0] === "O" && TicTacToe.logicArr[3] === "O" && TicTacToe.logicArr[6] === "O")
    {
        playerOneWon = true;
    }
    else if (TicTacToe.logicArr[0] === "X" && TicTacToe.logicArr[3] === "X" && TicTacToe.logicArr[6] === "X")
    {
        playerTwoWon = true;
    }
        //second column vertical
    else if (TicTacToe.logicArr[1] === "O" && TicTacToe.logicArr[4] === "O" && TicTacToe.logicArr[7] === "O")
    {
        playerOneWon = true;
    }
    else if (TicTacToe.logicArr[1] === "X" && TicTacToe.logicArr[4] === "X" && TicTacToe.logicArr[7] === "X")
    {
        playerTwoWon = true;
    }
        //third column vertical
    else if (TicTacToe.logicArr[2] === "O" && TicTacToe.logicArr[5] === "O" && TicTacToe.logicArr[8] === "O")
    {
        playerOneWon = true;
    }
    else if (TicTacToe.logicArr[2] === "X" && TicTacToe.logicArr[5] === "X" && TicTacToe.logicArr[8] === "X")
    {
        playerTwoWon = true;
    }
        //diagonal left to right
    else if (TicTacToe.logicArr[0] === "O" && TicTacToe.logicArr[4] === "O" && TicTacToe.logicArr[8] === "O")
    {
        playerOneWon = true;
    }
    else if (TicTacToe.logicArr[0] === "X" && TicTacToe.logicArr[4] === "X" && TicTacToe.logicArr[8] === "X")
    {
        playerTwoWon = true;
    }
        //diagonal right to left
    else if (TicTacToe.logicArr[2] === "O" && TicTacToe.logicArr[4] === "O" && TicTacToe.logicArr[6] === "O")
    {
        playerOneWon = true;
    }
    else if (TicTacToe.logicArr[2] === "X" && TicTacToe.logicArr[4] === "X" && TicTacToe.logicArr[6] === "X")
    {
        playerTwoWon = true;
    }

    //figure out if there are any empty squares or not
    for (var i = 0; i < 9; i++)
    {
        if (TicTacToe.logicArr[i] === null)
        {
            emptySquare = true;
        }
    }

    if (playerOneWon === true)
    {
        //don't allow the user to click on the game board
        TicTacToe.stopClicking = true;

        //Display the end of game div
        DisplayEndOfGameDiv(playerOneWon, playerTwoWon);
    }
    else if (playerTwoWon === true)
    {
        TicTacToe.stopClicking = true;
        DisplayEndOfGameDiv(playerOneWon, playerTwoWon);
    }
    else if (emptySquare === false && playerOneWon === false && playerTwoWon === false)
    {
        TicTacToe.stopClicking = true;
        DisplayEndOfGameDiv(playerOneWon, playerTwoWon);
    }
}

//Displays a div to the screen saying who won or if there was a tie and
//allows the user to play the game again
function DisplayEndOfGameDiv(playerOneWon, playerTwoWon)
{
    //Create the end of game div
    var div = document.createElement("div");
    
    //set the syling attributes
    div.style.position = "absolute";
    div.style.zIndex = "2";
    div.style.top = "50%";
    div.style.marginTop = "-45px";
    div.style.left = "50%";
    div.style.marginLeft = "-100px";
    div.style.width = "200px";
    div.style.height = "90px";
    div.style.background = "navy";
    div.style.textAlign = "center";
    div.style.fontSize = "125";
    div.style.color = "#FFFFFF";


    if (playerOneWon === true)
    {
        div.textContent = "Player One Won!";
    }
    else if (playerTwoWon === true)
    {
        div.textContent = "Player Two Won!";
    }
    else
    {
        div.textContent = "Tie!";
    }

    //create a button
    var btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Click To Play Again!";
    //when clicked, run the ResetGame function 
    btn.setAttribute("onclick", "ResetGame()");

    //create a line break
    var br = document.createElement("br");

    //add a line break and a button to the div
    div.appendChild(br);
    div.appendChild(btn);

    //append the div to the document's body
    document.body.appendChild(div);
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
    //used to create the canvas
    var canvas = null;
    //handels 2D rendering
    var ctx = null;
    //will hold the click areas on the game board
    var ticTacToeClickAreas = [];

    //an object to hold key variables for the logic of this game
    var TicTacToe = {
        isX: false,
        oString: "O",
        xString: "X",
        stopClicking: false,
        logicArr: [],

        //initializes the logicArr to null
        InitializeLogicArr: function () {
            for (var i = 0; i < 9; i++)
            {
                this.logicArr.push(null);
            }
        }
    };

    TicTacToe.InitializeLogicArr();

    // create and initiate the canvas element
    canvas = document.createElement("canvas");
    canvas.width = 520;
    canvas.height = 520;

    ctx = canvas.getContext("2d");
    // add the canvas element to the body of the document
    document.body.appendChild(canvas);

    //draw the outline of the Tic-Tak-Toe gameboard
    DrawTicTacToeOutline(ctx);

    //run the GameLogic function
    GameLogic(canvas, ctx, ticTacToeClickAreas, TicTacToe);
}

main();