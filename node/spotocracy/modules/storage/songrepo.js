/**
 * Created by Tobias on 04.10.2014.
 */

var playlist_repo = require("./playlistrepo");

var add_track_to_playlist = function(playlist_id, song, callback) {
    console.log("songrepo:: Adding song ", song, " to playlist ", playlist_id);
    song_exists_in_playlist(playlist_id, song, function(exists) {
        if(exists) {
            callback(false);
        }
        else {
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
    })
}

var song_exists_in_playlist = function(playlist_id, songInput, callback) {

    playlist_repo.get_playlist(playlist_id, function(playlist) {
        var exists = false;
        if(playlist) {
            playlist.songs.forEach(function(song) {
                if(songInput.uri == song.uri) {
                    exists = true;
                }
            });
        }

        console.log("songrepo:: Callback time!: ", exists);
        callback(exists);
    });
}

module.exports.add_track_to_playlist = add_track_to_playlist;