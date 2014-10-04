/**
 * Created by Tobias on 21.09.2014.
 */

var user_repo = require("../storage/userrepo");
var userid_service = require("./userid_service");

var create_user_if_not_exist = function(req, callback) {
    console.log("Creating new user if it doesnt exist: ");
    user_repo.read_user(userid_service.get_user_id(req), function(user) {
        console.log("user? ", user);
        if(!user) {
            console.log("User does not exist, creating user");
            user_repo.create_user(userid_service.get_user_id(req), function() {
                callback();
            })
        } else {
            console.log("User already exists, nothing to do here.");
            callback();
        }
    });
}

var add_playlist_to_user_if_not_exist = function(playlist_id, user_id, callback) {
    user_repo.add_playlist_to_user_if_not_exist(playlist_id, userid_service.get_user_id(user_id), callback);
}

var get_user = function(req, callback) {
    user_repo.read_user(userid_service.get_user_id(req), function(user) {
        callback(user);
    });
}

var update_user = function(user, callback) {
    user_repo.update_user(user, function() {
        if(callback) {
            callback();
        }
    });
}

var get_all_users = function(callback) {
    user_repo.get_all_users(function(users) {
        callback(users);
    });
}

var get_user_votes = function(playlist_id, req, callback) {
    user_repo.get_user_votes(playlist_id, userid_service.get_user_id(req), callback);
}

var vote_used = function(playlist_id, req) {
    return user_repo.vote_used(playlist_id, userid_service.get_user_id(req));
}

module.exports.create_user_if_not_exist = create_user_if_not_exist;
module.exports.get_user_votes = get_user_votes;
module.exports.vote_used = vote_used;
module.exports.get_user = get_user;
module.exports.add_playlist_to_user_if_not_exist = add_playlist_to_user_if_not_exist;
module.exports.get_all_users = get_all_users;
module.exports.update_user = update_user;


