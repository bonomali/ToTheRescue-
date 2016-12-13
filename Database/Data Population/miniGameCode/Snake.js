//Author: Matthew Del Fante

//Note: I got a lot of help from this YouTube video: https://www.youtube.com/watch?v=uU5YPIvJ24Y
//Essentially, I learned how to animate things in Javascript from that video and making this game.

//game constants
//size of the the Grid
const COLS = 26;
const ROWS = 26;

//the state of each element in the Grid
const EMPTY = 0;
const SNAKE = 1;
const FOOD = 2;

//the direction of the snake
const LEFT = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;

//the key codes for the left, right, up and down key presses
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

//Set a food state at a random free cell in the Grid
function SetFood(Grid)
{
    //will hold all the empty elements of the Grid
    var empty = [];

    // iterate through the Grid and find all empty cells
    for (var x = 0; x < Grid.width; x++)
    {
        for (var y = 0; y < Grid.height; y++)
        {
            if (Grid.GetState(x, y) === EMPTY)
            {
                empty.push({ x: x, y: y });
            }
        }
    }
    // chooses a random cell
    var randPosition = empty[Math.round(Math.random() * (empty.length - 1))];

    //set the food there
    Grid.SetState(FOOD, randPosition.x, randPosition.y);
}

//Resets and initializes the game and game objects 
function InitializeGame(SnakeLogic, Grid, Snake)
{
    //set the score to 0
    SnakeLogic.score = 0;

    //initialize the Grid so everything is empty
    Grid.InitializeGrid(EMPTY, COLS, ROWS);

    //get the snake's position
    var snakePosition = { x: Math.floor(COLS / 2), y: ROWS - 1 };

    //Make it so there is a snake
    Snake.InitializeSnake(UP, snakePosition.x, snakePosition.y);

    //set the Grid's state at that location to the SNAKE state
    Grid.SetState(SNAKE, snakePosition.x, snakePosition.y);

    //place food down
    SetFood(Grid);
}

//The game loop function, used for game updates and rendering
function GameLoop(canvas, ctx, keystate, SnakeLogic, Grid, Snake)
{
    if (SnakeLogic.playerLost === false)
    {
        UpdateGameLogic(canvas, ctx, keystate, SnakeLogic, Grid, Snake);
        Draw(canvas, ctx, SnakeLogic, Grid);
        // When ready to redraw the canvas call the loop function
        // first. Runs about 60 frames a second
        window.requestAnimationFrame(function () { GameLoop(canvas, ctx, keystate, SnakeLogic, Grid, Snake); }, canvas);
    } 
}

//Updates the game logic
function UpdateGameLogic(canvas, ctx, keystate, SnakeLogic, Grid, Snake)
{
    SnakeLogic.frames++;

    // changing direction of the snake depending on which keys
    // that are pressed and not allowing the user move in the oppsoite direciton
    //the snake is already moving
    if (keystate[KEY_LEFT] && Snake.direction !== RIGHT)
    {
        Snake.direction = LEFT;
    }
    else if (keystate[KEY_UP] && Snake.direction !== DOWN)
    {
        Snake.direction = UP;
    }
    else if (keystate[KEY_RIGHT] && Snake.direction !== LEFT)
    {
        Snake.direction = RIGHT;
    }
    else if (keystate[KEY_DOWN] && Snake.direction !== UP)
    {
        Snake.direction = DOWN;
    }
    // every five frames update the game state.
    if (SnakeLogic.frames % 5 === 0)
    {
        // pop the last element from the snake queue
        var newX = Snake.last.x;
        var newY = Snake.last.y;

        // updates the position depending on the snake direction
        if (Snake.direction === LEFT)
            newX--;
        else if (Snake.direction === UP)
            newY--;
        else if (Snake.direction === RIGHT)
            newX++;
        else if (Snake.direction === DOWN)
            newY++;
        
        //checks all gameover conditions ie: went out of bounds
        // on the Grid or ran into itself
        if (0 > newX || newX > Grid.width - 1 ||
			0 > newY || newY > Grid.height - 1 ||
			Grid.GetState(newX, newY) === SNAKE)
        {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById("div1").style.zIndex = "3";
            SnakeLogic.playerLost = true;
        }

        if (SnakeLogic.playerLost !== true)
        {
            // check wheter the new position are on the FOOD item
            if (Grid.GetState(newX, newY) === FOOD)
            {
                // increment the score and sets a new FOOD position
                SnakeLogic.score++;
                SetFood(Grid);
            }
            else
            {
                // take out the first item from the snake queue i.e
                // the tail and remove state from Grid
                var tail = Snake.Remove();
                Grid.SetState(EMPTY, tail.x, tail.y);
            }
            // add a snake state at the new position and append it to
            // the snake queue
            Grid.SetState(SNAKE, newX, newY);
            Snake.Insert(newX, newY);
        }  
    }
}

