$(document).ready(function() {
	var wrapper_clone = $('#wrapper').clone();
	var min = 0;
	var sec = 0;
	var ready = false;

	disp_timer(min, sec);

// hovering
	$('.tea_button, #start').mouseenter(function() {
		if (!$(this).hasClass("highlight")) {
			$( this ).css({"opacity" : "0.5", "cursor" : "pointer"})
		}
	})
	$('.tea_button, #start').mouseleave(function() {
		$(this).css({"opacity" : "1", "cursor" : "default"})
	})

// click any tea button
	$('.tea_button').on("click", function() {
		$(this).css({"opacity" : "1"})
		$('.adjust').css({"color" : "white", "cursor" : "pointer"})
	})

// click black tea button
	$('#black').on("click", function() {
		$('.tea_button').removeClass("highlight")
		$(this).addClass("highlight")
		min = 4;
		sec = 30;
		disp_timer(min, sec);
		ready = true;
	})

//click white tea button
	$('#white').on("click", function() {
		$('.tea_button').removeClass("highlight")
		$(this).addClass("highlight")
		min = 2;
		sec = 0;

		disp_timer(min, sec);
		ready = true;
	})

// click green tea button
	$('#green').on("click", function() {
		$('.tea_button').removeClass("highlight")
		$(this).addClass("highlight")
		min = 3;
		sec = 0;
		disp_timer(min, sec);
		ready = true;
	})

// adjust time
	$('#min_plus').on("click", function() {
		if (ready) {
			if (min < 59) {
				min += 1;
			} else (min = 59)
			disp_timer(min, sec);
		}
	})
	$('#min_minus').on("click", function() {
		if (ready) {
			if (min > 0) {
				min -= 1;
			} else (min = 0)
			disp_timer(min, sec);
		}
	})
	$('#sec_plus').on("click", function() {
		if (ready) {
			if (sec === 55 && min < 59) {
				min += 1;
				sec = 0;
			}
			else if (sec < 59) {
				sec += 5;
			}
			else (sec = 59)
			disp_timer(min, sec);
		}
	})
	$('#sec_minus').on("click", function() {
		if (ready) {
			if (sec === 0 && min > 0) {
				min -= 1;
				sec = 55;
			}
			else if (sec > 1) {
				sec -= 5;
			} else (sec = 0)
			disp_timer(min, sec);
		}
	})

// click start button, start timer
	$('#start').one("click", function() {
		if (ready) {
			// initialize
			var start_time = new Date();
			var minsec = (min*60) + sec
			var add_time = seconds_to_milliseconds(minsec);
			var end_time = new Date(start_time.getTime() + add_time);
			finished = false;

			// adjust hover highlighting
			$(this).css("opacity", "1")
			$(this).addClass("highlight")
			$('.tea_button').off("click")
			$('.tea_button').mouseenter(function() {
				$(this).css({"opacity" : "1", "cursor" : "default"})
			})
			$('#stop').mouseenter(function() {
				$(this).css({"opacity" : "0.5", "cursor" : "pointer"})
			})
			$('#stop').mouseleave(function() {
				$(this).css({"opacity" : "1", "cursor" : "default"})
			})

			// hide time adjust buttons
			$('.adjust').css({"color" : "#57652A;", "cursor" : "default"})

			// disable tea_buttons
			$('.tea_buttons').off("click")

			// update timer display
			update_timer = function() {
				if (new Date() < end_time) {
      		var time_left = end_time.getTime() - new Date();
      		min = new Date(time_left).getMinutes();
      		sec = new Date(time_left).getSeconds();
					disp_timer(min, sec);
				}
			}
			// timer countdown
			run = function() {
				if (new Date() < end_time) {
					setInterval(update_timer, 200);
					$('#stop').on("click", function() {
						end_time = Date(0);
					})
				}
				else if (new Date() > end_time && finished === false) {
						alert("Your Tea is Done!")
						$('#stop').off("click")
						clearInterval(run)
						finished = true;
				}
			}
			// start timer countdown
			setInterval(run, 100);

			// click stop button
			$('#stop').on("click", function() {
				ready = false;
				$(this).mouseenter(function() {
					$(this).css({"opacity" : "1", "cursor" : "default"})
				})
				$(this).css("opacity", "1");
				$(this).addClass("highlight");
				disp_timer(min, sec);

				$('#refresh').mouseenter(function() {
					$(this).css({"opacity" : "0.5", "cursor" : "pointer"})
				})
				$('#refresh').mouseleave(function() {
					$(this).css({"opacity" : "1", "cursor" : "default"})
				})

				// click refresh button
				$('#refresh').on("click", function() {
					/* var min = 0;
					var sec = 0;
					disp_timer(min, sec);
					var ready = false;
					$('.tea_button').removeClass("highlight")
					$('.control').removeClass("highlight") */
					location.reload();
				})
			})
		} // end if
	}) // end start.click






}) // end doc.ready


// Helper functions to display work, rest, rep, timer numbers
disp_timer = function(min, sec) {
	min = minutes_to_milliseconds(min);
	sec = seconds_to_milliseconds(sec);
	$('#timer_count').empty();
	$('#timer_count').append(addZero(new Date(min).getMinutes()) + ":" + addZero(new Date(sec).getSeconds()));
}

// convert minutes to milliseconds
minutes_to_milliseconds = function(min) {
	var mms = min * 60 * 1000;
	return mms;
}
seconds_to_milliseconds = function(sec) {
	var sms = sec * 1000;
	return sms;
}

// add zeros for time display
addZero = function(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
