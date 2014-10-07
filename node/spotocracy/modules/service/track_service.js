/**
 * Created by Tobias on 04.10.2014.
 */

var spotify_rest_service = require("./spotify_rest_service");
var song_repo = require("../storage/songrepo");
var websocket = require("../websocket/socket");

var add_track_to_playlist = function(playlist_id, track_id, callback) {
    spotify_rest_service.uri_to_song(track_id, function(song) {
            song_repo.add_track_to_playlist(playlist_id, song, function(success) {
                if(success) {
                    websocket.time_to_update();
                }
                callback(success);
            })
    });
}

module.exports.add_track_to_playlist = add_track_to_playlist;