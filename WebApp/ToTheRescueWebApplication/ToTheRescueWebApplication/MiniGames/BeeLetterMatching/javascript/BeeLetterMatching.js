(function () {
    //set correct margin for div
    document.getElementById('BlocksGame').style.marginLeft = '-5%';
    document.getElementById('BlocksGame').style.marginTop = '1%';

    var toggle_music = document.getElementById('minigameScript').getAttribute('toggleMusic');
    var toggle_sound = document.getElementById('minigameScript').getAttribute('toggleSound');
    var difficulty = document.getElementById('minigameScript').getAttribute('difficulty');
    var playing = true; //keep track of if game is currently playable or over

    var imagePath = "../../MiniGames/BeeLetterMatching/images/";
    var soundPath = "../../MiniGames/BeeLetterMatching/sounds/";
    var soundPath1 = "../../MiniGames/Alphabet_BubblePop/sounds/";

    var bg, bee, hive1, hive2, hive3, targetHive;
    var ran1, ran2, ran3, ranbee;
    var ranHives = [];
    var hiveList = [];
    var score = 0;
    var buzzing_sound, instructions, praise, try_again;
    var praise_played = false;

    //difficulty level 2
    if (difficulty == 2) {
        bees = [imagePath + "dbee.png", imagePath + "ebee.png", imagePath + "jbee.png", imagePath + "kbee.png", imagePath + "lbee.png",
        imagePath + "nbee.png", imagePath + "qbee.png", imagePath + "ubee.png", imagePath + "vbee.png", imagePath + "wbee.png",
        imagePath + "xbee.png", imagePath + "ybee.png", imagePath + "zbee.png"];

        hives = [imagePath + "Dhive.png", imagePath + "Ehive.png", imagePath + "Jhive.png", imagePath + "Khive.png", imagePath + "Lhive.png",
        imagePath + "Nhive.png", imagePath + "Qhive.png", imagePath + "Uhive.png", imagePath + "Vhive.png", imagePath + "Whive.png",
        imagePath + "Xhive.png", imagePath + "Yhive.png", imagePath + "Zhive.png"];

        letterSounds = [soundPath1 + "d_recording.mp3", soundPath1 + "e_recording.mp3", soundPath1 + "j_recording.mp3",
        soundPath1 + "k_recording.mp3", soundPath1 + "l_recording.mp3", soundPath1 + "n_recording.mp3", soundPath1 + "q_recording.mp3",
        soundPath1 + "u_recording.mp3", soundPath1 + "v_recording.mp3", soundPath1 + "w_recording.mp3", soundPath1 + "x_recording.mp3",
        soundPath1 + "y_recording.mp3", soundPath1 + "z_recording.mp3"];
    }
    //difficulty level 1
    else {
        bees = [imagePath + "abee.png", imagePath + "bbee.png", imagePath + "fbee.png", imagePath + "gbee.png", imagePath + "hbee.png",
        imagePath + "obee.png", imagePath + "sbee.png", imagePath + "cbee.png", imagePath + "ibee.png", imagePath + "mbee.png",
        imagePath + "pbee.png", imagePath + "rbee.png", imagePath + "tbee.png"];

        hives = [imagePath + "Ahive.png", imagePath + "Bhive.png", imagePath + "Fhive.png", imagePath + "Ghive.png", imagePath + "Hhive.png",
        imagePath + "Ohive.png", imagePath + "Shive.png", imagePath + "Chive.png", imagePath + "Ihive.png", imagePath + "Mhive.png",
        imagePath + "Phive.png", imagePath + "Rhive.png", imagePath + "Thive.png"];

        letterSounds = [soundPath1 + "a_recording.mp3", soundPath1 + "b_recording.mp3", soundPath1 + "f_recording.mp3",
        soundPath1 + "g_recording.mp3", soundPath1 + "h_recording.mp3", soundPath1 + "o_recording.mp3", soundPath1 + "s_recording.mp3",
        soundPath1 + "c_recording.mp3", soundPath1 + "i_recording.mp3", soundPath1 + "m_recording.mp3", soundPath1 + "p_recording.mp3",
        soundPath1 + "r_recording.mp3", soundPath1 + "t_recording.mp3"];
    }

    createAudio = function () {
        buzzing_sound = new WebAudioAPISound(soundPath + "buzzing_sound.mp3", { loop: false });
        buzzing_sound.setVolume(70);
        instructions = new WebAudioAPISound(soundPath + "audio_instructions.mp3", { loop: false });
        instructions.setVolume(70);
        instructions.onEnded = instructionsEnded;
        praise = new WebAudioAPISound(soundPath + "praise_recording.mp3", { loop: false });
        praise.onEnded = praiseEnded;
        try_again = new WebAudioAPISound(soundPath + "tryAgain_recording.mp3", { loop: false });
        try_again.setVolume(70);
        backgroundMusic = new WebAudioAPISound(soundPath + "background_music.mp3", { loop: true });
        backgroundMusic.setVolume(10);
        if (toggle_music == "False")
            backgroundMusic.play(backgroundMusic);
    }

    window.onload = function () {
        createAudio();  //call function to create audio
        instructions.play(instructions);  //play audio instuctions
        praise.setVolume(.1);
    }

    images = {
        width: 1100,
        height: 600,
        bg: {
            src: imagePath + "background.jpg"
        },
        hiveImages: [{
            name: "hive",
            slices: [{
                name: "0",
                src: hives[0]
            }, {
                name: "1",
                src: hives[1]
            }, {
                name: "2",
                src: hives[2]
            }, {
                name: "3",
                src: hives[3]
            }, {
                name: "4",
                src: hives[4]
            }, {
                name: "5",
                src: hives[5]
            }, {
                name: "6",
                src: hives[6]
            }, {
                name: "7",
                src: hives[7]
            }, {
                name: "8",
                src: hives[8]
            }, {
                name: "9",
                src: hives[9]
            }, {
                name: "10",
                src: hives[10]
            }, {
                name: "11",
                src: hives[11]
            }, {
                name: "12",
                src: hives[12]
            }]
        }],
        beeImages: [{
            name: "bee",
            slices: [{
                name: "0",
                src: bees[0]
            }, {
                name: "1",
                src: bees[1]
            }, {
                name: "2",
                src: bees[2]
            }, {
                name: "3",
                src: bees[3]
            }, {
                name: "4",
                src: bees[4]
            }, {
                name: "5",
                src: bees[5]
            }, {
                name: "6",
                src: bees[6]
            }, {
                name: "7",
                src: bees[7]
            }, {
                name: "8",
                src: bees[8]
            }, {
                name: "9",
                src: bees[9]
            }, {
                name: "10",
                src: bees[10]
            }, {
                name: "11",
                src: bees[11]
            }, {
                name: "12",
                src: bees[12]
            }]
        }]
    }
    game = BLOCKS.game(images);   //add images to game

    game.prepare = function () {
        //add bumble bee with lowercase letter
        bee = BLOCKS.block(images.beeImages[0]);;
        bee.layer = game.layers[2];
        bee.y = 50;
        bee.x = game.width / 2 - 50;
        game.stage.addView(bee);

        //add hives with uppercase letters
        hive1 = BLOCKS.block(images.hiveImages[0]);;
        hive1.layer = game.layers[1];
        game.stage.addView(hive1);
        hive1.y = game.height - hive1.height - 10;
        hive1.x = 50;
        hiveList.push(hive1);

        hive2 = BLOCKS.block(images.hiveImages[0]);;
        hive2.layer = game.layers[1];
        game.stage.addView(hive2);
        hive2.y = game.height - hive2.height - 10;
        hive2.x = hive2.width + 90;
        hiveList.push(hive2);

        hive3 = BLOCKS.block(images.hiveImages[0]);;
        hive3.layer = game.layers[1];
        game.stage.addView(hive3);
        hive3.y = game.height - hive3.height - 10;
        hive3.x = hive3.width * 2 + 120;
        hiveList.push(hive3);

        //add background to bottom layer of game
        bg = BLOCKS.slice(images.bg);
        bg.layer = game.layers[0];
        game.stage.addView(bg);

        gameSet();  //generate random hives and bee
        moveBee();  //move bee to left and right
    },

    //generate random letter hives and a bee to match one hive
    gameSet = function () {
        //randomly choose hives that aren't duplicates
        ran1 = Math.floor((Math.random() * hives.length)); //random number for hive
        ran2 = Math.floor((Math.random() * hives.length)); //random number for hive
        while (ran2 == ran1)
            ran2 = Math.floor((Math.random() * hives.length)); //random number for hive
        ran3 = Math.floor((Math.random() * hives.length)); //random number for hive
        while (ran3 == ran1 || ran3 == ran2)
            ran3 = Math.floor((Math.random() * hives.length)); //random number hive
        ranHives.length = 0;    //clear list
        ranHives.push(ran1);    //add new random hives to list
        ranHives.push(ran2);
        ranHives.push(ran3);

        ranbee = Math.floor((Math.random() * ranHives.length));   //random bee that matches a hive

        //set random slices for hives and matching bee
        bee.setSlice(ranHives[ranbee].toString());

        hive1.setSlice(ran1.toString());
        hive2.setSlice(ran2.toString());
        hive3.setSlice(ran3.toString());

        if (ranbee == 0)
            targetHive = hive1.getSlice().name;
        else if (ranbee == 1)
            targetHive = hive2.getSlice().name;
        else
            targetHive = hive3.getSlice().name;

        praise_played = false;
    },

    //handle hive tapped events
    hiveTapped = function (point) {
        instructions.stop();
        var found = false;
        var i;
        for (i = 0; i < hiveList.length && found == false; i += 1) {
            name = hiveList[i].getSlice().name;
            if (hiveList[i].isPointInside(point) && name == targetHive) {
                score = score + 5;
                found = true;
                bee.x = hiveList[i].x;
                bee.y = hiveList[i].y;
            }
        }
        if (found == true && praise_played == false) {
            praise.play(praise);
            praise_played = true;
        }
        if (found == false && playing == true) {
            for (var i = 0; i < hiveList.length; i++) {
                if (hiveList[i].isPointInside(point)) {
                    try_again.play(try_again);
                    score = score - 2;  //decrement score for incorrect sign
                }
            }
        }
    },

     moveLeft = function (bee) {    //move bee to the left a random amount
         game.addMotor("x", {
             object: bee,
             duration: 4000,
             amount: -Math.random() * (game.width/3 - bee.width)
         });
     },
     moveRight = function (bee) {  //move bee to the right a random amount
         game.addMotor("x", {
             object: bee,
             duration: 4000,
             amount: Math.random() * (game.width/4 - bee.width)
         });
     },

    moveBee = function() {
        game.addTicker(moveLeft, 2000, bee);   //move to left
        game.addTicker(moveRight, 1000, bee);  //move to right
    };

    setInterval(moveBee, 5000); // Time in milliseconds

    //add an event listener for hive taps
    game.controller.addEventListener("tap", hiveTapped);
 
    //play buzzing sound effect sound every 10000 ms if sound not toggled off
    setInterval(function () {
        if (toggle_sound == "False") {
            buzzing_sound.play(buzzing_sound);
        }
    }, 10000);

    praiseEnded = function () {
        if (playing == true) {
            gameSet();  //generate new random hives
            bee.y = 50; //reset bee's position
            bee.x = game.width / 2 - 50;
            instructions.play(instructions);    //play audio instructions
        }
    };

    //play audio of letter
    instructionsEnded = function () {
        praise.setVolume(70);
        var letterAudio = new WebAudioAPISound(letterSounds[ranHives[ranbee]], { loop: false });
        letterAudio.setVolume(70);
        letterAudio.play(letterAudio);
        //change to next audio instructions
        instructions = new WebAudioAPISound(soundPath + "audio_instructions2.mp3", { loop: false });
        instructions.setVolume(70);
        instructions.onEnded = instructions2Ended;
    };

    instructions2Ended = function () {
        praise.setVolume(70);
        var letterAudio = new WebAudioAPISound(letterSounds[ranHives[ranbee]], { loop: false });
        letterAudio.setVolume(70);
        letterAudio.play(letterAudio);
    }
    //end the game
    setTimeout(function GameOver() {
        playing = false;
        var finalScore; //calculate final score
        instructions.stop();
        var gameOverAudio = new WebAudioAPISound(soundPath + "gameOver_recording.mp3", { loop: false });
        gameOverAudio.setVolume(70);
        gameOverAudio.play(gameOverAudio);
        if (score >= 25)
            finalScore = 5;
        else if (score >= 15)
            finalScore = 3;
        else if (score >= 10)
            finalScore = 0;
        else
            finalScore = -5;

        document.getElementById('score').value = finalScore; //save score in html element
        EndofGame(); //function displays good job message and returns to map
    }, 60000);
}());