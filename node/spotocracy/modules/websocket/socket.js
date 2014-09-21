/**
 * Created by Tobias on 21.09.2014.
 */

var connections = []

var add_connection = function(connection) {
    connections.push(connection);
}

var time_to_update = function() {
    connections.forEach(function(connection) {
        console.log("OK, updating things for connection");
        connection.write("Update");
    })
}

module.exports.add_connection = add_connection;
module.exports.time_to_update = time_to_update;