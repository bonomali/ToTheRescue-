﻿(function () {
    //set correct margin for div
    document.getElementById('BlocksGame').style.marginLeft = '-5%';
    
    var toggle_sound = document.getElementById('minigameScript').getAttribute('toggleSound');
    var toggle_music = document.getElementById('minigameScript').getAttribute('toggleMusic');
    var difficulty_level = document.getElementById('minigameScript').getAttribute('difficulty');
    var playing = true; //keep track of if game is playable

    var imagePath = '../../MiniGames/MosquitoSwat_LetterSounds/images/';
    var soundPath = '../../MiniGames/MosquitoSwat_LetterSounds/sounds/';
    var audioClips;
    var mosquitoImages;
    var m1, m2, m3, m4, m5, m6, audioInstructions, buzz, swat, backgroundMusic, endOfGame; //audio

    if (difficulty_level == 4) {
        //arrays containing paths to audio files and image files for mosquitoes
        audioClips = [soundPath + "d_sound.mp3", soundPath + "j_sound.mp3", soundPath + "k_sound.mp3", soundPath + "l_sound.mp3",
            soundPath + "n_sound.mp3", soundPath + "q_sound.mp3", soundPath + "u_sound.mp3", soundPath + "v_sound.mp3",
            soundPath + "w_sound.mp3", soundPath + "x_sound.mp3", soundPath + "y_sound.mp3", soundPath + "z_sound.mp3",
            soundPath + "e_sound.mp3"];

        mosquitoImages = [imagePath + "D_mosquito.png", imagePath + "J_mosquito.png", imagePath + "K_mosquito.png",
            imagePath + "L_mosquito.png", imagePath + "N_mosquito.png", imagePath + "Q_mosquito.png",
            imagePath + "U_mosquito.png", imagePath + "V_mosquito.png", imagePath + "W_mosquito.png", imagePath + "X_mosquito.png",
            imagePath + "Y_mosquito.png", imagePath + "Z_mosquito.png", imagePath + "E_mosquito.png"];
    }
    else {
        //arrays containing paths to audio files and image files for mosquitoes
        audioClips = [soundPath + "a_sound.mp3", soundPath + "c_sound.mp3", soundPath + "i_sound.mp3", soundPath + "m_sound.mp3",
            soundPath + "p_sound.mp3", soundPath + "r_sound.mp3", soundPath + "s_sound.mp3", soundPath + "t_sound.mp3",
            soundPath + "b_sound.mp3", soundPath + "f_sound.mp3", soundPath + "o_sound.mp3", soundPath + "g_sound.mp3",
            soundPath + "h_sound.mp3"];

        mosquitoImages = [imagePath + "A_mosquito.png", imagePath + "C_mosquito.png", imagePath + "I_mosquito.png",
            imagePath + "M_mosquito.png", imagePath + "P_mosquito.png", imagePath + "R_mosquito.png",
            imagePath + "S_mosquito.png", imagePath + "T_mosquito.png", imagePath + "B_mosquito.png", imagePath + "F_mosquito.png",
            imagePath + "O_mosquito.png", imagePath + "G_mosquito.png", imagePath + "H_mosquito.png"];
    }

    //randomly choose target mosquito
    var index6 = Math.floor((Math.random() * mosquitoImages.length)); //random number for array index

    //randomly choose addition mosquitoes for game that aren't target and aren't duplicates
    var index1 = Math.floor((Math.random() * mosquitoImages.length)); //random number for array index
    while (index1 == index6)
        var index1 = Math.floor((Math.random() * mosquitoImages.length)); //random number for array index
    var index2 = Math.floor((Math.random() * mosquitoImages.length)); //random number for array index
    while (index2 == index6 || index2 == index1)
        var index2 = Math.floor((Math.random() * mosquitoImages.length)); //random number for array index
    var index3 = Math.floor((Math.random() * mosquitoImages.length)); //random number for array index
    while (index3 == index6 || index3 == index1 || index3 == index2)
        var index3 = Math.floor((Math.random() * mosquitoImages.length)); //random number for array index
    var index4 = Math.floor((Math.random() * mosquitoImages.length)); //random number for array index
    while (index4 == index6 || index4 == index1 || index4 == index2 || index4 == index3)
        var index4 = Math.floor((Math.random() * mosquitoImages.length)); //random number for array index
    var index5 = Math.floor((Math.random() * mosquitoImages.length)); //random number for array index
    while (index5 == index6 || index5 == index1 || index5 == index2 || index5 == index3 || index5 == index4)
        var index5 = Math.floor((Math.random() * mosquitoImages.length)); //random number for array index

    var game, images;
    var score = 0;

    //create audio
    var createAudio = function () {
        m1 = new WebAudioAPISound(audioClips[index1], { loop: false });
        m1.setVolume(90);
        m2 = new WebAudioAPISound(audioClips[index2], { loop: false });
        m2.setVolume(90);
        m3 = new WebAudioAPISound(audioClips[index3], { loop: false });
        m3.setVolume(90);
        m4 = new WebAudioAPISound(audioClips[index4], { loop: false });
        m4.setVolume(90);
        m5 = new WebAudioAPISound(audioClips[index5], { loop: false });
        m5.setVolume(90);
        m6 = new WebAudioAPISound(audioClips[index6], { loop: false });
        m6.setVolume(90);
        audioInstructions = new WebAudioAPISound(soundPath + "audio_instructions.mp3", { loop: false });
        audioInstructions.setVolume(70);
        audioInstructions.onEnded = instructionsEnded;
        buzz = new WebAudioAPISound(soundPath + "Mosquito_Buzzing.mp3", { loop: false });
        buzz.setVolume(20);
        swat = new WebAudioAPISound(soundPath + "Slap_Sound.mp3", { loop: false });
        swat.setVolume(40);
        endOfGame = new WebAudioAPISound(soundPath + "praise_recording.mp3", { loop: false });
        endOfGame.setVolume(70);
        backgroundMusic = new WebAudioAPISound(soundPath + "background_music.mp3", { loop: true });
        backgroundMusic.setVolume(20);
        if (toggle_music == "False")
            backgroundMusic.play(backgroundMusic);
    }

    window.onload = function () {
        createAudio();  //call function to create audio
        audioInstructions.play(audioInstructions); //play instructions
    }

    instructionsEnded = function () {
        m6.play(m6);   //play target letter after generic instructions
        //buzzing sound effect
        if (toggle_sound == "False") {
            buzz.play(buzz);
            buzz.play(buzz);
        }
    };

    //background image and mosquito images
    images = {
        width: 1100,
        height: 600,
        bg: {
            src: imagePath + "pond_background.jpg"
        },
        swatter: {
            src: imagePath + "fly_swatter.png"
        },
        mosquitoes: [{
            name: "mosquito1",
            slices: [{
                name: "m1",
                src: mosquitoImages[index1]
            }]
        }, {
            name: "mosquito2",
            slices: [{
                name: "m2",
                src: mosquitoImages[index2]
            }]
        }, {
            name: "mosquito3",
            slices: [{
                name: "m3",
                src: mosquitoImages[index3]
            }]
        }, {
            name: "mosquito4",
            slices: [{
                name: "m4",
                src: mosquitoImages[index4]
            }]
        }, {
            name: "mosquito5",
            slices: [{
                name: "m5",
                src: mosquitoImages[index5]
            }]
        }, {
            name: "targetMosquito",
            slices: [{
                name: "m6",
                src: mosquitoImages[index6]
            }]
        }, {
            name: "targetMosquito",
            slices: [{
                name: "m6",
                src: mosquitoImages[index6]
            }]
        }, {
            name: "targetMosquito",
            slices: [{
                name: "m6",
                src: mosquitoImages[index6]
            }]
        }]
    };

    game = BLOCKS.game(images);   //add images to game

    //game flow, add mosquito to game, swat mosquito, drop mosquito
    game.prepare = function () {
        var bg,
			index = 0,
            swatter,
			mosquitoes = [],
			top = -game.height * 2,

            //handle tapped mosquitoes, call dropMosquito function if target mosquito, play sound for each tapped mosquito
			gameTapped = function (point) {
			    var i;
			    for (i = 0; i < mosquitoes.length; i += 1) {
			        if (mosquitoes[i].isPointInside(point) && mosquitoes[i].name == "targetMosquito" && playing == true) {
			            swat.play(swat);    //play swatting sound
			            showSwatter(mosquitoes[i].x, mosquitoes[i].y);  //call function to show fly swatter for correct hit
			            mosquitoes[i].removeMotors();  //remove floating motion
			            game.addMotor("y", {    //add dropping motion
			                object: mosquitoes[i],
			                duration: 4000,
			                amount: 5000
			            });
			            score = score + 5;      //increment score for correct mosquito
			            game.addTicker(dropMosquito, 500, mosquitoes[i]); //call function to drop mosquito
			        }
			        else if (mosquitoes[i].isPointInside(point) && playing == true) {
			            if (mosquitoes[i].name == "mosquito1")
			                m1.play(m1);
			            else if (mosquitoes[i].name == "mosquito2")
			                m2.play(m2);
			            else if (mosquitoes[i].name == "mosquito3")
			                m3.play(m3);
			            else if (mosquitoes[i].name == "mosquito4")
			                m4.play(m4);
			            else if (mosquitoes[i].name == "mosquito5")
			                m5.play(m5);
			            score = score - 2;      //decrement score for incorrect mosquito
			        }
			    }
			},
            //destory swatted mosquito, remove from memory
			dropMosquito = function (mosquito) {
			    var i;
			    for (i = 0; i < mosquitoes.length; i += 1) {
			        if (mosquito === mosquitoes[i]) {
			            mosquitoes.splice(i, 1);
			            break;
			        }
			    }
			    game.stage.removeView(mosquito);
			    mosquito.destroy();
			    mosquito = null;
			},
            //add mosquitoes to game screen and move upward on y-axis
			addMosquitos = function () {

			    var mosquito,

                //randomly select a mosquito from array of mosquitoes and add to game view
				mosquito = BLOCKS.block(images.mosquitoes[Math.floor(Math.random() * images.mosquitoes.length)]);
			    mosquito.layer = game.layers[1];
			    game.stage.addView(mosquito);
			    mosquitoes.push(mosquito);

			    //randomly start mosquito along bottom of screen
			    mosquito.x = Math.random() * (game.width - mosquito.width);
			    mosquito.y = game.height + mosquito.height;

			    game.addMotor("y", {    //move upward until reaches top of screen
			        object: mosquito,
			        duration: 20000,
			        amount: top
			    }),
                game.addTicker(moveLeft, 6000, mosquito);   //move to left
			    game.addTicker(moveRight, 3000, mosquito);  //move to right
			    game.addTicker(addMosquitos, 1100); //add another bubble every 1100ms
			},
        moveLeft = function (mosquito) {    //move mosquito to the left a random amount
            game.addMotor("x", {
                object: mosquito,
                duration: 6000,
                amount: -Math.random() * (game.width - mosquito.width)
            });
        },
        moveRight = function (mosquito) {  //move mosquito to the right a random amount
             game.addMotor("x", {
                 object: mosquito,
                 duration: 6000,
                 amount: Math.random() * (game.width - mosquito.width)
             });
         },
         //show fly swatter on screen when correct mosquito hit
         showSwatter = function (_x, _y) {
             swatter = BLOCKS.slice(images.swatter);
             swatter.x = _x;
             swatter.y = _y;
             swatter.layer = game.layers[2];
             game.stage.addView(swatter);

             game.addTicker(removeSwatter, 500); //add another bubble every 1100ms
         },
        //remove fly swatter from screen when another mosquito hit
        removeSwatter = function () {
            game.stage.removeView(swatter);
            swatter.destroy();
            swatter = null;
        };
        //add background to bottom layer of game
        bg = BLOCKS.slice(images.bg);
        bg.layer = game.layers[0];
        game.stage.addView(bg);

        //add an event listener for mosquito taps
        game.controller.addEventListener("tap", gameTapped);

        addMosquitos(); //begin adding mosquitos to screen

        //play buzzing sound every 8000 ms
        setInterval(function () {
            if(toggle_sound == "False")
                buzz.play(buzz);
        }, 8000);

        //end the game after time interval
        setTimeout(function GameOver() {
            playing = false;
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