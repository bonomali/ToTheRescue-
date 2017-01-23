(function () {
    var imagePath = '../../MiniGames/RhymingMatch/images/';
    var soundPath = '../../MiniGames/Rhymingmatch/sounds/';

    //set correct margin for div and div styling
    document.getElementById('BlocksGame').style.marginLeft = '-5%';
    document.getElementById('BlocksGame').style.backgroundColor = '#BF5FFF'
    document.getElementById('BlocksGame').style.width = '88%';
    document.getElementById('BlocksGame').style.marginLeft = '1%';

    //create div for target word to rhyme with
    var targetRhyme = document.createElement('div');
    targetRhyme.setAttribute('class', 'topDivs')
    targetRhyme.style.marginLeft = '15%';
    document.getElementById('BlocksGame').appendChild(targetRhyme);

    //create div for matching rhyming word
    var matchingRhyme = document.createElement('div');
    matchingRhyme.setAttribute('class', 'topDivs')
    matchingRhyme.style.marginLeft = '60%';
    matchingRhyme.style.backgroundColor = '#6B238E';
    document.getElementById('BlocksGame').appendChild(matchingRhyme);

    //style target and matching divs
    var top = document.getElementsByClassName('topDivs');
    for (var i = 0; i < top.length; i++)
    {
        top[i].style.position = 'absolute';
        top[i].style.marginTop = '1%';
        top[i].style.width = '25%';
        top[i].style.height = '40%';
        top[i].style.zIndex = 2;
        top[i].style.border = "thick solid #000"

    }

    //create div for rhyming word option 1
    var card1 = document.createElement('div');
    card1.setAttribute('class', 'card');
    card1.style.marginLeft = '5%';
    document.getElementById('BlocksGame').appendChild(card1);

    //create div for rhyming word option 2
    var card2 = document.createElement('div');
    card2.setAttribute('class', 'card');
    card2.style.marginLeft = '37.5%';
    document.getElementById('BlocksGame').appendChild(card2);

    //create div for rhyming word option 3
    var card3 = document.createElement('div');
    card3.setAttribute('class', 'card');
    card3.style.marginLeft = '70%';
    document.getElementById('BlocksGame').appendChild(card3);

    //style divs that will contain rhyming word options
    var cards = document.getElementsByClassName('card');
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.position = 'absolute';
        cards[i].style.marginTop = '30%';
        cards[i].style.width = '25%';
        cards[i].style.height = '40%';
        cards[i].style.zIndex = 2;
        cards[i].style.border = "thick solid #000"
    }

    //create, style, and add target image to target div
    var targetImage = document.createElement('img');
    targetImage.style.height = '100%';
    targetImage.style.width = '100%';
    targetImage.src = imagePath + "cat.png"
    targetRhyme.appendChild(targetImage);

    //create, style, and add first word option to div and set draggable to true
    var card1Image = document.createElement('img');
    card1Image.setAttribute('id', 'matchingImg');
    card1Image.style.height = '100%';
    card1Image.style.width = '100%';
    card1Image.src = imagePath + "bat.png"
    card1Image.setAttribute('draggable', true);
    card1.appendChild(card1Image);

    //create, style, and add second word option to div and set draggable to true
    var card2Image = document.createElement('img');
    card2Image.setAttribute('id', 'draggableImg2');
    card2Image.style.height = '100%';
    card2Image.style.width = '100%';
    card2Image.src = imagePath + "fox.png"
    card2Image.setAttribute('draggable', true);
    card2.appendChild(card2Image);
  
    //create, style, and add third word option to div and set draggable to true
    var card3Image = document.createElement('img');
    card3Image.setAttribute('id', 'draggableImg3');
    card3Image.style.height = '100%';
    card3Image.style.width = '100%';
    card3Image.src = imagePath + "toes.png"
    card3Image.setAttribute('draggable', true);
    card3.appendChild(card3Image);

    //handle dropping action
    matchingRhyme.ondragover = function allowDrop(ev) {
        ev.preventDefault();
    }
    //handle dragging action for first word option
    card1Image.ondragstart = function drag(ev) {
        if(card1Image.getAttribute('id') == 'matchingImg')
            ev.dataTransfer.setData("text", ev.target.id);
    }
    //handle dragging action for second word option
    card2Image.ondragstart = function drag(ev) {
        if (card2Image.getAttribute('id') == 'matchingImg')
            ev.dataTransfer.setData("text", ev.target.id);
    }
    //handle dragging action for third word option
    card3Image.ondragstart = function drag(ev) {
        if (card2Image.getAttribute('id') == 'matchingImg')
            ev.dataTransfer.setData("text", ev.target.id);
    }
    //handle dropping action
    matchingRhyme.ondrop = function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
}());