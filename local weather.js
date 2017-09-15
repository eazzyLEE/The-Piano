<!DOCTYPE html>
<html>

<title>Local Weather</title>
<head>

	
</head>
<body>
	<script>
var x = document.getElementById("demo");
function getLocation() {
	if (navigator.geolocation) {
		navigator.getLocation.getCurrentPosition(showPosition);
	} else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {
	x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}
</script>
</body>