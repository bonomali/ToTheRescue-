(function () {
    //set correct margin for div
    document.getElementById('BlocksGame').style.marginLeft = '-5%';
    
    var difficulty_level = document.getElementById('minigameScript').getAttribute('difficulty');
    var imagePath = '../../MiniGames/MosquitoSwat_LetterSounds/images/';
    var audioPath = '../../MiniGames/MosquitoSwat_LetterSounds/sounds/';
    var audioClips;
    var mosquitoImages;

    if (difficulty_level == 4) {
        audioClips = [audioPath + "d_sound.mp3", audioPath + "j_sound.mp3", audioPath + "k_sound.mp3", audioPath + "l_sound.mp3",
            audioPath + "n_sound.mp3", audioPath + "q_sound.mp3", audioPath + "u_sound.mp3", audioPath + "v_sound.mp3",
            audioPath + "w_sound.mp3", audioPath + "x_sound.mp3", audioPath + "y_sound.mp3", audioPath + "z_sound.mp3",
            audioPath + "e_sound.mp3"];

        mosquitoImages = [imagePath + "D_mosquito.png", imagePath + "J_mosquito.png", imagePath + "K_mosquito.png",
            imagePath + "L_mosquito.png", imagePath + "N_mosquito.png", imagePath + "Q_mosquito.png",
            imagePath + "U_mosquito.png", imagePath + "V_mosquito.png", imagePath + "W_mosquito.png", imagePath + "X_mosquito.png",
            imagePath + "Y_mosquito.png", imagePath + "Z_mosquito.png", imagePath + "E_mosquito.png"];
    }
    else {
        //arrays containing paths to audio files and image files for mosquitoes
        audioClips = [audioPath + "a_sound.mp3", audioPath + "c_sound.mp3", audioPath + "i_sound.mp3", audioPath + "m_sound.mp3",
            audioPath + "p_sound.mp3", audioPath + "r_sound.mp3", audioPath + "s_sound.mp3", audioPath + "t_sound.mp3",
            audioPath + "b_sound.mp3", audioPath + "f_sound.mp3", audioPath + "o_sound.mp3", audioPath + "g_sound.mp3",
            audioPath + "h_sound.mp3"];

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

    //letter sounds
    var m1 = new Audio()
    m1.src = audioClips[index1];
    var m2 = new Audio()
    m2.src = audioClips[index2];
    var m3 = new Audio()
    m3.src = audioClips[index3];
    var m4 = new Audio()
    m4.src = audioClips[index4];
    var m5 = new Audio()
    m5.src = audioClips[index5];
    var m6 = new Audio()                //target letter
    m6.src = audioClips[index6];

    var audioInstructions = new Audio(); //audio instructions
    audioInstructions.src = audioPath + "audio_instructions.mp3"

    var buzz = new Audio(); //buzzing sound
    buzz.src = audioPath + "Mosquito_Buzzing.mp3";
    var swat = new Audio(); //swat sound for mosquito hit
    swat.src = audioPath + "Slap_Sound.mp3";

    //play generic instructions for game
    audioInstructions.addEventListener('ended', function () {
        m6.play();   //play target letter after generic instructions
    });
    audioInstructions.play();
    buzz.play();
    buzz.play();

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
			        if (mosquitoes[i].isPointInside(point) && mosquitoes[i].name == "targetMosquito") {
			            swat.play();    //play swatting sound
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
			        else if (mosquitoes[i].isPointInside(point)) {
			            if (mosquitoes[i].name == "mosquito1")
			                m1.play();
			            else if (mosquitoes[i].name == "mosquito2")
			                m2.play();
			            else if (mosquitoes[i].name == "mosquito3")
			                m3.play();
			            else if (mosquitoes[i].name == "mosquito4")
			                m4.play();
			            else if (mosquitoes[i].name == "mosquito5")
			                m5.play();
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
        setInterval(function () { buzz.play(); }, 8000);

        //end the game after time interval
        setTimeout(function GameOver() {
            var endOfGame = new Audio();
            endOfGame.src = audioPath + "praise_recording.mp3";
            endOfGame.play();

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