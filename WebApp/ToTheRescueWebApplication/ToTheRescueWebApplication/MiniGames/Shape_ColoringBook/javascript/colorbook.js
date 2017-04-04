(function () {
    var toggle_music = document.getElementById('minigameScript').getAttribute('toggleMusic');
    var imagePath = '../../MiniGames/Shape_ColoringBook/images/';
    var soundPath = '../../MiniGames/Shape_ColoringBook/sounds/';
    var audioInstructions = new Audio();
    audioInstructions.src = soundPath + "audioInstructions.mp3";

    //arrays containing paths to audio files and image files for shape outlines
    var audioClips = [soundPath + "circle_recording.mp3", soundPath + "diamond_recording.mp3", soundPath + "heart_recording.mp3",
        soundPath + "hexagon_recording.mp3", soundPath + "octagon_recording.mp3", soundPath + "oval_recording.mp3",
        soundPath + "pentagon_recording.mp3", soundPath + "rectangle_recording.mp3", soundPath + "square_recording.mp3",
        soundPath + "triangle_recording.mp3"];

    var audioFact = [null, soundPath + "diamondFact_recording.mp3", null, soundPath + "hexagonFact_recording.mp3",
        soundPath + "octagonFact_recording.mp3", null, soundPath + "pentagonFact_recording.mp3",
        soundPath + "rectangleFact_recording.mp3", soundPath + "squareFact_recording.mp3",
        soundPath + "triangleFact_recording.mp3"]

    var ShapeImages = [imagePath + "circle.png", imagePath + "diamond.png", imagePath + "heart.png", imagePath + "hexagon.png",
        imagePath + "octagon.png", imagePath + "oval.png", imagePath + "pentagon.png", imagePath + "rectangle.png",
        imagePath + "square.png", imagePath + "triangle.png"];

    //randomly choose index for coloring shape
    var index = Math.floor((Math.random() * ShapeImages.length)); //random number for array index
    
    //play audio shape name and fact if applicable
    var shapeName = new Audio();
    shapeName.src = audioClips[index];
    audioInstructions.addEventListener('ended', function () { shapeName.play() })
    shapeName.addEventListener('ended', function () {
        if (audioFact[index] != null) {
            var shapeFact = new Audio();
            shapeFact.src = audioFact[index];
            shapeFact.play();  //play shape fact after shape name (if applicable)
        }
    });
    window.onload = function () {
        audioInstructions.play();
    }

    var colorPurple = '#cb3594';
    var colorGreen = '#659b41';
    var colorYellow = '#ffcf33';
    var colorBlue = '#0000ff';
    var colorBlack = '#000';
    var colorOrange = '#ffa500'
    var colorRed = '#ff0000';
    var toolEraser = 'eraser';
    var toolCrayon = 'crayon';
    var toolMarker = 'marker';
    var tool = new Audio(); //audio to play when a tool is selected
    var curColor = colorPurple;     //current color user is drawing with
    var clickColor = new Array();   //array of colors for clicks
    var curTool = toolCrayon;       //current tool user is drawing with
    var clickTool = new Array();    //array of tools used
    var clickX = new Array();       //array of X-coordinates
    var clickY = new Array();       //array of Y-coordinates
    var clickDrag = new Array();    //array of booleans indicating dragging motion
    var paint;                      //boolean to track if user is painting
    var base_image = new Image();   //coloring image

    //Get div that script is run in
    var canvasDiv = document.getElementById('BlocksGame');  //retrieve div to place elements into
    document.getElementById('BlocksGame').style.backgroundColor = '#fff68f'
    document.getElementById('BlocksGame').style.width = '88%';
    document.getElementById('BlocksGame').style.marginLeft = '1%';

    //Create canvas element inside div 
    canvas = document.createElement('canvas');
    canvas.width = canvasDiv.clientWidth * 200 / 390;
    canvas.height = canvasDiv.clientHeight * 400 / 480;
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d");
    document.getElementById("canvas").style.backgroundColor = '#fff';
    canvas.style.border = '1px solid #000';
    canvas.style.marginLeft = '27%';
    canvas.style.marginTop = '4%';

    //handle resizing canvas when window is resized
    function canvasResize() {
        canvas.width = canvasDiv.clientWidth * 200 / 390;
        canvas.height = canvasDiv.clientHeight * 400 / 480;
        redraw();
    }
    window.addEventListener("resize", canvasResize);

    //create toolbar buttons
    function initButtons() {
        //create div for tool buttons
        var buttonsDiv = document.createElement('div');
        buttonsDiv.style.position = 'absolute';
        buttonsDiv.style.top = '0';
        buttonsDiv.style.marginLeft = '13%';
        buttonsDiv.style.marginTop = '3%';
        buttonsDiv.style.width = '13.5%';
        buttonsDiv.style.height = '100%';
        canvasDiv.appendChild(buttonsDiv);

        //create buttons for tools
        var buttonPurple = document.createElement('button');
        buttonPurple.setAttribute('class', 'toolButton');
        buttonsDiv.appendChild(buttonPurple);
        buttonPurple.addEventListener('click', function () {
            tool.src = soundPath + 'purple_recording.mp3';
            tool.play();
            curColor = colorPurple;
            if (curTool == toolEraser)  //change tool back to crayon if eraser
                curTool = toolCrayon;
        });
        buttonPurple.style.backgroundImage = 'url(' + imagePath + 'purple-crayon.png)';
        buttonPurple.style.backgroundSize = 'cover';
        var linebreak1 = document.createElement('br');
        buttonsDiv.appendChild(linebreak1);
        var buttonGreen = document.createElement('button');
        buttonGreen.setAttribute('class', 'toolButton');
        buttonsDiv.appendChild(buttonGreen);
        buttonGreen.addEventListener('click', function () {
            tool.src = soundPath + 'green_recording.mp3';
            tool.play();
            curColor = colorGreen;
            if (curTool == toolEraser)  //change tool back to crayon if eraser
                curTool = toolCrayon;
        });
        buttonGreen.style.backgroundImage = 'url(' + imagePath + 'green-crayon.png)';
        buttonGreen.style.backgroundSize = 'cover';
        var linebreak2 = document.createElement('br');
        buttonsDiv.appendChild(linebreak2);

        var buttonYellow = document.createElement('button');
        buttonYellow.setAttribute('class', 'toolButton');
        buttonsDiv.appendChild(buttonYellow);
        buttonYellow.addEventListener('click', function () {
            tool.src = soundPath + 'yellow_recording.mp3';
            tool.play();
            curColor = colorYellow;
            if (curTool == toolEraser)  //change tool back to crayon if eraser
                curTool = toolCrayon;
        });
        buttonYellow.style.backgroundImage = 'url(' + imagePath + 'yellow-crayon.png)';
        buttonYellow.style.backgroundSize = 'cover';
        var linebreak3 = document.createElement('br');
        buttonsDiv.appendChild(linebreak3);
        var buttonBlue = document.createElement('button');
        buttonBlue.setAttribute('class', 'toolButton');
        buttonsDiv.appendChild(buttonBlue);
        buttonBlue.addEventListener('click', function () {
            tool.src = soundPath + 'blue_recording.mp3';
            tool.play();
            curColor = colorBlue;
            if (curTool == toolEraser)  //change tool back to crayon if eraser
                curTool = toolCrayon;
        });
        buttonBlue.style.backgroundImage = 'url(' + imagePath + 'blue-crayon.png)';
        buttonBlue.style.backgroundSize = 'cover';
        var linebreak4 = document.createElement('br');
        buttonsDiv.appendChild(linebreak4);

        var buttonBlack = document.createElement('button');
        buttonBlack.setAttribute('class', 'toolButton');
        buttonsDiv.appendChild(buttonBlack);
        buttonBlack.addEventListener('click', function () {
            tool.src = soundPath + 'black_recording.mp3';
            tool.play();
            curColor = colorBlack;
            if (curTool == toolEraser)  //change tool back to crayon if eraser
                curTool = toolCrayon;
        });
        buttonBlack.style.backgroundImage = 'url(' + imagePath + 'black-crayon.png)';
        buttonBlack.style.backgroundSize = 'cover';
        var linebreak5 = document.createElement('br');
        buttonsDiv.appendChild(linebreak5);

        var buttonOrange = document.createElement('button');
        buttonOrange.setAttribute('class', 'toolButton');
        buttonsDiv.appendChild(buttonOrange);
        buttonOrange.addEventListener('click', function () {
            tool.src = soundPath + 'orange_recording.mp3';
            tool.play();
            curColor = colorOrange;
            if (curTool == toolEraser)  //change tool back to crayon if eraser
                curTool = toolCrayon;
        });
        buttonOrange.style.backgroundImage = 'url(' + imagePath + 'orange-crayon.png)';
        buttonOrange.style.backgroundSize = 'cover';
        var linebreak6 = document.createElement('br');
        buttonsDiv.appendChild(linebreak6);

        var buttonRed = document.createElement('button');
        buttonRed.setAttribute('class', 'toolButton');
        buttonsDiv.appendChild(buttonRed);
        buttonRed.addEventListener('click', function () {
            tool.src = soundPath + 'red_recording.mp3';
            tool.play();
            curColor = colorRed;
            if (curTool == toolEraser)  //change tool back to crayon if eraser
                curTool = toolCrayon;
        });
        buttonRed.style.backgroundImage = 'url(' + imagePath + 'red-crayon.png)';
        buttonRed.style.backgroundSize = 'cover';
        var linebreak7 = document.createElement('br');
        buttonsDiv.appendChild(linebreak7);

        var buttonCrayon = document.createElement('button');
        buttonCrayon.setAttribute('class', 'toolButton');
        buttonsDiv.appendChild(buttonCrayon);
        buttonCrayon.addEventListener('click', function () {
            tool.src = soundPath + 'crayon_recording.mp3';
            tool.play();
            curTool = toolCrayon;
        });
        buttonCrayon.style.backgroundImage = 'url(' + imagePath + 'crayon-image.jpg)';
        buttonCrayon.style.backgroundSize = 'cover';
        var linebreak8 = document.createElement('br');
        buttonsDiv.appendChild(linebreak8);

        var buttonMarker = document.createElement('button');
        buttonMarker.setAttribute('class', 'toolButton');
        buttonsDiv.appendChild(buttonMarker);
        buttonMarker.addEventListener('click', function () {
            tool.src = soundPath + 'marker_recording.mp3';
            tool.play();
            curTool = toolMarker;
        });
        buttonMarker.style.backgroundImage = 'url(' + imagePath + 'marker-image.jpg)';
        buttonMarker.style.backgroundSize = 'cover';
        var linebreak9 = document.createElement('br');
        buttonsDiv.appendChild(linebreak9);

        var buttonEraser = document.createElement('button');
        buttonEraser.setAttribute('class', 'toolButton');
        buttonsDiv.appendChild(buttonEraser);
        buttonEraser.addEventListener('click', function () {
            tool.src = soundPath + 'eraser_recording.mp3';
            tool.play();
            curTool = toolEraser;
        });
        buttonEraser.style.backgroundImage = 'url(' + imagePath + 'eraser-image.png)';
        buttonEraser.style.backgroundSize = 'cover';
        var linebreak10 = document.createElement('br');
        buttonsDiv.appendChild(linebreak10);
        var buttonDone = document.createElement('button');
        buttonDone.setAttribute('class', 'toolButton');
        buttonsDiv.appendChild(buttonDone);
        buttonDone.addEventListener('click', function () {
            //Play end of game audio, save score to html element, and call end of game function
            var endOfGame = new Audio();
            endOfGame.src = soundPath + "praise_recording.mp3";
            endOfGame.addEventListener('ended', function () {
                var repeatName = new Audio();
                repeatName.src = audioClips[index];
                repeatName.play();
            });
            endOfGame.play();
            document.getElementById('score').value = 2; //save score in html element
            EndofGame(); //function displays good job message and returns to map
        });
        buttonDone.style.backgroundImage = 'url(' + imagePath + 'done-image.jpg)';
        buttonDone.style.backgroundSize = 'cover';

        //style button elements
        var buttons = document.getElementsByClassName('toolButton');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundRepeat = 'no-repeat';
            buttons[i].style.backgroundPosition = 'center';
            buttons[i].style.backgroundColor = '#fff';
            buttons[i].style.width = '70%';
            buttons[i].style.height = '5%';
            buttons[i].style.marginTop = '3%';
            buttons[i].style.marginLeft = '17%';
        }
        buttons[0].style.marginTop = '10%';
        buttons[buttons.length - 1].style.marginTop = '30%';
        buttons[buttons.length - 1].style.marginLeft = '18%';
        buttonDone.style.height = '15%';
        buttonDone.style.width = '65%';
        buttonDone.style.borderRadius = '50%';
    }

    //add coloring outline image
    base_image.src = ShapeImages[index];
    drawImage();

    //add down press movements to array and redraw
    press = function (e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        paint = true;   //indicate that user is painting
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    };
    //add drag movements to array and redraw
    drag = function (e) {
        var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
        mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
				
        if (paint) {
            addClick(mouseX, mouseY, true);
            redraw();
        }
        // Prevent the whole page from dragging if on mobile
        e.preventDefault();
    };
    //set paint to false when user releases mouse or touch
    release = function (e) {
        paint = false;
        redraw();
    };
    //set paint to false when user leaves canvas
    cancel = function (e) {
        paint = false;
    };
    //add coordinates and dragging boolean to arrays
    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
        clickTool.push(curTool);
        if (curTool == toolEraser) {
            clickColor.push('#fff');
        } else {
            clickColor.push(curColor);
        }
    }
    // Add mouse event listeners to canvas element
    canvas.addEventListener("mousedown", press, false);
    canvas.addEventListener("mousemove", drag, false);
    canvas.addEventListener("mouseup", release);
    canvas.addEventListener("mouseout", cancel, false);

    // Add touch event listeners to canvas element
    canvas.addEventListener("touchstart", press, false);
    canvas.addEventListener("touchmove", drag, false);
    canvas.addEventListener("touchend", release, false);
    canvas.addEventListener("touchcancel", cancel, false);

    //redraw canvas
    function redraw() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        context.lineJoin = "round";
        context.lineWidth = 20;
        context.save();

        for (var i = 0; i < clickX.length; i++) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            if (clickTool[i] == toolCrayon) {
                context.globalAlpha = 0.4;
            }
            else {
                context.globalAlpha = 1;
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.strokeStyle = clickColor[i];
            context.stroke();
        }

        context.restore();  //don't erase background image, only coloring
        context.globalAlpha = 1;
        //redraw coloing image
        if (index == 5 || index == 7)    //for oval and rectangle, change position and size
            context.drawImage(base_image, context.canvas.width * .1, context.canvas.height * .2, context.canvas.width * .8, context.canvas.height * .6);
        else
            context.drawImage(base_image, context.canvas.width * .1, context.canvas.height * .1, context.canvas.width * .8, context.canvas.height * .8);

    }
    //draw the coloring image
    function drawImage() {
        context.globalAlpha = 1;
        base_image.onload = function () {
            if (index == 5 || index == 7)    //for oval and rectangle, change position and size
                context.drawImage(base_image, context.canvas.width * .1, context.canvas.height * .2, context.canvas.width * .8, context.canvas.height * .6);
            else
                context.drawImage(base_image, context.canvas.width * .1, context.canvas.height * .1, context.canvas.width * .8, context.canvas.height * .8);
        }
    }
    initButtons(); //initalize buttons

    //initalize and play background music
    var backgroundMusic = new Audio();
    backgroundMusic.src = soundPath + "background_music.mp3";
    if (toggle_music == "False") {
        backgroundMusic.play();
        backgroundMusic.volume = .15;
    }
    //loop background music
    backgroundMusic.addEventListener('ended', function () {
        if (toggle_music == "False") {
            backgroundMusic.play();
            backgroundMusic.volume = .15;
        }
    })
}());
