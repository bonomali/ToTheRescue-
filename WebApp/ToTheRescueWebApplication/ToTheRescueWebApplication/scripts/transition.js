//transition js
//pass in a background color value (either the name string or the hex value)
//z-index is max so the transition sits over your page while it loads
//can be called from any folder level equivalent to the view folder level
//ASSUMES THE PAGE HAS A BODY

var transition = function (color) {
    //get the css
    //this path should work for all views
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
    fileRef.setAttribute("href", "../../CSS/transition.css");
    //add the css file to the view
    document.getElementsByTagName("head")[0].appendChild(fileRef);

    var content = document.createElement('div');
        content.setAttribute('id', 'content');

        var div = document.createElement('div');
        div.setAttribute('id', 'transition');

        var gif = document.createElement('img');
        gif.setAttribute('id', 'loadGif');
        gif.setAttribute('src', "../../Images/loops.gif");
        gif.style.visibility = 'hidden';

        document.addEventListener('DOMContentLoaded', function () {
            gif.style.visibility = 'visible';
            div.appendChild(gif);
            content.appendChild(div);
            document.getElementsByTagName('html')[0].appendChild(content);

            //this line replaces having a defualt value in the argument
            color = (typeof color !== 'undefined') ? color : 'aquamarine';
            document.getElementById('content').style.backgroundColor = color;
        });
}