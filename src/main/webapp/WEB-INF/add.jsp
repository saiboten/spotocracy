<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Legg til l�t</title>
<script src="http://code.jquery.com/jquery.min.js" type="text/javascript"></script>

<script type="text/javascript">
$(document).ready( function() {
	$('#submit').click(function() {
		var trackid = $('#trackid').val();
		$.post('add/' + trackid, function(data) {
			
			$('#feedback').fadeIn(1000);
			if(data.success) {
				$('#feedback').append('<p id="fadeout">Hurra! L�t lagt til</p>').fadeOut(5000);
			}
			else {
				$('#feedback').html('<p id="fadeout">Huffda, noe gikk galt. Pr�v igjen!</p>').fadeOut(5000);
			}
		});
	});
});
</script>

</head>
<body>
<h1>Legg til l�t</h1>
<input type="text" id="trackid" /><br />
<input type="button" id="submit" value="Legg til l�t" />
<div id="feedback"></div>
<p><a href="/spotifyapp">Tilbake til forsiden</a></p>
</body>
</html>