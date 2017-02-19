(function () {
    var toggle_music = document.getElementById('minigameScript').getAttribute('toggleMusic');
    var imagePath = '../../MiniGames/Number_Tracing/images/';
    var soundPath = '../../MiniGames/Number_Tracing/sounds/';

    var difficulty_level = document.getElementById('minigameScript').getAttribute('difficulty');
    var audioClips;
    var tracingImages;

    if (difficulty_level == 2) {
        audioClips = [soundPath + "eleven_recording.mp3", soundPath + "twelve_recording.mp3", soundPath + "thirteen_recording.mp3",
             soundPath + "fourteen_recording.mp3", soundPath + "fifteen_recording.mp3", soundPath + "sixteen_recording.mp3",
             soundPath + "seventeen_recording.mp3", soundPath + "eighteen_recording.mp3", soundPath + "nineteen_recording.mp3",
             soundPath + "twenty_recording.mp3"];

        tracingImages = [imagePath + "eleven_tracing.png", imagePath + "twelve_tracing.png", imagePath + "thirteen_tracing.png",
             imagePath + "fourteen_tracing.png", imagePath + "fifteen_tracing.png", imagePath + "sixteen_tracing.png",
             imagePath + "seventeen_tracing.png", imagePath + "eighteen_tracing.png", imagePath + "nineteen_tracing.png",
             imagePath + "twenty_tracing.png"];
    }
    else {
        //arrays containing paths to audio files and image files for number outlines
        var audioClips = [soundPath + "zero_recording.mp3", soundPath + "one_recording.mp3", soundPath + "two_recording.mp3", soundPath + "three_recording.mp3",
            soundPath + "four_recording.mp3", soundPath + "five_recording.mp3", soundPath + "six_recording.mp3",
            soundPath + "seven_recording.mp3", soundPath + "eight_recording.mp3", soundPath + "nine_recording.mp3",
            soundPath + "ten_recording.mp3"];

        var tracingImages = [imagePath + "zero_tracing.png", imagePath + "one_tracing.png", imagePath + "two_tracing.png", imagePath + "three_tracing.png",
            imagePath + "four_tracing.png", imagePath + "five_tracing.png", imagePath + "six_tracing.png",
            imagePath + "seven_tracing.png", imagePath + "eight_tracing.png", imagePath + "nine_tracing.png",
            imagePath + "ten_tracing.png"];
    }
   
    //randomly choose index for tracing number
    var index = Math.floor((Math.random() * tracingImages.length)); //random number for array index

    //play audio instructions and number to trace
    var audioInstructions = new Audio();
    audioInstructions.src = soundPath + "audio_instructions.mp3";
    audioInstructions.addEventListener('ended', function () {
        var numberAudio = new Audio();
        numberAudio.src = audioClips[index];
        numberAudio.play();  
    });
    audioInstructions.play();

    var curColor = '#000';          //color user is drawing with
    var clickX = new Array();       //array of X-coordinates
    var clickY = new Array();       //array of Y-coordinates
    var clickDrag = new Array();    //array of booleans indicating dragging motion
    var paint;                      //boolean to track if user is painting
    var base_image = new Image();   //coloring image

    //Get div that script is run in
    var canvasDiv = document.getElementById('BlocksGame');  //retrieve div to place elements into
    document.getElementById('BlocksGame').style.backgroundColor = '#FF69B4'
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

        //create retry button
        var buttonRetry = document.createElement('button');
        buttonRetry.setAttribute('class', 'toolButton');
        buttonsDiv.appendChild(buttonRetry);
        buttonRetry.addEventListener('click', function () {
            clickX.length = 0;  //clear recorded clicks from arrays and redraw
            clickY.length = 0;
            clickDrag.length = 0;
            redraw();
        });
        buttonRetry.style.backgroundImage = 'url(' + imagePath + 'eraser-image.png)';

        //create done button
        var buttonDone = document.createElement('button');
        buttonDone.setAttribute('class', 'toolButton');
        buttonsDiv.appendChild(buttonDone);
        buttonDone.addEventListener('click', function () {
            //Play end of game audio, save score to html element, and call end of game function
            var endOfGame = new Audio();
            endOfGame.src = soundPath + "praise_recording.mp3";
            endOfGame.play();
            document.getElementById('score').value = 2; //save score in html element
            EndofGame(); //function displays good job message and returns to map
        });
        buttonDone.style.backgroundImage = 'url(' + imagePath + 'done-image.jpg)';

        //style button elements
        var buttons = document.getElementsByClassName('toolButton');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundRepeat = 'no-repeat';
            buttons[i].style.backgroundPosition = 'center';
            buttons[i].style.backgroundColor = '#fff';
            buttons[i].style.width = '70%';
            buttons[i].style.height = '5%';
            buttons[i].style.marginTop = '10%';
            buttons[i].style.marginLeft = '17%';
        }
    }

    //add tracing image
    base_image.src = tracingImages[index];
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
        context.lineWidth = 10;
        context.save();

        for (var i = 0; i < clickX.length; i++) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.globalAlpha = 1;
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.strokeStyle = curColor;
            context.stroke();
        }

        context.restore();  //don't erase background image, only tracing
        context.globalAlpha = 1;
        //redraw tracing image
            context.drawImage(base_image, context.canvas.width * .1, context.canvas.height * .1, context.canvas.width * .8, context.canvas.height * .8);

    }
    //draw the tracing image
    function drawImage() {
        context.globalAlpha = 1;
        base_image.onload = function () {
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
    backgroundMusic.addEventListener("ended", function () {
        if (toggle_music == "False") {
            backgroundMusic.play();
            backgroundMusic.volume = .15;
        }
    })
}());
