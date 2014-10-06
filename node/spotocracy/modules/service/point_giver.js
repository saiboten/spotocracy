/**
 * Created by Tobias on 21.09.2014.
 */
var user_service = require("./user_service");
var websocket = require("../websocket/socket");

var give_votes_to_everything = function() {
    console.log("Time to give votes!");
    user_service.get_all_users(function(users) {
        console.log("Users: ", users);
        users.forEach(function(user) {
            user.playlists.forEach(function(userplaylist) {
                userplaylist.votes++;
                user_service.update_user(user);
                websocket.time_to_update();
            });
        })
    });
}

var init = function() {
    console.log("Initiated point giving");
    setInterval(give_votes_to_everything, 300000);
    //setInterval(give_votes_to_everything, 30000);
}

module.exports.init = init;
