/**
 * Created by Tobias on 21.09.2014.
 */
var Song = function(artist, name, album, uri) {
    this.artist = artist;
    this.name = name;
    this.album = album;
    this.uri = uri;
    this.score = 0;
}

module.exports = Song;