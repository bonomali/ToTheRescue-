const NUM_OF_SHAPES = 7;
const RHOMBUS_INDEX = 0;
const SQUARE_INDEX = 1;
const BLUE_TRI_INDEX = 2;
const AQUA_TRI_INDEX = 3;
const GREEN_TRI_INDEX = 4;
const ORANGE_TRI_INDEX = 5;
const YELLOW_TRI_INDEX = 6;
const IMG_PATH = "../../MiniGames/TangramGame/img/";

var rotationArr = [];
var rotationArrIndex = null;
var selectedContainer = null;

var rhombusDropped = false;
var squareDropped = false;
var blueTriDropped = false;
var aquaTriDropped = false;
var greenTriDropped = false;
var orangeTriDropped = false;
var yellowTriDropped = false;

var rhombusDropAreaEmpty = true;
var squareDropAreaEmpty = true;
var blueTriDropAreaEmpty = true;
var aquaTriDropAreaEmpty = true;
var greenTriDropAreaEmpty = true;
var orangeTriDropAreaEmpty = true;
var yellowTriDropAreaEmpty = true;

var soundToggle = "False";
var musicToggle = "False";

var mostRecentDragID = null;
var audio = new Audio();
var endGameFuncCalls = 0;

//*********************** Generic functions used across both difficulty levels *************************************//
function ResetDropAreaZIndexs() {
    document.getElementById("rhombusDropArea").style.zIndex = 2;
    document.getElementById("squareDropArea").style.zIndex = 2;
    document.getElementById("orangeTriDropArea").style.zIndex = 2;
    document.getElementById("aquaTriDropArea").style.zIndex = 2;
    document.getElementById("blueTriDropArea").style.zIndex = 2;
    document.getElementById("yellowTriDropArea").style.zIndex = 2;
    document.getElementById("greenTriDropArea").style.zIndex = 2;
}

function WonGame() {
    if (!rhombusDropAreaEmpty && !squareDropAreaEmpty
		&& !blueTriDropAreaEmpty && !aquaTriDropAreaEmpty
		&& !greenTriDropAreaEmpty && !orangeTriDropAreaEmpty
		&& !yellowTriDropAreaEmpty) {
        return true;
    }

    return false;
}

function ToggleDroppedAndEmpty(dragId, dropAreaName) {
    if (dragId === "blueTri")
        blueTriDropped = true;
    else if (dragId === "aquaTri")
        aquaTriDropped = true;
    else if (dragId === "rhombus")
        rhombusDropped = true;
    else if (dragId === "square")
        squareDropped = true;
    else if (dragId === "greenTri")
        greenTriDropped = true;
    else if (dragId === "orangeTri")
        orangeTriDropped = true;
    else if (dragId === "yellowTri")
        yellowTriDropped = true;

    if (dropAreaName === "blueTri")
        blueTriDropAreaEmpty = false;
    else if (dropAreaName === "aquaTri")
        aquaTriDropAreaEmpty = false;
    else if (dropAreaName === "rhombus")
        rhombusDropAreaEmpty = false;
    else if (dropAreaName === "square")
        squareDropAreaEmpty = false;
    else if (dropAreaName === "greenTri")
        greenTriDropAreaEmpty = false;
    else if (dropAreaName === "orangeTri")
        orangeTriDropAreaEmpty = false;
    else if (dropAreaName === "yellowTri")
        yellowTriDropAreaEmpty = false;
}

function AllowDrop(ev) {
    ev.preventDefault();
}

//*********************** Functions specific to the House level (higher difficulty level) *************************************//
function DragHouse(ev) {
    var flag = false;

    mostRecentDragID = ev.target.id;

    if (mostRecentDragID === "rhombus") {
        if (rotationArr[RHOMBUS_INDEX] === 135 || rotationArr[RHOMBUS_INDEX] === 315) {
            flag = true;
        }
    }
    else if (mostRecentDragID === "square") {
        if (rotationArr[SQUARE_INDEX] === 0 || rotationArr[SQUARE_INDEX] === 90 || rotationArr[SQUARE_INDEX] === 180 || rotationArr[SQUARE_INDEX] === 270 || rotationArr[SQUARE_INDEX] === 360) {
            flag = true;
        }
    }
    else if (mostRecentDragID === "blueTri") {
        if (rotationArr[BLUE_TRI_INDEX] === 0 || rotationArr[BLUE_TRI_INDEX] === 90 || rotationArr[BLUE_TRI_INDEX] === 315 || rotationArr[BLUE_TRI_INDEX] === 360) {

            if (rotationArr[BLUE_TRI_INDEX] === 90 && aquaTriDropAreaEmpty === true) {
                var dropAr = document.getElementById("aquaTriDropArea");

                dropAr.style.webkitTransform = "rotate(270deg)";
                dropAr.style.msTransform = "rotate(270deg)";
                dropAr.style.transform = "rotate(270deg)";

                dropAr.style.zIndex = "4";
            }

            flag = true;
        }
    }
    else if (mostRecentDragID === "aquaTri") {
        if (rotationArr[AQUA_TRI_INDEX] === 270 || rotationArr[AQUA_TRI_INDEX] === 180) {
            if (rotationArr[AQUA_TRI_INDEX] === 180 && blueTriDropAreaEmpty === true) {
                var dropAr = document.getElementById("blueTriDropArea");
                dropAr.style.webkitTransform = "rotate(180deg)";
                dropAr.style.msTransform = "rotate(180deg)";
                dropAr.style.transform = "rotate(180deg)";

                dropAr.style.zIndex = "4";
            }
            else {
                var dropAr = document.getElementById("blueTriDropArea");
                dropAr.style.webkitTransform = "rotate(0deg)";
                dropAr.style.msTransform = "rotate(0deg)";
                dropAr.style.transform = "rotate(0deg)";
            }

            flag = true;
        }
    }
    else if (mostRecentDragID === "greenTri") {
        if (rotationArr[GREEN_TRI_INDEX] === 0 || rotationArr[GREEN_TRI_INDEX] === 180 || rotationArr[GREEN_TRI_INDEX] === 360) {
            if ((rotationArr[GREEN_TRI_INDEX] === 0 || rotationArr[GREEN_TRI_INDEX] === 360) && yellowTriDropAreaEmpty === true) {
                document.getElementById("yellowTriDropArea").style.zIndex = "3";
                document.getElementById("greenTriDropArea").style.zIndex = "2";
            }

            flag = true;
        }
    }
    else if (mostRecentDragID === "orangeTri") {
        if (rotationArr[ORANGE_TRI_INDEX] === 180) {
            flag = true;
        }
    }
    else if (mostRecentDragID === "yellowTri") {
        if (rotationArr[YELLOW_TRI_INDEX] === 0 || rotationArr[YELLOW_TRI_INDEX] === 180 || rotationArr[YELLOW_TRI_INDEX] === 360) {
            if ((rotationArr[YELLOW_TRI_INDEX] === 0 || rotationArr[YELLOW_TRI_INDEX] === 360) && greenTriDropAreaEmpty === true) {
                document.getElementById("yellowTriDropArea").style.zIndex = "2";
                document.getElementById("greenTriDropArea").style.zIndex = "3";
            }

            flag = true;
        }
    }

    if (flag === true) {
        //makes it seem like you're only dragging the object
        document.getElementById(ev.target.id).style.opacity = "0";
        ev.dataTransfer.setData("content", ev.target.id);
    }
    else {
        ev.preventDefault();
    }
}

