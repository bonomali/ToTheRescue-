(function () {
    var imagePath = '../../MiniGames/SightWord_Maze/images/';
    var audioPath = '../../MiniGames/SightWord_Maze/sounds/';

    //set correct margin for div and create paragraph elements
    var blocksDiv = document.getElementById('BlocksGame');
    blocksDiv.style.width = '88%';
    blocksDiv.style.height = '100%';
    blocksDiv.style.marginLeft = '1%';
    blocksDiv.style.backgroundImage = "url(" + imagePath + "maze.png)";
    blocksDiv.style.backgroundRepeat = "no-repeat";
    blocksDiv.style.backgroundSize = "cover";

    var text1 = document.createElement('p');
    text1.setAttribute('class', 'word');
    blocksDiv.appendChild(text1);
    text1.innerHTML = "here";
 
    var text2 = document.createElement('p');
    text2.setAttribute('class', 'word');
    blocksDiv.appendChild(text2);
    text2.innerHTML = "here";

    var text3 = document.createElement('p');
    text3.setAttribute('class', 'word');
    blocksDiv.appendChild(text3);
    text3.innerHTML = "here";

    var text4 = document.createElement('p');
    text4.setAttribute('class', 'word');
    blocksDiv.appendChild(text4);
    text4.innerHTML = "here";

    var text5 = document.createElement('p');
    text5.setAttribute('class', 'word');
    blocksDiv.appendChild(text5);
    text5.innerHTML = "here";

    var text6 = document.createElement('p');
    text6.setAttribute('class', 'word');
    blocksDiv.appendChild(text6);
    text6.innerHTML = "here";

    var text7 = document.createElement('p');
    text7.setAttribute('class', 'word');
    blocksDiv.appendChild(text7);
    text7.innerHTML = "here";

    /*var text8 = document.createElement('p');
    text8.setAttribute('class', 'word');
    blocksDiv.appendChild(text8);

    var text9 = document.createElement('p');
    text9.setAttribute('class', 'word');
    blocksDiv.appendChild(text9);

    var text10 = document.createElement('p');
    text10.setAttribute('class', 'word');
    blocksDiv.appendChild(text10);

    var text11 = document.createElement('p');
    text11.setAttribute('class', 'word');
    blocksDiv.appendChild(text11);*/

    var wordsList = document.getElementsByClassName('word');
    for (var i = 0; i < wordsList.length; i++)
    {
        blocksDiv.appendChild(wordsList[i]);
        wordsList[i].style.position = "absolute";
        wordsList[i].style.fontSize = "x-large"
        wordsList[i].style.color = '#00F';
        wordsList[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }
    text1.style.left = '65%';
    text1.style.top = '2%';

    text2.style.left = '45%';
    text2.style.top = '2%';
  
    text3.style.left = '25%';
    text3.style.top = '2%';

    text4.style.left = '5%';
    text4.style.top = '2%';

    text5.style.left = '5%';
    text5.style.top = '13%';

    text6.style.left = '25%';
    text6.style.top = '13%';

    text7.style.left = '42%';
    text7.style.top = '13%';

    var difficulty_level = document.getElementById('minigameScript').getAttribute('difficulty');
    var toggle_sound = document.getElementById('minigameScript').getAttribute('toggleSound');
}());