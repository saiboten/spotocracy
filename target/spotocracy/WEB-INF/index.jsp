<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta charset="utf-8">
<title>Spotocracy</title>
<link rel="stylesheet" href="http://code.jquery.com/ui/1.8.21/themes/base/jquery-ui.css" type="text/css" media="all" />

<style type="text/css" title="currentStyle" media="screen">
	@import "static/style.css";
</style>

<script type="text/javascript" src="static/jquery-1.7.1.min.js"></script>

<script src="http://code.jquery.com/ui/1.8.21/jquery-ui.min.js" type="text/javascript"></script>
<script src="static/script.js" type="text/javascript"></script>

<script type="text/javascript">
	var playlist = '${playlist}';
</script>

</head>
<body>
	<div id="wrapper">
	<div id="header">
		<div id="logo">
			<h1><a href="#">Spotocracy</a></h1>
		</div>
		<div id="slogan">
			<h2 id="slogantitle">Spotocracy - Spotify den demokratiske måten</h2>
		</div>
	</div>
	<div id="page">
		<div id="content">
			<div class="box" id="content-box1">
				<h3>Stem på låt</h3>
				<ul class="list songs">
					
				</ul>
			</div>
			<div class="box" id="content-box1">
				<p id="feedback"></p>
				<h3 id="searchResultText">Søkeresultat</h3>
				<ul id="searchResult">

				</ul>
			</div>
			<br class="clearfix" />
		</div>
		<div id="sidebar">
		<div class="box" id="sidebarbox">
			<h3>Søk etter låt</h3>
			<input type="text" id="trackname" class="inputField" /><br /><input type="button" class="inputButton" id="tracksubmit" value="Søk etter låtnavn" />
		</div>
	</div>
		<br class="clearfix" />
	</div>
	
	<div id="page-bottom">
		<div id="page-bottom-content">
			<h3>Om Spotocracy</h3>
			<p>
				Spotocracy er laget av Tobias Rusås Olsen. Fungerer egentlig bare på min maskin, inntil videre.
			</p>
			
			<div id="dialog-modal" title="">
				<p><img src="static/images/ajax-loader.gif" /></p>
			</div>
			
		</div>
		<br class="clearfix" />
	</div>
</div>
<div id="footer">
	Copyright (c) 2012 saiboten.com. All rights reserved. Design by <a href="http://www.freecsstemplates.org">FCT</a>. Photos by <a href="http://fotogrph.com/">Fotogrph</a>.
</div>
</body>
</html>
