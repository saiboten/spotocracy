<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en" ng-app="testApp">
<head>
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

<script src="../static/angular.min.js" type="text/javascript"></script>
<script src="../static/angular-route.min.js"
	type="text/javascript"></script>

<script
	src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.11.0.js"></script>
<link
	href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"
	rel="stylesheet">

<script src="../static/controllers.js" type="text/javascript"></script>

<script type="text/javascript">
	Spotocracy = {};
	Spotocracy.playlist = '${playlist}';
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Spotocracy</title>
</head>
<body>
	<div class="jumbotron">
		<div ng-controller="MenuController" class="container">
		
			<ul class="nav nav-pills">
			  	<li ng-class="getClass('/playlist')"><a  href="#/playlist">Spilleliste</a></li>
			   	<li ng-class="getClass('/search')"><a  href="#/search">Søk</a></li>
			   	<li ng-class="getClass('/about')"><a  href="#/about">Om</a></li>
			</ul>
			
			<div class="page-header">
				<h2>Spillelistenavn: ${playlist}</h2>

				
				
			</div>

			<div ng-view></div>
			
			

		</div>

	</div>
	<div class="container">

		<footer>
			<p>&copy; Tobias Rusås Olsen 2014</p>
		</footer>
		<em>Del denne lenken til andre som vil bruke spotocracy på denne spillelisten: <a href="http://spotocracy.net/p/${playlist}">http://spotocracy.net/p/${playlist}</a></em>
	</div>




</body>
</html>