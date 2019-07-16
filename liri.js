/* liri.js must take in one of the following commands:

* spotify-this-song
    Ex. node liri.js spotify-this-song '<song name here>'
* concert-this
    Ex. node liri.js concert-this <artist/band name here>
* movie-this
    Ex. node liri.js movie-this '<movie name here>'
* do-what-it-says
    Ex. node liri.js do-what-it-says
*/

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Packages and files to require
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request")
var axios = require("axios");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");


var spotify = new Spotify(keys.spotify);

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });
