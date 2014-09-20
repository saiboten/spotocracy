var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Velg playlist' });
});

router.get('/get_current_songs/:playlist', function(req, res) {
    res.json({
        songs: [{
            uri: "uri",
            artist: "Artist",
            song: "Song",
            score: 2
        }],
        userVotes: 0,
        totalVotes: 0,
        playingSong: {
            uri: "blabla",
            artist: "Mister man",
            song: "Ei kjekke låt",
            score: 5
        }
    });
});

router.get('/p/:playlist', function(req, res){
    console.log("This is the selected playlist: " + req.params.playlist);
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
    res.json({
        success: true
    });
});

router.get('/getSong/:playlist', function(req, res){
    res.json({
        nextSong: "spotify:track:5CeL9C3bsoe4yzYS1Qz8cw"
    });
});

router.get('/playlists', function(req, res){

    res.json({
        playlists: ["hardcoded","test"]
    });
});

module.exports = router;