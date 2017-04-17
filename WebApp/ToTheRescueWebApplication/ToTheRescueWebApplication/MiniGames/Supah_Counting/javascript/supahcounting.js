(function () {
    //set correct margin for div
    document.getElementById('BlocksGame').style.marginLeft = '-5%';


    var difficulty_level = document.getElementById('minigameScript').getAttribute('difficulty');
    var imagePath = '../../MiniGames/Supah_Counting/images/';
    var audioPath = '../../MiniGames/Supah_Counting/sounds/';
    var numbers;
    var numberPlacement;
    var score = 5;
    var game, images;

    //Change game length for difficulty. 
    if (difficulty_level == 1) {
        numbers = [1, 2, 3, 4, 5];
    }
    else {
        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }

    //So things aren't too easy.
    function shuffle(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    }
    function sprite(options) {

        var that = {};

        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;

        return that;
    }

    numberPlacement = numbers;
    shuffle(numberPlacement);

    images = {
        width: 1100,
        height: 600,
        bg: {
            src: imagePath + "Background.png"
        },
        ground: {
            src: imagePath + "Ground.png"
        },
        numberTiles: [{
            name: "1",
            slices: [{
                name: "1",
                src: imagePath + "letter_1.png"
            }]
        }, {
            name: "2",
            slices: [{
                name: "2",
                src: imagePath + "letter_2.png"
            }]
        }, {
            name: "3",
            slices: [{
                name: "3",
                src: imagePath + "letter_3.png"
            }]
        }, {
            name: "4",
            slices: [{
                name: "4",
                src: imagePath + "letter_4.png"
            }]
        }, {
            name: "5",
            slices: [{
                name: "5",
                src: imagePath + "letter_5.png"
            }]
        }, {
            name: "6",
            slices: [{
                name: "6",
                src: imagePath + "letter_6.png"
            }]
        }, {
            name: "7",
            slices: [{
                name: "7",
                src: imagePath + "letter_7.png"
            }]
        }, {
            name: "8",
            slices: [{
                name: "8",
                src: imagePath + "letter_8.png"
            }]
        }, {
            name: "9",
            slices: [{
                name: "9",
                src: imagePath + "letter_9.png"
            }]
        }, {
            name: "10",
            slices: [{
                name: "10",
                src: imagePath + "letter_10.png"
            }]
        }]
    };

    game = BLOCKS.game(images);

    game.prepare = function () {
        var bg,
            clock,
            ground,
            index = 1,
            numberTiles = [],
            top = -game.height * 2,
            notMario,

            gameTapped = function (point) {
                var i;
                for (i = (index - 1) ; i < numberTiles.length; i += 1) {

                    if (numberTiles[i].isPointInside(point) && (parseInt(numberTiles[i].name) == index)) {
                        if (!responsiveVoice.isPlaying()) {
                            responsiveVoice.speak("Good Job");
                        }
                        numberTiles[i].removeMotors();

                        game.addMotor("x", {
                            object: numberTiles[i],
                            x: (numberTiles[i].x - 550),
                            duration: 2000,
                            amount: (560 - numberTiles[i].x - (numberTiles[i].width / 2))
                        });

                        if (index == numberTiles.length) {
                            game.addMotor("y", {
                                object: numberTiles[i],
                                duration: 4000,
                                amount: (game.height - numberTiles[i].y - (numberTiles[i].height / 1.2)),
                                y: game.height
                            });
                            setTimeout(function GameWon() {
                                var marioMoving = game.addMotor("x", {
                                    object: notMario,
                                    x: (notMario.x - 1300),
                                    duration: 4000,
                                    amount: (1300 - notMario.x - (notMario.width / 2))
                                });
                                responsiveVoice.speak("Congratulations. You saved not-mario.");

                                var finalScore; //calculate final score
                                if (score >= 5)
                                    finalScore = 5;
                                else if (score >= 3)
                                    finalScore = 3;
                                else if (score >= 1)
                                    finalScore = 0;
                                else
                                    finalScore = -5;
                                document.getElementById('score').value = finalScore;
                                EndofGame();
                            }, 4000);
                        }
                        else {
                            game.addMotor("y", {
                                object: numberTiles[i],
                                duration: 4000,
                                amount: (game.height - numberTiles[i].y - (numberTiles[i].height / 2.5)),
                                y: game.height
                            });
                            index += 1;
                        }
                    }
                    else if (numberTiles[i].isPointInside(point)) {
                        console.log(numberTiles[i].name + " == " + index);
                        if (!responsiveVoice.isPlaying()) {
                            responsiveVoice.speak("Try Another");
                        }
                        score = score - 1;
                    }
                }
            },
            addNumberTiles = function () {

                var numberTile;
                for (i = 0; i < numbers.length; i += 1) {
                    numberTile = BLOCKS.block(images.numberTiles[i]);
                    numberTile.layer = game.layers[1];
                    numberTile.width = 135;
                    numberTile.height = 135;

                    game.stage.addView(numberTile);
                    numberTiles.push(numberTile);

                    if (numberPlacement[i] > 5) {
                        numberTile.y = (numberTile.height) * 2 - (game.height / 6);
                        numberTile.x = ((numberPlacement[i] - 5) * (numberTile.height + (game.width / 30))) - (game.width / 30);
                    }
                    else {
                        numberTile.y = numberTile.height - (game.height / 5);
                        numberTile.x = ((numberPlacement[i]) * (numberTile.height + (game.width / 30))) - (game.width / 30);
                    }
                }

                notMario = BLOCKS.slice({
                    layer: game.layers[3],
                    imageSrc: imagePath + "char_slice.png",
                    numberOfFrames: 3,
                    loop: true,
                    x: (game.width / 8),
                    y: (45 * game.height / 64)
                });
            };

        bg = BLOCKS.slice(images.bg);
        bg.layer = game.layers[0];
        game.stage.addView(bg);

        ground = BLOCKS.slice(images.ground);
        ground.layer = game.layers[2];
        game.stage.addView(ground);

        game.controller.addEventListener("tap", gameTapped);

        responsiveVoice.OnVoiceReady = function () {
            console.log("speech time?");
            responsiveVoice.speak("Oh no, not-mario is stuck. Build a bridge for him to get across by clicking the blocks in order, starting at 1.");
        };


        addNumberTiles();

        // Create a clock to animate not-mario.
        clock = BLOCKS.clock();
        clock.addEventListener("tick", function () {
            notMario.update();
            if (notMario.dirty) {
                game.layers[3].clear();
            }
            notMario.render();
        });
        clock.start();

        var marioMoving = game.addMotor("x", {
            object: notMario,
            x: (notMario.x - 550),
            duration: 2000,
            amount: (400 - notMario.x - (notMario.width / 2))
        });

        window.onbeforeunload = function () {
            console.log("Throwing responsive voice under a bus.");
            responsiveVoice.cancel();
        };

        //They don't complete the game. 
        setTimeout(function GameOver() {
            console.log("Game has passed two minutes: Failed.");
            responsiveVoice.speak("Good Attempt.");
            var finalScore = -5;
            document.getElementById('score').value = finalScore; 
            EndofGame(); 
        }, 120000);
    };
}());