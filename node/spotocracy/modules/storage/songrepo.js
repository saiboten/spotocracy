/**
 * Created by Tobias on 04.10.2014.
 */

var playlist_repo = require("./playlistrepo");

var add_track_to_playlist = function(playlist_id, song, callback) {
    console.log("songrepo:: Adding song ", song, " to playlist ", playlist_id);
    playlist_repo.get_playlist(playlist_id, function(playlist) {
        console.log("songrepo:: Found playlist: ", playlist);
        if(playlist) {
            playlist.songs.push(song);
            playlist_repo.save_playlist(playlist, function() {
                callback(true);
            });
        }
    });
}

module.exports.add_track_to_playlist = add_track_to_playlist;