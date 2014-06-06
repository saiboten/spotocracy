<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Spotocracy</title>
<style>
html {
	font-size: 2.2em;
	background: #CCFFFF repeat fixed center;
	background-size: 100%;
	font-family: "Verdana";
}

h2 {
	margin: 50px 0 30px 0;
}

#left {
	text-align:left;
}

#image {
	height: 25px;
}
</style>

<link rel="stylesheet"
	href="/spotocracy/static/jquery.mobile-1.1.0/jquery.mobile-1.1.0.css" />

<script src="/spotocracy/static/jquery.mobile-1.1.0/demos/js/jquery.js"></script>
<script src="/spotocracy/static/jquery.mobile-1.1.0/demos/docs/_assets/js/jqm-docs.js"></script>
<script src="/spotocracy/static/jquery.mobile-1.1.0/jquery.mobile-1.1.0.js"></script>
<script src="http://code.jquery.com/jquery.min.js" type="text/javascript"></script>
<script src="/spotocracy/static/script.js" type="text/javascript"></script>
<script src="http://code.jquery.com/ui/1.8.21/jquery-ui.min.js" type="text/javascript"></script>

<script type="text/javascript">
	var playlist = '${playlist}';
</script>

</head>
<body>

	<div data-role="page" class="type-interior">
		<div data-role="content">
			<div class="content-primary">
				<ul class="songs" data-role="listview">
				
				</ul>
			</div>
		</div>
		<!-- /content -->
		
		<div id="feedback"></div>
		
		<h3 id="searchResultText">Søkeresultat</h3>
		<ul id="searchResult" data-role="listview"> </ul>
		
		<h3>Søk etter låt</h3>
		<input type="text" id="trackname" class="inputField" /><br /><input type="button" class="inputButton" id="tracksubmit" value="Søk etter låtnavn" />
		
	</div>
</body>
</html>
