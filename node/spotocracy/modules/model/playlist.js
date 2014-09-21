/**
 * Created by Tobias on 21.09.2014.
 */
var Playlist = function(current_song, playlist_id, scores, songs) {
    this.current_song = current_song,
    this.playlist_id = playlist_id;
    this.scores = scores;
    this.songs = songs;
}

module.exports = Playlist;