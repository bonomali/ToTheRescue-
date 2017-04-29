(function () {
    //set correct margin for div
    document.getElementById('BlocksGame').style.marginLeft = '-5%';

    var toggle_sound = document.getElementById('minigameScript').getAttribute('toggleSound');
    var toggle_music = document.getElementById('minigameScript').getAttribute('toggleMusic');

    var imagePath = "../../MiniGames/Dino_SightWords/images/";
    var soundPath = "../../MiniGames/BeginningLetterSounds_Racing/sounds/";
    var soundPath2 = "../../MiniGames/Dino_SightWords/sounds/";
    var game, images;
    var score = 0;      //player's score
    var counter = 0;    //count number of loops through game
    var eggs;           //slices for egg images
    var targetEgg;      //egg with correct word
    var index1, index2, index3, targetIndex;
    var audioInstructions, audioWord, pteroSound, babyDino_sound, momDino_sound, eggCracking_sound; //audio

    //array of egg images
    eggImages = [imagePath + "at_egg.png", imagePath + "can_egg.png", imagePath + "fun_egg.png", imagePath + "go_egg.png",
        imagePath + "in_egg.png", imagePath + "little_egg.png", imagePath + "me_egg.png", imagePath + "not_egg.png",
        imagePath + "on_egg.png", imagePath + "see_egg.png", imagePath + "the_egg.png", imagePath + "two_egg.png",
        imagePath + "we_egg.png"];

    wordSounds = [soundPath + "at_recording.mp3", soundPath + "can_recording.mp3", soundPath + "fun_recording.mp3",
        soundPath + "go_recording.mp3", soundPath + "in_recording.mp3", soundPath + "little_recording.mp3",
        soundPath + "me_recording.mp3", soundPath + "not_recording.mp3", soundPath + "on_recording.mp3",
        soundPath + "see_recording.mp3", soundPath + "the_recording.mp3", soundPath + "two_recording.mp3",
        soundPath + "we_recording.mp3"];

    //randomly generate eggs and target egg (create egg slices)
    generateRandom = function () {
        //randomly choose word eggs for game that aren't duplicates
        index1 = Math.floor((Math.random() * eggImages.length)); //random number for array index
        index2 = Math.floor((Math.random() * eggImages.length)); //random number for array index
        while (index2 == index1)
            index2 = Math.floor((Math.random() * eggImages.length)); //random number for array index
        index3 = Math.floor((Math.random() * eggImages.length)); //random number for array index
        while (index3 == index1 || index3 == index2)
            index3 = Math.floor((Math.random() * eggImages.length)); //random number for array index

        targetIndex = Math.floor((Math.random() * 3)); //randomly choose an index for target egg

        eggs = BLOCKS.block(); //create a block for egg slices
        // Add egg slices to the block
        eggs.addSlice({
            name: "egg1",
            imageSrc: eggImages[index1],
        });
        eggs.addSlice({
            name: "egg2",
            imageSrc: eggImages[index2],
        });
        eggs.addSlice({
            name: "egg3",
            imageSrc: eggImages[index3],
        });
        eggs.addSlice({
            name: "cracked",
            imageSrc: imagePath + "cracked_egg.png"
        });
        eggs.addSlice({
            name: "hatched",
            imageSrc: imagePath + "baby_dino.png"
        });

        //set target egg using randomly choosen target index
        targetEgg = eggs.getSlice("egg" + (targetIndex + 1));
    }
    generateRandom();   //generate random indexes for word eggs and create egg slices

    var createAudio = function () {
        pteroSound = new WebAudioAPISound(soundPath2 + "Pterodactyl.mp3", { loop: false });
        pteroSound.setVolume(70);
        babyDino_sound = new WebAudioAPISound(soundPath2 + "babyDino_recording.mp3", { loop: false });
        babyDino_sound.setVolume(70);
        babyDino_sound.onEnded = babyEnded;
        momDino_sound = new WebAudioAPISound(soundPath2 + "Tyrannosaurus.mp3", { loop: false });
        momDino_sound.setVolume(70);
        momDino_sound.onEnded = momEnded;
        eggCracking_sound = new WebAudioAPISound(soundPath2 + "Short_Egg_Cracking.mp3", { loop: false });
        eggCracking_sound.setVolume(70);
        eggCracking_sound.onEnded = eggEnded;
        audioInstructions = new WebAudioAPISound(soundPath2 + "audioInstructions_recording.mp3", { loop: false });
        audioInstructions.setVolume(70);
        audioInstructions.onEnded = instructionsEnded;
        endOfGame = new WebAudioAPISound(soundPath2 + "praise_recording.mp3", { loop: false });
        endOfGame.setVolume(70);
        backgroundMusic = new WebAudioAPISound(soundPath2 + "background_music.mp3", { loop: true });
        backgroundMusic.setVolume(20);
        if (toggle_music == "False")
            backgroundMusic.play(backgroundMusic);
    }

    window.onload = function () {
        createAudio();  //call function to create audio
        audioInstructions.play(audioInstructions);  //play audio instuctions
    }

    images = {
        width: 1100,
        height: 600,
        bg: {
            src: imagePath + "background.jpg"
        },
        nest: {
        src: imagePath + "nest.png"
        },
        mommyDino: {
            src: imagePath + "mom_dino.png"
        },
        pterodactyl: {
            src: imagePath + "pterodactyl.png"
        },
        hatchingImages: [{
            name: "hatching",
            slices: [{
                name: "cracked",
                src: imagePath + "cracked_Egg.png"
            }, {
                name: "hatched",
                src: imagePath + "baby_dino.png"
            }]
        }],
    }
    game = BLOCKS.game(images);   //add images to game

    game.prepare = function () {
        var bg,
            nest,
            egg1,
            egg2,
            egg3,
            wordEggs = [],
            hatching,
            momDino,
            ptero,
            wordAudio;

        //add nest to game
        nest = BLOCKS.slice(images.nest);
        nest.layer = game.layers[3];
        game.stage.addView(nest);
        nest.x = 340;
        nest.y = game.height - 143;
        
        //add pterodactyl to game
        ptero = BLOCKS.slice(images.pterodactyl);
        ptero.layer = game.layers[2];
        game.stage.addView(ptero);
        ptero.x = game.width - 300;

        //add mom dino to game
        momDino = BLOCKS.slice(images.mommyDino);
        momDino.layer = game.layers[2];
        game.stage.addView(momDino);
        momDino.y = game.height - 575;
        momDino.x = -100;
        
        //add background to bottom layer of game
        bg = BLOCKS.slice(images.bg);
        bg.layer = game.layers[1];
        game.stage.addView(bg);

        hatching = BLOCKS.block(images.hatchingImages[0]); //hatched egg, begins cracked
        hatching.layer = game.layers[2];

        //add word eggs to game
        loadEggImages = function () {
            egg1 = eggs.getSlice("egg1");
            egg1.layer = game.layers[2];
            game.stage.addView(egg1);
            wordEggs.push(egg1);
            egg1.x = 420;
            egg1.y = game.height - 300;

            egg2 = eggs.getSlice("egg2");
            egg2.layer = game.layers[2];
            game.stage.addView(egg2);
            wordEggs.push(egg2);
            egg2.x = 600;
            egg2.y = game.height - 285;

            egg3 = eggs.getSlice("egg3");
            egg3.layer = game.layers[2];
            game.stage.addView(egg3);
            wordEggs.push(egg3);
            egg3.x = 780;
            egg3.y = game.height - 300;
        },

        //play audio instructions
        playAudioInstructions = function () {
            //play audio instructions and audio of each word
            audioInstructions.play(audioInstructions);
        },
        //destroy egg slices and remove from memory
        destroyEggs = function () {
            eggs.destroy();
        },
        //handle click on word eggs
        eggTapped = function (point) {
            var correct = false;
            for (var i = 0; i < wordEggs.length && correct == false; i++) {
                //if the target egg is clicked: increment score, hatch egg, destroy old eggs, generate new eggs
                if (wordEggs[i].isPointInside(point) && wordEggs[i].name == targetEgg.name) {
                    score = score + 5;  //increment score
                    correct = true;

                    if (toggle_sound == "True")
                        eggCracking_sound.setVolume(0);
                    eggCracking_sound.play(eggCracking_sound);
                    game.stage.addView(hatching);   //add hatched egg to view
                    hatching.x = wordEggs[i].x;
                    hatching.y = wordEggs[i].y;
                    wordEggs[i].x = -200;
                } 
                else if (wordEggs[i].isPointInside(point) && wordEggs[i].name != targetEgg.name)
                {
                    wordAudio = new Audio();    //play word audio for incorrect choice
                    if (wordEggs[i].name == "egg1")
                    {
                        wordAudio = new WebAudioAPISound(wordSounds[index1], { loop: false });
                        wordAudio.setVolume(70);
                    }
                    else if (wordEggs[i].name == "egg2")
                    {
                        wordAudio = new WebAudioAPISound(wordSounds[index2], { loop: false });
                        wordAudio.setVolume(70);
                    }
                    else
                    {
                        wordAudio = new WebAudioAPISound(wordSounds[index3], { loop: false });
                        wordAudio.setVolume(70);
                    }
                    wordAudio.play(wordAudio)
                    score = score - 2;  //decrement for wrong answer
                }
            }
        };
        //add an event listener for egg taps
        game.controller.addEventListener("tap", eggTapped);
        loadEggImages();         //load egg images

        //play pterodactyl sound effect
        setInterval(function () {
            if(toggle_sound == "False")
                pteroSound.play(pteroSound);
        }, 15000);

        //play target word after beginning part of instructions
        instructionsEnded = function () {
            if (targetIndex == 0)
                audioWord = new WebAudioAPISound(wordSounds[index1], { loop: false });
            else if (targetIndex == 1)
                audioWord = new WebAudioAPISound(wordSounds[index2], { loop: false });
 
            else
                audioWord = new WebAudioAPISound(wordSounds[index3], { loop: false });

            audioWord.setVolume(70);
            audioWord.play(audioWord);   
        };

        eggEnded = function () {
            hatching.setSlice("hatched");   //show hatched egg
            if (toggle_sound == "True")
                babyDino_sound.setVolume(-1);
            babyDino_sound.play(babyDino_sound);   //play baby dino sound after egg cracking sound
        };
        babyEnded = function () {
            if (toggle_sound == "True")
                momDino_sound.setVolume(-1);
            momDino_sound.play();   //play mom dino sound after baby
        };
        momEnded = function () {
            destroyEggs();
            wordEggs.length = 0;    //clear word eggs list
            game.stage.removeView(hatching);
            hatching.setSlice("cracked");
            generateRandom();
            loadEggImages();
            playAudioInstructions();
        }
    };

    //end the game after time interval
    setTimeout(function GameOver() {
        audioInstructions.setVolume(-1); 
        babyDino_sound.setVolume(-1);
        momDino_sound.setVolume(-1);
        eggCracking_sound.setVolume(-1);
        audioWord.setVolume(-1);

        endOfGame.play(endOfGame);

        var finalScore; //calculate final score
        if (score >= 30)
            finalScore = 5;
        else if (score >= 15)
            finalScore = 3;
        else if (score >= 5)
            finalScore = 0;
        else
            finalScore = -5;
        document.getElementById('score').value = finalScore; //save score in html element
        EndofGame(); //function displays good job message and returns to map
    }, 60000);
}());