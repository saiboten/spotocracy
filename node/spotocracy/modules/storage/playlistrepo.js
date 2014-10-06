/**
 * Created by Tobias on 21.09.2014.
 */
var playlist = require('../model/playlist');
var mongojs = require("mongojs");
var user_service = require("../service/user_service");

var uri = "spotocracy";
var db = mongojs.connect(uri, ["playlists"]);

var get_playlist = function(playlist_id, callback) {
    db.playlists.findOne({playlist_id: playlist_id}, function(err, playlist) {
        if(err) {
            console.err("playlistrepo:: Some error occured: ", err);
        }
        else {
            if(playlist) {
                //console.log("playlistrepo:: Playlist searched and found: Returning playlist.data: ", playlist.data);
                callback(playlist.data);
            }
            else {
                console.log("playlistrepo:: Playlist search, but nothing could be found: ", playlist_id);
                callback(undefined);
            }
        }
    });
}

var get_all_playlists = function(callback) {
    db.playlists.find(function(err,playlists) {
        callback(playlists);
    });
}

var add_playlist = function(playlist_id, callback) {
    get_playlist(playlist_id, function(existing_playlist) {
        if(!existing_playlist) {
            console.log("playlistrepo:: Adding new playlist: ", playlist_id);
            db.playlists.save({playlist_id: playlist_id, data: new playlist(playlist_id)}, function() {
                callback();
            });
        }
        else {
            console.log("playlistrepo:: Playlist already exists");
        }
    });
}

var add_user_to_playlist = function(playlist_id, user_id, callback) {
    get_playlist(playlist_id, function(existing_playlist) {
        var user_exists = false;

        existing_playlist.users.forEach(function(user) {
            if(user_id === user.user_id) {
                user_exists = true;
            }
        })

        if(user_exists) {
            console.log("User already exists on this playlist, no need to add him/her");
        }
        else {
            console.log("Adding new user to playlist");
            existing_playlist.users.push(user_id);
            save_playlist(existing_playlist, callback);
        }
    });
}

var save_playlist = function(playlistdata, callback) {
   db.playlists.update({playlist_id:playlistdata.playlist_id}, {playlist_id:playlistdata.playlist_id, data: playlistdata}, function(err, something_else) {
        console.log("playlistrepo:: playlist .. updated:", something_else);
       if(callback) {
           callback();
       }

    });
}

var get_all_votes = function(playlist_id, callback) {
    console.log("playlistrepo:: Getting all votes in playlist");
    get_playlist(playlist_id, function(playlist) {
        if(playlist.songs && playlist.songs.length > 0) {
            var sum = playlist.songs.reduce(function(previousValue, currentValue) {
                return previousValue+currentValue.score;
            },0);

            console.log("Total number of votes: ", sum);
            callback(sum);
        }
        else {
            callback(0);
        }
    });
}


module.exports.get_all_playlists = get_all_playlists;
module.exports.add_playlist = add_playlist;
module.exports.get_playlist = get_playlist;
module.exports.get_all_votes = get_all_votes;
module.exports.save_playlist = save_playlist;
module.exports.add_user_to_playlist = add_user_to_playlist;
