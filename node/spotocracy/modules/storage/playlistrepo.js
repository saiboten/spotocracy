/**
 * Created by Tobias on 21.09.2014.
 */
var playlist = require('../model/playlist');

var playlists = {};
playlists["playlist id"] = new playlist("playlist id");
playlists["My Playlist"] = new playlist("My Playlist");

var get_all_playlists = function() {
    console.log("This is the playlists: ", playlists);
    return playlists;
}

var add_playlist = function(playlist_id) {
    playlists[playlist_id] = new playlist(playlist_id);
}

var get_playlist = function(playlist_id) {
    return playlists[playlist_id];
}

module.exports.get_all_playlists = get_all_playlists;
module.exports.add_playlist = add_playlist;
module.exports.get_playlist = get_playlist;