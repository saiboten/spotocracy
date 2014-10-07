/**
 * Created by Tobias on 21.09.2014.
 */
var get_user_id = function(req) {
    return req.session.username;
    //console.log("Getting user id");
    //var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //console.log("User ID aka IP is: ", ip);
    //return ip;
}

var set_user_id = function(req) {
    var username = req.params.username;
    console.log("Selected username: ", username);
    req.session.username = username;
    return {success: true, error: undefined};
}

var user_exists = function(req) {
    return get_user_id(req) != undefined;
}

module.exports.get_user_id = get_user_id;
module.exports.set_user_id = set_user_id;
module.exports.user_exists = user_exists;
