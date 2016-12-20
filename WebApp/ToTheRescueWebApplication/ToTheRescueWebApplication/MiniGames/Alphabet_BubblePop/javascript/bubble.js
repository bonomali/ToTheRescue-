(function () {
    var audioClips = ["../../MiniGames/Alphabet_BubblePop/sounds/a_recording.mp3", "../../MiniGames/Alphabet_BubblePop/sounds/c_recording.mp3",
    "../../MiniGames/Alphabet_BubblePop/sounds/i_recording.mp3", "../../MiniGames/Alphabet_BubblePop/sounds/m_recording.mp3",
    "../../MiniGames/Alphabet_BubblePop/sounds/p_recording.mp3", "../../MiniGames/Alphabet_BubblePop/sounds/r_recording.mp3",
    "../../MiniGames/Alphabet_BubblePop/sounds/s_recording.mp3", "../../MiniGames/Alphabet_BubblePop/sounds/t_recording.mp3",
    "../../MiniGames/Alphabet_BubblePop/sounds/b_recording.mp3", "../../MiniGames/Alphabet_BubblePop/sounds/f_recording.mp3"];

    var bubbleImages = ["../../MiniGames/Alphabet_Bubblepop/images/a_bubble.png", "../../MiniGames/Alphabet_Bubblepop/images/c_bubble.png",
    "../../MiniGames/Alphabet_Bubblepop/images/i_bubble.png", "../../MiniGames/Alphabet_Bubblepop/images/m_bubble.png",
    "../../MiniGames/Alphabet_Bubblepop/images/p_bubble.png", "../../MiniGames/Alphabet_Bubblepop/images/r_bubble.png",
    "../../MiniGames/Alphabet_Bubblepop/images/s_bubble.png", "../../MiniGames/Alphabet_Bubblepop/images/t_bubble.png",
    "../../MiniGames/Alphabet_Bubblepop/images/b_bubble.png", "../../MiniGames/Alphabet_Bubblepop/images/f_bubble.png"];

    //randomly choose letters for game
    var index1 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index
    var index2 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index
    var index3 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index
    var index4 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index
    var index5 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index
    var index6 = Math.floor((Math.random() * 10) + 1) - 1; //random number between 1 and 10, sub 1 for array index

    var game, spec;
    var score = 0;

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
    audioInstructions.src = "../../MiniGames/Alphabet_BubblePop/sounds/BubblePopInstructions.mp3"

    //play generic instructions for game
    audioInstructions.addEventListener('ended', function () {
        b6.play();  //play target letter after generic instructions
    });
    audioInstructions.play();

    spec = {
		width: 1100,
		height: 600,
		bg: {
		    src: "../../MiniGames/Alphabet_BubblePop/images/ocean_background.png"
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
    
	game = BLOCKS.game(spec);
    
    game.prepare = function () {
    
		var bg, 
			index = 0, 
			bubbles = [],
			top = -game.height * 2,
			
			gameTapped = function (point) {
			    var i;
				for (i = 0; i < bubbles.length; i += 1) {
				    if (bubbles[i].isPointInside(point) && bubbles[i].name == "targetBubble") {
				        b6.play();
						bubbles[i].removeMotors();
						game.addMotor("alpha", {
							object: bubbles[i],
							duration: 3000,
							amount: 1
						});
						score = score + 5;
						game.addTicker(popBubble, 500, bubbles[i]);
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
					    score = score - 2;
					}
				}
			},
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
			floatBubbles = function () {

				var bubble,

				bubble = BLOCKS.block(spec.bubbles[Math.floor(Math.random() * spec.bubbles.length)]);
				bubble.layer = game.layers[2];
				game.stage.addView(bubble);
				bubbles.push(bubble);

				bubble.x = Math.random() * (game.width - bubble.width);
				bubble.y = game.height + bubble.height;
				game.addMotor("y", {
					object: bubble,
					duration: 20000,
					amount: top
				});
				
				game.addTicker(floatBubbles, 1100);
			};

		bg = BLOCKS.slice(spec.bg);
		bg.layer = game.layers[0];
		game.stage.addView(bg);
		
		game.controller.addEventListener("tap", gameTapped);
		
		floatBubbles();

		setTimeout(function GameOver() {
		    var endOfGame = new Audio();
		    endOfGame.src = "../../MiniGames/Alphabet_BubblePop/sounds/EndOfGame.mp3";
		    endOfGame.play();
		    document.getElementById('score').value = score; //save score in html element
		    EndofGame(); //function displays good job message and returns to map
		}, 60000);
    };
}());