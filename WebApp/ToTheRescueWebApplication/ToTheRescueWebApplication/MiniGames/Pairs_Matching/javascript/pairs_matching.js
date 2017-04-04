(function () {
    var toggle_music = document.getElementById('minigameScript').getAttribute('toggleMusic');
    var imagePath = '../../MiniGames/Pairs_Matching/images/';
    var soundPath = '../../MiniGames/Pairs_Matching/sounds/';
    var targetIndex, word1Index, word2Index;   //indicies for word cards
    var targetWord, matchingWord, correctAudio; //audio clips for repeating pair when matched
    var InstructionsPart1, InstructionsPart2, InstructionsPart3;
    var score = 0;
    var finalScore = 0;

    //sets of pair words and corresponding sounds
    var wordsSet1 = [imagePath + "fireman.png", imagePath + "ambulance.png", imagePath + "bird.png", imagePath + "hammer.png", imagePath + "hat.png",
        imagePath + "moon.png", imagePath + "pants.png", imagePath + "shoes.png", imagePath + "spider.png", imagePath + "paper.png"];
    var wordsSet2 = [imagePath + "firepup.png", imagePath + "hospital.png", imagePath + "nest.png", imagePath + "nail.png", imagePath + "mittens.png",
        imagePath + "star.png", imagePath + "shirt.png", imagePath + "socks.png", imagePath + "web.png", imagePath + "scissors.png"];

    var soundsSet1 = [soundPath + "fireman_recording.mp3", soundPath + "ambulance_recording.mp3", soundPath + "bird_recording.mp3",
        soundPath + "hammer_recording.mp3", soundPath + "hat_recording.mp3", soundPath + "moon_recording.mp3", soundPath + "pants_recording.mp3",
        soundPath + "shoes_recording.mp3", soundPath + "spider_recording.mp3", soundPath + "paper_recording.mp3"];
    var soundsSet2 = [soundPath + "firepup_recording.mp3", soundPath + "hospital_recording.mp3", soundPath + "nest_recording.mp3",
        soundPath + "nail_recording.mp3", soundPath + "mittens_recording.mp3", soundPath + "star_recording.mp3", soundPath + "shirt_recording.mp3",
        soundPath + "socks_recording.mp3", soundPath + "web_recording.mp3", soundPath + "scissors_recording.mp3"];

    //set correct margin for div and div styling
    document.getElementById('BlocksGame').style.marginLeft = '-5%';
    document.getElementById('BlocksGame').style.backgroundColor = '#00FA9A'
    document.getElementById('BlocksGame').style.width = '88%';
    document.getElementById('BlocksGame').style.marginLeft = '1%';

    //create div for target word to pair with
    var targetRhyme = document.createElement('div');
    targetRhyme.setAttribute('class', 'topDivs')
    targetRhyme.style.marginLeft = '15%';
    document.getElementById('BlocksGame').appendChild(targetRhyme);

    //create div for matching pair word
    var matchingRhyme = document.createElement('div');
    matchingRhyme.setAttribute('class', 'topDivs')
    matchingRhyme.style.marginLeft = '60%';
    matchingRhyme.style.backgroundColor = '#32CD32';
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

    //create div for pair word option 1
    var card1 = document.createElement('div');
    card1.setAttribute('class', 'card');
    document.getElementById('BlocksGame').appendChild(card1);

    //create div for pair word option 2
    var card2 = document.createElement('div');
    card2.setAttribute('class', 'card');
    document.getElementById('BlocksGame').appendChild(card2);

    //create div for pair word option 3
    var card3 = document.createElement('div');
    card3.setAttribute('class', 'card');
    document.getElementById('BlocksGame').appendChild(card3);

    //style divs that will contain pair word options
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

    var tryAgain = new Audio(); //try again audio for incorrect matching choice
    tryAgain.src = soundPath + "tryAgain_recording.mp3";
    var correct = new Audio();  //praise audio for correct matching choice
    correct.src = soundPath + "praise_recording.mp3";

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
            setTimeout(function () { correct.play() }, 500);
        }
        else {  //decrement score and play incorrect audio if incorrect card
            setTimeout(function () { tryAgain.play() }, 500);
            score = score - 2;  //decrement score for incorrect answer
        }
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

        GameIntro();    //call function to play directions
    }
    //play game intro and directions
    function GameIntro() {
        InstructionsPart1 = new Audio();
        InstructionsPart1.src = soundPath + "audio_instructionsPart1.mp3";
        InstructionsPart2 = new Audio();
        InstructionsPart2.src = soundsSet1[targetIndex];    //play target pair word
        InstructionsPart3 = new Audio();
        InstructionsPart3.src = soundPath + "audio_instructionsPart2.mp3";
        InstructionsPart1.addEventListener('ended', function () {
            InstructionsPart2.play()
        });
        InstructionsPart2.addEventListener('ended', function () {
            InstructionsPart3.play()
        });
        InstructionsPart1.play();
    }
    //play audio to reinforce pair match
    targetWord = new Audio();
    correct.addEventListener('ended', function () {
        targetWord.src = soundsSet1[targetIndex];
        targetWord.play();
    });
    correctAudio = new Audio();
    correctAudio.src = soundPath + "goesWith_recording.mp3";
    targetWord.addEventListener('ended', function () {
        correctAudio.play();
    });
    matchingWord = new Audio();
    correctAudio.addEventListener('ended', function () {
        matchingWord.src = soundsSet2[targetIndex];
        matchingWord.play();
    });
    matchingWord.addEventListener('ended', function () {
        setTimeout(InitGame(), 500);    //init a new game
    });


    window.onload = function () {
        InitGame(); //initialize game
    }

    //initalize and play background music
    var backgroundMusic = new Audio();
    backgroundMusic.src = soundPath + "background_music.mp3";
    if (toggle_music == "False") {
        backgroundMusic.play();
        backgroundMusic.volume = .1;
    }
    //loop background music
    backgroundMusic.addEventListener('ended', function () {
        if (toggle_music == "False") {
            backgroundMusic.play();
            backgroundMusic.volume = .1;
        }
    })

    setTimeout(function GameOver() {
        InstructionsPart1.src = null  //set all insructions to null so don't play after game over
        InstructionsPart2.src = null;
        InstructionsPart3.src = null;

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