function DropHouse(ev) {
    var correctRotation = false;
    var dropAreaName = "";

    //if you're trying to drop into a rhombus and the drop area is empty
    if (/^rhombus/.test(ev.target.id) === true && rhombusDropAreaEmpty === true) {
        //make sure you were dragging a rhombus to begin with
        if (mostRecentDragID === "rhombus") {
            //make sure it is at the correct angle to be dropped
            if (rotationArr[RHOMBUS_INDEX] === 135 || rotationArr[RHOMBUS_INDEX] === 315) {
                correctRotation = true;
                dropAreaName = "rhombus";
            }
        }
    }
    else if (/^square/.test(ev.target.id) === true && squareDropAreaEmpty === true) {
        if (mostRecentDragID === "square") {
            if (rotationArr[SQUARE_INDEX] === 0 || rotationArr[SQUARE_INDEX] === 180 || rotationArr[SQUARE_INDEX] === 360) {
                correctRotation = true;
                dropAreaName = "square";
            }
        }
    }
    else if (/^blueTri/.test(ev.target.id) === true && blueTriDropAreaEmpty === true) {
        if (mostRecentDragID === "blueTri") {
            if (rotationArr[BLUE_TRI_INDEX] === 0 || rotationArr[BLUE_TRI_INDEX] === 315 || rotationArr[BLUE_TRI_INDEX] === 360) {
                correctRotation = true;
                dropAreaName = "blueTri";
            }
        }

        if (mostRecentDragID === "aquaTri" && rotationArr[AQUA_TRI_INDEX] === 180) {
            correctRotation = true;
            dropAreaName = "blueTri";
        }
    }
    else if (/^aquaTri/.test(ev.target.id) === true && aquaTriDropAreaEmpty === true) {
        if (mostRecentDragID === "aquaTri") {
            if (rotationArr[AQUA_TRI_INDEX] === 270) {
                correctRotation = true;
                dropAreaName = "aquaTri";
            }
        }

        if (mostRecentDragID === "blueTri" && rotationArr[BLUE_TRI_INDEX] === 90) {
            correctRotation = true;
            dropAreaName = "aquaTri";
        }
    }
    else if (/^greenTri/.test(ev.target.id) === true && greenTriDropAreaEmpty === true) {
        if (mostRecentDragID === "greenTri") {
            if (rotationArr[GREEN_TRI_INDEX] === 180) {
                correctRotation = true;
                dropAreaName = "greenTri";
            }
        }

        if (mostRecentDragID === "yellowTri" && (rotationArr[YELLOW_TRI_INDEX] === 0 || rotationArr[YELLOW_TRI_INDEX] === 360)) {
            var greenTri = document.getElementById("greenTriDropArea");
            greenTri.style.webkitTransform = "rotate(0deg)";
            greenTri.style.msTransform = "rotate(0deg)";
            greenTri.style.transform = "rotate(0deg)";
            correctRotation = true;
            dropAreaName = "greenTri";
        }
    }
    else if (/^orangeTri/.test(ev.target.id) === true && orangeTriDropAreaEmpty === true) {
        if (mostRecentDragID === "orangeTri") {
            if (rotationArr[ORANGE_TRI_INDEX] === 180) {
                correctRotation = true;
                dropAreaName = "orangeTri";
            }
        }
    }
    else if (/^yellowTri/.test(ev.target.id) === true && yellowTriDropAreaEmpty === true) {
        if (mostRecentDragID === "yellowTri") {
            if (rotationArr[YELLOW_TRI_INDEX] === 180) {
                correctRotation = true;
                dropAreaName = "yellowTri";
            }
        }

        if (mostRecentDragID === "greenTri" && (rotationArr[GREEN_TRI_INDEX] === 0 || rotationArr[GREEN_TRI_INDEX] === 360)) {
            var yellowTri = document.getElementById("yellowTriDropArea");

            yellowTri.style.webkitTransform = "rotate(0deg)";
            yellowTri.style.msTransform = "rotate(0deg)";
            yellowTri.style.transform = "rotate(0deg)";

            correctRotation = true;
            dropAreaName = "yellowTri";
        }
    }
    //correct angle, allow the drop
    if (correctRotation === true) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("content");
        ev.target.appendChild(document.getElementById(data));
        ToggleDroppedAndEmpty(mostRecentDragID, dropAreaName);

        selectedContainer = null;

        if (WonGame())
            EndGame(true);
        else {
            if (soundToggle === "False") {
                //make cha ching sound
                audio.src = "../../Audio/soundEffects/chaChing.mp3";
                audio.play();
            }
        }
    }
    else {
        if (soundToggle === "False") {
            //make the metal clank sound
            audio.src = "../../Audio/soundEffects/metalClang.mp3";
            audio.play();
        }
    }

    document.getElementById(mostRecentDragID).style.opacity = "1";
}