//render and draw to the canvas
function Draw(canvas, ctx, SnakeLogic, Grid)
{
    // calculate the Grid element width and height
    var GridElementWidth = canvas.width / Grid.width;
    var GridElementHeight = canvas.height / Grid.height;

    // iterate through the Grid and draw all cells
    for (var x = 0; x < Grid.width; x++)
    {
        for (var y = 0; y < Grid.height; y++)
        {
            // sets the fillstyle depending on the id of
            // each cell
            if (Grid.GetState(x, y) === EMPTY)
            {
                //fill that element with white
                ctx.fillStyle = "#fff";
            }
            else if (Grid.GetState(x, y) === SNAKE)
            {
                //fill that element with green
                ctx.fillStyle = "#008000";
            }
            else if (Grid.GetState(x, y) === FOOD)
            {
                //fill that element with red
                ctx.fillStyle = "#f00";
            }
            ctx.fillRect(x * GridElementWidth, y * GridElementHeight, GridElementWidth, GridElementHeight);
        }
    }
    // changes the fillstyle to black and write the score in the lower left of the canvas
    ctx.fillStyle = "#000";
    ctx.fillText("SCORE: " + SnakeLogic.score, 10, canvas.height - 10);
}

//if the player chooses to play again this function will reset the game
function PlayAgain()
{
    //refesh the page to reset the game 
    window.location.reload();
}

//runs the game
function main()
{
    //HTMLCanvas
    var canvas = null;

    //Renders 2d things
    var ctx = null;

    //Object, used for keyboard inputs
    var keystate = null;

    //game objects

    //holds key variables for the game to run properly
    var SnakeLogic = {
        frames: 0,
        score: 0,
        playerLost: false
    }

    //The Grid data structure that the game will be played on
    var Grid = {
        //number, the number of columns
        width: null,

        //number, the number of rows
        height: null,

        //the underlying data structure
        array2D: null,

        //Initialize and fill a cols x rows Grid with a state
        InitializeGrid: function (state, cols, rows) {
            this.width = cols;
            this.height = rows;
            this.array2D = [];
            for (var x = 0; x < cols; x++) {
                this.array2D.push([]);
                for (var y = 0; y < rows; y++) {
                    this.array2D[x].push(state);
                }
            }
        },

        //sets a certain Grid element to a state
        SetState: function (state, x, y) {
            this.array2D[x][y] = state;
        },

        //gets the state of a certain Grid element
        GetState: function (x, y) {
            return this.array2D[x][y];
        }
    }

    //the snake object that works like a queue
    var Snake = {
        //references the direction the snake is going
        direction: null,

        //Object, pointer to the last element in the queue
        last: null,

        //the underlyind data structure
        queue: null,

        //Clears the queue and sets the start position and direction
        InitializeSnake: function (d, x, y) {
            this.direction = d;
            this.queue = [];
            this.Insert(x, y);
        },

        //Adds an element to the snake, the x and y represent the location of the new snake
        Insert: function (x, y) {
            // unshift prepends an element to an array
            this.queue.unshift({ x: x, y: y });
            this.last = this.queue[0];
        },

        //Removes and returns the first element in the queue.
        Remove: function () {
            // pop returns the last element of an array
            return this.queue.pop();
        }
    }

    // create and initiate the canvas element
    canvas = document.createElement("canvas");
	
	//the canvas is 520 x 520 right now
    canvas.width = COLS * 20;
    canvas.height = ROWS * 20;

    ctx = canvas.getContext("2d");
    // add the canvas element to the body of the document
    document.body.appendChild(canvas);
    // sets an base font for bigger score display
    ctx.font = "12px Helvetica";

    SnakeLogic.frames = 0;
    keystate = {};

    // keeps track of the keybourd input
    document.addEventListener("keydown", function (event) {
        keystate[event.keyCode] = true;
    });
    document.addEventListener("keyup", function (event) {
        delete keystate[event.keyCode];
    });

    // intatiate game objects and starts the game loop
    InitializeGame(SnakeLogic, Grid, Snake);
    GameLoop(canvas, ctx, keystate, SnakeLogic, Grid, Snake);
}

// start and run the game
main();