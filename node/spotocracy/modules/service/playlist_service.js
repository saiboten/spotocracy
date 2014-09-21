/**
 * Created by Tobias on 21.09.2014.
 */
var playlist_repo = require("../storage/playlistrepo");
var spotify_rest_service = require("./spotify_rest_service");
var user_service = require("./user_service");
var websocket = require("../websocket/socket");

var create_playlist_if_not_exist = function(playlist_id) {
    console.log("Creating new playlist with playlist id: ", playlist_id);
    var playlist = playlist_repo.get_playlist(playlist_id);

    if(!playlist) {
        console.log("Playlist did not exist, creating playlist");
        playlist_repo.add_playlist(playlist_id);
    }
}

var get_playlists = function() {
    var playlists = [];

    for (var key in playlist_repo.get_all_playlists()) {
        playlists.push(key);
    }

    return playlists;
}


var get_playlist = function(playlist_id) {
    return playlist_repo.get_playlist(playlist_id);
}

var get_songs_from_playlist = function(playlist_id) {
    var playlist = playlist_repo.get_playlist(playlist_id);
    if(playlist) {
        return playlist.songs;
    }
}

var add_track_to_playlist = function(playlist_id, track_id) {
    spotify_rest_service.uri_to_song(track_id, function(song) {
        var playlist = playlist_repo.get_playlist(playlist_id);
        if(playlist) {
            playlist.songs.push(song);
        }
    });
    websocket.time_to_update();
}

var get_next_song_from_playlist = function(playlist_id) {
    var playlist = playlist_repo.get_playlist(playlist_id);
    var next_track = playlist.songs.shift(); // Shift removes the first element, like a reverse pop
    console.log("Next track: ", next_track);
    playlist.songs.push(next_track);
    playlist.current_song = next_track;
    return next_track.uri;
    websocket.time_to_update();
}

var get_total_number_of_votes_for_playlist = function(playlist_id) {
    return playlist_repo.get_all_votes(playlist_id);
}

var get_current_songs = function(playlist, req) {
    return {
        songs: get_songs_from_playlist(playlist),
        userVotes: user_service.get_user_votes(req.params.playlist, req),
        totalVotes: get_total_number_of_votes_for_playlist(playlist),
        playingSong: get_playing_song_from_playlist(playlist)
    };
}

var get_playing_song_from_playlist = function(playlist_id) {
    var playlist = playlist_repo.get_playlist(playlist_id);
    if(playlist) {
        return playlist.current_song;
    }
}

module.exports.get_playlists = get_playlists;
module.exports.add_track_to_playlist = add_track_to_playlist;
module.exports.get_songs_from_playlist = get_songs_from_playlist;
module.exports.create_playlist_if_not_exist = create_playlist_if_not_exist;
module.exports.get_next_song_from_playlist = get_next_song_from_playlist;
module.exports.get_playlist = get_playlist;
module.exports.get_playing_song_from_playlist = get_playing_song_from_playlist;
module.exports.get_total_number_of_votes_for_playlist = get_total_number_of_votes_for_playlist;
module.exports.get_current_songs = get_current_songs;