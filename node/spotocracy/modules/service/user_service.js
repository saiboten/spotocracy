/**
 * Created by Tobias on 21.09.2014.
 */

var user_repo = require("../storage/userrepo");
var userid_service = require("./userid_service");

var create_user_if_not_exist = function(playlist, req) {
    console.log("Creating new user if it doesnt exist: ", playlist);
    if(!user_repo.get_user(playlist, userid_service.get_user_id(req))) {
        console.log("User does not exist, creating user");
        user_repo.add_user_to_playlist(playlist, userid_service.get_user_id(req));
    }
}

var get_user_votes = function(playlist_id, req) {
    return user_repo.get_user_votes(playlist_id, userid_service.get_user_id(req));
}

var vote_used = function(playlist_id, req) {
    return user_repo.vote_used(playlist_id, userid_service.get_user_id(req));
}

module.exports.create_user_if_not_exist = create_user_if_not_exist;
module.exports.get_user_votes = get_user_votes;
module.exports.vote_used = vote_used;