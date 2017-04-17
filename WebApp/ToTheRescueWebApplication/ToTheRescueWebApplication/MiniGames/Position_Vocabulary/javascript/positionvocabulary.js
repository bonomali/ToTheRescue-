(function () {
    //set correct margin for div
    document.getElementById('BlocksGame').style.marginLeft = '-5%';


    var difficulty_level = document.getElementById('minigameScript').getAttribute('difficulty');
    var imagePath = '../../MiniGames/Position_Vocabulary/images/';
    var audioPath = '../../MiniGames/Position_Vocabulary/sounds/';
    var position = {};
    var positionPlacement;
    var score = 0;
    var game, images;

    function sprite(options) {

        var that = {};

        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;

        return that;
    }
    function shuffle(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    }

    positionPlacement = [0, 1, 2, 3, 4, 5];



    images = {
        width: 1100,
        height: 600,
        bg: {
            src: imagePath + "Background.png"
        },
        positionTiles: [{
            name: "above",
            slices: [{
                name: "front",
                src: imagePath + "above.png",
            }]
        }, {
            name: "behind",
            slices: [{
                name: "front",
                src: imagePath + "behind.png",
            }]
        }, {
            name: "below",
            slices: [{
                name: "front",
                src: imagePath + "below.png",
            }]
        }, {
            name: "in front of",
            slices: [{
                name: "front",
                src: imagePath + "front.png",
            }]
        }, {
            name: "to the left of",
            slices: [{
                name: "front",
                src: imagePath + "left.png",
            }]
        }, {
            name: "to the right of",
            slices: [{
                name: "front",
                src: imagePath + "right.png",
            }]
        }],
        backTiles: [{
            name: "above",
            slices: [{
                name: "front",
                src: imagePath + "above_1.png",
            }]
        }, {
            name: "behind",
            slices: [{
                name: "front",
                src: imagePath + "behind_1.png",
            }]
        }, {
            name: "below",
            slices: [{
                name: "front",
                src: imagePath + "below_1.png",
            }]
        }, {
            name: "in front of",
            slices: [{
                name: "front",
                src: imagePath + "front_1.png",
            }]
        }, {
            name: "to the left of",
            slices: [{
                name: "front",
                src: imagePath + "left_1.png",
            }]
        }, {
            name: "to the right of",
            slices: [{
                name: "front",
                src: imagePath + "right_1.png",
            }]
        }]
    };

    game = BLOCKS.game(images);

    game.prepare = function () {
        var bg,
            clock = BLOCKS.clock(),
            ground,
            positionTiles = [],
            top = -game.height * 2,
            current,

            gameTapped = function (point) {
                console.log(positionTiles.length);
                if (current.isPointInside(point)) {
                    responsiveVoice.cancel();
                    responsiveVoice.speak("Find the image where timmy is " + current.name + " the tree.");
                }
                for (i = 0 ; i < positionTiles.length; i += 1) {
                    if (positionTiles[i].isPointInside(point) && (positionTiles[i].name == current.name)) {
                        responsiveVoice.speak("Great Job!");
                        score += 1;
                        console.log("Score: " + score);
                        editBoard();
                    }
                    else
                    if (positionTiles[i].isPointInside(point)) {
                        console.log("Derp");
                        if (!responsiveVoice.isPlaying()) {
                            responsiveVoice.cancel();
                            responsiveVoice.speak("Timmy is " + positionTiles[i].name + " this tree. Try another.");
                        }
                    }
                }                
            },
            setupBoard = function () {                
                var positionTile, winner = Math.floor(Math.random() * 3);
                shuffle(positionPlacement);
                current = BLOCKS.block(images.positionTiles[positionPlacement[winner]]);
                current.layer = game.layers[1];
                current.width = 350;
                current.height = 175;
                current.y = current.height - 50;
                current.x = (game.width / 1.89) - (0.5 * current.width);
                responsiveVoice.cancel();
                responsiveVoice.speak("Find the image where timmy is " + current.name + " the tree.");
                game.stage.addView(current);
                for (i = 0; i < 3; i += 1) {
                    positionTile = BLOCKS.block(images.backTiles[positionPlacement[i]]);
                    positionTile.layer = game.layers[1];
                    positionTile.width = 300;
                    positionTile.height = 150;
                    positionPlacement

                    game.stage.addView(positionTile);
                    positionTiles.push(positionTile);

                    positionTile.y = positionTile.height + (game.height / 2.45);
                    positionTile.x = ((i) * ((positionTile.width) + (game.width / 40))) + (game.width / 14);

                }
                
            },
            editBoard = function () {
                var positionTile, winner = Math.floor(Math.random() * 3);
                shuffle(positionPlacement);
                game.stage.removeView(current);
                current = BLOCKS.block(images.positionTiles[positionPlacement[winner]]);
                current.layer = game.layers[1];
                current.width = 350;
                current.height = 175;
                current.y = current.height - 50;
                current.x = (game.width / 1.89) - (0.5 * current.width);
                game.stage.addView(current);
                responsiveVoice.cancel();
                responsiveVoice.speak("Find the image where timmy is " + current.name + " the tree.");
                
                for (i = 0; i < 3; i += 1) {
                    game.stage.removeView(positionTiles[i]);
                }
                positionTiles = []
                for (i = 0; i < 3; i += 1) {

                    positionTile = BLOCKS.block(images.backTiles[positionPlacement[i]]);
                    positionTile.layer = game.layers[1];
                    positionTile.width = 300;
                    positionTile.height = 150;
                    positionPlacement

                    game.stage.addView(positionTile);
                    positionTiles.push(positionTile);

                    positionTile.y = positionTile.height + (game.height / 2.45);
                    positionTile.x = ((i) * ((positionTile.width) + (game.width / 40))) + (game.width / 14);

                }

            };

        bg = BLOCKS.slice(images.bg);
        bg.layer = game.layers[0];
        game.stage.addView(bg);
        

        responsiveVoice.OnVoiceReady = function () {
            console.log("speech time?");
            responsiveVoice.setDefaultVoice("US English Female");
            setupBoard();
            game.controller.addEventListener("tap", gameTapped);
        };

        window.onbeforeunload = function () {
            console.log("Throwing responsive voice under a bus.");
            responsiveVoice.cancel();
        };

        setTimeout(function GameOver() {
            console.log("Game has passed a minute.");
            responsiveVoice.speak("Thanks for playing.");
            if (score > 5) {
                score = 5;
            }
            console.log("Score: " + score);
            document.getElementById('score').value = score;
            EndofGame();
        }, 60000);
    };
}());