(function () {
    //set correct margin for div
    document.getElementById('BlocksGame').style.marginLeft = '-5%';
    document.getElementById('BlocksGame').style.marginTop = '2.5%';

    var toggle_music = document.getElementById('minigameScript').getAttribute('toggleMusic');
    var difficulty = document.getElementById('minigameScript').getAttribute('difficulty');

    var imagePath = "../../MiniGames/PetShopCounting/images/";
    var soundPath = "../../MiniGames/PetShopCounting/sounds/";
    var game, images, sign1, sign2, sign3;
    var ranPuppies, ranKittens, ranHamsters; //random num animals
    var puppies = [];  //arrays of animals
    var kittens = [];
    var hamsters = [];
    var signs = []; //list of signs
    var targetSign; //name of target sign
    var MAXPETS = 6;
    var MAXSIGNS = 11;
    var score = 0;      //player's score
    var roundCounter;   //keep track of round 
    var instructions, correctAudio, incorrectAudio, roundAudio;

    var createAudio = function () {
        instructions = new WebAudioAPISound(soundPath + "intro_recording.mp3", { loop: false });
        instructions.setVolume(90);
        instructions.onEnded = instructionsEnded;
        correctAudio = new WebAudioAPISound(soundPath + "praise_recording.mp3", { loop: false });
        correctAudio.setVolume(90);
        correctAudio.onEnded = correctAudioEnded;
        incorrectAudio = new WebAudioAPISound(soundPath + "tryAgain_recording.mp3", { loop: false });
        incorrectAudio.setVolume(90);
        backgroundMusic = new WebAudioAPISound(soundPath + "background_music.mp3", { loop: true });
        backgroundMusic.setVolume(20);
        if (toggle_music == "False")
            backgroundMusic.play(backgroundMusic);
    }

    window.onload = function () {
        createAudio();  //call function to create audio
        instructions.play(instructions);  //play audio instuctions
    }

    images = {
        width: 1100,
        height: 600,
        bg: {
            src: imagePath + "background.png"
        },
        puppy1: {
            src: imagePath + "puppy1.png"
        },
        puppy2: {
            src: imagePath + "puppy2.png"
        },
        puppy3: {
            src: imagePath + "puppy3.png"
        },
        kitten1: {
            src: imagePath + "kitten1.png"
        },
        kitten2: {
            src: imagePath + "kitten2.png"
        },
        kitten3: {
            src: imagePath + "kitten3.png"
        },
        hamster1: {
            src: imagePath + "hamster1.png"
        },
        hamster2: {
            src: imagePath + "hamster2.png"
        },
        signImages: [{
            name: "signs",
            slices: [{
                name: "zero",
                src: imagePath + "sign_0.png"
            }, {
                name: "one",
                src: imagePath + "sign_1.png"
            }, {
                name: "two",
                src: imagePath + "sign_2.png"
            }, {
                name: "three",
                src: imagePath + "sign_3.png"
            }, {
                name: "four",
                src: imagePath + "sign_4.png"
            }, {
                name: "five",
                src: imagePath + "sign_5.png"
            }, {
                name: "six",
                src: imagePath + "sign_6.png"
            }, {
                name: "seven",
                src: imagePath + "sign_7.png"
            }, {
                name: "eight",
                src: imagePath + "sign_8.png"
            }, {
                name: "nine",
                src: imagePath + "sign_9.png"
            }, {
                name: "ten",
                src: imagePath + "sign_10.png"
            }]
        }],
    }
    game = BLOCKS.game(images);   //add images to game

    game.prepare = function () {
        var bg;

        generateAnimals();  //generate animals

        //add background to bottom layer of game
        bg = BLOCKS.slice(images.bg);
        bg.layer = game.layers[1];
        game.stage.addView(bg);
    },
    //generate animals
    generateAnimals = function () {
        var ranImage;  //random number

        //generate random number of each animal
        ranPuppies = Math.floor((Math.random() * MAXPETS));
        ranKittens = Math.floor((Math.random() * MAXPETS));
        ranHamsters = Math.floor((Math.random() * MAXPETS));

        //generate puppies and add to view
        for (var i = 0; i < ranPuppies; i++) {
            var puppy;
            ranImage = Math.floor((Math.random() * 3))
            if (ranImage == 1)
                puppy = BLOCKS.slice(images.puppy1);
            else if (ranImage == 2)
                puppy = BLOCKS.slice(images.puppy2);
            else
                puppy = BLOCKS.slice(images.puppy3);
            puppy.layer = game.layers[2];
            game.stage.addView(puppy);
            puppy.x = Math.random() * (game.width - puppy.width);
            puppy.y = game.height - puppy.height * 2.5;
            for (var i = 0; i < puppies.length; i++) {  //try to avoid collisions
                if (puppy.isRectInside(puppies[i])) {
                    puppy.x = Math.random() * (game.width - puppy.width);
                    i = -1; //collision found, start checking from beginning
                }
            }
            puppies.push(puppy);
        }
        //generate kittens
        for (var i = 0; i < ranKittens; i++) {
            var kitten;
            ranImage = Math.floor((Math.random() * 3))
            if (ranImage == 1)
                kitten = BLOCKS.slice(images.kitten1);
            else if (ranImage == 2)
                kitten = BLOCKS.slice(images.kitten2);
            else
                kitten = BLOCKS.slice(images.kitten3);
            kitten.layer = game.layers[3];
            game.stage.addView(kitten);
            kitten.x = Math.random() * (game.width - kitten.width);
            kitten.y = game.height - kitten.height * 2.25;
            for (var i = 0; i < kittens.length; i++) {  //try to avoid collisions
                if (kitten.isRectInside(kittens[i])) {
                    kitten.x = Math.random() * (game.width - kitten.width);
                    i = -1; //collision found, check from beginning
                }
            }
            kittens.push(kitten);
        }
        //generate hamsters
        for (var i = 0; i < ranHamsters; i++) {
            var hamster;
            ranImage = Math.floor((Math.random() * 2))
            if (ranImage == 1)
                hamster = BLOCKS.slice(images.hamster1);
            else
                hamster = BLOCKS.slice(images.hamster2);
            hamster.layer = game.layers[4];
            game.stage.addView(hamster);
            hamster.x = Math.random() * (game.width - hamster.width);
            hamster.y = game.height - hamster.height * 2;
            for (var i = 0; i < hamsters.length; i++) {  //try to avoid collisions
                if (hamster.isRectInside(hamsters[i])) {
                    hamster.x = Math.random() * (game.width - hamster.width);
                    i = -1; //collision found, check from beginning
                }
            }
            hamsters.push(hamster);
        }
    },
    //generate numbered signs
    generateSigns = function (num) {
        sign1 = BLOCKS.block(images.signImages[0])
        sign1.layer = game.layers[2];
        game.stage.addView(sign1);
        sign1.x = game.width / 2 - 75;
        setSign(sign1);  //call method to generate sign1
        signs.push(sign1);

        sign2 = BLOCKS.block(images.signImages[0])
        sign2.layer = game.layers[2];
        game.stage.addView(sign2);
        sign2.x = game.width / 2 - 350;
        setSign(sign2);  //call method to generate sign2
        signs.push(sign2);

        sign3 = BLOCKS.block(images.signImages[0])
        sign3.layer = game.layers[2];
        game.stage.addView(sign3);
        sign3.x = game.width / 2 + 200;
        setSign(sign3);  //call method to generate sign3
        signs.push(sign3);

        //randomly choose a target sign and set
        var target = Math.floor((Math.random() * 3))
        if (target == 1)
            setSign(sign1, num);
        else if (target == 2)
            setSign(sign2, num);
        else
            setSign(sign3, num);
    },
    //set numbered signs and target sign
    setSign = function (sign, num) {
        if(num == null)
            random = Math.floor((Math.random() * MAXSIGNS))
        else
            random = num;

        if (random == 0) {
            sign.setSlice("zero");
            targetSign = "zero";
        }
        else if (random == 1) {
            sign.setSlice("one");
            targetSign = "one";
        }
        else if (random == 2) {
            sign.setSlice("two");
            targetSign = "two";
        }
        else if (random == 3) {
            sign.setSlice("three");
            targetSign = "three";
        }
        else if (random == 4) {
            sign.setSlice("four");
            targetSign = "four";
        }
        else if (random == 5) {
            sign.setSlice("five");
            targetSign = "five";
        }
        else if (random == 6) {
            sign.setSlice("six");
            targetSign = "six";
        }
        else if (random == 7) {
            sign.setSlice("seven");
            targetSign = "seven";
        }
        else if (random == 8) {
            sign.setSlice("eight");
            targetSign = "eight";
        }
        else if (random == 9) {
            sign.setSlice("nine");
            targetSign = "nine";
        }
        else if (random == 10) {
            sign.setSlice("ten");
            targetSign = "ten";
        }
    },
    //handle sign tapped event
    signTapped = function (point) {
        var found = false;
        var i;
        for (i = 0; i < signs.length && found == false; i += 1) {
            name = signs[i].getSlice().name;
            if (signs[i].isPointInside(point) && name == targetSign) {
                score = score + 5;
                found = true;
                roundCounter = roundCounter + 1;
                signs.length = 0;   //clear contents of sign array
                correctAudio.play(correctAudio);
            }
        }
        if (found == false) {
            for(var i = 0; i < signs.length; i++)
            {
                if (signs[i].isPointInside(point)) {
                    score = score - 2;  //decrement score for incorrect sign
                    incorrectAudio.play(incorrectAudio);
                }
            }
        }
    },
    //count puppies
    roundOne = function () {
        roundAudio = new WebAudioAPISound(soundPath + "round1_recording.mp3", { loop: false });
        roundAudio.setVolume(90);
        roundAudio.play(roundAudio);
        generateSigns(ranPuppies);    //call method to generate signs
    },
    //count kittens
    roundTwo = function () {
        roundAudio = new WebAudioAPISound(soundPath + "round2_recording.mp3", { loop: false });
        roundAudio.setVolume(90);
        roundAudio.play(roundAudio);
        generateSigns(ranKittens);    //call method to generate signs
    },
    //count hamsters
    roundThree = function () {
        roundAudio = new WebAudioAPISound(soundPath + "round3_recording.mp3", { loop: false });
        roundAudio.setVolume(90);
        roundAudio.play(roundAudio);
        generateSigns(ranHamsters);    //call method to generate signs
    }
    //count puppies and kittens
    roundFour = function () {
        if (ranPuppies + ranKittens < MAXSIGNS) {
            roundAudio = new WebAudioAPISound(soundPath + "round4_recording.mp3", { loop: false });
            roundAudio.setVolume(90);
            roundAudio.play(roundAudio);
            generateSigns(ranPuppies + ranKittens)  //call method to generate signs
        }
        else
            GameOver();
    }
    //count kittens and hamsters
    roundFive = function () {
        if (ranKittens + ranHamsters < MAXSIGNS) {
            roundAudio = new WebAudioAPISound(soundPath + "round5_recording.mp3", { loop: false });
            roundAudio.setVolume(90);
            roundAudio.play(roundAudio);
            generateSigns(ranKittens + ranHamsters)  //call method to generate signs
        }
        else
            GameOver();
    }
    //count puppies and hamsters
    roundSix = function () {
        if (ranPuppies + ranHamsters < MAXSIGNS) {
            roundAudio = new WebAudioAPISound(soundPath + "round6_recording.mp3", { loop: false });
            roundAudio.setVolume(90);
            roundAudio.play(roundAudio);
            generateSigns(ranPuppies + ranHamsters)  //call method to generate signs
        }
        else
            GameOver();
    }
    //count all animals
    roundSeven = function () {
        if (ranPuppies + ranKittens + ranHamsters < MAXSIGNS) {
            roundAudio = new WebAudioAPISound(soundPath + "round7_recording.mp3", { loop: false });
            roundAudio.setVolume(90);
            roundAudio.play(roundAudio);
            generateSigns(ranPuppies + ranKittens + ranHamsters)  //call method to generate signs
        }
        else
            GameOver();
    }
    //add an event listener for sign taps
    game.controller.addEventListener("tap", signTapped);

    instructionsEnded = function () {
        //set round counter to one and start round
        roundCounter = 1;
        roundOne(); 
    };
    correctAudioEnded = function () {
        if (roundCounter == 2)
            roundTwo(); //call method to start round 2
        else if (roundCounter == 3)
            roundThree(); //call method to start round 3
        else if (roundCounter == 4 && difficulty == 2)
            roundFour(); //call method to start round 4
        else if (roundCounter == 5 && difficulty == 2)
            roundFive(); //call method to start round 5
        else if (roundCounter == 6 && difficulty == 2)
            roundSix(); //call method to start round 6
        else if (roundCounter == 7 && difficulty == 2)
            roundSeven(); //call method to start round 7
        else
            GameOver();   //call method to end game
    };

    //end the game
    GameOver = function() {
        var finalScore; //calculate final score
        var gameOverAudio = new WebAudioAPISound(soundPath + "gameOver_recording.mp3", { loop: false });
        gameOverAudio.setVolume(90);
        gameOverAudio.play(gameOverAudio);

        if (difficulty == 2) {
            if (score >= 28)
                finalScore = 5;
            else if (score >= 20)
                finalScore = 3;
            else if (score >= 15)
                finalScore = 0;
            else
                finalScore = -5;
        }
        else
        {
            if (score >= 13)
                finalScore = 5;
            else if (score >= 10)
                finalScore = 3;
            else if (score >= 5)
                finalScore = 0
            else
                finalScore = -5;
        }
        document.getElementById('score').value = finalScore; //save score in html element
        EndofGame(); //function displays good job message and returns to map
    }
}());