function HouseRotate() {
    //if they selected something they can rotate
    if (selectedContainer !== null) {
        //allow the rotations to happen
        rotationArr[rotationArrIndex] += 45;

        if (rotationArr[rotationArrIndex] > 360) {
            rotationArr[rotationArrIndex] = 0;
        }

        var sc = document.getElementById(selectedContainer);

        sc.style.webkitTransform = "rotate(" + rotationArr[rotationArrIndex] + "deg)";
        sc.style.msTransform = "rotate(" + rotationArr[rotationArrIndex] + "deg)";
        sc.style.transform = "rotate(" + rotationArr[rotationArrIndex] + "deg)";
    }

    if (blueTriDropped !== true) {
        if (rotationArr[BLUE_TRI_INDEX] === 90) {
            document.getElementById("blueTri").src = IMG_PATH + "blueTri2.png";
            var container = document.getElementById("blueTriContainer");
            container.style.width = "56%";
            container.style.height = "15%";
            container.style.bottom = "22%";
            container.style.left = "18%";
            container.style.webkitTransform = "rotate(270deg)";
            container.style.msTransform = "rotate(270deg)";
            container.style.transform = "rotate(270deg)";
        }
        else {
            document.getElementById("blueTri").src = IMG_PATH + "blueTri.png";
            var container = document.getElementById("blueTriContainer");
            container.style.width = "28%";
            container.style.height = "28%";
            container.style.bottom = "15%";
            container.style.left = "30%";
            container.style.webkitTransform = "rotate(0deg)";
            container.style.msTransform = "rotate(0deg)";
            container.style.transform = "rotate(0deg)";
        }
    }

    if (aquaTriDropped !== true) {
        if (rotationArr[AQUA_TRI_INDEX] === 180) {
            document.getElementById("aquaTri").src = IMG_PATH + "aquaTri2.png";
            var container = document.getElementById("aquaTriContainer");
            container.style.width = "26%";
            container.style.height = "26%";
            container.style.bottom = "7%";
            container.style.left = "-18%";
            container.style.webkitTransform = "rotate(180deg)";
            container.style.msTransform = "rotate(180deg)";
            container.style.transform = "rotate(180deg)";
        }
        else {
            document.getElementById("aquaTri").src = IMG_PATH + "aquaTri.png";
            var container = document.getElementById("aquaTriContainer");
            container.style.width = "54%";
            container.style.height = "13%";
            container.style.bottom = "15%";
            container.style.left = "-30%";
            container.style.webkitTransform = "rotate(90deg)";
            container.style.msTransform = "rotate(90deg)";
            container.style.transform = "rotate(90deg)";
        }
    }

    if (yellowTriDropped !== true) {
        if (rotationArr[YELLOW_TRI_INDEX] === 180) {
            document.getElementById("yellowTri").src = IMG_PATH + "yellowTri3.png";
            var container = document.getElementById("yellowTriContainer");
            container.style.width = "96%";
            container.style.height = "25%";
            container.style.webkitTransform = "rotate(180deg)";
            container.style.msTransform = "rotate(180deg)";
            container.style.transform = "rotate(180deg)";
        }
        else {
            document.getElementById("yellowTri").src = IMG_PATH + "yellowTri.png";
            var container = document.getElementById("yellowTriContainer");
            container.style.width = "96%";
            container.style.height = "25%";
            container.style.bottom = "20%";
            container.style.left = "2%";
            container.style.webkitTransform = "rotate(0deg)";
            container.style.msTransform = "rotate(0deg)";
            container.style.transform = "rotate(0deg)";
        }
    }

    if (greenTriDropped !== true) {
        if (rotationArr[GREEN_TRI_INDEX] === 180) {
            document.getElementById("greenTri").src = IMG_PATH + "greenTri3.png";
            var container = document.getElementById("greenTriContainer");
            container.style.webkitTransform = "rotate(180deg)";
            container.style.msTransform = "rotate(180deg)";
            container.style.transform = "rotate(180deg)";
        }
        else {
            document.getElementById("greenTri").src = IMG_PATH + "greenTri.png";
            var container = document.getElementById("greenTriContainer");
            container.style.width = "96%";
            container.style.height = "25%";
            container.style.top = "9%";
            container.style.left = "2%";
            container.style.webkitTransform = "rotate(0deg)";
            container.style.msTransform = "rotate(0deg)";
            container.style.transform = "rotate(0deg)";
        }
    }
}

function HouseMain() {
    for (var i = 0; i < NUM_OF_SHAPES; i++) {
        rotationArr.push(0);
    }

    //make sure everything is visible after the drag
    window.addEventListener("dragend", function () {
        document.getElementById(mostRecentDragID).style.opacity = "1";
    }, false);

    //keeps track of what div container you clicked on so the rotations can happen
    $("#rhombusContainer").mousedown(function () {
        selectedContainer = "rhombus";
        rotationArrIndex = RHOMBUS_INDEX;

        responsiveVoice.speak("rhombus", "US English Female");

        ResetDropAreaZIndexs();
        document.getElementById("rhombusDropArea").style.zIndex = 3;
    });

    $("#squareContainer").mousedown(function () {
        selectedContainer = "square";
        rotationArrIndex = SQUARE_INDEX;

        responsiveVoice.speak("square", "US English Female");

        ResetDropAreaZIndexs();
        document.getElementById("squareDropArea").style.zIndex = 3;
    });

    $("#blueTriContainer").mousedown(function () {
        selectedContainer = "blueTri";
        rotationArrIndex = BLUE_TRI_INDEX;

        responsiveVoice.speak("triangle", "US English Female");

        ResetDropAreaZIndexs();
        document.getElementById("blueTriDropArea").style.zIndex = 3;
    });

    $("#aquaTriContainer").mousedown(function () {
        selectedContainer = "aquaTri";
        rotationArrIndex = AQUA_TRI_INDEX;

        responsiveVoice.speak("triangle", "US English Female");

        ResetDropAreaZIndexs();
        document.getElementById("aquaTriDropArea").style.zIndex = 3;
    });

    $("#greenTriContainer").mousedown(function () {
        selectedContainer = "greenTri";
        rotationArrIndex = GREEN_TRI_INDEX;

        responsiveVoice.speak("triangle", "US English Female");

        ResetDropAreaZIndexs();
        document.getElementById("greenTriDropArea").style.zIndex = 3;
    });

    $("#orangeTriContainer").mousedown(function () {
        selectedContainer = "orangeTri";
        rotationArrIndex = ORANGE_TRI_INDEX;

        responsiveVoice.speak("triangle", "US English Female");

        ResetDropAreaZIndexs();
        document.getElementById("orangeTriDropArea").style.zIndex = 3;
        document.getElementById("greenTriDropArea").style.zIndex = 3;
    });

    $("#yellowTriContainer").mousedown(function () {
        selectedContainer = "yellowTri";
        rotationArrIndex = YELLOW_TRI_INDEX;

        responsiveVoice.speak("triangle", "US English Female");

        ResetDropAreaZIndexs();
        document.getElementById("yellowTriDropArea").style.zIndex = 3;
    });
}

//*********************** Functions specific to the Square level (lower difficulty level) *************************************//

