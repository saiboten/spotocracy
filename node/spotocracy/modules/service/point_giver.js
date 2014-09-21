/**
 * Created by Tobias on 21.09.2014.
 */
var playlist_service = require("./playlist_service");

var give_votes_to_everything = function() {
    console.log("Time to give votes!");
    var playlists = playlist_service.get_playlists();
    playlists.forEach(function(playlist_id) {
        var playlist = playlist_service.get_playlist(playlist_id);
        playlist.users.forEach(function(user) {
            user.votes++;
        })
    })
}

var init = function() {
    console.log("Initiated point giving");
    setInterval(give_votes_to_everything, 300000);
}

module.exports.init = init;
