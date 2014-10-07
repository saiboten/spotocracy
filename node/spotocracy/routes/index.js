var express = require('express');
var router = express.Router();
var playlist_service = require("../modules/service/playlist_service");
var track_service = require("../modules/service/track_service");
var user_service = require("../modules/service/user_service");
var userid_service = require("../modules/service/userid_service");
var point_booster = require("../modules/service/point_booster");
var async = require("async");

router.get('/', function(req, res) {
  res.render('index', { title: 'Velg playlist' });
});

router.get('/get_current_songs/:playlist/:page', function(req, res) {
    playlist_service.get_current_songs(req.params.playlist.toLowerCase(), req, req.params.page, function(data) {
        data.username = userid_service.get_user_id(req);
        res.json(data);
    });
});

router.get('/p/:playlist', function(req, res) {
    console.log("index.js:: /p/playlist");

   var exists = userid_service.user_exists(req);
        if(exists) {
            user_service.create_user_if_not_exist(req, function () {
                playlist_service.create_playlist_if_not_exist(req.params.playlist.toLowerCase(), req, function() {
                    playlist_service.add_user_to_playlist_if_not_exist(req.params.playlist.toLowerCase(), req);
                    user_service.add_playlist_to_user_if_not_exist(req.params.playlist.toLowerCase(), req);
                    res.render('playlist', { playlist: req.params.playlist.toLowerCase()});
                });
            });
        }
        else {
            res.render('usernameselect');
        }
});

router.post('/p/username/:username', function(req, res) {
    console.log("index.js:: /p/playlist");
    res.json(userid_service.set_user_id(req));
});

router.post('/boost/:playlist/:uri', function(req, res){
    point_booster.boost_score(req.params.playlist.toLowerCase(), req.params.uri, req, function(success) {
        if(success) {
            return res.json({
                success: "true"
            });
        }
        else {
            res.json({
                alreadyvoted: "true"
            });
        }
    });
});

router.get('/add/:playlist/:uri', function(req, res){
    track_service.add_track_to_playlist(req.params.playlist.toLowerCase(), req.params.uri, function(success) {
        res.json({
            success: success
        });
    });

});

router.get('/get_song/:playlist', function(req, res){
    playlist_service.get_next_song_from_playlist(req.params.playlist.toLowerCase(), function(next_song)  {
        res.json({nextSong: next_song});
    })
});

router.get('/playlists', function(req, res){
    playlist_service.get_playlists(function(playlists) {
        res.json({
            "playlists":playlists
        });
    })
});

module.exports = router;