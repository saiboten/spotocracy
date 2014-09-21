/**
 * Created by Tobias on 21.09.2014.
 */

var playlist_service = require("./playlist_service");
var user_service = require("./user_service");
var userid_service = require("./userid_service");

var boost_score = function(playlist_id, uri, req) {
    var user_votes = user_service.get_user_votes(playlist_id, req);
    if(user_votes > 0) {
        console.log("Boosting score, playlistid: ", playlist_id, ", uri: " + uri);
        var playlist = playlist_service.get_playlist(playlist_id);
        playlist.songs.forEach(function(song) {
            if(song.uri ==  uri) {
                console.log("Found the correct track, increasing score!");
                song.score++;
                user_service.vote_used(playlist_id, req);
            }
        });
        return true;
    }
    else {
        return false;
    }
}

module.exports.boost_score = boost_score;