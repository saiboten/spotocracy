/**
 * Created by Tobias on 21.09.2014.
 */
var User = require("../model/user");
var playlistrepo = require("./playlistrepo");
var UserPlaylist = require("../model/userplaylist");
var mongojs = require("mongojs");

var uri = "spotocracy";
var db = mongojs.connect(uri, ["users"]);

var create_user = function(user_id, callback) {
    console.log("Creating user with user id: ", user_id);
    var new_user = new User(user_id);
    db.users.save(new_user, function() {
        console.log("User created successfully, id was: ", user_id);
        if(callback) {
            callback();
        }
    });
}

var read_user = function(user_id, callback) {
    console.log("Finding user with user id: ", user_id);
    db.users.findOne({user_id: user_id}, function(err, user) {
        console.log("Found this user: ", user);
        if(user) {
            callback(user);
        }
        else {
            callback(undefined);
        }
    });
}

var get_all_users = function(callback) {
    return db.users.find(function(err, docs) {
       callback(docs);
    });
}

var update_user = function(user, callback) {
    console.log("Updating user with these data: ", user);
    db.users.update({user_id: user.user_id}, user, function() {
        if(callback) {
            callback();
        }
    })
}

var add_playlist_to_user_if_not_exist = function(playlist_id, user_id, callback) {
    console.log("userrepo:: Adding user to playlist: ", playlist_id, ", userid: ", user_id);
    playlistrepo.get_playlist(playlist_id, function(playlist) {
        if(playlist) {
            read_user(user_id, function(user) { // Assuming that the user exists

                var user_exists = false;

                user.playlists.forEach(function(userplaylist) {
                   if(userplaylist.playlist_id === playlist_id) {
                       user_exists = true;
                   }
                });

                if(user_exists) {
                    console.log("Playlist is already added to user");
                }
                else {
                    console.log("Adding playlist to user");
                    user.playlists.push(new UserPlaylist(playlist_id));
                    update_user(user);
                }
            });
            playlist.users.push(user_id);
            playlistrepo.save_playlist(playlist, function() {
                console.log("userrepo:: Save success.");
            });
        }
    });
}

var get_user_votes = function(playlist_id, user_id, callback) {
    console.log("userrepo:: Retrieving user votes: ", playlist_id, ", userid: ", user_id);
    read_user(user_id, function(user) {
        console.log("userrepo:: User: ", user);
        if(user) {
            user.playlists.forEach(function(userplaylist) {
                if(userplaylist.playlist_id === playlist_id) {
                    callback(userplaylist.votes);
                }
            });
        }
        else {
            callback(0);
        }

    });
}

var vote_used = function(playlist_id, user_id) {
    read_user(user_id, function(user) {

            user.playlists.forEach(function(playlist) {
                if(playlist.playlist_id === playlist_id) {
                    playlist.votes--;
                    update_user(user);
                }
            });
    });
}

module.exports.add_playlist_to_user_if_not_exist = add_playlist_to_user_if_not_exist;
module.exports.read_user = read_user;
module.exports.get_user_votes = get_user_votes;
module.exports.vote_used = vote_used;
module.exports.create_user = create_user;
module.exports.get_all_users = get_all_users;
module.exports.update_user = update_user;


