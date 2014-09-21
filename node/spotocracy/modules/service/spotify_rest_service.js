/**
 * Created by Tobias on 21.09.2014.
 */
var Song = require("../model/song");
var http = require("http");

var uri_to_song = function(uri, callback) {
    //artist, name, album, uri
    var song = undefined;

    console.log("This is the complete uri: ", "http://ws.spotify.com/lookup/1/.json?uri" + uri);

    http.get("http://ws.spotify.com/lookup/1/.json?uri=" + uri, function(res) {
        console.log("Got response: " + res.statusCode);

        res.on('data', function (chunk) {
            var chunkJson = JSON.parse(chunk);
            song = new Song(chunkJson.track.artists[0].name, chunkJson.track.name, chunkJson.track.album["name"], uri);
            callback(song);
        });

    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}

module.exports.uri_to_song = uri_to_song;