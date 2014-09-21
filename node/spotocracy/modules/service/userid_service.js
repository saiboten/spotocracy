/**
 * Created by Tobias on 21.09.2014.
 */
var get_user_id = function(req) {
    console.log("Getting user id");
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("User ID aka IP is: ", ip);
    return ip;
}

module.exports.get_user_id = get_user_id;