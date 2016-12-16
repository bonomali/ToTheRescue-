(function () {
    var audioInstructions = new Audio();
    audioInstructions.src = "sounds/BubbleGameInstructions.m4a"
    audioInstructions.volume = 0.1;
    audioInstructions.play();
				
    var game, spec;
    var score = 0;

    var b1 = new Audio()
    b1.src = "sounds/a_recording.m4a"
    var b2 = new Audio()
    b2.src = "sounds/b_recording.m4a"
    var b3 = new Audio()
    b3.src = "sounds/c_recording.m4a"
    var b4 = new Audio()
    b4.src = "sounds/d_recording.m4a"
    var b5 = new Audio()
    b5.src = "sounds/e_recording.m4a"

    spec = {
		width: 800,
		height: 600,
		bg: {
		    src: "images/undersea.jpg"
		},
		bubbles:[{
			name: "bubble1",
			slices: [{
				name: "b1",
				src: "images/a_bubble.png"
			}]
		}, {
			name: "bubble2",
			slices: [{
				name: "b2",
				src: "images/b_bubble.png"
			}]
		}, {
			name: "bubble3",
			slices: [{
				name: "b3",
				src: "images/c_bubble.png"
			}]
		}, {
		    name: "bubble4",
		    slices: [{
		        name: "b4",
		        src: "images/d_bubble.png"
		    }]
		}, {
		    name: "targetBubble",
		    slices: [{
		        name: "b5",
		        src: "images/e_bubble.png"
		    }]
            }, {
		    name: "targetBubble",
		    slices: [{
		        name: "b5",
		        src: "images/e_bubble.png"
		    }]
            }, {
            name: "targetBubble",
            slices: [{
                name: "b5",
                src: "images/e_bubble.png"
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
					    b5.play();
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
		    endOfGame.src = "sounds/gameOver.m4a";
		    endOfGame.play();
		    alert("Game Over");
		}, 60000);
    };
}());