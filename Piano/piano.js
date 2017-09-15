function PianoApp() {
	var version = "6.3",
	audioManager = new AudioManager("audio");

	function setStatus(message){
		$("#app>footer").text(message);
	}
	
	this.start = function loadAudio() {
				var count = 0,
				loaded = 0,
				error = false;

				$(".keyboard .piano-key").each(function() {
					count++;
					var noteName = escape($(this).data("note"));
					audioManager.getAudio(noteName,
						function() {
							if(error) return;
							if (++loaded == count) setStatus("Ready.");
							else setStatus("Loading " + Math.floor(100 * loaded/count) + "%");
						},
						function (audio) {
							error = true;
							setStatus("Error loading: " + audio.src);
						}
					);
				});
			}
		function initKeyboard() {
			//select all of the piano-key elements on the keyboard//
			var $keys = $(".keyboard .piano-key");
			/*Check if touch elements are supported by browser
				if touch elements are supported by browser, 
				hook touch event handlers to piano keys,
				else hook up mouse event handlers*/
			if ($.isTouchSupported) {
				$keys.touchstart(function (e) {
					e.stopPropagation();
					e.preventDefault();
					keyDown($(this));
				})
				.touchend(function() { keyUp($(this)); })
			}
			else {
				$keys.mousedown(function() {
					keyDown($(this));
					return false;
				})
				.mouseup(function() { keyUp($(this)); })
				.mouseleave(function() { keyUp($(this)); });
			}
		}
		function keyDown($key) {
			/*check if key is pressed down by checking if it has class of 'down',
			if not, we add a class of 'down'.*/
			if(!$key.hasClass("down")) {
				$key.addClass("down");
				//get the key note from the data-note custom attribute,
				//and then pass it to the audioManager.getAudio method
				//to get the <audio> element
				var noteName = $key.data("note");
				var audio = audioManager.getAudio(escape(noteName));
				audio.currentTime = 0;
				audio.volume = volume;
				//call the API's play() method to start playing
				audio.play();
			}
		}
		function keyUp($key) {
			$key.removeClass("down");
			if(!sustain) {
				var noteName = $key.data("note");
				var audio = audioManager.getAudio(escape(noteName));
				audio.pause();
			}
		}
		function isInputTypeSupported(type) {
			var $test = $("<input>");
			//Set input element to the type we're testing for
			$test.attr("type", type);
			return ($test[0].type == type);
		}

		if(!isInputTypeSupported("range")) $("volume").css("width", "3em");

	function setStatus(message){
			$("#app>footer").text(message);
		}
	sustain = true;
	volume = 1.0;

	$("#sustain").change(function() { sustain = $(this).is(":checked");
	});

	$("#volume").change(function() {
		volume = parseInt($(this).val()) / 100;
	});
		$("#app>header").append(version);
		setStatus("ready");
	};


$(function() {
	window.app = new PianoApp();
	window.app.start();
});





