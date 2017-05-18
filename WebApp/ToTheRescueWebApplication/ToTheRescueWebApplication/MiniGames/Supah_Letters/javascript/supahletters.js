(function () {
    //set correct margin for div
    document.getElementById('BlocksGame').style.marginLeft = '-5%';

    var toggle_sound = document.getElementById('minigameScript').getAttribute('toggleSound');
    var toggle_music = document.getElementById('minigameScript').getAttribute('toggleMusic');
    var difficulty_level = document.getElementById('minigameScript').getAttribute('difficulty');
    var imagePath = '../../MiniGames/Supah_Letters/images/';
    var audioPath = '../../MiniGames/Supah_Letters/sounds/';
    var backgroundMusic;
    var score = 0;
    var game, images;
    var letters = [];
    var difficultyLength;

    //Change game length for difficulty. 
    if (difficulty_level == 2) {
        difficultyLength = 10;
    }
    else {
        difficultyLength = 5;
    }

    //Generating X letters from the alphabet with no repeats. Javascript is pretty clean. 
    for (var i = 0; i < difficultyLength; i++) {
        var toBeAdded
        do {
            toBeAdded = Math.floor(Math.random() * 26);
        }
        while (letters.some(function (currentValue) { return currentValue == toBeAdded; }));
        letters.push(toBeAdded);
    }

    //Lots of images for this one, because I prefer clean coins. 
    images = {
        width: 1100,
        height: 600,
        bg: { src: imagePath + "Background.png" },
        ground: { src: imagePath + "Ground.png" },
        ghosts: [
            { name: "0", slices: [{ name: "0", src: imagePath + "ghost_normal.png" }, 
            { name: "1", src: imagePath + "ghost_dead.png" }, 
            { name: "2", src: imagePath + "ghost.png" }] }],
        coins: [
            { name: "A", slices: [{ name: "A", src: imagePath + "coinA.png" }] },
            { name: "B", slices: [{ name: "B", src: imagePath + "coinB.png" }] },
            { name: "C", slices: [{ name: "C", src: imagePath + "coinC.png" }] },
            { name: "D", slices: [{ name: "D", src: imagePath + "coinD.png" }] },
            { name: "E", slices: [{ name: "E", src: imagePath + "coinE.png" }] },
            { name: "F", slices: [{ name: "F", src: imagePath + "coinF.png" }] },
            { name: "G", slices: [{ name: "G", src: imagePath + "coinG.png" }] },
            { name: "H", slices: [{ name: "H", src: imagePath + "coinH.png" }] },
            { name: "I", slices: [{ name: "I", src: imagePath + "coinI.png" }] },
            { name: "J", slices: [{ name: "J", src: imagePath + "coinJ.png" }] },
            { name: "K", slices: [{ name: "K", src: imagePath + "coinK.png" }] },
            { name: "L", slices: [{ name: "L", src: imagePath + "coinL.png" }] },
            { name: "M", slices: [{ name: "M", src: imagePath + "coinM.png" }] },
            { name: "N", slices: [{ name: "N", src: imagePath + "coinN.png" }] },
            { name: "O", slices: [{ name: "O", src: imagePath + "coinO.png" }] },
            { name: "P", slices: [{ name: "P", src: imagePath + "coinP.png" }] },
            { name: "Q", slices: [{ name: "Q", src: imagePath + "coinQ.png" }] },
            { name: "R", slices: [{ name: "R", src: imagePath + "coinR.png" }] },
            { name: "S", slices: [{ name: "S", src: imagePath + "coinS.png" }] },
            { name: "T", slices: [{ name: "T", src: imagePath + "coinT.png" }] },
            { name: "U", slices: [{ name: "U", src: imagePath + "coinU.png" }] },
            { name: "V", slices: [{ name: "V", src: imagePath + "coinV.png" }] },
            { name: "W", slices: [{ name: "W", src: imagePath + "coinW.png" }] },
            { name: "X", slices: [{ name: "X", src: imagePath + "coinX.png" }] },
            { name: "Y", slices: [{ name: "Y", src: imagePath + "coinY.png" }] },
            { name: "Z", slices: [{ name: "Z", src: imagePath + "coinZ.png" }] }
        ],
        crate: { name: "crate", src: imagePath + "crate.png" }
    };

    game = BLOCKS.game(images);

    game.prepare = function () {
        var bg,
            clock,
            ground,
            crate,
            coin,
            index = 1,
            coinTiles = [],
            ghostTiles = [],
            coinSound = new WebAudioAPISound(audioPath + "coin.wav", { loop: false }),
            crateSound = new WebAudioAPISound(audioPath + "icecrash.ogg", { loop: false }),
            top = -game.height * 2,
            marioSlower = 0,
            notMario = BLOCKS.slice({
                layer: game.layers[3], imageSrc: imagePath + "char_slice.png",
                numberOfFrames: 3, loop: true, x: (game.width / 3), y: (45 * game.height / 64)
            }),
            gameTapped = function (point) {
                var i;
                if (coin.isPointInside(point)) {
                    responsiveVoice.speak("NotMario's coins have the letter " + coin.name);
                }
                else {
                    for (i = (index - 1) ; i < coinTiles.length; i += 1) {
                        if ((ghostTiles[i].isPointInside(point) | coinTiles[i].isPointInside(point))
                            && coinTiles[i].name == coin.name && ghostTiles[i].name == "0") {
                            score += 1;
                            ghostTiles[i].name = "1";
                            ghostTiles[i].setSlice("1");
                            game.addTicker(ghostSad, 200, ghostTiles[i]);
                            if (toggle_sound == "False") {
                                coinSound.play(coinSound);
                            }
                            coinTiles[i].removeMotors();
                            game.addMotor("y", {    //move upward until reaches top of screen
                                object: coinTiles[i],
                                duration: 1000,
                                amount: crate.y - coinTiles[i].y
                            });
                            game.addMotor("x", {
                                object: coinTiles[i],
                                x: (coinTiles[i].x - 525),
                                duration: 500,
                                amount: (525 - coinTiles[i].x - (coinTiles[i].width / 2))
                            });
                            game.addTicker(wiggleRight, 1000, crate);
                            game.addTicker(wiggleLeft, 1100, crate);
                            game.addTicker(wiggleLeft, 1200, crate);
                            game.addTicker(wiggleRight, 1300, crate);
                            game.addTicker(cratePlay, 1000);
                        }
                        else if (ghostTiles[i].isPointInside(point) && ghostTiles[i].name == "1") {
                            responsiveVoice.speak("Poor Ghost.");
                        }
                        else if (ghostTiles[i].isPointInside(point) | coinTiles[i].isPointInside(point)) {
                            responsiveVoice.speak("That coin has the letter " + coinTiles[i].name);
                        }
                    }
                }
            },
            wiggleRight = function (crate) { game.addMotor("rotate", { object: crate, duration: 100, amount: 5 }); },
            wiggleLeft = function (crate) { game.addMotor("rotate", { object: crate, duration: 100, amount: -5 }); },
            cratePlay = function () { crateSound.play(crateSound); },
            ghostSad = function (ghost) { ghost.setSlice("2"); };
            addGhosts = function () {
            var ghost;
            var coin;
            ghost = BLOCKS.block(images.ghosts[0]);
            coin = BLOCKS.block(images.coins[letters[Math.floor(Math.random() * difficultyLength)]]);
            ghost.layer = game.layers[2];
            coin.layer = game.layers[2];
            coin.width = ghost.width;
            coin.height = ghost.width;
            game.stage.addView(ghost);
            game.stage.addView(coin);
            ghostTiles.push(ghost);
            coinTiles.push(coin);

            var startPos = (Math.random() * (35 * game.height / 64)) + coin.height;
            ghost.x = 0;
            ghost.y = startPos;
            coin.x = 0;
            coin.y = startPos - ghost.width;
            var ghostDuration;
            if (difficulty_level > 1) {
                game.addTicker(addGhosts, 800);
                ghostDuration = 11000;
            }
            else {
                game.addTicker(addGhosts, 1100);
                ghostDuration = 15000;
            };
            game.addMotor("x", {
                object: ghost,
                duration: ghostDuration,
                amount: 2000
            });
            game.addMotor("x", {
                object: coin,
                duration: ghostDuration,
                amount: 2000
            });
        }

        bg = BLOCKS.slice(images.bg);
        bg.layer = game.layers[0];
        game.stage.addView(bg);

        ground = BLOCKS.slice(images.ground);
        ground.layer = game.layers[1];
        game.stage.addView(ground);

        //Setup crate for coin to rest on.
        crate = BLOCKS.slice(images.crate);
        crate.layer = game.layers[4];
        game.stage.addView(crate);
        crate.height = 96;
        crate.width = 96;
        crate.x = (28 * game.width / 64);
        crate.y = (48 * game.height / 64);

        //Initialize Example Coin.
        coin = BLOCKS.block(images.coins[letters[1]]);
        coin.layer = game.layers[4];
        game.stage.addView(coin);
        coin.height = 82;
        coin.width = 82;
        coin.x = (57 * game.width / 128);
        coin.y = (42 * game.height / 64);

        backgroundMusic = new WebAudioAPISound(audioPath + "menu.mp3", { loop: true });
        coinSound.setVolume(50);
        crateSound.setVolume(50);
        backgroundMusic.setVolume(5);
        if (toggle_music === "False") {
            //play background music
            backgroundMusic.play(backgroundMusic);
        }

        game.controller.addEventListener("tap", gameTapped);
        addGhosts();

        responsiveVoice.OnVoiceReady = function () {
            console.log("speech time?");
            responsiveVoice.setDefaultVoice("US English Female");
            responsiveVoice.speak("Oh no, ghosts have stolen not-mario's coins.");
            responsiveVoice.speak("Click the ghosts with coins that contain the letter " + coin.name);
        };

        // Create a clock to animate not-mario.
        clock = BLOCKS.clock();

        clock.addEventListener("tick", function () {
            if (marioSlower > 1) {
                notMario.update();
                if (notMario.dirty) {
                    game.layers[3].clear();
                }
                notMario.render();
                marioSlower = 0;
            }
            else {
                marioSlower++;
            }
        });
        clock.start();


        window.onbeforeunload = function () {
            console.log("Throwing responsive voice under a bus.");
            responsiveVoice.cancel();
        };

        //They don't complete the game. 
        setTimeout(function GameOver() {
            console.log("Game has passed two minutes.");
            console.log("Final Score = " + score);

            var finalScore;
            if (score >= 10) {
                responsiveVoice.speak("Great Job!");
                finalScore = 5;
            }
            else if (score >= 5) {
                responsiveVoice.speak("Good Job.");
                finalScore = 3;
            }
            else {
                responsiveVoice.speak("Good Attempt.");
                finalScore = 0;
            }
            document.getElementById('score').value = finalScore;
            EndofGame();
        }, 120000);
    };
}());