var express = require('express');
var router = express.Router();
var playlist_service = require("../modules/service/playlist_service");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Velg playlist' });
});

router.get('/get_current_songs/:playlist', function(req, res) {
    var songs = playlist_service.get_songs_from_playlist(req.params.playlist);
    res.json({
        songs: songs
    });
});

router.get('/p/:playlist', function(req, res){
    playlist_service.create_playlist_if_not_exist(req.params.playlist);
    res.render('playlist', { playlist: req.params.playlist });
});

router.post('/boost/:playlist/:uri', function(req, res){
    res.json({
        songs: [{
            uri: "uri",
            artist: "Artist",
            song: "Song",
            score: 2
        }]
    });
});

router.get('/add/:playlist/:uri', function(req, res){
    var success = playlist_service.add_track_to_playlist(req.params.playlist, req.params.uri);
    res.json({
        success: success
    });
});

router.get('/get_song/:playlist', function(req, res){
    res.json({
        nextSong: playlist_service.get_next_song_from_playlist(req.params.playlist)
    });
});

router.get('/playlists', function(req, res){
    res.json({
        "playlists": playlist_service.get_playlists()
    });
});

module.exports = router;