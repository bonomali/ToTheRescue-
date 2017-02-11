(function () {
    var imagePath = '../../MiniGames/SightWord_Maze/images/';
    var audioPath = '../../MiniGames/SightWord_Maze/sounds/';
    var playing = true;

    words = ["at", "can", "in", "big", "me", "not", "on", "see", "the", "up"];
   /* wordSounds = [soundPath + "at_recording.mp3", soundPath + "can_recording.mp3", soundPath + "in_recording.mp3",
        soundPath + "big_recording.mp3", soundPath + "me_recording.mp3", soundPath + "not_recording.mp3",
        soundPath + "on_recording.mp3", soundPath + "see_recording.mp3", soundPath + "the_recording.mp3",
        soundPath + "up_recording.mp3"];
        */
    var targetIndex = Math.floor((Math.random() * words.length)); //random number for array index
    var targetWord = words[targetIndex];    //target word for maze

    //set correct margin for div and create paragraph elements
    var blocksDiv = document.getElementById('BlocksGame');
    blocksDiv.style.width = '88%';
    blocksDiv.style.height = '100%';
    blocksDiv.style.marginLeft = '1%';
    blocksDiv.style.backgroundImage = "url(" + imagePath + "maze.png)";
    blocksDiv.style.backgroundRepeat = "no-repeat";
    blocksDiv.style.backgroundSize = "cover";

    var dog = document.createElement('img');
    dog.setAttribute('id', 'dog');
    dog.src = imagePath + "dog.png";
    blocksDiv.appendChild(dog);
    dog.style.position = "absolute";
    dog.style.width = '6%';

    var text1 = document.createElement('p');
    text1.setAttribute('class', 'word');
    blocksDiv.appendChild(text1);
    text1.innerHTML = targetWord;
 
    var text2 = document.createElement('p');
    text2.setAttribute('class', 'word');
    blocksDiv.appendChild(text2);
    text2.innerHTML = targetWord;

    var text3 = document.createElement('p');
    text3.setAttribute('class', 'word');
    blocksDiv.appendChild(text3);
    text3.innerHTML = targetWord;

    var text4 = document.createElement('p');
    text4.setAttribute('class', 'word');
    blocksDiv.appendChild(text4);
    text4.innerHTML = targetWord;

    var text5 = document.createElement('p');
    text5.setAttribute('class', 'word');
    blocksDiv.appendChild(text5);
    text5.innerHTML = targetWord;

    var text6 = document.createElement('p');
    text6.setAttribute('class', 'word');
    blocksDiv.appendChild(text6);
    text6.innerHTML = targetWord;

    var text7 = document.createElement('p');
    text7.setAttribute('class', 'word');
    blocksDiv.appendChild(text7);
    text7.innerHTML = targetWord;

    var text8 = document.createElement('p');
    text8.setAttribute('class', 'word');
    blocksDiv.appendChild(text8);
    text8.innerHTML = targetWord;

    var text9 = document.createElement('p');
    text9.setAttribute('class', 'word');
    blocksDiv.appendChild(text9);
    text9.innerHTML = targetWord;

    var text10 = document.createElement('p');
    text10.setAttribute('class', 'word');
    blocksDiv.appendChild(text10);
    text10.innerHTML = targetWord;

    var text11 = document.createElement('p');
    text11.setAttribute('class', 'word');
    blocksDiv.appendChild(text11);
    text11.innerHTML = targetWord;

    var text12 = document.createElement('p');
    text12.setAttribute('class', 'word');
    blocksDiv.appendChild(text12);
    text12.innerHTML = targetWord;

    var text13 = document.createElement('p');
    text13.setAttribute('class', 'word');
    blocksDiv.appendChild(text13);
    text13.innerHTML = targetWord;

    var text14 = document.createElement('p');
    text14.setAttribute('class', 'word');
    blocksDiv.appendChild(text14);
    text14.innerHTML = targetWord;

    var text15 = document.createElement('p');
    text15.setAttribute('class', 'word');
    blocksDiv.appendChild(text15);
    text15.innerHTML = targetWord;

    var text16 = document.createElement('p');
    text16.setAttribute('class', 'word');
    blocksDiv.appendChild(text16);
    text16.innerHTML = targetWord;

    var text17 = document.createElement('p');
    text17.setAttribute('class', 'word');
    blocksDiv.appendChild(text17);
    text17.innerHTML = targetWord;

    var text18 = document.createElement('p');
    text18.setAttribute('class', 'word');
    blocksDiv.appendChild(text18);
    text18.innerHTML = targetWord;

    var wordsList = document.getElementsByClassName('word');
    for (var i = 0; i < wordsList.length; i++)
    {
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
    text1.style.left = '65%';
    text1.style.top = '1%';

    text2.style.left = '45%';
    text2.style.top = '1%';
  
    text3.style.left = '25%';
    text3.style.top = '1%';

    text4.style.left = '5%';
    text4.style.top = '1%';

    text5.style.left = '5%';
    text5.style.top = '15%';

    text6.style.left = '25%';
    text6.style.top = '15%';

    text7.style.left = '47%';
    text7.style.top = '15%';

    text8.style.left = '47%';
    text8.style.top = '33%';

    text9.style.left = '47%';
    text9.style.top = '50%';

    text10.style.left = '62%';
    text10.style.top = '50%';
    
    text11.style.left = '77%';
    text11.style.top = '50%';

    text12.style.left = '77%';
    text12.style.top = '64%';

    text13.style.left = '62%';
    text13.style.top = '64%';

    text14.style.left = '47%';
    text14.style.top = '70%';

    text15.style.left = '62%';
    text15.style.top = '82%';

    text16.style.left = '50%';
    text16.style.top = '87%';

    text17.style.left = '35%';
    text17.style.top = '87%';

    text18.style.left = '20%';
    text18.style.top = '87%';

    dog.style.left = '5%';
    dog.style.top = '90%';
    dog.style.zIndex = '2';

    var correctWord = false;


    $(text18).click(function () {
        dog.style.left = '20%';
        dog.style.top = '87%';
    });
    $(text17).click(function () {
        dog.style.top = '87%';
        dog.style.left = '35%';
    });
    $(text16).click(function () {
        dog.style.top = '87%';
        dog.style.left = '50%';
    });
    $(text15).click(function () {
        dog.style.left = '62%';
        dog.style.top = '82%';
    });
    $(text14).click(function () {
        dog.style.left = '47%';
        dog.style.top = '70%';
    });
    $(text13).click(function () {
        dog.style.left = '62%';
        dog.style.top = '64%';
    });
    $(text12).click(function () {
        dog.style.left = '77%';
        dog.style.top = '64%';
    });
    $(text11).click(function () {
        dog.src = imagePath + "mirrored_dog.png";
        dog.style.left = '77%';
        dog.style.top = '50%';
    });
    $(text10).click(function () {
        dog.style.left = '62%';
        dog.style.top = '50%';
    });
    $(text9).click(function () {
        dog.style.left = '47%';
        dog.style.top = '50%';
    });
    $(text8).click(function () {
        dog.style.left = '47%';
        dog.style.top = '33%';
    });
    $(text7).click(function () {
        dog.style.left = '47%';
        dog.style.top = '15%';
    });
    $(text6).click(function () {
        dog.style.left = '25%';
        dog.style.top = '15%';
    });
    $(text5).click(function () {
        dog.style.left = '5%';
        dog.style.top = '15%';
    });
    $(text4).click(function () {
        dog.src = imagePath + "dog.png";
        dog.style.left = '5%';
        dog.style.top = '1%';
    });
    $(text3).click(function () {
        dog.style.left = '25%';
        dog.style.top = '1%';
    });
    $(text2).click(function () {
        dog.style.left = '45%';
        dog.style.top = '1%';
    });
    $(text1).click(function () {
        dog.style.left = '80%';
        dog.style.top = '3%';
    });
}());