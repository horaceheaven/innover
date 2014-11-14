/*global $:false */

jQuery(document).ready(function($){'use strict';

	$('#menu-item').smoothScroll({
		speed: 400,
	});

	$('#learnmore').smoothScroll({
		speed: 400,
	});

	var stickyNavTop = $('#masthead').offset().top;

   	var stickyNav = function(){
	    var scrollTop = $(window).scrollTop();

	    if (scrollTop > stickyNavTop) {
	        $('#masthead').addClass('sticky');
	    } else {
	        $('#masthead').removeClass('sticky');
	    }
	};

	stickyNav();

	$(window).scroll(function() {
		stickyNav();
	});
});
