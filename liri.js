// Grab the fs package to handle read/write.
var fs = require("fs");

// Read and set any environment variables with the dotenv package.
require("dotenv").config();
// Import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");

// Grab the axios package.
var axios = require("axios");

// Grab the spotify package.
var Spotify = require('node-spotify-api');

// Grab the moment js package.
var moment = require("moment");

// Access your keys information.
var spotify = new Spotify(keys.spotify);

function processRequest(requestedSearch, subjectInput) {
    if (requestedSearch == "concert-this") {
        concert(subjectInput);
    } else if (requestedSearch == "spotify-this-song") {
        if (subjectInput === undefined || null || "") {
            subjectInput = "The Sign Ace of Base"
        }
        spotifyThis(subjectInput);
    } else if (requestedSearch == "movie-this") {
        // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        if (subjectInput === undefined || null || "") {
            subjectInput = "Mr. Nobody"
        }
        movie(subjectInput);
    } else if (requestedSearch == "do-what-it-says") {
        dowhatitsays();
    } else {
        console.log();
        console.log("Please enter a valid search request:");
        console.log("  spotify-this-song '<song name here>'");
        console.log("  concert-this '<artist/band name here>'");
        console.log("  movie-this '<movie name here>'");
        console.log("  do-what-it-says");
    }
}

function concert(artist) {
    // This will search the Bands in Town Artist Events API for an artist
    // and render the following information about each event to the terminal:
    //   Name of the venue
    //   Venue location
    //   Date of the Event.
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            // console.log(response.data);
            console.log('\n' + response.data.length + " result(s) for " + artist + "."+'\n');
            for (var i = 0; i < response.data.length; i++) {
                console.log("Venue: " + response.data[i].venue.name);

                if (response.data[i].venue.country == "United States") {
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + "; " + response.data[i].venue.country);
                } else {
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                }
                var dateTime = response.data[i].datetime
                var wrapped = moment(dateTime);
                console.log("Date: " + wrapped.format("MM/DD/YY"));
                console.log();
            }

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx.
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

function spotifyThis(musicToSearch) {
    // This will retrieve song info from the Spotify API and show the following information 
    // about the song in the terminal/bash window:
    //   Artist(s)
    //   The song's name
    //   A preview link of the song from Spotify
    //   The album that the song is from.
    spotify.search({ type: 'track', query: musicToSearch, limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);mov
        }
        else if (data.tracks.items == 0) {
            console.log("Song not found.")
        }
        else {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var musicItem = data.tracks.items[i];
                console.log();
                // The artist(s).
                console.log("Artist: " + musicItem.artists[0].name);
                // The song's name.
                console.log("Song Name: " + musicItem.name);
                // A preview link of the song from Spotify.
                console.log("Preview Link: " + musicItem.preview_url);
                // The album that the song is from.
                console.log("Album Name: " + musicItem.album.name);
            }
        }
    });
};

function movie(movieToSearch) {
    // This will output the following information to your terminal/bash window:
    //   Title of the movie.
    //   Year the movie came out.
    //   IMDB Rating of the movie.
    //   Rotten Tomatoes Rating of the movie.
    //   Country where the movie was produced.
    //   Language of the movie.
    //   Plot of the movie.
    //   Actors in the movie.

    axios
        .get("https://www.omdbapi.com/?t=" + movieToSearch + "&apikey=trilogy")
        .then(function (response) {
            // If the axios was successful; then, log the body from the site.
            console.log();
            //   * Title of the movie.
            console.log("Title: " + response.data.Title);
            //   * Year the movie came out.
            console.log("Year: " + response.data.Year);
            //   * IMDB Rating of the movie.
            console.log("IMDB Rating: " + response.data.imdbRating);
            //   * Rotten Tomatoes Rating of the movie.
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            //   * Country where the movie was produced.
            console.log("Country: " + response.data.Country);
            //   * Language of the movie.
            console.log("Language: " + response.data.Language);
            //   * Plot of the movie.
            console.log("Plot: " + response.data.Plot);
            //   * Actors in the movie.
            console.log("Actors: " + response.data.Actors);
        })
        .catch(function (error) {
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

function dowhatitsays() {
    // This will take the text inside of random.txt and then use it to call one of LIRI's commands.
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.split(",");
        processRequest(data[0], data[1])
    })
}

processRequest(process.argv[2], process.argv[3])
