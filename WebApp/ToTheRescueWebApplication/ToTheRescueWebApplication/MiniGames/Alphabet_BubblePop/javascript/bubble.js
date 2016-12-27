(function () {
    //set correct margin for div
    document.getElementById('BlocksGame').style.marginLeft = '-5%';

    var imagePath = '../../MiniGames/Alphabet_Bubblepop/images/';
    var audioPath = '../../MiniGames/Alphabet_BubblePop/sounds/';

    //arrays containing paths to audio files and image files for bubbles
    var audioClips = [audioPath + "a_recording.mp3", audioPath + "c_recording.mp3", audioPath + "i_recording.mp3",
        audioPath + "m_recording.mp3", audioPath + "p_recording.mp3", audioPath + "r_recording.mp3",
        audioPath + "s_recording.mp3", audioPath + "t_recording.mp3", audioPath + "b_recording.mp3",
        audioPath + "f_recording.mp3"];

    var bubbleImages = [imagePath + "a_bubble.png", imagePath + "c_bubble.png", imagePath + "i_bubble.png",
        imagePath + "m_bubble.png", imagePath + "p_bubble.png", imagePath + "r_bubble.png",
        imagePath + "s_bubble.png", imagePath + "t_bubble.png", imagePath + "b_bubble.png", imagePath + "f_bubble.png"];

    
    //randomly choose target bubble
    var index6 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index

    //randomly choose addition letters for game that aren't target and aren't duplicates
    var index1 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index
    while (index1 == index6)
        var index1 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index
    var index2 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index
    while (index2 == index6 || index2 == index1)
        var index2 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index
    var index3 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index
    while (index3 == index6 || index3 == index1 || index3 == index2)
        var index3 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index
    var index4 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index
    while (index4 == index6 || index4 == index1 || index4 == index2 || index4 == index3)
        var index4 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index
    var index5 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index
    while(index5 == index6 || index5 == index1 || index5 == index2 || index5 == index3 || index5 == index4)
        var index5 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index

    var game, spec;
    var score = 0;

    //bubble sounds
    var b1 = new Audio()
    b1.src = audioClips[index1];
    var b2 = new Audio()
    b2.src = audioClips[index2];
    var b3 = new Audio()
    b3.src = audioClips[index3];
    var b4 = new Audio()
    b4.src = audioClips[index4];
    var b5 = new Audio()
    b5.src = audioClips[index5];
    var b6 = new Audio()                //target letter
    b6.src = audioClips[index6];

    var audioInstructions = new Audio();
    audioInstructions.src = audioPath + "BubblePopInstructions.mp3"

    //play generic instructions for game
    audioInstructions.addEventListener('ended', function () {
        b6.play();  //play target letter after generic instructions
    });
    audioInstructions.play();

    //background image and bubble images
    spec = {
		width: 1100,
		height: 600,
		bg: {
		    src: imagePath + "ocean_background.png"
		},
		bubbles:[{
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
    
	game = BLOCKS.game(spec);   //add images to game
    
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
				        b6.play();
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
					        b1.play();
					    else if (bubbles[i].name == "bubble2")
					        b2.play();
					    else if (bubbles[i].name == "bubble3")
					        b3.play();
					    else if (bubbles[i].name == "bubble4")
					        b4.play();
					    else if (bubbles[i].name == "bubble5")
					        b5.play();
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
				bubble = BLOCKS.block(spec.bubbles[Math.floor(Math.random() * spec.bubbles.length)]);
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
				
				game.addTicker(floatBubbles, 1100); //add another bubble every 1100ms
			};

        //add background to bottom layer of game
		bg = BLOCKS.slice(spec.bg);
		bg.layer = game.layers[0];
		game.stage.addView(bg);
		
        //add an event listener for bubble taps
		game.controller.addEventListener("tap", gameTapped);
		
		floatBubbles();

        //end the game after time interval
		setTimeout(function GameOver() {
		    var endOfGame = new Audio();
		    endOfGame.src = audioPath + "EndOfGame.mp3";
		    endOfGame.play();
		    document.getElementById('score').value = score; //save score in html element
		    EndofGame(); //function displays good job message and returns to map
		}, 60000);
    };
}());