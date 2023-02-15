// all code is my own unless otherwise stated 

//when an image is clicked it sends the filename to this function which if the song is
//already playing it will pause it and save how far in to the song the user was
//if the same album is clicked the song is resumed
//when an image is clicked it enlarges by a scale factor to indicate to the user that that image has been selected

var currentSong;
// called when an album image is called
function playMusic(filename) {
    
    // selects all the images with the class "album"
    var albums = document.querySelectorAll('.album');

    // removes the "clicked" from all images
    for (var i = 0; i < albums.length; i++) {
        albums[i].classList.remove("clicked");
    }

    // checks if the current song is the same as the one being clicked
    if (currentSong && currentSong.src.indexOf(filename) > -1) {
        // if the current song is paused, continue playing
        if (currentSong.paused) {
        currentSong.play();
        console.log("Resumed: " + filename);
        } else {
        // if the current song is playing then pause it
        currentSong.pause();
        console.log("Paused: " + filename);
        }
    } else {
        // if the current song is different to the one being clicked
        if (currentSong) {
            // pause current song
        currentSong.pause();
        }
        // set the current song to the new audio
        currentSong = new Audio("audio/" + filename);
        currentSong.play();
        console.log("Playing: " + filename);
    }

    // add the "clicked" class to the image that was clicked
    event.target.classList.add("clicked");
    // this will allow the size of the image to be changed using CSS
    // it is transformed (enlarged) by a scale of 1.1
}
