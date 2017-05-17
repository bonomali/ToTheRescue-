(function () {
    var toggle_music = document.getElementById('minigameScript').getAttribute('toggleMusic');
    var imagePath = '../../MiniGames/Opposites_Matching/images/';
    var soundPath = '../../MiniGames/Opposites_Matching/sounds/';
    var targetIndex, word1Index, word2Index;   //indicies for word cards
    var targetWord, matchingWord, correctAudio; //audio clips for repeating opposites when matched
    var InstructionsPart1, InstructionsPart2, InstructionsPart3, tryAgain, correct; //audio
    var score = 0;
    var finalScore = 0;
    var playing = true;     //keep track of if game playabe

    //sets of opposite words and corresponding sounds
    var wordsSet1 = [imagePath + "asleep.png", imagePath + "back.png", imagePath + "big.png", imagePath + "clean.png", imagePath + "empty.png",
        imagePath + "fast.png", imagePath + "happy.png", imagePath + "hard.png", imagePath + "high.png", imagePath + "hot.png", imagePath + "young.png"];
    var wordsSet2 = [imagePath + "awake.png", imagePath + "front.png", imagePath + "small.png", imagePath + "dirty.png", imagePath + "full.png",
        imagePath + "slow.png", imagePath + "sad.png", imagePath + "soft.png", imagePath + "low.png", imagePath + "cold.png", imagePath + "old.png"];

    var soundsSet1 = [soundPath + "asleep_recording.mp3", soundPath + "back_recording.mp3", soundPath + "big_recording.mp3",
        soundPath + "clean_recording.mp3", soundPath + "empty_recording.mp3", soundPath + "fast_recording.mp3", soundPath + "happy_recording.mp3",
        soundPath + "hard_recording.mp3", soundPath + "high_recording.mp3", soundPath + "hot_recording.mp3", soundPath + "young_recording.mp3"];
    var soundsSet2 = [soundPath + "awake_recording.mp3", soundPath + "front_recording.mp3", soundPath + "small_recording.mp3",
        soundPath + "dirty_recording.mp3", soundPath + "full_recording.mp3", soundPath + "slow_recording.mp3", soundPath + "sad_recording.mp3",
        soundPath + "soft_recording.mp3", soundPath + "low_recording.mp3", soundPath + "cold_recording.mp3", soundPath + "old_recording.mp3"];

    //set correct margin for div and div styling
    document.getElementById('BlocksGame').style.marginLeft = '-5%';
    document.getElementById('BlocksGame').style.backgroundColor = '#F7B3DA'
    document.getElementById('BlocksGame').style.width = '88%';
    document.getElementById('BlocksGame').style.marginLeft = '1%';

    //create div for target opposite with
    var targetRhyme = document.createElement('div');
    targetRhyme.setAttribute('class', 'topDivs')
    targetRhyme.style.marginLeft = '15%';
    document.getElementById('BlocksGame').appendChild(targetRhyme);

    //create div for matching opposite word
    var matchingRhyme = document.createElement('div');
    matchingRhyme.setAttribute('class', 'topDivs')
    matchingRhyme.style.marginLeft = '60%';
    matchingRhyme.style.backgroundColor = '#CD1076';
    document.getElementById('BlocksGame').appendChild(matchingRhyme);

    //style target and matching divs
    var top = document.getElementsByClassName('topDivs');
    for (var i = 0; i < top.length; i++) {
        top[i].style.position = 'absolute';
        top[i].style.marginTop = '1%';
        top[i].style.width = '25%';
        top[i].style.height = '40%';
        top[i].style.border = "thick solid #000"
    }

    //create div for opposite word option 1
    var card1 = document.createElement('div');
    card1.setAttribute('class', 'card');
    document.getElementById('BlocksGame').appendChild(card1);

    //create div for opposite word option 2
    var card2 = document.createElement('div');
    card2.setAttribute('class', 'card');
    document.getElementById('BlocksGame').appendChild(card2);

    //create div for opposite word option 3
    var card3 = document.createElement('div');
    card3.setAttribute('class', 'card');
    document.getElementById('BlocksGame').appendChild(card3);

    //style divs that will contain opposite word options
    var cards = document.getElementsByClassName('card');
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.position = 'absolute';
        cards[i].style.marginTop = '30%';
        cards[i].style.width = '25%';
        cards[i].style.height = '40%';
        cards[i].style.border = "thick solid #000"
    }

    //create, style, and add target image to target div
    var targetImage = document.createElement('img');
    targetImage.style.height = '100%';
    targetImage.style.width = '100%';
    targetRhyme.appendChild(targetImage);

    //create, style, and add first word option to div and set draggable to true
    var card1Image = document.createElement('img');
    card1Image.setAttribute('id', 'draggableImg1');
    card1Image.style.height = '100%';
    card1Image.style.width = '100%';
    card1Image.setAttribute('draggable', true);
    card1.appendChild(card1Image);

    //create, style, and add second word option to div and set draggable to true
    var card2Image = document.createElement('img');
    card2Image.setAttribute('id', 'draggableImg2');
    card2Image.style.height = '100%';
    card2Image.style.width = '100%';
    card2Image.setAttribute('draggable', true);
    card2.appendChild(card2Image);

    //create, style, and add third word option to div and set draggable to true
    var card3Image = document.createElement('img');
    card3Image.setAttribute('id', 'matchingImg');
    card3Image.style.height = '100%';
    card3Image.style.width = '100%';
    card3Image.setAttribute('draggable', true);

    // media query change to handle narrower screens
    function WidthChange(mq) {
        if (!mq.matches && window.innerHeight > 250) {
            card1.style.marginTop = '45%';
            card2.style.marginTop = '45%';
            card3.style.marginTop = '45%';
            card1.appendChild(card1Image);
            card2.appendChild(card2Image);
            card3.appendChild(card3Image);
        }
        else {
            card1.style.marginTop = '30%';
            card2.style.marginTop = '30%';
            card3.style.marginTop = '30%';
            card1.appendChild(card1Image);
            card2.appendChild(card2Image);
            card3.appendChild(card3Image);
        }
    }

    //handle dropping action
    matchingRhyme.ondragover = function allowDrop(ev) {
        ev.preventDefault();
    }
    //handle dragging action for matching word card
    card3Image.ondragstart = function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    //handle dropping action
    matchingRhyme.ondrop = function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        if (data == "matchingImg") {        //increment score and play correct audio if correct card
            ev.target.appendChild(document.getElementById(data));
            score = score + 5;  //increment score for correct answer
            tryAgain.setVolume(.1);
            setTimeout(function () { correct.play(correct) }, 500);
        }
        else {  //decrement score and play incorrect audio if incorrect card
            setTimeout(function () { tryAgain.play(tryAgain) }, 500);
            score = score - 2;  //decrement score for incorrect answer
        }
    }

    //create audio
    var createAudio = function () {
        InstructionsPart1 = new WebAudioAPISound(soundPath + "audio_instructionsPart1.mp3", { loop: false });
        InstructionsPart1.setVolume(90);
        InstructionsPart1.onEnded = instructions1Ended;
        InstructionsPart3 = new WebAudioAPISound(soundPath + "audio_instructionsPart2.mp3", { loop: false });
        InstructionsPart3.setVolume(90);
        InstructionsPart3.onEnded = instructions3Ended;
        tryAgain = new WebAudioAPISound(soundPath + "tryAgain_recording.mp3", { loop: false });
        correct = new WebAudioAPISound(soundPath + "praise_recording.mp3", {loop: false});
        correct.onEnded = correctEnded;
        backgroundMusic = new WebAudioAPISound(soundPath + "background_music.mp3", { loop: true });
        backgroundMusic.setVolume(5);
        if (toggle_music == "False")
            backgroundMusic.play(backgroundMusic);
    }

    window.onload = function () {
        createAudio();  //call function to create audio
        InitGame();     //initialize game and play audio instructions
    }

    //randomly choose and play all word cards
    function InitGame() {
        card3.appendChild(card3Image);

        targetIndex = Math.floor((Math.random() * wordsSet1.length)); //randomly choose target word
        word1Index = Math.floor((Math.random() * wordsSet1.length)); //randomly choose word1 index
        while (word1Index == targetIndex)  //choose again if same as another index
            word1Index = Math.floor((Math.random() * wordsSet1.length)); //randomly choose word1 index
        word2Index = Math.floor((Math.random() * wordsSet1.length)); //randomly choose word2 index
        while (word2Index == targetIndex || word2Index == word1Index)  //choose again if same as another index
            word2Index = Math.floor((Math.random() * wordsSet1.length)); //randomly choose word2 index

        targetImage.src = wordsSet1[targetIndex];   //target card
        card3Image.src = wordsSet2[targetIndex];    //matching card
        card1Image.src = wordsSet1[word1Index];     //incorrect matching card 1
        card2Image.src = wordsSet1[word2Index];     //incorrect matching card 2

        var cardCoord = ['5%', '37.5%', '70%']; //coordinate for word cards at bottom of screen

        var index3 = Math.floor((Math.random() * cardCoord.length));
        card3.style.marginLeft = cardCoord[index3];  //randomly set location of target card
        var index2 = Math.floor((Math.random() * cardCoord.length));
        while (index2 == index3)
            index2 = Math.floor((Math.random() * cardCoord.length));
        card2.style.marginLeft = cardCoord[index2]; //randomly set location of first word card
        var index1 = Math.floor((Math.random() * cardCoord.length));
        while (index1 == index2 || index1 == index3)
            index1 = Math.floor((Math.random() * cardCoord.length));
        card1.style.marginLeft = cardCoord[index1]; //randomly set location of second word card

        correct.setVolume(.1);
        tryAgain.setVolume(.1);
        GameIntro();    //call function to play directions
    }

    //play game intro and directions
    function GameIntro() {
        InstructionsPart1.play(InstructionsPart1);
    };
    instructions1Ended = function () {
         InstructionsPart2 = new WebAudioAPISound(soundsSet1[targetIndex], { loop: false });
         InstructionsPart2.setVolume(90);
         InstructionsPart2.onEnded = instructions2Ended;
         InstructionsPart2.play(InstructionsPart2)
     };
    instructions2Ended = function () {
        InstructionsPart3.play(InstructionsPart3);
    };
    //reset volume after instructions over
    instructions3Ended = function () {
        correct.setVolume(90);
        tryAgain.setVolume(90);
    };
    //play audio to reinforce opposites match
    correctEnded = function () {
        targetWord = new WebAudioAPISound(soundsSet1[targetIndex], { loop: false });
        targetWord.setVolume(90);
        targetWord.onEnded = targetEnded;
        targetWord.play(targetWord);
    };
    targetEnded = function () {
        correct.setVolume(.1);
        correctAudio = new WebAudioAPISound(soundPath + "oppositeOf_recording.mp3", { loop: false });
        correctAudio.setVolume(90);
        correctAudio.onEnded = correctAudioEnded;
        correctAudio.play(correctAudio);
    };
    correctAudioEnded = function () {
        matchingWord = new WebAudioAPISound(soundsSet2[targetIndex], { loop: false });
        matchingWord.setVolume(90);
        matchingWord.onEnded = matchingEnded;
        matchingWord.play(matchingWord);
    };
    matchingEnded = function () {
        if(playing == true)
            setTimeout(InitGame(), 500);    //init a new game
    };

    setTimeout(function GameOver() {
        playing = false;
        InstructionsPart1.setVolume(.1);
        InstructionsPart2.setVolume(.1);
        InstructionsPart3.setVolume(.1);

        if (score >= 20)    //calculate final score
            finalScore = 5;
        else if (score >= 14)
            finalScore = 3;
        else if (score >= 5)
            finalScore = 0;
        else
            finalScore = -5;
        document.getElementById('score').value = finalScore; //save score in html element
        EndofGame(); //function displays good job message and returns to map
    }, 60000);
}());