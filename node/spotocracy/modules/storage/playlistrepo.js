/**
 * Created by Tobias on 21.09.2014.
 */
var playlist = require('../model/playlist');

var playlists = {};

var get_all_playlists = function() {
    console.log("This is the playlists: ", playlists);
    return playlists;
}

var add_playlist = function(playlist_id) {
    console.log("Adding new playlist: ", playlist_id);
    playlists[playlist_id] = new playlist(playlist_id);
}

var get_playlist = function(playlist_id) {
    return playlists[playlist_id];
}

var get_all_votes = function(playlist_id) {
    var playlist = playlists[playlist_id];
    if(playlist.songs.length > 0) {
        return playlist.songs.reduce(function(previousValue, currentValue) {
            return currentValue.score+previousValue.score;
        })
    }
    else {
        return 0;
    }

}


module.exports.get_all_playlists = get_all_playlists;
module.exports.add_playlist = add_playlist;
module.exports.get_playlist = get_playlist;
module.exports.get_all_votes = get_all_votes;