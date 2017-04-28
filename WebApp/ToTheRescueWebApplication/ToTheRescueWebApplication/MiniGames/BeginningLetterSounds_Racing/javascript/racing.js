(function () {
    //set correct margin for div
    document.getElementById('BlocksGame').style.marginLeft = '-5%';

    var difficulty_level = document.getElementById('minigameScript').getAttribute('difficulty');
    var toggle_sound = document.getElementById('minigameScript').getAttribute('toggleSound');
    var toggle_music = document.getElementById('minigameScript').getAttribute('toggleMusic');

    var imagePath = "../../MiniGames/BeginningLetterSounds_Racing/images/";
    var soundPath = "../../MiniGames/BeginningLetterSounds_Racing/sounds/";

    var game, images;
    var score = 0;      //player's score
    var counter = 0;    //count number of loops through game
    var targetFlag;     //flag with correct word
    var index1, index2, index3, targetIndex;
    var f;  //flag slices
    var letterSound, word1Audio, word2Audio, word3Audio, audioInstructions, carRacingAudio, carRevvingAudio, endAudio, tappedAudio;

    if (difficulty_level == 4) {
        //array of flag images
        flagImages = [imagePath + "down_flag.jpg", imagePath + "jump_flag.jpg", imagePath + "kite_flag.jpg",
            imagePath + "little_flag.jpg", imagePath + "not_flag.jpg", imagePath + "quit_flag.jpg", imagePath + "up_flag.jpg",
            imagePath + "very_flag.jpg", imagePath + "we_flag.jpg", imagePath + "xray_flag.jpg", imagePath + "you_flag.jpg",
            imagePath + "zebra_flag.jpg", imagePath + "egg_flag.jpg"];

        wordSounds = [soundPath + "down_recording.mp3", soundPath + "jump_recording.mp3", soundPath + "kite_recording.mp3",
            soundPath + "little_recording.mp3", soundPath + "not_recording.mp3", soundPath + "quit_recording.mp3", soundPath + "up_recording.mp3",
            soundPath + "very_recording.mp3", soundPath + "we_recording.mp3", soundPath + "xray_recording.mp3", soundPath + "you_recording.mp3",
            soundPath + "zebra_recording.mp3", soundPath + "egg_recording.mp3"];

        letterSounds = [soundPath + "d_sound.mp3", soundPath + "j_sound.mp3", soundPath + "k_sound.mp3",
            soundPath + "l_sound.mp3", soundPath + "n_sound.mp3", soundPath + "q_sound.mp3", soundPath + "u_sound.mp3",
            soundPath + "v_sound.mp3", soundPath + "w_sound.mp3", soundPath + "x_sound.mp3", soundPath + "y_sound.mp3",
            soundPath + "z_sound.mp3", soundPath + "e_sound.mp3"];
    }
    else {
        //array of flag images
        flagImages = [imagePath + "at_flag.jpg", imagePath + "big_flag.jpg", imagePath + "fun_flag.jpg",
            imagePath + "go_flag.jpg", imagePath + "help_flag.jpg", imagePath + "on_flag.jpg", imagePath + "see_flag.jpg",
            imagePath + "can_flag.jpg", imagePath + "in_flag.jpg", imagePath + "me_flag.jpg", imagePath + "play_flag.jpg",
            imagePath + "run_flag.jpg", imagePath + "two_flag.jpg"];

        wordSounds = [soundPath + "at_recording.mp3", soundPath + "big_recording.mp3", soundPath + "fun_recording.mp3",
            soundPath + "go_recording.mp3", soundPath + "help_recording.mp3", soundPath + "on_recording.mp3", soundPath + "see_recording.mp3",
            soundPath + "can_recording.mp3", soundPath + "in_recording.mp3", soundPath + "me_recording.mp3", soundPath + "play_recording.mp3",
            soundPath + "run_recording.mp3", soundPath + "two_recording.mp3"];

        letterSounds = [soundPath + "a_sound.mp3", soundPath + "b_sound.mp3", soundPath + "f_sound.mp3",
            soundPath + "g_sound.mp3", soundPath + "h_sound.mp3", soundPath + "o_sound.mp3", soundPath + "s_sound.mp3",
            soundPath + "c_sound.mp3", soundPath + "i_sound.mp3", soundPath + "m_sound.mp3", soundPath + "p_sound.mp3",
            soundPath + "r_sound.mp3", soundPath + "t_sound.mp3"];
    }

    //randomly generate flags and target flag (create flag slices)
    generateRandom = function () {
        //randomly choose word flags for game that aren't duplicates
        index1 = Math.floor((Math.random() * flagImages.length)); //random number for array index
        index2 = Math.floor((Math.random() * flagImages.length)); //random number for array index
        while (index2 == index1)
            index2 = Math.floor((Math.random() * flagImages.length)); //random number for array index
        index3 = Math.floor((Math.random() * flagImages.length)); //random number for array index
        while (index3 == index1 || index3 == index2)
            index3 = Math.floor((Math.random() * flagImages.length)); //random number for array index

        targetIndex = Math.floor((Math.random() * 3)); //randomly choose an index for target flag

        f = BLOCKS.block(); //create a block for flag slices
        // Add flag slices to the block
        f.addSlice({
            name: "flag1",
            imageSrc: flagImages[index1],
        });
        f.addSlice({
            name: "flag2",
            imageSrc: flagImages[index2],
        });
        f.addSlice({
            name: "flag3",
            imageSrc: flagImages[index3],
        });

        //set target flag using randomly choosen target index
        targetFlag = f.getSlice("flag" + (targetIndex + 1));
    }
    generateRandom();   //generate random indexes for word flags and create flag slices

    var createAudio = function () {
        audioInstructions = new WebAudioAPISound(soundPath + "audio_instructions.mp3", { loop: false });
        audioInstructions.setVolume(70);
        audioInstructions.onEnded = instructionsEnded;
        carRevvingAudio = new WebAudioAPISound(soundPath + "revving_sound.mp3", { loop: false });
        carRevvingAudio.setVolume(40);
        carRacingAudio = new WebAudioAPISound(soundPath + "racing_sound.mp3", { loop: false });
        carRacingAudio.setVolume(40);
        endAudio = new WebAudioAPISound(soundPath + "endOfRace.mp3", { loop: false });
        endAudio.setVolume(70);
        endAudio.onEnded = audioEnded;
        backgroundMusic = new WebAudioAPISound(soundPath + "background_music.mp3", { loop: true });
        backgroundMusic.setVolume(10);
        if (toggle_music == "False")
            backgroundMusic.play(backgroundMusic);
    }

    window.onload = function () {
        createAudio();  //call function to create audio
        audioInstructions.play(audioInstructions);
    }

    images = {
        width: 1100,
        height: 600,
        bg: {
            src: imagePath + "racing_background.jpg"
        },
        racecarImages: [{
            name: "racecar",
            slices: [{
                name: "racecar1",
                src: imagePath + "racecar1.png"
            }, {
                name: "racecar2",
                src: imagePath + "racecar2.png"
            }, {
                name: "racecar3",
                src: imagePath + "racecar3.png"
            }, {
                name: "racecar4",
                src: imagePath + "racecar4.png"
            }, {
                name: "racecar5",
                src: imagePath + "racecar5.png"
            }]
        }],
        lightImages: [{
            name: "light",
            slices: [{
                name: "red",
                src: imagePath + "stoplight_red.png"
            }, {
                name: "yellow",
                src: imagePath + "stoplight_yellow.png"
            }, {
                name: "green",
                src: imagePath + "stoplight_green.png"
            }]
        }],
        checkeredFlag: {
            name: "checkeredFlag",
            src: imagePath + "racing_flags.png"
        }
    }
    game = BLOCKS.game(images);   //add images to game

    game.prepare = function () {
        var bg,
            car,
            light,
            flag1,
            flag2,
            flag3,
            endFlag,
            flags = [],
            end = game.width * 1.5;

        //add racecar to game
        car = BLOCKS.block(images.racecarImages[0]);
        car.layer = game.layers[2];
        game.stage.addView(car);
        car.y = 500;

        //add light to game
        light = BLOCKS.block(images.lightImages[0]);
        light.layer = game.layers[1];
        game.stage.addView(light);
        light.x = 450;
        light.y = 30;

        //add background to bottom layer of game
        bg = BLOCKS.slice(images.bg);
        bg.layer = game.layers[0];
        game.stage.addView(bg);

        //add word flags to game
        loadFlagImages = function () {
            flag1 = f.getSlice("flag1");
            flag1.layer = game.layers[1];
            game.stage.addView(flag1);
            flags.push(flag1);
            flag1.x = 100;
            flag1.y = 250;

            flag2 = f.getSlice("flag2");
            flag2.layer = game.layers[1];
            game.stage.addView(flag2);
            flags.push(flag2);
            flag2.x = 430;
            flag2.y = 250;

            flag3 = f.getSlice("flag3");
            flag3.layer = game.layers[1];
            game.stage.addView(flag3);
            flags.push(flag3);
            flag3.x = 755;
            flag3.y = 250;
        },

        //play audio insturctions
        playAudioInstructions = function () {
            //play audio instructions and audio of each word
            audioInstructions.play(audioInstructions);
        },

        //destroy flag slices and remove from memory
        destroyFlags = function () {
            f.destroy();
        },

        //handle click on word flags
        flagTapped = function (point) {
            var correct = false;

            haltFlags();    //stop flag sounds and animations if user clicks ahead

            for (var i = 0; i < flags.length && correct == false; i++) {
                //if the target flag is clicked: increment score, change color of light, destroy old flags, generate new flags
                if (flags[i].isPointInside(point) && flags[i].name == targetFlag.name) {
                    if(toggle_sound == "False")
                        carRevvingAudio.play(carRevvingAudio);
                    score = score + 5;
                    correct = true;
                    if (light.getSlice().name === "red")
                        light.setSlice("yellow");
                    else if (light.getSlice().name === "yellow")
                        light.setSlice("green");

                    //call function to move car if light green
                    if (light.getSlice().name === "green") {
                        destroyFlags();
                        moveCar();
                    }
                        //generate new words
                    else {
                        destroyFlags();
                        generateRandom();        //generate new random word flags
                        loadFlagImages();        //display word flag images
                        playAudioInstructions(); //play audio instructions
                    }
                }
                else {
                    //play word audio for tapped flag
                    if (flags[i].isPointInside(point) && flags[i].name == "flag1")
                    {
                        tappedAudio = new WebAudioAPISound(wordSounds[index1], { loop: false });
                        tappedAudio.setVolume(70);
                    }
                    else if (flags[i].isPointInside(point) && flags[i].name == "flag2")
                    {
                        tappedAudio = new WebAudioAPISound(wordSounds[index2], { loop: false });
                        tappedAudio.setVolume(70);
                    }
                    else if (flags[i].isPointInside(point) && flags[i].name == "flag3")
                    {
                        tappedAudio = new WebAudioAPISound(wordSounds[index3], { loop: false });
                        tappedAudio.setVolume(70);
                    }
                }
            }
            //if not target flag, provide encouragement and sound reminder
            if (correct == false) {
                score = score - 2;  //decrement score for wrong answer
            }
            if(tappedAudio != null)
                tappedAudio.play(tappedAudio);
        },

        //race car along screen
        moveCar = function () {
            if (toggle_sound == "False") {
                carRacingAudio.play(carRacingAudio);
            }

            game.addMotor("x", {    //move car along x-axis until off screen
                object: car,
                duration: 2000,
                amount: end
            });
            counter = counter + 1;
            roundOver();
        },

        //display racing flags and play praise audio after round
        roundOver = function () {
            endAudio.play(endAudio);

            //display end of race checkered flag
            endFlag = BLOCKS.slice(images.checkeredFlag);
            endFlag.layer = game.layers[2];
            game.stage.addView(endFlag);
            endFlag.x = 350;
            endFlag.y = 225;
        },
        //check for game over, handle game over, handle next round
        checkGameOver = function () {
            //determine if game over or go to next round
            if ((score < 8 && counter >= 2) || counter == 5) {
                var finalScore; //determine final score
                if(score >= 45)
                    finalScore = 5;
                else if(score >= 30)
                    finalScore = 3;
                else if(score >= 20)
                    finalScore = 0;
                else if(score < 20)
                    finalScore = -5;

                car.destroy();      //destroy car and remove from memory
                document.getElementById('score').value = finalScore; //save score in html element
                EndofGame(); //function displays good job message and returns to map
            }
            else {
                light.setSlice("red");  //reset light
                car.setSlice("racecar" + (counter + 1)) //set next car
                car.layer = game.layers[2];
                game.stage.addView(car);
                car.y = 500;
                car.x = 0;

                generateRandom();        //generate new random word flags
                loadFlagImages();        //load word flags
                playAudioInstructions(); //play audio instructions
            }
        },

        //stops execution of flag sounds and motors if user clicks ahead
        haltFlags = function () {
            word1Audio.onEnded = null;
            word2Audio.onEnded = null;
        }

        //add an event listener for flag taps
        game.controller.addEventListener("tap", flagTapped);

        word2Ended = function () {
            word3Audio = new WebAudioAPISound(wordSounds[index3], { loop: false });
            word3Audio.setVolume(70);
            word3Audio.play(word3Audio)
            game.addMotor('angle', {
                object: flag3,
                duration: 800,
                amount: 360
            })
        };
        word1Ended = function () {
            word2Audio = new WebAudioAPISound(wordSounds[index2], { loop: false });
            word2Audio.setVolume(70);
            word2Audio.onEnded = word2Ended;
            word2Audio.play(word2Audio)
            game.addMotor('angle', {
                object: flag2,
                duration: 800,
                amount: 360
            })
        };
        letterEnded = function () {
            word1Audio = new WebAudioAPISound(wordSounds[index1], { loop: false });
            word1Audio.setVolume(70);
            word1Audio.onEnded = word1Ended;
            word1Audio.play(word1Audio);
            game.addMotor('angle', {
                object: flag1,
                duration: 800,
                amount: 360
            })
        };
        //add event listeners for audio sounds
        instructionsEnded = function () {
            if (targetIndex == 0) {
                letterSound = new WebAudioAPISound(letterSounds[index1], { loop: false });
                letterSound.setVolume(70);
                letterSound.onEnded = letterEnded;
            }
            else if (targetIndex == 1) {
                letterSound = new WebAudioAPISound(letterSounds[index2], { loop: false });
                letterSound.setVolume(70);
                letterSound.onEnded = letterEnded;
            }
            else {
                letterSound = new WebAudioAPISound(letterSounds[index3], { loop: false });
                letterSound.setVolume(70);
                letterSound.onEnded = letterEnded;
            }
            letterSound.play(letterSound);
        };
        audioEnded = function () {
            endFlag.destroy();  //destroy racing flags
            checkGameOver();    //check for game over or start new round
        };

        loadFlagImages();        //load flag images
    };
}());