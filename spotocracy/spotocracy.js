var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;

exports.init = init;

var playDuration = 0;

$('#play').click( function() {
	playOrPause();
});

function playOrPause() {
	player.playing = !(player.playing);
	if (player.playing == true) {
		$('#play').attr('value','Pause');
	} else {
		$('#play').attr('value','Play');
	}
}

function play_song(data) {
	console.log(data.nextSong);
	player.playTrack(data.nextSong);
	player.playing = true;
}

function add_playlist(event) {
	var playListUrl= $('#playlistAdd').val();
	var playlist = $('#playlist').val();
	console.log("playlistUrl: ", playListUrl);

	var collection = models.Playlist.fromURI(playListUrl);
	console.log("Collection: ", collection.tracks);
	
	var justUris = collection.tracks.map(function(elem) {
		return elem.data.uri;
	});
	
	var postUrl = 'http://localhost:80/spotocracy/addSongs/' + playlist;
	
	console.log("Post url: ", playlist);
	console.log("Post url: ", postUrl);
	
	jQuery.ajax({
		'type': 'POST',
		headers: { 
			Accept : "application/json; charset=utf-8",
		},
		contentType : 'application/json',
		'url': postUrl,
		'data': JSON.stringify(justUris),
		'dataType': 'json',
		'success': function(data) {
			console.log(data);
		}
	});
}

function perform_ajax_call() {
	player.playing = false;
	playlist = $('#playlist').val();
	
	if(playlist == undefined) {
		console.log("No playlist defined. Ignoring.");
		return;
	}
	
    var xhr = new XMLHttpRequest();
	console.log("xhr object created. Playlist value: " + playlist);
	var request = 'http://localhost:80/spotocracy/getSong/' + playlist;
	
	xhr.open('GET', request);

	console.log("xhr open");
	
	xhr.onreadystatechange = function () {
		if (xhr.readyState != 4) return;
		var data = JSON.parse(xhr.responseText);
		console.log("data: ", data);
		play_song(data);
	}
	console.log("sending request");
	xhr.send(null);
}

function init() {

	setInterval(function() { 		
		playDuration = playDuration+1; 
	},1000);
	
	updatePageWithTrackDetails();
	
	$('#playlist').keyup(function(data) {
		$('#playlisturl').html('Playlist url: <a href="http://80.202.102.44/spotocracy/' + $('#playlist').val() + '">http://80.202.102.44/spotocracy/' + $('#playlist').val() + '</a>');
	});
	
	$('#addPlaylistButton').click(function() {
		add_playlist();
	});
	
	player.observe(models.EVENT.CHANGE, function (e) {
		// Only update the page if the track changed
		if (e.data.curtrack == true) {
			updatePageWithTrackDetails();
			console.log("Changed track. playDurationValue: " + playDuration);
			if(playDuration > 5) {
				console.log("Time to get new track! Playduration is " + playDuration + ". Resetting playduration.");
				perform_ajax_call();
				playDuration = 0;
			}
		}
	});
}

function updatePageWithTrackDetails() {
	// This will be null if nothing is playing.
	var playerTrackInfo = player.track;

	if (playerTrackInfo == null) {
		$('#header').html('Nothing playing!');
	} else {
		var track = playerTrackInfo.data;
		$('#header').html(track.name + " på platen " + track.album.name + " av " + track.album.artist.name + ".");
	}
}