<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en" ng-app="rootApp">
<head>
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

<script src="static/angular.min.js" type="text/javascript"></script>
<script src="static/angular-route.min.js"
	type="text/javascript"></script>

<script
	src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.11.0.js"></script>
<link
	href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"
	rel="stylesheet">



<script src="static/controllers.js" type="text/javascript"></script>

<script type="text/javascript">
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Spotocracy</title>
</head>
<body>
	<div class="jumbotron">
		<div ng-controller="RootController" class="container">

	<h2>Velg playlist</h2>
	<div class="well well-lg">Skriv inn navn på playlisten du vil bruke, og klikke "GO!"</div> 

<form ng-submit="clicked()" role="form">
  <div class="form-group">
    <input type="text" class="form-control ng-pristine ng-valid" ng-model="url" id="exampleInputEmail1" autocomplete="off" typeahead="playlist for playlist in getPlaylist($viewValue) | filter:$viewValue | limitTo:8" placeholder="Velg playlist">
  </div>

  <button type="submit" class="btn btn-default">GO!</button>
</form>


		</div>

	</div>
	<div class="container">
		<footer>
			<p>&copy; Tobias Rusås Olsen 2014</p>
		</footer>
		
	</div>




</body>
</html>