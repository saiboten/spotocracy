/**
 * Created by Tobias on 21.09.2014.
 */
var User = function(user_id) {
    this.user_id = user_id;
    this.playlists = [];
}

module.exports = User;