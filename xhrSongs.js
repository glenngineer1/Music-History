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

// counter to give unique id's for each song
var counter = 0;
// place to return data in to DOM
var newSong = document.getElementById("song");

// shows error message in console if the transfer was unsuccessful
function xhrTransferError(xhrEvent) {
  // console.log("An error occured while transferring the data");
}

// runs function with data to populate DOM
function executeCodeAfterFileLoads() {
  // takes json data and converts it to an object
  var data = JSON.parse(this.responseText);

  for (currentSong in data.songs) {
    var songCard = "";
    var song = data.songs[currentSong];
    // console.log("song", song);

    counter++;
    songCard = `<div class="individual-song"><div class="song-title">${song.title}</div><button id="delete-song--${counter}">Delete</button><div class="artist-song">Performed By: ${song.artist}</div><div class="album-song">On The Album: ${song.album}</div></div>`;

    var newDiv = document.createElement("article");
    newDiv.innerHTML = songCard;
    var newAttr = document.createAttribute("id");
    newAttr.value = `cardWrapper--${counter}`;
    newDiv.setAttributeNode(newAttr);
    newSong.appendChild(newDiv);

    document.getElementById(`delete-song--${counter}`).addEventListener("click", deleteSong);
  }
}

function deleteSong() {
  var clickDelete = event.target.id.split("--")[1];
  var songToDelete = document.getElementById(`cardWrapper--${clickDelete}`);
  newSong.removeChild(songToDelete);
}

// songs refers to the json file object, not the name of the file itself (songList.json)
  // for (currentSong in data.songs) {
  //   var songData = "";
  //   var song = data.songs[currentSong];
  //   songData += "<div class='individual-song'>";
  //   songData += "<h1>" + song.title + "</h1>";
  //   songData += "<div class='artist-song'>Performed By: " + song.artist + "</div>";
  //   songData += "<div class='album-song'>On The Album: " + song.album + "</div>";
  //   songData += "<input id='delete-song' type='button'> Delete" + "</input>";
  //   songData += "</div>";

  //   newSong.innerHTML += songData;
  //   var deleteButton = document.getElementById("delete-song");
  //   deleteButton.addEventListener("click", removeElement);
  //   function removeElement(event) {
  //     deleteButton.parentNode.remove();
      // console.log("event.target", event.target);
