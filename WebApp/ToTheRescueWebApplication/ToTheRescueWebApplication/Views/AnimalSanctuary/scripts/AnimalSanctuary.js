//Javascript file that powers the AnimalSanctuary
//Lake Sain-Thomason
//

//var model = '@Html.Raw(Json.Encode(Model))';


//Wait till the browser has parsed all html and turned in to document tree.
document.addEventListener('DOMContentLoaded', function () {
    function GoToMainMenu() {
        window.location.href = '/MainMenu/MainMenu';
    }

    function AnimalClicked(id) {
        var sound = document.getElementById(id);
        sound.volume = 0.3;
        sound.play();
        document.getElementById("FunFact").innerHTML = "Fun Fact!  " + document.getElementById("Text" + id).innerText;
    }

    function MoveAnimals() {
        var id = 0;
        var elID = "Div" + id;
        var div = document.getElementById(elID);
        while (div != null) {

            var rand = Math.random();
            rand = rand * 50;
            rand = Math.floor(rand);
            if (rand % 2 === 0) rand = (rand - (rand * 2));
            //gets a random whole number between 0 and 50
            //if the number is even, the sign is reversed

            if (id <= 4) {
                div.style.left = (id * 85 + 255) + "px";
                div.style.top = (425 + rand) + "px";
            }
            if (id <= 9 && id > 4) {
                div.style.left = (id * 85) + "px";
                div.style.top = (255 + rand) + "px";
            }
            if (id <= 14 && id > 9) {
                div.style.left = (id * 85) + "px";
                div.style.top = (255 + rand) + "px";
            }
            if (id <= 19 && id > 14) {
                div.style.left = (id * 85 - 255) + "px";
                div.style.top = (425 + rand) + "px";
            }
            div.style.position = "absolute";
            div.style.zIndex = 2;

            id++;
            var elID = "Div" + id;
            var div = document.getElementById(elID);
        }
    }

    /* Set the width of the side navigation to 250px */
    function openNav() {
        document.getElementById("ReleasedAnimals").style.width = "150px";
    }

    /* Set the width of the side navigation to 0 */
    function closeNav() {
        document.getElementById("ReleasedAnimals").style.width = "0";
    }

    function main() {
        var music = document.getElementById("BackgroundSound");
        music.volume = 0.15;
        MoveAnimals();

    }
    main();
});
var loadAnimals = function () {
    var i;
    for (i = 0; i < model.Count() ; i++) {
        var animal = document.createElement("img");
        animal.setAttribute("id", "animal" + i);
        animal.setAttribute("class", "animal");
       
        //ajax code for getting image
        animal.setAttribute("src", ($.ajax({
            url: '@Url.Action("ShowAnimalImage", new { @animalID = model[i].ID })'
        })));
        animal.setAttribute("onclick", "AnimalClicked(" + i + ")");

        if (model[i].ActiveBit == true) {

        }
        if (model[i].ActiveBit == false) {

        }
    }
}