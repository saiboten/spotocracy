/**
 * Created by Tobias on 21.09.2014.
 */
var playlist = require('../model/playlist');

var playlists = [];

playlists.push(new playlist("current song", "playlist id", "changethis", "blabla"));

var get_playlists = function() {
    var playlist_ids = playlists.map(function(playlist) {
        return playlist.playlist_id;
    })
    return playlist_ids;
}

module.exports.get_playlists = get_playlists;