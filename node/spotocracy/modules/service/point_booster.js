/**
 * Created by Tobias on 21.09.2014.
 */

var playlist_service = require("./playlist_service");
var user_service = require("./user_service");
var userid_service = require("./userid_service");
var websocket = require("../websocket/socket");

var boost_score = function(playlist_id, uri, req, callback) {
    user_service.get_user_votes(playlist_id, req, function(user_votes) {
        if(user_votes > 0) {
            console.log("Boosting score, playlistid: ", playlist_id, ", uri: " + uri);
            playlist_service.get_playlist(playlist_id, function(playlist) {
                playlist.songs.forEach(function(song) {
                    if(song.uri ==  uri) {
                        console.log("Found the correct track, increasing score!");
                        song.score++;
                        user_service.vote_used(playlist_id, req);
                    }
                });

                playlist_service.update_playlist(playlist, function() {
                    websocket.time_to_update();
                });
            });
            callback(true);
        }
        else {
            callback(false);
        }

    });
    return true;
}

module.exports.boost_score = boost_score;