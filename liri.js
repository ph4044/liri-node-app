
// read and set any environment variables with the dotenv package
require("dotenv").config();

// Grab the axios package...
var axios = require("axios");

// As always, we grab the fs package to handle read/write.
var fs = require("fs");

// import the `keys.js` file and store it in a variable
var keys = require("./keys.js");
console.log(keys);
// access your keys information like so
// var spotify = new Spotify(keys.spotify);

var moment = require("moment");

//grab the arguments
var requestedSearch = process.argv[2];
var subjectInput = parseInt(process.argv[3]);

if (requestedSearch == "concert-this") {
    concert(subjectInput);
} else if (requestedSearch == "spotify-this-song") {
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

// * This will search the Bands in Town Artist Events API
// (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) 
// for an artist and render the following information about each event to the terminal:
// * Name of the venue
// * Venue location
// * Date of the Event (use moment to format this as "MM/DD/YYYY")

function concert(subject){
    
var artist="Khalid";

axios
  .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    console.log(response.data.length + " results for " + artist+".");
    console.log();
    for (var i = 0;i<response.data.length;i++){
        console.log("Venue: " + response.data[i].venue.name);

        if(response.data[i].venue.country == "United States"){
        console.log("Location: " + response.data[i].venue.city+", "+response.data[i].venue.region+"; "+response.data[i].venue.country);
    } else{
        console.log("Location: " + response.data[i].venue.city+", "+response.data[i].venue.country);
    }
        var dateTime=response.data[i].datetime
        var wrapped=moment(dateTime);
        console.log("Date: "+wrapped.format("MM/DD/YY"));
        console.log();
    }

  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
};

// This will show the following information about the song in your terminal/bash window
// * Artist(s)
// * The song's name
// * A preview link of the song from Spotify
// * The album that the song is from

// * If no song is provided then your program will default to "The Sign" by Ace of Base.

// * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) 
// package in order to retrieve song information from the Spotify API.

// * The Spotify API requires you sign up as a developer to generate the necessary credentials.
// You can follow these steps in order to generate a **client id** and **client secret**:


function spotify(subject){
    console.log("function spotify");
};


// * This will output the following information to your terminal/bash window:

// ```
//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
// ```

// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

// * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

// * It's on Netflix!

function movie(subject){
    console.log("function movie");
};



// * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

// * Edit the text in random.txt to test out the feature for movie-this and concert-this.


function dowhatitsays(){
    console.log("function dowhatitsays");
};