function DragSquare(ev) {
    var flag = false;

    mostRecentDragID = ev.target.id;

    if (mostRecentDragID === "rhombus") {
        if (rotationArr[RHOMBUS_INDEX] === 0 || rotationArr[RHOMBUS_INDEX] === 180 || rotationArr[RHOMBUS_INDEX] === 360) {
            flag = true;
        }
    }
    else if (mostRecentDragID === "square") {
        if (rotationArr[SQUARE_INDEX] === 0 || rotationArr[SQUARE_INDEX] === 180 || rotationArr[SQUARE_INDEX] === 360) {
            flag = true;
        }
    }
    else if (mostRecentDragID === "blueTri") {
        if (rotationArr[BLUE_TRI_INDEX] === 0 || rotationArr[BLUE_TRI_INDEX] === 90 || rotationArr[BLUE_TRI_INDEX] === 315 || rotationArr[BLUE_TRI_INDEX] === 360) {

            if (rotationArr[BLUE_TRI_INDEX] === 90 && aquaTriDropAreaEmpty === true) {
                var aquaTri = document.getElementById("aquaTriDropArea");
                aquaTri.style.webkitTransform = "rotate(270deg)";
                aquaTri.style.msTransform = "rotate(270deg)";
                aquaTri.style.transform = "rotate(270deg)";
            }

            flag = true;
        }
    }
    else if (mostRecentDragID === "aquaTri") {
        if (rotationArr[AQUA_TRI_INDEX] === 270 || rotationArr[AQUA_TRI_INDEX] === 180) {
            if (rotationArr[AQUA_TRI_INDEX] === 180 && blueTriDropAreaEmpty === true) {
                var blueTri = document.getElementById("blueTriDropArea");
                blueTri.style.webkitTransform = "rotate(180deg)";
                blueTri.style.msTransform = "rotate(180deg)";
                blueTri.style.transform = "rotate(180deg)";
            }
            else {
                var blueTri = document.getElementById("blueTriDropArea");
                blueTri.style.webkitTransform = "rotate(0deg)";
                blueTri.style.msTransform = "rotate(0deg)";
                blueTri.style.transform = "rotate(0deg)";
            }


            flag = true;
        }
    }
    else if (mostRecentDragID === "greenTri") {
        if (rotationArr[GREEN_TRI_INDEX] === 0 || rotationArr[GREEN_TRI_INDEX] === 360 || rotationArr[GREEN_TRI_INDEX] === 270) {
            if (rotationArr[GREEN_TRI_INDEX] === 270 && yellowTriDropAreaEmpty === true) {
                var yellowTri = document.getElementById("yellowTriDropArea");
                yellowTri.style.webkitTransform = "rotate(90deg)";
                yellowTri.style.msTransform = "rotate(90deg)";
                yellowTri.style.transform = "rotate(90deg)";
                yellowTri.style.zIndex = "3";
                document.getElementById("greenTriDropArea").style.zIndex = "2";
            }

            flag = true;
        }
    }
    else if (mostRecentDragID === "orangeTri") {
        if (rotationArr[ORANGE_TRI_INDEX] === 180) {
            flag = true;
        }
    }
    else if (mostRecentDragID === "yellowTri") {
        if (rotationArr[YELLOW_TRI_INDEX] === 90 || rotationArr[YELLOW_TRI_INDEX] === 180) {
            if (rotationArr[YELLOW_TRI_INDEX] === 180 && greenTriDropAreaEmpty === true) {

                var greenTri = document.getElementById("greenTriDropArea");
                greenTri.style.webkitTransform = "rotate(180deg)";
                greenTri.style.msTransform = "rotate(180deg)";
                greenTri.style.transform = "rotate(180deg)";

                document.getElementById("yellowTriDropArea").style.zIndex = "2";
                greenTri.style.zIndex = "3";
            }
            else {
                var greenTri = document.getElementById("greenTriDropArea");
                greenTri.style.webkitTransform = "rotate(0deg)";
                greenTri.style.msTransform = "rotate(0deg)";
                greenTri.style.transform = "rotate(0deg)";
            }

            flag = true;
        }
    }

    if (flag === true) {
        //makes it seem like you're only dragging the object
        document.getElementById(ev.target.id).style.opacity = "0";
        ev.dataTransfer.setData("content", ev.target.id);
    }
    else {
        ev.preventDefault();
    }
}

function DropSquare(ev) {
    var correctRotation = false;
    var dropAreaName = "";

    //if you're trying to drop into a rhombus
    if (/^rhombus/.test(ev.target.id) === true && rhombusDropAreaEmpty === true) {
        //make sure you were dragging a rhombus to begin with
        if (mostRecentDragID === "rhombus") {
            //make sure it is at the correct angle to be dropped
            if (rotationArr[RHOMBUS_INDEX] === 0 || rotationArr[RHOMBUS_INDEX] === 180 || rotationArr[RHOMBUS_INDEX] === 360) {
                correctRotation = true;
                dropAreaName = "rhombus";
            }
        }
    }
    else if (/^square/.test(ev.target.id) === true && squareDropAreaEmpty === true) {
        if (mostRecentDragID === "square") {
            if (rotationArr[SQUARE_INDEX] === 0 || rotationArr[SQUARE_INDEX] === 180 || rotationArr[SQUARE_INDEX] === 360) {
                correctRotation = true;
                dropAreaName = "square";
            }
        }
    }
    else if (/^blueTri/.test(ev.target.id) === true && blueTriDropAreaEmpty === true) {
        if (mostRecentDragID === "blueTri") {
            if (rotationArr[BLUE_TRI_INDEX] === 0 || rotationArr[BLUE_TRI_INDEX] === 315 || rotationArr[BLUE_TRI_INDEX] === 360) {
                correctRotation = true;
                dropAreaName = "blueTri";
            }
        }

        if (mostRecentDragID === "aquaTri" && rotationArr[AQUA_TRI_INDEX] === 180) {
            correctRotation = true;
            dropAreaName = "blueTri";
        }
    }
    else if (/^aquaTri/.test(ev.target.id) === true && aquaTriDropAreaEmpty === true) {
        if (mostRecentDragID === "aquaTri") {
            if (rotationArr[AQUA_TRI_INDEX] === 270) {
                correctRotation = true;
                dropAreaName = "aquaTri";
            }
        }

        if (mostRecentDragID === "blueTri" && rotationArr[BLUE_TRI_INDEX] === 90) {
            correctRotation = true;
            dropAreaName = "aquaTri";
        }
    }
    else if (/^greenTri/.test(ev.target.id) === true && greenTriDropAreaEmpty === true) {
        if (mostRecentDragID === "greenTri") {
            if (rotationArr[GREEN_TRI_INDEX] === 0 || rotationArr[GREEN_TRI_INDEX] === 360) {
                correctRotation = true;
                dropAreaName = "greenTri";
            }
        }

        if (mostRecentDragID === "yellowTri" && rotationArr[YELLOW_TRI_INDEX] === 180) {
            correctRotation = true;
            dropAreaName = "greenTri";
        }
    }
    else if (/^orangeTri/.test(ev.target.id) === true && orangeTriDropAreaEmpty === true) {
        if (mostRecentDragID === "orangeTri") {
            if (rotationArr[ORANGE_TRI_INDEX] === 180) {
                correctRotation = true;
                dropAreaName = "orangeTri";
            }
        }
    }
    else if (/^yellowTri/.test(ev.target.id) === true && yellowTriDropAreaEmpty === true) {
        if (mostRecentDragID === "yellowTri") {
            if (rotationArr[YELLOW_TRI_INDEX] === 90) {
                correctRotation = true;
                dropAreaName = "yellowTri";
            }
        }

        if (mostRecentDragID === "greenTri" && rotationArr[GREEN_TRI_INDEX] === 270) {
            correctRotation = true;
            dropAreaName = "yellowTri";
        }
    }
    //correct angle, allow the drop
    if (correctRotation === true) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("content");
        ev.target.appendChild(document.getElementById(data));
        ToggleDroppedAndEmpty(mostRecentDragID, dropAreaName);

        selectedContainer = null;

        if (WonGame())
            EndGame(true);
        else {
            if (soundToggle === "False") {
                //make cha ching sound, incorrect answer
                audio.src = "../../Audio/soundEffects/chaChing.mp3";
                audio.play();
            }
        }
    }
    else {
        if (soundToggle === "False") {
            //make the metal clank sound
            audio.src = "../../Audio/soundEffects/metalClang.mp3";
            audio.play();
        }
    }

    document.getElementById(mostRecentDragID).style.opacity = "1";
}

