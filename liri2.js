
// read and set any environment variables with the dotenv package
require("dotenv").config();

// Grab the axios package...
var axios = require("axios");

// As always, we grab the fs package to handle read/write.
var fs = require("fs");

// import the `keys.js` file and store it in a variable
var keys = require("./keys.js");
console.log(keys);

var Spotify = require('node-spotify-api');
// access your keys information like so
var spotify = new Spotify(keys.spotify);

var moment = require("moment");

//grab the arguments
var requestedSearch = process.argv[2];
var subjectInput = parseInt(process.argv[3]);

spotify.search({ type: 'track', query: 'Roxanne' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });