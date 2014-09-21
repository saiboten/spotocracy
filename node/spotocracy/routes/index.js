var express = require('express');
var router = express.Router();
var playlist_service = require("../modules/service/playlist_service");
var user_service = require("../modules/service/user_service");
var point_booster = require("../modules/service/point_booster");

router.get('/', function(req, res) {
  res.render('index', { title: 'Velg playlist' });
});

router.get('/get_current_songs/:playlist', function(req, res) {
    res.json(playlist_service.get_current_songs(req.params.playlist.toLowerCase(), req));
});

router.get('/p/:playlist', function(req, res){
    console.log("/p/playlist");
    playlist_service.create_playlist_if_not_exist(req.params.playlist.toLowerCase());
    user_service.create_user_if_not_exist(req.params.playlist.toLowerCase(), req);
    res.render('playlist', { playlist: req.params.playlist.toLowerCase() });
});

router.post('/boost/:playlist/:uri', function(req, res){
    var success = point_booster.boost_score(req.params.playlist.toLowerCase(), req.params.uri, req);

    if(success) {
        res.json({
            songs: playlist_service.get_songs_from_playlist(req.params.playlist.toLowerCase()),
            userVotes: user_service.get_user_votes(req.params.playlist.toLowerCase(), req),
            totalVotes: undefined,
            playingSong: undefined
        });
    }
    else {
        res.json({
            alreadyvoted: "true"
        });
    }
});

router.get('/add/:playlist/:uri', function(req, res){
    playlist_service.add_track_to_playlist(req.params.playlist.toLowerCase(), req.params.uri);
    res.json({
        success: true
    });
});

router.get('/get_song/:playlist', function(req, res){
    res.json({
        nextSong: playlist_service.get_next_song_from_playlist(req.params.playlist.toLowerCase())
    });
});

router.get('/playlists', function(req, res){
    res.json({
        "playlists": playlist_service.get_playlists()
    });
});

module.exports = router;