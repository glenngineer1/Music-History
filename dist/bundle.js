(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var currentSong;
// Create XHR Request
var myRequest = new XMLHttpRequest();

// Get the json file using the method open
myRequest.open("GET", "songList.json");

// Start the process of getting the json file
myRequest.send();

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

  for (currentSong in data.songs) {
    var songCard = "";
    var song = data.songs[currentSong];

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

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map