function RotateSquare() {
    //if they selected something they can rotate
    if (selectedContainer !== null) {
        //allow the rotations to happen
        rotationArr[rotationArrIndex] += 45;

        if (rotationArr[rotationArrIndex] > 360) {
            rotationArr[rotationArrIndex] = 0;
        }

        var sc = document.getElementById(selectedContainer);
        sc.style.webkitTransform = "rotate(" + rotationArr[rotationArrIndex] + "deg)";
        sc.style.msTransform = "rotate(" + rotationArr[rotationArrIndex] + "deg)";
        sc.style.transform = "rotate(" + rotationArr[rotationArrIndex] + "deg)";
    }

    if (blueTriDropped !== true) {
        if (rotationArr[BLUE_TRI_INDEX] === 90) {
            document.getElementById("blueTri").src = IMG_PATH + "blueTri2.png";
            var container = document.getElementById("blueTriContainer");
            container.style.width = "56%";
            container.style.height = "15%";
            container.style.bottom = "22%";
            container.style.left = "18%";
            container.style.webkitTransform = "rotate(270deg)";
            container.style.msTransform = "rotate(270deg)";
            container.style.transform = "rotate(270deg)";
        }
        else {
            document.getElementById("blueTri").src = IMG_PATH + "blueTri.png";
            var container = document.getElementById("blueTriContainer");
            container.style.width = "28%";
            container.style.height = "28%";
            container.style.bottom = "15%";
            container.style.left = "30%";
            container.style.webkitTransform = "rotate(0deg)";
            container.style.msTransform = "rotate(0deg)";
            container.style.transform = "rotate(0deg)";
        }
    }

    if (aquaTriDropped !== true) {
        if (rotationArr[AQUA_TRI_INDEX] === 180) {
            document.getElementById("aquaTri").src = IMG_PATH + "aquaTri2.png";
            var container = document.getElementById("aquaTriContainer");
            container.style.width = "26%";
            container.style.height = "26%";
            container.style.bottom = "7%";
            container.style.left = "-18%";
            container.style.webkitTransform = "rotate(180deg)";
            container.style.msTransform = "rotate(180deg)";
            container.style.transform = "rotate(180deg)";
        }
        else {
            document.getElementById("aquaTri").src = IMG_PATH + "aquaTri.png";
            var container = document.getElementById("aquaTriContainer");
            container.style.width = "54%";
            container.style.height = "13%";
            container.style.bottom = "15%";
            container.style.left = "-30%";
            container.style.webkitTransform = "rotate(90deg)";
            container.style.msTransform = "rotate(90deg)";
            container.style.transform = "rotate(90deg)";
        }
    }


    if (yellowTriDropped !== true) {
        if (rotationArr[YELLOW_TRI_INDEX] === 90) {
            document.getElementById("yellowTri").src = IMG_PATH + "yellowTri2.png";
            var container = document.getElementById("yellowTriContainer");
            container.style.width = "50%";
            container.style.height = "50%";
            container.style.bottom = "7%";
            container.style.left = "22%";
            container.style.webkitTransform = "rotate(270deg)";
            container.style.msTransform = "rotate(270deg)";
            container.style.transform = "rotate(270deg)";
        }
        else if (rotationArr[YELLOW_TRI_INDEX] === 180) {
            document.getElementById("yellowTri").src = IMG_PATH + "yellowTri3.png";
            var container = document.getElementById("yellowTriContainer");
            container.style.width = "96%";
            container.style.height = "25%";
            container.style.webkitTransform = "rotate(180deg)";
            container.style.msTransform = "rotate(180deg)";
            container.style.transform = "rotate(180deg)";
        }
        else {
            document.getElementById("yellowTri").src = IMG_PATH + "yellowTri.png";
            var container = document.getElementById("yellowTriContainer");
            container.style.width = "96%";
            container.style.height = "25%";
            container.style.bottom = "20%";
            container.style.left = "2%";
            container.style.webkitTransform = "rotate(0deg)";
            container.style.msTransform = "rotate(0deg)";
            container.style.transform = "rotate(0deg)";
        }
    }


    if (greenTriDropped !== true) {
        if (rotationArr[GREEN_TRI_INDEX] === 270) {
            document.getElementById("greenTri").src = IMG_PATH + "greenTri2.png";
            var container = document.getElementById("greenTriContainer");
            container.style.width = "50%";
            container.style.height = "50%";
            container.style.top = "-3%";
            container.style.left = "23%";
            container.style.webkitTransform = "rotate(90deg)";
            container.style.msTransform = "rotate(90deg)";
            container.style.transform = "rotate(90deg)";
        }
        else {
            document.getElementById("greenTri").src = IMG_PATH + "greenTri.png";
            var container = document.getElementById("greenTriContainer");
            container.style.width = "96%";
            container.style.height = "25%";
            container.style.top = "9%";
            container.style.left = "2%";
            container.style.webkitTransform = "rotate(0deg)";
            container.style.msTransform = "rotate(0deg)";
            container.style.transform = "rotate(0deg)";
        }
    }
}

