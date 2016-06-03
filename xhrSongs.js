// Create XHR Request
var myRequest = new XMLHttpRequest();

// Get the json file using the method open
myRequest.open("GET", "songList.json");

// Start the process of getting the json file
myRequest.send();

// runs this function if json file doesn't load
myRequest.addEventListener("error", xhrTransferError);

// runs this function if json file loads properly
myRequest.addEventListener("load", executeCodeAfterFileLoads)

// shows error message in console if the transfer was unsuccessful
function xhrTransferError(xhrEvent) {
  console.log("An error occured while transferring the data");
}

// runs function with data to populate DOM
function executeCodeAfterFileLoads() {
  // takes json data and converts it to an object
  var data = JSON.parse(this.responseText);

  // place to put json data
  var newSong = document.getElementById("song");

// songs refers to the json file object, not the name of the file itself (songList.json)
  for (currentSong in data.songs) {
    var songData = "";
    var song = data.songs[currentSong];
    songData += "<div class='individual-song'>";
    songData += "<h1>" + song.title + "</h1>";
    songData += "<div class='artist-song'>Performed By: " + song.artist + "</div>";
    songData += "<div class='album-song'>On The Album: " + song.album + "</div>";
    songData += "<input id='delete-song' type='button'> Delete" + "</input>";
    songData += "</div>";

    newSong.innerHTML += songData;
    var deleteButton = document.getElementById("delete-song");
    deleteButton.addEventListener("click", removeElement);
    function removeElement(event) {
      deleteButton.parentNode.remove();
      // console.log("event.target", event.target);
    }
  }
}

