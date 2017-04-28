(function () {
    //set correct margin for div
    document.getElementById('BlocksGame').style.marginLeft = '-5%';

    var difficulty_level = document.getElementById('minigameScript').getAttribute('difficulty');
    var toggle_sound = document.getElementById('minigameScript').getAttribute('toggleSound');
    var toggle_music = document.getElementById('minigameScript').getAttribute('toggleMusic');

    var imagePath = '../../MiniGames/Alphabet_Bubblepop/images/';
    var soundPath = '../../MiniGames/Alphabet_BubblePop/sounds/';
    var audioClips;
    var bubbleImages;
    var b1, b2, b3, b4, b5, b6, audioInstructions, popped, bubbles_sound, backgroundMusic, endOfGame; //audio

    if(difficulty_level == 2) {
        audioClips = [soundPath + "d_recording.mp3", soundPath + "j_recording.mp3", soundPath + "k_recording.mp3",
            soundPath + "l_recording.mp3", soundPath + "n_recording.mp3", soundPath + "q_recording.mp3",
            soundPath + "u_recording.mp3", soundPath + "v_recording.mp3", soundPath + "w_recording.mp3",
            soundPath + "x_recording.mp3", soundPath + "y_recording.mp3", soundPath + "z_recording.mp3",
            soundPath + "e_recording.mp3"];
    
        bubbleImages = [imagePath + "d_bubble.png", imagePath + "j_bubble.png", imagePath + "k_bubble.png",
            imagePath + "l_bubble.png", imagePath + "n_bubble.png", imagePath + "q_bubble.png",
            imagePath + "u_bubble.png", imagePath + "v_bubble.png", imagePath + "w_bubble.png", imagePath + "x_bubble.png",
            imagePath + "y_bubble.png", imagePath + "z_bubble.png", imagePath + "e_bubble.png"];
    }
    else {
        //arrays containing paths to audio files and image files for bubbles
        audioClips = [soundPath + "a_recording.mp3", soundPath + "c_recording.mp3", soundPath + "i_recording.mp3",
            soundPath + "m_recording.mp3", soundPath + "p_recording.mp3", soundPath + "r_recording.mp3",
            soundPath + "s_recording.mp3", soundPath + "t_recording.mp3", soundPath + "b_recording.mp3",
            soundPath + "f_recording.mp3", soundPath + "o_recording.mp3", soundPath + "g_recording.mp3",
            soundPath + "h_recording.mp3"];

        bubbleImages = [imagePath + "a_bubble.png", imagePath + "c_bubble.png", imagePath + "i_bubble.png",
            imagePath + "m_bubble.png", imagePath + "p_bubble.png", imagePath + "r_bubble.png",
            imagePath + "s_bubble.png", imagePath + "t_bubble.png", imagePath + "b_bubble.png", imagePath + "f_bubble.png",
            imagePath + "o_bubble.png", imagePath + "g_bubble.png", imagePath + "h_bubble.png"];
    }
   
    //randomly choose target bubble
    var index6 = Math.floor((Math.random() * bubbleImages.length)); //random number for array index

    //randomly choose addition letters for game that aren't target and aren't duplicates
    var index1 = Math.floor((Math.random() * bubbleImages.length)); //random number for array index
    while (index1 == index6)
        var index1 = Math.floor((Math.random() * bubbleImages.length)); //random number for array index
    var index2 = Math.floor((Math.random() * bubbleImages.length)); //random number for array index
    while (index2 == index6 || index2 == index1)
        var index2 = Math.floor((Math.random() * bubbleImages.length)); //random number for array index
    var index3 = Math.floor((Math.random() * bubbleImages.length)); //random number for array index
    while (index3 == index6 || index3 == index1 || index3 == index2)
        var index3 = Math.floor((Math.random() * bubbleImages.length)); //random number for array index
    var index4 = Math.floor((Math.random() * bubbleImages.length)); //random number for array index
    while (index4 == index6 || index4 == index1 || index4 == index2 || index4 == index3)
        var index4 = Math.floor((Math.random() * bubbleImages.length)); //random number for array index
    var index5 = Math.floor((Math.random() * bubbleImages.length)); //random number for array index
    while (index5 == index6 || index5 == index1 || index5 == index2 || index5 == index3 || index5 == index4)
        var index5 = Math.floor((Math.random() * bubbleImages.length)); //random number for array index

    var game, images;
    var score = 0;

    //bubble sounds
    var createAudio = function () {
        b1 = new WebAudioAPISound(audioClips[index1], { loop: false });
        b1.setVolume(70);
        b2 = new WebAudioAPISound(audioClips[index2], { loop: false });
        b2.setVolume(70);
        b3 = new WebAudioAPISound(audioClips[index3], { loop: false });
        b3.setVolume(70);
        b4 = new WebAudioAPISound(audioClips[index4], { loop: false });
        b4.setVolume(70);
        b5 = new WebAudioAPISound(audioClips[index5], { loop: false });
        b5.setVolume(70);
        b6 = new WebAudioAPISound(audioClips[index6], { loop: false });
        b6.setVolume(70);
        audioInstructions = new WebAudioAPISound(soundPath + "BubblePopInstructions.mp3", { loop: false });
        audioInstructions.setVolume(70);
        audioInstructions.onEnded = instructionsEnded;
        popped = new WebAudioAPISound(soundPath + "bubble_pop.mp3", { loop: false });
        popped.setVolume(70);
        bubbles_sound = new WebAudioAPISound(soundPath + "bubbles.mp3", { loop: false });
        bubbles_sound.setVolume(40);
        endOfGame = new WebAudioAPISound(soundPath + "EndOfGame.mp3", {loop: false });
        endOfGame.setVolume(70);
        backgroundMusic = new WebAudioAPISound(soundPath + "background_music.mp3", { loop: true });
        backgroundMusic.setVolume(30);
        if(toggle_music == "False")
            backgroundMusic.play(backgroundMusic);
    }

    window.onload = function () {
        createAudio();  //call function to create audio
        audioInstructions.play(audioInstructions);
    }

    //play instructions for game
    instructionsEnded = function () {
        b6.play(b6);  //play target letter after instructions
    };

    //background image and bubble images
    images = {
        width: 1100,
        height: 600,
        bg: {
            src: imagePath + "ocean_background.png"
        },
        bubbles: [{
            name: "bubble1",
            slices: [{
                name: "b1",
                src: bubbleImages[index1]
            }]
        }, {
            name: "bubble2",
            slices: [{
                name: "b2",
                src: bubbleImages[index2]
            }]
        }, {
            name: "bubble3",
            slices: [{
                name: "b3",
                src: bubbleImages[index3]
            }]
        }, {
            name: "bubble4",
            slices: [{
                name: "b4",
                src: bubbleImages[index4]
            }]
        }, {
            name: "bubble5",
            slices: [{
                name: "b5",
                src: bubbleImages[index5]
            }]
        }, {
            name: "targetBubble",
            slices: [{
                name: "b6",
                src: bubbleImages[index6]
            }]
        }, {
            name: "targetBubble",
            slices: [{
                name: "b6",
                src: bubbleImages[index6]
            }]
        }, {
            name: "targetBubble",
            slices: [{
                name: "b6",
                src: bubbleImages[index6]
            }]
        }]
    };

    game = BLOCKS.game(images);   //add images to game

    //game flow, float bubble, tap bubble, pop bubble
    game.prepare = function () {
        var bg,
			index = 0,
			bubbles = [],
			top = -game.height * 2,

            //handle tapped bubbles, call popBubble function if target bubble, play sound for each tapped bubble
			gameTapped = function (point) {
			    var i;
			    for (i = 0; i < bubbles.length; i += 1) {
			        if (bubbles[i].isPointInside(point) && bubbles[i].name == "targetBubble") {
			            popped.play(popped);
			            bubbles[i].removeMotors();  //remove floating motion
			            game.addMotor("alpha", {    //add fading motion
			                object: bubbles[i],
			                duration: 3000,
			                amount: 1
			            });
			            score = score + 5;      //increment score for correct bubble
			            game.addTicker(popBubble, 500, bubbles[i]); //call function to pop bubble
			        }
			        else if (bubbles[i].isPointInside(point)) {
			            if (bubbles[i].name == "bubble1")
			                b1.play(b1);
			            else if (bubbles[i].name == "bubble2")
			                b2.play(b2);
			            else if (bubbles[i].name == "bubble3")
			                b3.play(b3);
			            else if (bubbles[i].name == "bubble4")
			                b4.play(b4);
			            else if (bubbles[i].name == "bubble5")
			                b5.play(b5);
			            score = score - 2;      //decrement score for incorrect bubble
			        }
			    }
			},
            //destory popped bubble, remove from memory
			popBubble = function (bubble) {
			    var i;
			    for (i = 0; i < bubbles.length; i += 1) {
			        if (bubble === bubbles[i]) {
			            bubbles.splice(i, 1);
			            break;
			        }
			    }
			    game.stage.removeView(bubble);
			    bubble.destroy();
			    bubble = null;
			},
            //add bubbles to game screen and float upward on y-axis
			floatBubbles = function () {

			    var bubble,

                //randomly select a bubble from array of bubbles and add to game view
				bubble = BLOCKS.block(images.bubbles[Math.floor(Math.random() * images.bubbles.length)]);
			    bubble.layer = game.layers[2];
			    game.stage.addView(bubble);
			    bubbles.push(bubble);

			    //randomly start bubble along bottom of screen
			    bubble.x = Math.random() * (game.width - bubble.width);
			    bubble.y = game.height + bubble.height;
			    game.addMotor("y", {    //float upward until reaches top of screen
			        object: bubble,
			        duration: 20000,
			        amount: top
			    });

			    game.addTicker(moveLeft, 6000, bubble);   //move to left
			    game.addTicker(moveRight, 3000, bubble);  //move to right
			    game.addTicker(floatBubbles, 1100); //add another bubble every 1100ms
			},
            moveLeft = function (bubble) {    //move bubble to the left
                game.addMotor("x", {
                    object: bubble,
                    duration: 8000,
                    amount: -Math.random() * ((game.width - bubble.width)/3)
                });
            },
            moveRight = function (bubble) {  //move bubble to the right
                game.addMotor("x", {
                    object: bubble,
                    duration: 8000,
                    amount: -Math.random() * ((game.width - bubble.width)/3)
                });
            };

        //add background to bottom layer of game
		bg = BLOCKS.slice(images.bg);
        bg.layer = game.layers[0];
        game.stage.addView(bg);

        //add an event listener for bubble taps
        game.controller.addEventListener("tap", gameTapped);

        floatBubbles();

        //play bubbles sound effect sound every 10000 ms if sound not toggled off
        setInterval(function () {
            if (toggle_sound == "False") 
            {
                bubbles_sound.play(bubbles_sound);
            }
         }, 10000);

        //end the game after time interval
        setTimeout(function GameOver() {
            endOfGame.play(endOfGame);

            var finalScore; //calculate final score
            if (score >= 60)
                finalScore = 5;
            else if (score >= 30)
                finalScore = 3;
            else if (score >= 10)
                finalScore = 0;
            else
                finalScore = -5;
            document.getElementById('score').value = finalScore; //save score in html element
            EndofGame(); //function displays good job message and returns to map
        }, 60000);
    };
}());