function SquareMain() {
    for (var i = 0; i < NUM_OF_SHAPES; i++) {
        rotationArr.push(0);
    }

    //make sure everything is visible after the drag
    window.addEventListener("dragend", function () {
        document.getElementById(mostRecentDragID).style.opacity = "1";
    }, false);

    //keeps track of what div container you clicked on so the rotations can happen
    $("#rhombusContainer").mousedown(function () {
        selectedContainer = "rhombus";
        rotationArrIndex = RHOMBUS_INDEX;

        responsiveVoice.speak("rhombus", "US English Female");

        ResetDropAreaZIndexs();
        document.getElementById("rhombusDropArea").style.zIndex = 3;
    });

    $("#squareContainer").mousedown(function () {
        selectedContainer = "square";
        rotationArrIndex = SQUARE_INDEX;

        responsiveVoice.speak("square", "US English Female");

        ResetDropAreaZIndexs();
        document.getElementById("squareDropArea").style.zIndex = 3;
    });

    $("#blueTriContainer").mousedown(function () {
        selectedContainer = "blueTri";
        rotationArrIndex = BLUE_TRI_INDEX;

        responsiveVoice.speak("triangle", "US English Female");

        ResetDropAreaZIndexs();
        document.getElementById("blueTriDropArea").style.zIndex = 3;
        document.getElementById("aquaTriDropArea").style.zIndex = 3;
    });

    $("#aquaTriContainer").mousedown(function () {
        selectedContainer = "aquaTri";
        rotationArrIndex = AQUA_TRI_INDEX;

        responsiveVoice.speak("triangle", "US English Female");

        ResetDropAreaZIndexs();
        document.getElementById("aquaTriDropArea").style.zIndex = 3;
        document.getElementById("blueTriDropArea").style.zIndex = 3;
    });

    $("#greenTriContainer").mousedown(function () {
        selectedContainer = "greenTri";
        rotationArrIndex = GREEN_TRI_INDEX;

        responsiveVoice.speak("triangle", "US English Female");

        ResetDropAreaZIndexs();
        document.getElementById("greenTriDropArea").style.zIndex = 3;
    });

    $("#orangeTriContainer").mousedown(function () {
        selectedContainer = "orangeTri";
        rotationArrIndex = ORANGE_TRI_INDEX;

        responsiveVoice.speak("triangle", "US English Female");

        ResetDropAreaZIndexs();
        document.getElementById("orangeTriDropArea").style.zIndex = 3;
        document.getElementById("greenTriDropArea").style.zIndex = 3;
    });

    $("#yellowTriContainer").mousedown(function () {
        selectedContainer = "yellowTri";
        rotationArrIndex = YELLOW_TRI_INDEX;

        responsiveVoice.speak("triangle", "US English Female");

        ResetDropAreaZIndexs();
        document.getElementById("yellowTriDropArea").style.zIndex = 3;
    });
}

