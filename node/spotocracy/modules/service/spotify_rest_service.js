/**
 * Created by Tobias on 21.09.2014.
 */
var Song = require("../model/song");

var uri_to_song = function(uri) {
    //artist, name, album, uri
    return new Song("Beatles", "Yellow Submarine", "Revolver", "spotify:track:3GfOAdcoc3X5GPiiXmpBjK");
}

module.exports.uri_to_song = uri_to_song;