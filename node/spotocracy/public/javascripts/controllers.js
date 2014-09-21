
var phonecatApp = angular.module('testApp', ['ui.bootstrap', 'ngRoute']);

phonecatApp.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
    when('/search', {
      templateUrl: '../partials/search.html',
      controller: 'SearchController'
    }).
    when('/playlist', {
      templateUrl: '../partials/playlist.html',
      controller: 'PlaylistController'
    }).
    when('/about', {
        templateUrl: '../partials/about.html',
        controller: 'AboutController'
      }).
    otherwise({
      redirectTo: '/playlist'
    });
}]);


/**
 * Playlist Controller!
 */
phonecatApp.controller('SearchController', function ($scope, $http, $timeout) {
	
	$scope.method = 'GET';
	$scope.theUrl = 'http://ws.spotify.com/search/1/track.json?q=';
	$scope.addTrackUrl = '/add/'
	$scope.playlist = Spotocracy.playlist;
	
	$scope.delayedClearStatus = function() {
		$timeout(function() {
			$scope.status = "";
			$scope.error = "";
		},5000)
	}
	
	$scope.addTrack = function(track) {
		
		var fullUrl = $scope.addTrackUrl + $scope.playlist + "/" + track;
		console.log("Full url:", fullUrl);
		
		 $http({method: $scope.method, url: fullUrl , cache: false}).
		    success(function(data, status) {
		    	if(status == 200) {
		    		console.log("data", data);
		    		 $scope.status = "Låt lagt til!";
		    		 $scope.tracks = undefined;
		    	}
		    	else {
		    		$scope.error = "Låt ble ikke lagt til?";
		    	}
		    }).
		    error(function(data, status) {
		    	$scope.error = "Noe gikk fryktelig galt:" + status;
		  });
		 
		 $scope.delayedClearStatus();
		
	}
	
	$scope.searchSpotify = function() {
		console.log("Which playlist? ", $scope.playlist);
		
	  $scope.code = null;
	  $scope.response = null;
	  
	  if(!$scope.searchKeyword) {
		  $scope.error = "Du må skrive inn et søkeord";
	  }
	  else {
          $scope.status = "Søker ...";
		  $http({method: $scope.method, url: $scope.theUrl + $scope.searchKeyword, cache: false}).
		    success(function(data, status) {
		      $scope.tracks = data.tracks;
		      $scope.error = undefined;
              $scope.status = "";

              if(data.tracks.length == 0) {
                  $scope.status = "Fant ingen låter som passet";
              }
		    }).
		    error(function(data, status) {
		      $scope.data = data || "Request failed";
		      $scope.error = status;
              $scope.status = "";
		  });
	  }
	};
});
/**
 * Playlist Controller!
 */
phonecatApp.controller('PlaylistController', function ($scope, $http, $interval, $timeout) {
	
	$scope.method = 'GET';
	$scope.getSongsUri = '/get_current_songs/'
		
	$scope.boostMethod = 'POST';
	$scope.boostTrackUri = '/boost/'
	$scope.playlist = Spotocracy.playlist;
	$scope.totalVotes = 0;
	$scope.selectedSong = undefined;
	
	$scope.delayedClearStatus = function() {
		$timeout(function() {
			$scope.result = "";
			$scope.error = "";
		},5000)
	}
	
	$scope.getSong = function() {
		console.log("Lets get song!");
		 $http({method: $scope.method, url: $scope.getSongsUri + $scope.playlist , cache: false}).
		    success(function(data, status) {
		    	console.log("data", data);
		    	$scope.userVotes = data.userVotes;
		    	$scope.songs = data.songs;
		    	if(data.playingSong)  {
		    		$scope.currentArtist = data.playingSong.artist;
			    	$scope.currentSong = data.playingSong.name;
		    	}
		    	
		    	$scope.totalVotes = data.totalVotes;
		    	
		    	console.log("User votes: ", $scope.userVotes);
		    }).
		    error(function(data, status) {
		    	$scope.error = "Noe gikk fryktelig galt:" + status;
		    	$scope.delayedClearStatus();
		  });	
	}
	
	$scope.boostTrack = function(song) {
		console.log("Lets boost this track: ", song);
		$scope.selectedSong = song;
		var fullUri = $scope.boostTrackUri + $scope.playlist + "/" + song.uri;
		
		 $http({method: $scope.boostMethod, url: fullUri, cache: false}).
		    success(function(data, status) {
		    	if(status == 200) {
		    		if(data.alreadyvoted) {
		    			$scope.error = "Du har brukt opp stemmene dine.";
		    		}
		    		else {
		    			$scope.result = "";		    			
		    		}
		    		
		    		$scope.getSong();
		    	}
		    	else {
		    		$scope.error = "Noe gikk galt :(!";
		    	}
		    	
		    }).
		    error(function(data, status) {
		    	$scope.error = "Noe gikk fryktelig galt:" + status;
		  });
		 
		 $scope.delayedClearStatus();
	}

    var sock = new SockJS('/socket');
    sock.onmessage = function(e) {
        console.log("Received message: ", e)
        if(e.data === "Update") {
            $scope.getSong();
        }
    };

    $scope.getSong();
});

/**
 * Playlist Controller!
 */
phonecatApp.controller('MenuController', function ($scope, $location) {
	
	$scope.isCollapsed = true;
	
	$scope.getClass = function(path) {
	    if ($location.path().substr(0, path.length) == path) {
	      return "active"
	    } 
	    else {
	      return ""
	    }
	}
	
	
});

/**
 * Playlist Controller!
 */
phonecatApp.controller('AboutController', function ($scope, $location) {
	
	$scope.oneAtATime = false;

	  $scope.groups = [
	    {
	      title: 'Hvordan får jeg poeng?',
	      content: 'Du får automatisk 5 poeng hver halvtime.'
	    },
	    {
	      title: 'Hvordan stemmer jeg på en låt?',
	      content: 'Enkelt! Bare klikk på den.'
	    },
	    {
	      title: 'Hvordan legger jeg til en låt?',
	      content: 'Gå på søk, skriv inn det du søker etter i søkefeltet, og klikk på sangen på resultatsiden.'
	    },
	    {
	      title: 'Kan man ta utgangspunkt i en eksisterende spotify-playlist for å populere spillelisten?',
	      content: 'Detter kommer. Snart.'
	    },
	    {
	      title: 'Hvordan installerer jeg spotify-spotocracy-appen?',
	      content: 'Detaljert info om dette kommer kanskje. Dette er avansert. Det innebærer bl.a. å aktivere developer-mode, laste ned spotocracy-appen og plassere den på riktig sted. Deretter skrive en magisk kommando i spotify-desktop-klienten.'
	    },
	    {
	      title: 'Kan jeg ha flere spillelister?',
	      content: 'Ja, du kan ha så mange spillelister du vil. Spillelistenavnet bestemmes av adressen, f.eks spotocracy.com/p/dittspillelistenavn'
	    }
	  ];
});
	

phonecatApp.controller('RootController', function ($scope, $location, $http) {
	
	$http({method: "GET", url: "/playlists" , cache: false}).
	    success(function(data, status) {
	    	console.log("Data:", data);
	    	$scope.playlists = data.playlists;
	    }).
	    error(function(data, status) {
	    	console.log("Error:", data);
	  });	
	
	
	$scope.getPlaylist = function(view) {
		return $scope.playlists.filter(function(playlist) {
			var re = new RegExp(view, 'gi');
			return playlist.match(re);
		});
	}
	
	$scope.clicked = function() {
		console.log("Changing url to ", $scope.url);
		window.location = '/p/' + $scope.url;
	}
});