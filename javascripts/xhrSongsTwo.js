"use strict";

var currentSong;
// Create XHR Request
var myRequest = new XMLHttpRequest();

// Get the json file using the method open
myRequest.open("GET", "songListTwo.json");

// Starts getting the second JSON file once the more button is clicked via the function
document.getElementById("moreButton").addEventListener("click", startSecondRequest);

// Start the process of getting the json file and deleting the more button from the DOM
function startSecondRequest() {
  myRequest.send();
  deleteMoreButton();
}

// Deletes the more button from the DOM once it's clicked and the second JSON file populates the DOM
function deleteMoreButton() {
  var deleteMore = document.getElementById("moreButton");
  deleteMore.remove();
}

// runs this function if json file doesn't load
myRequest.addEventListener("error", xhrTransferError);

// runs this function if json file loads properly
myRequest.addEventListener("load", executeCodeAfterFileLoads);

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

  for (currentSong in data.songsTwo) {
    var songCard = "";
    var song = data.songsTwo[currentSong];

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

module.exports = executeCodeAfterFileLoads;
