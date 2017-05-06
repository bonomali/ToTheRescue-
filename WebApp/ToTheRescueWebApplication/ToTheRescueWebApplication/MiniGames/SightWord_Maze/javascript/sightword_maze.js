(function () {
    var toggle_music = document.getElementById('minigameScript').getAttribute('toggleMusic');
    var imagePath = '../../MiniGames/SightWord_Maze/images/';
    var soundPath = '../../MiniGames/SightWord_Maze/sounds/';
    var counter = -1;   //keep track of which word in maze the pup is on
    var score = 0;
    var audioInstructions, endOfGame, correctWord, wrongWay;

    words = ["at", "can", "in", "big", "me", "not", "on", "see", "the", "up"];
    wordSounds = [soundPath + "at_recording.mp3", soundPath + "can_recording.mp3", soundPath + "in_recording.mp3",
        soundPath + "big_recording.mp3", soundPath + "me_recording.mp3", soundPath + "not_recording.mp3",
        soundPath + "on_recording.mp3", soundPath + "see_recording.mp3", soundPath + "the_recording.mp3",
        soundPath + "up_recording.mp3"];

    var createAudio = function () {
        audioInstructions = new WebAudioAPISound(soundPath + "audio_instructions.mp3", { loop: false });
        audioInstructions.setVolume(70);
        audioInstructions.onEnded = instructionsEnded;
        wrongWay = new WebAudioAPISound(soundPath + "bark.mp3", { loop: false });
        wrongWay.setVolume(70);
        endOfGame = new WebAudioAPISound(soundPath + "puppy_barking.mp3", { loop: false });
        endOfGame.setVolume(70);
        endOfGame.onEnded = gameEnded;
        backgroundMusic = new WebAudioAPISound(soundPath + "happy_backgroundMusic.mp3", { loop: true });
        backgroundMusic.setVolume(10);
        if (toggle_music == "False")
            backgroundMusic.play(backgroundMusic);
    }

    window.onload = function () {
        createAudio();  //call function to create audio
        audioInstructions.play(audioInstructions);
        correctWord.setVolume(.1);
    }

    instructionsEnded = function () {
        correctWord.setVolume(70);
        correctWord.play(correctWord);
    };

    //handle game over logic, score, call game over div
    gameEnded = function () {
        var finalScore = -5;
        if (score > 80) { finalScore = 5; }
        else if (score > 60) { finalScore = 3; }
        else if (score > 40) { finalScore = 0; }

        document.getElementById('score').value = finalScore; //save score in html element
        EndofGame(); //function displays good job message and returns to map
    };

    //randomly select indecies for target word and for three other words for maze
    var targetIndex = Math.floor((Math.random() * words.length)); //random number for array index
    var targetWord = words[targetIndex];    //target word for maze
    correctWord = new WebAudioAPISound(wordSounds[targetIndex], { loop: false });

    var index1 = Math.floor((Math.random() * words.length)); //random number for array index
    while (index1 == targetIndex)
        index1 = Math.floor((Math.random() * words.length)); //random number for array index
    var index2 = Math.floor((Math.random() * words.length)); //random number for array index
    while (index2 == targetIndex || index2 == index1)
        index2 = Math.floor((Math.random() * words.length)); //random number for array index
    var index3 = Math.floor((Math.random() * words.length)); //random number for array index
    while (index3 == targetIndex || index3 == index2 || index3 == index1)
        index3 = Math.floor((Math.random() * words.length)); //random number for array index

    //set correct margin for div and create paragraph elements
    var blocksDiv = document.getElementById('BlocksGame');
    blocksDiv.style.width = '88%';
    blocksDiv.style.height = '100%';
    blocksDiv.style.marginLeft = '1%';

    var backgroundDiv = document.createElement("div");
    backgroundDiv.style.width = "100%";
    backgroundDiv.style.height = "100%";
    backgroundDiv.style.position = "absolute";
    blocksDiv.appendChild(backgroundDiv);

    var backgroundImg = document.createElement("img");
    backgroundImg.src = imagePath + "maze.png";
    backgroundImg.style.width = "100%";
    backgroundImg.style.height = "100%";
    backgroundDiv.appendChild(backgroundImg);

    //create dog image element
    var dog = document.createElement('img');
    dog.setAttribute('id', 'dog');
    dog.src = imagePath + "dog.png";
    backgroundDiv.appendChild(dog);
    dog.style.position = "absolute";
    dog.style.width = '6%';

    //create target word elements
    var text1 = document.createElement("div");
    text1.setAttribute('class', 'word');
    backgroundDiv.appendChild(text1);
    text1.innerHTML = targetWord;

    var text2 = document.createElement("div");
    text2.setAttribute('class', 'word');
    backgroundDiv.appendChild(text2);
    text2.innerHTML = targetWord;

    var text3 = document.createElement("div");
    text3.setAttribute('class', 'word');
    backgroundDiv.appendChild(text3);
    text3.innerHTML = targetWord;

    var text4 = document.createElement("div");
    text4.setAttribute('class', 'word');
    backgroundDiv.appendChild(text4);
    text4.innerHTML = targetWord;

    var text5 = document.createElement("div");
    text5.setAttribute('class', 'word');
    backgroundDiv.appendChild(text5);
    text5.innerHTML = targetWord;

    var text6 = document.createElement("div");
    text6.setAttribute('class', 'word');
    backgroundDiv.appendChild(text6);
    text6.innerHTML = targetWord;

    var text7 = document.createElement("div");
    text7.setAttribute('class', 'word');
    backgroundDiv.appendChild(text7);
    text7.innerHTML = targetWord;

    var text8 = document.createElement("div");
    text8.setAttribute('class', 'word');
    backgroundDiv.appendChild(text8);
    text8.innerHTML = targetWord;

    var text9 = document.createElement("div");
    text9.setAttribute('class', 'word');
    backgroundDiv.appendChild(text9);
    text9.innerHTML = targetWord;

    var text10 = document.createElement("div");
    text10.setAttribute('class', 'word');
    backgroundDiv.appendChild(text10);
    text10.innerHTML = targetWord;

    var text11 = document.createElement("div");
    text11.setAttribute('class', 'word');
    backgroundDiv.appendChild(text11);
    text11.innerHTML = targetWord;

    var text12 = document.createElement("div");
    text12.setAttribute('class', 'word');
    backgroundDiv.appendChild(text12);
    text12.innerHTML = targetWord;


    var text13 = document.createElement("div");
    text13.setAttribute('class', 'word');
    backgroundDiv.appendChild(text13);
    text13.innerHTML = targetWord;

    var text14 = document.createElement("div");
    text14.setAttribute('class', 'word');
    backgroundDiv.appendChild(text14);
    text14.innerHTML = targetWord;

    var text15 = document.createElement("div");
    text15.setAttribute('class', 'word');
    backgroundDiv.appendChild(text15);
    text15.innerHTML = targetWord;

    var text16 = document.createElement("div");
    text16.setAttribute('class', 'word');
    backgroundDiv.appendChild(text16);
    text16.innerHTML = targetWord;

    var text17 = document.createElement("div");
    text17.setAttribute('class', 'word');
    backgroundDiv.appendChild(text17);
    text17.innerHTML = targetWord;

    var text18 = document.createElement("div");
    text18.setAttribute('class', 'word');
    backgroundDiv.appendChild(text18);
    text18.innerHTML = targetWord;


    //create other words for maze
    var text19 = document.createElement("div");
    text19.setAttribute('class', 'word');
    backgroundDiv.appendChild(text19);
    text19.innerHTML = words[index1];

    var text20 = document.createElement("div");
    text20.setAttribute('class', 'word');
    backgroundDiv.appendChild(text20);
    text20.innerHTML = words[index2];

    var text21 = document.createElement("div");
    text21.setAttribute('class', 'word');
    backgroundDiv.appendChild(text21);
    text21.innerHTML = words[index3];

    var text22 = document.createElement("div");
    text22.setAttribute('class', 'word');
    backgroundDiv.appendChild(text22);
    text22.innerHTML = words[index1];

    var text23 = document.createElement("div");
    text23.setAttribute('class', 'word');
    backgroundDiv.appendChild(text23);
    text23.innerHTML = words[index2];

    var text24 = document.createElement("div");
    text24.setAttribute('class', 'word');
    backgroundDiv.appendChild(text24);
    text24.innerHTML = words[index3];

    var text25 = document.createElement("div");
    text25.setAttribute('class', 'word');
    backgroundDiv.appendChild(text25);
    text25.innerHTML = words[index1];

    var text26 = document.createElement("div");
    text26.setAttribute('class', 'word');
    backgroundDiv.appendChild(text26);
    text26.innerHTML = words[index2];

    var text27 = document.createElement("div");
    text27.setAttribute('class', 'word');
    backgroundDiv.appendChild(text27);
    text27.innerHTML = words[index3];

    var text28 = document.createElement("div");
    text28.setAttribute('class', 'word');
    backgroundDiv.appendChild(text28);
    text28.innerHTML = words[index1];

    var text29 = document.createElement("div");
    text29.setAttribute('class', 'word');
    backgroundDiv.appendChild(text29);
    text29.innerHTML = words[index2];

    var text30 = document.createElement("div");
    text30.setAttribute('class', 'word');
    backgroundDiv.appendChild(text30);
    text30.innerHTML = words[index3];

    var text31 = document.createElement("div");
    text31.setAttribute('class', 'word');
    backgroundDiv.appendChild(text31);
    text31.innerHTML = words[index1];

    var text32 = document.createElement("div");
    text32.setAttribute('class', 'word');
    backgroundDiv.appendChild(text32);
    text32.innerHTML = words[index2];

    var text33 = document.createElement("div");
    text33.setAttribute('class', 'word');
    backgroundDiv.appendChild(text33);
    text33.innerHTML = words[index3];

    var text34 = document.createElement("div");
    text34.setAttribute('class', 'word');
    backgroundDiv.appendChild(text34);
    text34.innerHTML = words[index1];

    var text35 = document.createElement("div");
    text35.setAttribute('class', 'word');
    backgroundDiv.appendChild(text35);
    text35.innerHTML = words[index2];

    var text36 = document.createElement("div");
    text36.setAttribute('class', 'word');
    backgroundDiv.appendChild(text36);
    text36.innerHTML = words[index3];

    var text37 = document.createElement("div");
    text37.setAttribute('class', 'word');
    backgroundDiv.appendChild(text37);
    text37.innerHTML = words[index1];

    var text38 = document.createElement("div");
    text38.setAttribute('class', 'word');
    backgroundDiv.appendChild(text38);
    text38.innerHTML = words[index2];

    var text39 = document.createElement("div");
    text39.setAttribute('class', 'word');
    backgroundDiv.appendChild(text39);
    text39.innerHTML = words[index3];

    var text40 = document.createElement("div");
    text40.setAttribute('class', 'word');
    backgroundDiv.appendChild(text40);
    text40.innerHTML = words[index1];

    var text41 = document.createElement("div");
    text41.setAttribute('class', 'word');
    backgroundDiv.appendChild(text41);
    text41.innerHTML = words[index2];

    //set style for words
    var wordsList = document.getElementsByClassName('word');
    for (var i = 0; i < wordsList.length; i++) {
        wordsList[i].style.position = "absolute";
        wordsList[i].style.fontSize = "150%";
        wordsList[i].style.color = '#00F';
        wordsList[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }

    // media query event handler
    if (matchMedia) {
        var mq = window.matchMedia("(min-width: 700px)");
        mq.addListener(WidthChange);
        WidthChange(mq);
    }

    // media query change
    function WidthChange(mq) {
        if (!mq.matches) {
            var wordsList = document.getElementsByClassName('word');
            for (var i = 0; i < wordsList.length; i++) {
                wordsList[i].style.fontSize = "100%";
            }
        }
        else {
            var wordsList = document.getElementsByClassName('word');
            for (var i = 0; i < wordsList.length; i++) {
                wordsList[i].style.fontSize = "150%";
            }
        }
    }

    //set position of target words
    text1.style.left = '65%';
    text1.style.top = '3%';

    text2.style.left = '45%';
    text2.style.top = '3%';

    text3.style.left = '25%';
    text3.style.top = '3%';

    text4.style.left = '5%';
    text4.style.top = '3%';

    text5.style.left = '5%';
    text5.style.top = '17.5%';

    text6.style.left = '25%';
    text6.style.top = '17.5%';

    text7.style.left = '47%';
    text7.style.top = '17.5%';

    text8.style.left = '47%';
    text8.style.top = '33%';

    text9.style.left = '47%';
    text9.style.top = '53%';

    text10.style.left = '62%';
    text10.style.top = '53%';

    text11.style.left = '77%';
    text11.style.top = '53%';

    text12.style.left = '77%';
    text12.style.top = '67%';

    text13.style.left = '62%';
    text13.style.top = '67%';

    text14.style.left = '47%';
    text14.style.top = '70%';

    text15.style.left = '62%';
    text15.style.top = '82%';

    text16.style.left = '50%';
    text16.style.top = '90%';

    text17.style.left = '35%';
    text17.style.top = '90%';

    text18.style.left = '20%';
    text18.style.top = '90%';

    text19.style.left = '62%';
    text19.style.top = '17.5%';

    text20.style.left = '62%';
    text20.style.top = '35%';

    text21.style.left = '77%';
    text21.style.top = '17.5%';

    text22.style.left = '77%';
    text22.style.top = '32%';

    text23.style.left = '77%';
    text23.style.top = '83%';

    text24.style.left = '85%';
    text24.style.top = '90%';

    text25.style.left = '92%';
    text25.style.top = '80%';

    text26.style.left = '92%';
    text26.style.top = '64%';

    text27.style.left = '92%';
    text27.style.top = '50%';

    text28.style.left = '93%';
    text28.style.top = '32%';

    text29.style.left = '93%';
    text29.style.top = '17.5%';

    text30.style.left = '35%';
    text30.style.top = '31%';

    text31.style.left = '20%';
    text31.style.top = '31%';

    text32.style.left = '5%';
    text32.style.top = '31%';

    text33.style.left = '35%';
    text33.style.top = '47%';

    text34.style.left = '35%';
    text34.style.top = '65%';

    text35.style.left = '28%';
    text35.style.top = '77.5%';

    text36.style.left = '15%';
    text36.style.top = '77.5%';

    text37.style.left = '4%';
    text37.style.top = '77.5%';

    text38.style.left = '4%';
    text38.style.top = '58%';

    text39.style.left = '4%';
    text39.style.top = '45%';

    text40.style.left = '22%';
    text40.style.top = '45%';

    text41.style.left = '22%';
    text41.style.top = '60%';

    dog.style.left = '5%';
    dog.style.top = '90%';
    dog.style.zIndex = '2';

    //click events
    $(text18).click(function () {
        if (counter == -1 || counter == 17) {
            dog.style.left = '20%';
            dog.style.top = '87%';
            counter = 18;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text17).click(function () {
        if (counter == 18 || counter == 16) {
            dog.style.top = '87%';
            dog.style.left = '35%';
            counter = 17;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text16).click(function () {
        if (counter == 17 || counter == 15) {
            dog.style.top = '87%';
            dog.style.left = '50%';
            counter = 16;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text15).click(function () {
        if (counter == 14 || counter == 16) {
            dog.style.left = '62%';
            dog.style.top = '82%';
            counter = 15;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text14).click(function () {
        if (counter == 13 || counter == 15) {
            dog.style.left = '47%';
            dog.style.top = '70%';
            counter = 14;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text13).click(function () {
        if (counter == 12 || counter == 14) {
            dog.style.left = '62%';
            dog.style.top = '64%';
            counter = 13;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text12).click(function () {
        if (counter == 11 || counter == 13) {
            dog.style.left = '77%';
            dog.style.top = '64%';
            counter = 12;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text11).click(function () {
        if (counter == 10 || counter == 12) {
            dog.src = imagePath + "mirrored_dog.png";
            dog.style.left = '77%';
            dog.style.top = '50%';
            counter = 11;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text10).click(function () {
        if (counter == 9 || counter == 11) {
            dog.style.left = '62%';
            dog.style.top = '50%';
            counter = 10;
            correctWord.play(correctWord);
        }
    });
    $(text9).click(function () {
        if (counter == 8 || counter == 10) {
            dog.style.left = '47%';
            dog.style.top = '50%';
            counter = 9;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text8).click(function () {
        if (counter == 7 || counter == 9) {
            dog.style.left = '47%';
            dog.style.top = '33%';
            counter = 8;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text7).click(function () {
        if (counter == 6 || counter == 8) {
            dog.style.left = '47%';
            dog.style.top = '15%';
            counter = 7;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text6).click(function () {
        if (counter == 5 || counter == 7) {
            dog.style.left = '25%';
            dog.style.top = '15%';
            counter = 6;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text5).click(function () {
        if (counter == 4 || counter == 6) {
            dog.style.left = '5%';
            dog.style.top = '15%';
            counter = 5;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text4).click(function () {
        if (counter == 3 || counter == 5) {
            dog.src = imagePath + "dog.png";
            dog.style.left = '5%';
            dog.style.top = '1%';
            counter = 4;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text3).click(function () {
        if (counter == 2 || counter == 4) {
            dog.style.left = '25%';
            dog.style.top = '1%';
            counter = 3;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text2).click(function () {
        if (counter == 1 || counter == 3) {
            dog.style.left = '45%';
            dog.style.top = '1%';
            counter = 2;
            correctWord.play(correctWord);
            score = score + 5;
        }
    });
    $(text1).click(function () {
        if (counter == 2) {
            dog.style.left = '80%';
            dog.style.top = '3%';
            endOfGame.play(endOfGame);
        }
    });
    $(text23).click(function () {
        if (counter == 12) {
            score = score - 10;
            wrongWay.play(wrongWay);
        }
    });
    $(text22).click(function () {
        if (counter == 11) {
            score = score - 10;
            wrongWay.play(wrongWay);
        }
    });
    $(text30).click(function () {
        if (counter == 8 || counter == 7) {
            score = score - 10;
            wrongWay.play(wrongWay);
        }
    });
}());