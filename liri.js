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
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var arg = process.argv[2];
var input = process.argv.slice(3).join(" ");

// "liriBot" Function that stores all necessary functions
function liriBot() {
    if (arg === "concert-this"){
        console.log(input);
        callBands(input);
    }   else if (arg === "spotify-this-song"){ 
        console.log(input);
        callSpotify(input); 
    }   else if (arg === "movie-this"){
        console.log(input);
        callMovie(input);
    }   else if (arg === "do-what-it-says"){
        console.log(input);
        doSomething(input);
    }
};

liriBot();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// "concert-this" Function
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

function callBands (artist) {
    var bandQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    // Axios request that is necessary in order to call the queryUrl 
    axios.get(bandQueryUrl).then(

        function (response) {
            console.log(response);
            if (response === "") {
                response = "Concerts Not Found";
            } else {
                
            for (var i = 0; i < response.data.length; i++) { 
                console.log("================================================================");
                console.log("Concert Search Results:");
                console.log("Artist: " + artist);
                console.log("Name of Venue: " + response.data[0].venue.name);
                console.log("Location of Venue: " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
                console.log("Event Date: " +  moment(response.datetime).format("MM/DD/YYYY"));
                console.log("================================================================");
                }
            }
        });
    }
        

callBands("Foo Fighters")

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// "spotify-this-song" Function
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

function callSpotify (response){
    if (response === "") {
        response = "The Sign by Ace of Base";
    }

    spotify.search({ type: 'track', query: response }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
        
        for (var i = 0; i < data.tracks.items.length; i++) { 
            console.log("================================================================");
            console.log("Song Title: ",data.tracks.items[i].name);
            console.log("Artist: ", data.tracks.items[i].artists[0].name);
            console.log("Album: ",data.tracks.items[i].album.name);
            console.log("Preview-URL: ",data.tracks.items[i].preview_url);   
            console.log("================================================================");
        }
    }
  });
}
// ************************************************************
// Not sure if this is necessary since I have the "liriBot function at the top now..."
// callSpotify ("Fat Lip");
// ************************************************************

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// "movie-this" Function
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

function callMovie (movieTitle) {
    if (!movieTitle) {
        movieTitle = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

    // Axios request that is necessary in order to call the queryUrl 
    axios.get(queryUrl).then(
        function (response) {
            if (!movieTitle) {
                movieTitle = "Mr. Nobody";
            }

            // logging different responses from omdb
            console.log("================================================================");
            console.log("Movie Results:");
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country of Production: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Movie Plot: " + response.data.Plot);
            console.log("Actors/Actresses: " + response.data.Actors);
            console.log("================================================================");
        
        }
    );
}
// ************************************************************
// Not sure if this is necessary since I have the "liriBot function at the top now..."
// callMovie("Toy Story");
// ************************************************************


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// "do-what-it-says" Function
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// Perform the function that calls the random text file every time
function doSomething() {
    
    fs.readFile("random.txt", "utf8", function(err, data) {
        // If the code experiences any errors it will log the error to the console.
        var txt = data.split(',');

        callSpotify(txt[1]);
 });
}
