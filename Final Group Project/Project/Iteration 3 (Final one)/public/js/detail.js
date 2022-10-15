var index = 0;
var images = document.getElementsByClassName("show-img");

function leftButton() {
    var numOfPicture = images.length;
    index--;
    if (index < 0)
        index = numOfPicture - 1;
    for (let i = 0; i < numOfPicture; i++)
        images[i].style.opacity = 0;
    images[index].style.opacity = 1;
}

function rightButton() {
    var numOfPicture = images.length;
    index++;
    if (index >= numOfPicture)
        index = 0;
    for (let i = 0; i < numOfPicture; i++)
        images[i].style.opacity = 0;
    images[index].style.opacity = 1;
}