//*********************** Driver functions of entire program *************************************//
function CreateHtmlElements(difficulty) {
    var dropFuncName = "";
    var dragFuncName = "";
    var rotateFuncName = "";
    var cssFileName = "";
    var problemImgId = "";

    var rhombusImgName = "";
    var squareImgName = "";
    var orangeTriImgName = "";
    var problemImgSrc = "";

    if (difficulty <= 3) {
        //specific to square problem
        dropFuncName = "DropSquare(event)";
        dragFuncName = "DragSquare(event)";
        rotateFuncName = "RotateSquare()";
        cssFileName = "TangramSquare.css";

        rhombusImgName = "rhombus.png";
        squareImgName = "square2.png";
        orangeTriImgName = "orangeTri.png";
        problemImgSrc = "squareProblem.png";
        problemImgId = "squareProblem";
    }
    else {
        //specific to house problem
        dropFuncName = "DropHouse(event)";
        dragFuncName = "DragHouse(event)";
        rotateFuncName = "HouseRotate()";
        cssFileName = "TangramHouse.css";

        rhombusImgName = "rhombus2.png";
        squareImgName = "square.png";
        orangeTriImgName = "orangeTri2.png";
        problemImgSrc = "houseProblem.png";
        problemImgId = "houseProblem";
    }

    //set up the CSS file needed for this minigame
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
    //gonnna be stored on the server at some point
    fileRef.setAttribute("href", "../../MiniGames/TangramGame/css/" + cssFileName);
    //add the css file to the html
    document.getElementsByTagName("head")[0].appendChild(fileRef);

    //the container that will hold the game
    var divContainer = document.getElementById("BlocksGame");

    //the header
    var header = document.createElement("h1");
    header.setAttribute("id", "header");
    header.style.textAlign = "center";
    header.innerHTML = "Tangram!";

    //drop area container
    var dropAreaContainer = document.createElement("div");
    dropAreaContainer.setAttribute("id", "dropAreaContainer");

    //problem container
    var problemContainer = document.createElement("div");
    problemContainer.setAttribute("id", "problemContainer");

    var problemImg = document.createElement("img");
    problemImg.setAttribute("id", problemImgId);
    problemImg.setAttribute("src", IMG_PATH + problemImgSrc);
    problemImg.setAttribute("width", "100%");
    problemImg.setAttribute("height", "100%");

    //all of the drop areas
    var rhomDropArea = document.createElement("div");
    rhomDropArea.setAttribute("id", "rhombusDropArea");
    rhomDropArea.setAttribute("class", "dropAreas");
    rhomDropArea.setAttribute("ondrop", dropFuncName);
    rhomDropArea.setAttribute("ondragover", "AllowDrop(event)");

    var orangeTriDropArea = document.createElement("div");
    orangeTriDropArea.setAttribute("id", "orangeTriDropArea");
    orangeTriDropArea.setAttribute("class", "dropAreas");
    orangeTriDropArea.setAttribute("ondrop", dropFuncName);
    orangeTriDropArea.setAttribute("ondragover", "AllowDrop(event)");

    var squareDropArea = document.createElement("div");
    squareDropArea.setAttribute("id", "squareDropArea");
    squareDropArea.setAttribute("class", "dropAreas");
    squareDropArea.setAttribute("ondrop", dropFuncName);
    squareDropArea.setAttribute("ondragover", "AllowDrop(event)");

    var aquaTriDropArea = document.createElement("div");
    aquaTriDropArea.setAttribute("id", "aquaTriDropArea");
    aquaTriDropArea.setAttribute("class", "dropAreas");
    aquaTriDropArea.setAttribute("ondrop", dropFuncName);
    aquaTriDropArea.setAttribute("ondragover", "AllowDrop(event)");

    var blueTriDropArea = document.createElement("div");
    blueTriDropArea.setAttribute("id", "blueTriDropArea");
    blueTriDropArea.setAttribute("class", "dropAreas");
    blueTriDropArea.setAttribute("ondrop", dropFuncName);
    blueTriDropArea.setAttribute("ondragover", "AllowDrop(event)");

    var yellowTriDropArea = document.createElement("div");
    yellowTriDropArea.setAttribute("id", "yellowTriDropArea");
    yellowTriDropArea.setAttribute("class", "dropAreas");
    yellowTriDropArea.setAttribute("ondrop", dropFuncName);
    yellowTriDropArea.setAttribute("ondragover", "AllowDrop(event)");

    var greenTriDropArea = document.createElement("div");
    greenTriDropArea.setAttribute("id", "greenTriDropArea");
    greenTriDropArea.setAttribute("class", "dropAreas");
    greenTriDropArea.setAttribute("ondrop", dropFuncName);
    greenTriDropArea.setAttribute("ondragover", "AllowDrop(event)");

    //add those things to the problem container problem container
    problemContainer.appendChild(problemImg);
    problemContainer.appendChild(rhomDropArea);
    problemContainer.appendChild(orangeTriDropArea);
    problemContainer.appendChild(squareDropArea);
    problemContainer.appendChild(aquaTriDropArea);
    problemContainer.appendChild(blueTriDropArea);
    problemContainer.appendChild(yellowTriDropArea);
    problemContainer.appendChild(greenTriDropArea);

    //add to that to the dropAreaContainer
    dropAreaContainer.appendChild(problemContainer);

    //begin the tangram piece container
    var tangramPiecesContainer = document.createElement("div");
    tangramPiecesContainer.setAttribute("id", "tangramPiecesContainer");

    var leftCol = document.createElement("div");
    leftCol.setAttribute("id", "leftCol");

    //tangram pieces
    var rhombusContainer = document.createElement("div");
    rhombusContainer.setAttribute("id", "rhombusContainer");
    rhombusContainer.setAttribute("class", "tangramPieces");
    rhombusContainer.setAttribute("ondrop", dropFuncName);
    rhombusContainer.setAttribute("ondragover", "AllowDrop(event)");

    var rhombus = document.createElement("img");
    rhombus.setAttribute("id", "rhombus");
    rhombus.setAttribute("src", IMG_PATH + rhombusImgName);
    rhombus.setAttribute("draggable", "true");
    rhombus.setAttribute("ondragstart", dragFuncName);
    rhombus.setAttribute("width", "100%");
    rhombus.setAttribute("height", "100%");

    rhombusContainer.appendChild(rhombus);

    var squareContainer = document.createElement("div");
    squareContainer.setAttribute("id", "squareContainer");
    squareContainer.setAttribute("class", "tangramPieces");
    squareContainer.setAttribute("ondrop", dropFuncName);
    squareContainer.setAttribute("ondragover", "AllowDrop(event)");

    var square = document.createElement("img");
    square.setAttribute("id", "square");
    square.setAttribute("src", IMG_PATH + squareImgName);
    square.setAttribute("draggable", "true");
    square.setAttribute("ondragstart", dragFuncName);
    square.setAttribute("width", "100%");
    square.setAttribute("height", "100%");

    squareContainer.appendChild(square);

    var blueTriContainer = document.createElement("div");
    blueTriContainer.setAttribute("id", "blueTriContainer");
    blueTriContainer.setAttribute("class", "tangramPieces");
    blueTriContainer.setAttribute("ondrop", dropFuncName);
    blueTriContainer.setAttribute("ondragover", "AllowDrop(event)");

    var blueTri = document.createElement("img");
    blueTri.setAttribute("id", "blueTri");
    blueTri.setAttribute("src", IMG_PATH + "blueTri.png");
    blueTri.setAttribute("draggable", "true");
    blueTri.setAttribute("ondragstart", dragFuncName);
    blueTri.setAttribute("width", "100%");
    blueTri.setAttribute("height", "100%");

    blueTriContainer.appendChild(blueTri);

    var aquaTriContainer = document.createElement("div");
    aquaTriContainer.setAttribute("id", "aquaTriContainer");
    aquaTriContainer.setAttribute("class", "tangramPieces");
    aquaTriContainer.setAttribute("ondrop", dropFuncName);
    aquaTriContainer.setAttribute("ondragover", "AllowDrop(event)");

    var aquaTri = document.createElement("img");
    aquaTri.setAttribute("id", "aquaTri");
    aquaTri.setAttribute("src", IMG_PATH + "aquaTri.png");
    aquaTri.setAttribute("draggable", "true");
    aquaTri.setAttribute("ondragstart", dragFuncName);
    aquaTri.setAttribute("width", "100%");
    aquaTri.setAttribute("height", "100%");

    aquaTriContainer.appendChild(aquaTri);

    //add the containers to the left column
    leftCol.appendChild(rhombusContainer);
    leftCol.appendChild(squareContainer);
    leftCol.appendChild(blueTriContainer);
    leftCol.appendChild(aquaTriContainer);

    //right column
    var rightCol = document.createElement("div");
    rightCol.setAttribute("id", "rightCol");

    var greenTriContainer = document.createElement("div");
    greenTriContainer.setAttribute("id", "greenTriContainer");
    greenTriContainer.setAttribute("class", "tangramPieces");
    greenTriContainer.setAttribute("ondrop", dropFuncName);
    greenTriContainer.setAttribute("ondragover", "AllowDrop(event)");

    var greenTri = document.createElement("img");
    greenTri.setAttribute("id", "greenTri");
    greenTri.setAttribute("src", IMG_PATH + "greenTri.png");
    greenTri.setAttribute("draggable", "true");
    greenTri.setAttribute("ondragstart", dragFuncName);
    greenTri.setAttribute("width", "100%");
    greenTri.setAttribute("height", "100%");

    greenTriContainer.appendChild(greenTri);

    var orangeTriContainer = document.createElement("div");
    orangeTriContainer.setAttribute("id", "orangeTriContainer");
    orangeTriContainer.setAttribute("class", "tangramPieces");
    orangeTriContainer.setAttribute("ondrop", dropFuncName);
    orangeTriContainer.setAttribute("ondragover", "AllowDrop(event)");

    var orangeTri = document.createElement("img");
    orangeTri.setAttribute("id", "orangeTri");
    orangeTri.setAttribute("src", IMG_PATH + orangeTriImgName);
    orangeTri.setAttribute("draggable", "true");
    orangeTri.setAttribute("ondragstart", dragFuncName);
    orangeTri.setAttribute("width", "100%");
    orangeTri.setAttribute("height", "100%");

    orangeTriContainer.appendChild(orangeTri);

    var yellowTriContainer = document.createElement("div");
    yellowTriContainer.setAttribute("id", "yellowTriContainer");
    yellowTriContainer.setAttribute("class", "tangramPieces");
    yellowTriContainer.setAttribute("ondrop", dropFuncName);
    yellowTriContainer.setAttribute("ondragover", "AllowDrop(event)");

    var yellowTri = document.createElement("img");
    yellowTri.setAttribute("id", "yellowTri");
    yellowTri.setAttribute("src", IMG_PATH + "yellowTri.png");
    yellowTri.setAttribute("draggable", "true");
    yellowTri.setAttribute("ondragstart", dragFuncName);
    yellowTri.setAttribute("width", "100%");
    yellowTri.setAttribute("height", "100%");

    yellowTriContainer.appendChild(yellowTri);

    //append them to the right col
    rightCol.appendChild(greenTriContainer);
    rightCol.appendChild(orangeTriContainer);
    rightCol.appendChild(yellowTriContainer);

    //add to the container
    tangramPiecesContainer.appendChild(leftCol);
    tangramPiecesContainer.appendChild(rightCol);

    //create the rotate div and img
    var rotateRight = document.createElement("div");
    rotateRight.setAttribute("id", "rotateRight");
    rotateRight.setAttribute("onclick", rotateFuncName);

    var rotateImg = document.createElement("img");
    rotateImg.setAttribute("src", IMG_PATH + "rotateRight.png");
    rotateImg.setAttribute("width", "100%");
    rotateImg.setAttribute("height", "100%");

    //addd to it's container
    rotateRight.appendChild(rotateImg);

    ///////////////////////////////////////////////////
    var endGameDiv = document.createElement("div");
    endGameDiv.setAttribute("id", "endGameDiv");
    endGameDiv.innerHTML = "Great Job!";
    endGameDiv.appendChild(document.createElement("br"));

    var endGameDivPic = document.createElement("img");
    endGameDivPic.setAttribute("id", "endGameDivPic");
    endGameDivPic.setAttribute("src", "../../Images/gameOver.png");

    endGameDiv.appendChild(endGameDivPic);
    endGameDiv.appendChild(document.createElement("br"));

    var doneButton = document.createElement("button");
    doneButton.innerHTML = "Done";
    doneButton.setAttribute("id", "doneButton");

    endGameDiv.appendChild(doneButton);
    ////////////////////////////////////////////////

    //add them to the div container
    divContainer.appendChild(header);
    divContainer.appendChild(dropAreaContainer);
    divContainer.appendChild(tangramPiecesContainer);
    divContainer.appendChild(rotateRight);
    divContainer.appendChild(endGameDiv);
}

