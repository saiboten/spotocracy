
var phonecatApp = angular.module('testApp', ['ui.bootstrap', 'ngRoute']);

phonecatApp.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
    when('/search', {
      templateUrl: '../static/partials/search.html',
      controller: 'SearchController'
    }).
    when('/playlist', {
      templateUrl: '../static/partials/playlist.html',
      controller: 'PlaylistController'
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
	$scope.addTrackUrl = '/spotocracy/add/'
	$scope.playlist = Spotocracy.playlist;
	
	$scope.delayedClearStatus = function() {
		$timeout(function() {
			$scope.status = "";
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
		    		$scope.status = "Låt ble ikke lagt til?";
		    	}
		    }).
		    error(function(data, status) {
		    	$scope.status = "Noe gikk fryktelig galt:" + status;
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
		  $http({method: $scope.method, url: $scope.theUrl + $scope.searchKeyword, cache: false}).
		    success(function(data, status) {
		      $scope.tracks = data.tracks;
		      $scope.error = undefined;
		    }).
		    error(function(data, status) {
		      $scope.data = data || "Request failed";
		      $scope.error = status;
		  });
	  }
	};
});
/**
 * Playlist Controller!
 */
phonecatApp.controller('PlaylistController', function ($scope, $http, $interval, $timeout) {
	
	$scope.method = 'GET';
	$scope.getSongsUri = '/spotocracy/get_current_songs/'
		
	$scope.boostMethod = 'POST';
	$scope.boostTrackUri = '/spotocracy/boost/'
	$scope.playlist = Spotocracy.playlist;
	$scope.totalVotes = 0;
	
	$scope.delayedClearStatus = function() {
		$timeout(function() {
			$scope.result = "";
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
			    	$scope.currentSong = data.playingSong.song;
		    	}
		    	
		    	$scope.totalVotes = data.totalVotes;
		    	
		    	console.log("User votes: ", $scope.userVotes);
		    }).
		    error(function(data, status) {
		    	$scope.status = "Noe gikk fryktelig galt:" + status;
		    	$scope.delayedClearStatus();
		  });	
	}
	
	$scope.boostTrack = function(track, artist, song) {
		console.log("Lets boost this track: ", track);
		
		var fullUri = $scope.boostTrackUri + $scope.playlist + "/" + track;
		
		 $http({method: $scope.boostMethod, url: fullUri, cache: false}).
		    success(function(data, status) {
		    	if(status == 200) {
		    		if(data.alreadyvoted) {
		    			$scope.result = "Du har brukt opp stemmene dine.";
		    		}
		    		else {
		    			$scope.result = "Stemme gitt til " + artist + " - " + song;		    			
		    		}
		    		
		    		$scope.getSong();
		    	}
		    	else {
		    		$scope.result = "Noe gikk galt :(!";
		    	}
		    	
		    }).
		    error(function(data, status) {
		    	$scope.result = "Noe gikk fryktelig galt:" + status;
		  });
		 
		 $scope.delayedClearStatus();
	}
	
		$scope.getSong();
		$interval($scope.getSong, 5000);
	
});

/**
 * Playlist Controller!
 */
phonecatApp.controller('MenuController', function ($scope, $location) {
	
	$scope.isCollapsed = true;
	
	$scope.getClass = function(path) {
		console.log("GET CLASS HAS BEEN CALLED! PATH: ", path)
	    if ($location.path().substr(0, path.length) == path) {
	      return "active"
	    } 
	    else {
	      return ""
	    }
	}
	
	
});
	