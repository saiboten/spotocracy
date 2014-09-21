/**
 * Created by Tobias on 21.09.2014.
 */
var User = require("../model/user");
var playlistrepo = require("./playlistrepo");

var add_user_to_playlist = function(playlist, user_id) {
    console.log("Adding user to playlist: ", playlist, ", userid: ", user_id);
    var playlist = playlistrepo.get_playlist(playlist);
    if(playlist) {
        var new_user = new User(user_id);
        playlist.users.push(new_user);
    }
}

var get_user = function(playlist_id, user_id) {
    console.log("Retrieving user: ", playlist, ", userid: ", user_id);
    var playlist = playlistrepo.get_playlist(playlist_id);
    var found_user = undefined;
    playlist.users.forEach(function(user) {
        if(user.id === user_id) {
            console.log("Found the user: ", user);
            found_user = user;
        }
    });
    console.log("Returning this user: ", found_user);
    return found_user;
}

var get_user_votes = function(playlist_id, user_id) {
    console.log("Retrieving user votes: ", playlist_id, ", userid: ", user_id);
    var user = get_user(playlist_id, user_id);
    console.log("User: ", user);
    return user.votes;
}

var vote_used = function(playlist_id, user_id) {
    var user = get_user(playlist_id, user_id);
    user.votes--;
}

module.exports.add_user_to_playlist = add_user_to_playlist;
module.exports.get_user = get_user;
module.exports.get_user_votes = get_user_votes;
module.exports.vote_used = vote_used;