function EndGame(finished) {
    endGameFuncCalls++;

    if (endGameFuncCalls === 1)
        responsiveVoice.speak("Great job!", "US English Female");

    $('#doneButton').click(function () {
        window.location.href = '/Play/Play/'
    });

    var returnVal = 0;

    var numCorrect = 0;

    if (finished) {
        returnVal = 5;
    }
    else {
        if (!rhombusDropAreaEmpty)
            numCorrect++;
        if (!squareDropAreaEmpty)
            numCorrect++;
        if (!greenTriDropAreaEmpty)
            numCorrect++;
        if (!yellowTriDropAreaEmpty)
            numCorrect++;
        if (!orangeTriDropAreaEmpty)
            numCorrect++;
        if (!aquaTriDropAreaEmpty)
            numCorrect++;
        if (!blueTriDropAreaEmpty)
            numCorrect++;

        if (numCorrect > 5)
            returnVal = 4;
        else if (numCorrect > 4)
            returnVal = 2;
        else if (numCorrect > 3)
            returnVal = 1;
        else if (numCorrect > 2)
            returnVal = 0;
        else if (numCorrect > 1)
            returnVal = -2;
        else if (numCorrect > 0)
            returnVal = -3;
        else
            returnVal = -5;
    }

    document.getElementById("score").value = returnVal;
    EndofGame(); //function displays good job message and returns to map
    setTimeout(function () {
        $('#gameOver').hide();
    }, 500);
    document.getElementById("endGameDiv").style.display = "block";
}

function Main() {
    var backgroundMusic = new Audio("../../Audio/backgroundMusic/bgSong4.mp3");
    backgroundMusic.volume = "0.1";

    //get the game's difficulty level and modify the dataset for that difficulty level
    var difficulty = document.getElementById("minigameScript").getAttribute("difficulty");
    soundToggle = document.getElementById("minigameScript").getAttribute("toggleSound"); //True = sound off, False = sound on
    musicToggle = document.getElementById("minigameScript").getAttribute("toggleMusic");

    //create the html
    CreateHtmlElements(difficulty);

    //call the specific main for the program based on the difficulty level
    if (difficulty <= 3)
        SquareMain();
    else
        HouseMain();

    responsiveVoice.OnVoiceReady = function () {
        responsiveVoice.speak("Solve the puzzle by clicking on a shape, rotating the shape with the rotate button, and then dragging the shape onto the puzzle.", "US English Female");
    };

    if (musicToggle === "False") {
        //play background music
        backgroundMusic.play();
    }

    //if the user leaves the page
    $(window).on("beforeunload", function () {
        responsiveVoice.cancel(); //quit doing text to speech
    });

    //reloop the audio
    backgroundMusic.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

    //if the user didn't finish the game in 2 minuets
    setTimeout(function () {
        //end the game
        EndGame(false);
    }, 120000);
}

Main();