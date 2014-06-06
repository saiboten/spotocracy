
function addSong(trackid) {
	$.post('/spotocracy/add/' + playlist + "/" + trackid, function(data) {
		$('#feedback').show();
		$('#searchResultText').hide();
		if(data.success) {
			$('#feedback').html('<p>Låt lagt til i spillelisten!</p>').fadeOut(5000);
			$('#trackid').val('');
		}
		else {
			$('#feedback').html('<p>Huffda, noe gikk galt. Prøv igjen!</p>').fadeOut(5000);
		}
	});
}

$(document).ready(function() {
	$("#dialog-modal").hide();
	getCurrentSongs();
	setInterval("updateSongsAjax()",10000);
	$('#searchResultText').hide();

	$("#trackname").keyup(function(event){
	    if(event.keyCode == 13){
	        $("#tracksubmit").click();
	    }
	});

	$('#tracksubmit').click(function() {
		
		$("#dialog-modal").dialog({
			width: 150,
			height: 150
		});
		
	    $.getJSON('http://ws.spotify.com/search/1/track.json?q=' + $('#trackname').val(), function(data) {
	    	$("#dialog-modal").dialog("close");
	    	$('#searchResult').empty();
	    	$('#searchResultText').show();
	        $.each(data.tracks, function(index,track) {
	            $('#searchResult').append("<li class='trackSearchResult' id='add-" + track.href + "'>" + track.artists[0].name + " - " + track.name + "</li>");
	            
	            // Mouseover effect for hovering result list
	        	$('.trackSearchResult').mouseover(function(data) {
	        		$(this).css('cursor','pointer');
	        		$(this).css('background-color','#7E7E7E');
	        		$(this).css('color','white');
	        	});
	        	
	        	$('.trackSearchResult').mouseleave(function(data) {
	        		$(this).css('cursor','default');
	        		$(this).css('background-color','white');
	        		$(this).css('color','#5C5B5B');
	        	});
	            
	        });
	        
            $('.trackSearchResult').click(function() {
    	    	var song_to_add = $(this).attr('id');
    	    	song_to_add = song_to_add.replace("add-","");
    	    	addSong(song_to_add);
    	    	$('#searchResult').empty();
    	    });
	        
	        $('li').addClass('ui-li ui-li-static ui-body-c');
	    });
	});
	
});
 
var uri_finished = '';

function appendHandlers() {
	
	// Click causes post-boost call to server side
	$('.song').click(function(data) {
		$.post("/spotocracy/boost/" + playlist + "/" + $(this).attr('id'), function(data) {
			if(data.alreadyvoted == "true") {
				$('#feedback').show();
				$('#feedback').html('<p id="fadeout">Du er tom for stemmer!').fadeOut(5000);
			}
			else {
				updateSongs(data.songs);
			}
		});	
	});
	
	// Mouseover effect for hovering songs
	$('.song').mouseover(function(data) {
		$(this).css('cursor','pointer');
		$(this).css('background-color','#7E7E7E');
		$(this).css('color','white');
	});
	
	$('.song').mouseleave(function(data) {
		$(this).css('cursor','default');
		$(this).css('background-color','white');
		$(this).css('color','#5C5B5B');
	});
	
}

function updateSongs(songs) {
	$('.songs').empty();
	$.each(songs, function(index,song) {
		$('.songs').append('<li id="' + song.uri + '" class="song"><span id="left">' + song.artist + ' - ' + song.song + ': ' + song.score + '</span></li>');
		$('li').addClass('ui-li ui-li-static ui-body-c');
		$('.song').off('click');
		appendHandlers();
	})
}

function getCurrentSongs() {
	$.get( '/spotocracy/get_current_songs/' + playlist, function(data) {
		
		if(data.playingSong != undefined) {
			$('#slogantitle').html("Spiller nå: " + data.playingSong.artist + " - " + data.playingSong.song );
		}
		
		$.each(data.songs, function(uri,song) {
			$('.songs').append('<li id="' + song.uri + '" class="song"><span id="left">' + song.artist + ' - ' + song.song + ': ' + song.score + '</span></li>');
			$('li').addClass('ui-li ui-li-static ui-body-c');
		})
		
		appendHandlers();
	});
}

function updateSongsAjax() {
	$.get( '/spotocracy/get_current_songs/' + playlist, function(data) {
		if(data.playingSong != undefined) {
			$('#slogantitle').html("Spiller nå: " + data.playingSong.artist + " - " + data.playingSong.song );
		}
		
		if(data.userVotes) {
			$('#availableVotes').html( data.userVotes );
		}
		
		updateSongs(data.songs);
	});
}