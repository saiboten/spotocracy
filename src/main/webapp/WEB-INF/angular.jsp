<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en" ng-app="testApp">
<head>
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

<script src="/spotocracy/static/angular.min.js" type="text/javascript"></script>
<script src="/spotocracy/static/angular-route.min.js"
	type="text/javascript"></script>

<script
	src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.11.0.js"></script>
<link
	href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"
	rel="stylesheet">



<script src="/spotocracy/static/controllers.js"></script>
<script type="text/javascript">
	Spotocracy = {};
	Spotocracy.playlist = '${playlist}';
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Spotocracy!</title>
</head>
<body>
	<div class="jumbotron">
		<div ng-controller="MenuController" class="container">
		
			<ul class="nav nav-pills">
			  	<li ng-class="getClass('/playlist')"><a  href="#/playlist">Spilleliste</a></li>
			   	<li ng-class="getClass('/search')"><a  href="#/search">Søk</a></li>
			</ul>
			
			<div class="page-header">
				<h2>Spillelistenavn: ${playlist}</h2>

				
				
			</div>

			<div ng-view></div>
			
			
			<button class="btn btn-default" ng-click="isCollapsed = !isCollapsed">Hvordan fungerer dette?</button>
				
			<div collapse="isCollapsed">		
				<div class="well well-lg">Spotocracy er demokratisk spotify. Avspiller pc-en kobler opp Spotify-desktop-appen, og kobler appen opp mot denne spillelisten. Deretter kan brukerne gå til denne nettsiden for å legge til låter. Spotify vil spille av sangen på toppen av spillelisten når den har spilt ferdig en låt. Brukere får 5 stemmer hver halvtime.</div> 
			</div>

		</div>

	</div>
	<div class="container">
	
		

		<footer>
			<p>&copy; Tobias Rusås Olsen 2014</p>
		</footer>
		<em>Del denne lenken til andre som vil bruke spotocracy på denne spillelisten: <a href="http://109.189.175.149/spotocracy/get/${playlist}?angular=true">http://109.189.175.149/spotocracy/get/${playlist}?angular=true</a></em>
	</div>




</body>
</html>