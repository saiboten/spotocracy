/**
 * Created by Tobias on 21.09.2014.
 */
var playlist_repo = require("../storage/playlistrepo");
var song_repo = require("../storage/songrepo");
var spotify_rest_service = require("./spotify_rest_service");
var user_service = require("./user_service");
var userid_service = require("./userid_service");
var websocket = require("../websocket/socket");
var async = require("async");

var create_playlist_if_not_exist = function(playlist_id, req, callback) {
    console.log("playlist_service:: Creating new playlist with playlist id: ", playlist_id);
    playlist_repo.get_playlist(playlist_id, function(playlist) {
        if(!playlist) {
            console.log("playlist_service:: Playlist did not exist, creating playlist");
            playlist_repo.add_playlist(playlist_id, function() {
                callback();
            });
        }
        else {
            console.log("playlist_service:: Playlist already exists. No need to create");
            callback();
        }
    });
}

var add_user_to_playlist_if_not_exist = function(playlist_id, req, callback) {
    playlist_repo.add_user_to_playlist(playlist_id, userid_service.get_user_id(req), callback);
}

var get_playlists = function(callback) {
    var playlists = [];

     playlist_repo.get_all_playlists(function(allPlaylists) {
         console.log(allPlaylists);
         callback(allPlaylists.map(function(playlist) {
             return playlist.playlist_id;
         }));
    });
}

var get_playlist = function(playlist_id, callback) {
    playlist_repo.get_playlist(playlist_id, callback);
}

var get_songs_from_playlist = function(playlist_id, page, callback) {
    playlist_repo.get_playlist(playlist_id, function(playlist) {
        var songs = playlist.songs;

        var position = 0;
        playlist.songs.forEach(function(song) {
            song.position = position;
            position++;
        })

        songs.sort(function(a, b){
            if (a.score < b.score) {
                return 1;
            }
            if (a.score > b.score) {
                return -1;
            }
            // a must be equal to b
            return a.position - b.position;;
        });

        console.log("Sorting done: ", songs);

        page--;
        var page_times_ten = page*10;
        var ten_songs = songs.slice(page_times_ten, page_times_ten+10);

        if(playlist) {
            callback({songs: ten_songs, totalSongs: playlist.songs.length});
        }
        else {
            console.log("playlist_service:: Could not find the playlist?");
            callback(undefined);
        }
    });
}

var get_next_song_from_playlist = function(playlist_id, callback) {
    playlist_repo.get_playlist(playlist_id, function(playlist) {
        var position = 0;
        playlist.songs.forEach(function(song) {
            song.position = position;
            position++;
        })

        playlist.songs.sort(function(a, b){
            if (a.score < b.score) {
                return 1;
            }
            if (a.score > b.score) {
                return -1;
            }
            // a must be equal to b
            return a.position - b.position;
        });

        playlist.songs.forEach(function(song) {
            console.log("song: ", song.artist);
        });

        var next_track = playlist.songs.shift(); // Shift removes the first element, like a reverse pop
        next_track.score = 0;
        console.log("Next track: ", next_track);

        playlist.songs.push(next_track);
        playlist.current_song = next_track;

        update_playlist(playlist, function() {

            callback(next_track.uri)
            websocket.time_to_update();
        });
    });
}

var update_playlist = function(playlist, callback) {
    playlist_repo.save_playlist(playlist, callback);
}

var get_total_number_of_votes_for_playlist = function(playlist_id, callback) {
    playlist_repo.get_all_votes(playlist_id, callback);
}

var get_current_songs = function(playlist, req, pagenumber, callback) {
        async.parallel({
            songData: function(callbackFinished) {
                get_songs_from_playlist(playlist, pagenumber, function(songs) {
                    callbackFinished(null,songs );
                });
            },
           userVotes: function (callbackFinished) {
                user_service.get_user_votes(req.params.playlist, req, function(votes) {
                    callbackFinished(null,votes );
                });
            },
           totalVotes: function (callback) {
                get_total_number_of_votes_for_playlist(playlist, function(votes) {
                    callback(null, votes);
                });
            },
            playingSong: function (callback) {
                get_playing_song_from_playlist(playlist, function(song) {
                    callback(null, song);
                })
            }
        },function(err, results){
            callback(results);
        });
}

var get_playing_song_from_playlist = function(playlist_id, callback) {
    playlist_repo.get_playlist(playlist_id, function(playlist){
        if(playlist) {
            callback(playlist.current_song);
        }
    });

}

module.exports.get_playlists = get_playlists;
module.exports.get_songs_from_playlist = get_songs_from_playlist;
module.exports.create_playlist_if_not_exist = create_playlist_if_not_exist;
module.exports.get_next_song_from_playlist = get_next_song_from_playlist;
module.exports.get_playlist = get_playlist;
module.exports.get_playing_song_from_playlist = get_playing_song_from_playlist;
module.exports.get_total_number_of_votes_for_playlist = get_total_number_of_votes_for_playlist;
module.exports.get_current_songs = get_current_songs;
module.exports.update_playlist = update_playlist;
module.exports.add_user_to_playlist_if_not_exist = add_user_to_playlist_if_not_exist;
