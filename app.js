"use strict";

$(handler);
$(function() {
	window.app = new MyApp();
	window.app.start();
});

function MyApp() {
	var version = "v1.0";

	function setStatus (message) {
		$("#app>footer").text(message);
	}

	this.start = function() {
		$("#app>header").append(version);
		setStatus("ready");
	};
}