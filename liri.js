
// read and set any environment variables with the dotenv package
require("dotenv").config();

// As always, we grab the fs package to handle read/write.
var fs = require("fs");

// import the `keys.js` file and store it in a variable
var keys = require("./keys.js");
console.log(keys);
// access your keys information like so
var spotify = new Spotify(keys.spotify);

//grab the arguments
var requestedSearch = process.argv[2];
var subjectInput = parseInt(process.argv[3]);

if (requestedSearch == "concert-this") {
    concert(subjectInput);
    console.log("you asked me to do a concert search");
} else if (requestedSearch == "spotify-this") {
    spotify(subjectInput);
    console.log("you asked me to do a Spotify search");
} else if (requestedSearch == "movie-this") {
    movie(subjectInput);
    console.log("you asked me to do a movie search");
} else if (requestedSearch == "do-what-it-says") {
    dowhatitsays();
    console.log("you asked me to do what it says");
} else {
    console.log("Pls enter a valid search request");
}

function concert(subject){
    console.log("function concert");
};

function spotify(subject){
    console.log("function spotify");
};

function movie(subject){
    console.log("function movie");
};

function dowhatitsays(){
    console.log("function dowhatitsays");
};