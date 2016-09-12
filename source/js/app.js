/*jshint expr:true */

function debouncer(func, timeout) {
	var timeoutID;
	timeout = timeout || 200;
	return function() {
		var scope = this,
			args = arguments;
		clearTimeout(timeoutID);
		timeoutID = setTimeout(function() {
			func.apply(scope, Array.prototype.slice.call(args));
		}, timeout);
	};
}

function exist(o) {
	var d = ($(o).length > 0) ? true : false;
	return d;
}
jQuery(function($) {
	var L = {
		pp: function() {
			var pB_content = $('.section--przywileje-bursztyn .section__content'),
				pR_content = $('.section--przywileje-rubin .section__content'),
				pS_content = $('.section--przywileje-szmaragd .section__content'),
				pD_content = $('.section--przywileje-diament .section__content');
				program_content = $('.section--program .section__content'),
				nagrody_content = $('.section--nagrody .section__content'),
				nagrody1_content = $('.section--nagrody-1 .section__content'),
				nagrody2_content = $('.section--nagrody-2 .section__content'),
				nagrody3_content = $('.section--nagrody-3 .section__content'),
				sHome = $('.section--home'),
				mouse = $('.c-mouse'),
				mouse_txt1 = $('.c-mouse').attr('data-index1'),
				mouse_txt2 = $('.c-mouse').attr('data-index2'),
				sidebarAddons = $('.c-addons');

			$('#pagepiling').pagepiling({
				anchors: ['home', 'prolog', 'ambasadorki', 'zasady', 'przywileje-bursztyn', 'przywileje-rubin', 'przywileje-szmaragd', 'przywileje-diament', 'program', 'nagrody', 'nagrody-1', 'nagrody-2', 'nagrody-3', 'spotkania', 'rozwoj'],
			    menu: '#nav',
			    navigation: false,

			    
			    afterLoad: function(anchorLink, index) {

					if (index == 1) {
						mouse.fadeIn();
						$('p', mouse).text(mouse_txt1);
		            }

					if (index == 2) {
						mouse.fadeIn();
						$('p', mouse).text(mouse_txt2);
		            }

		            if (index == 5) { // przywileje bursztyn
		            	pB_content.removeClass('hide');
						sidebarAddons.attr('class', '').addClass('c-addons bursztyn');
		            }

					if (index == 6) {
						pR_content.removeClass('hide');
						$('#nav li').eq(2).addClass('active');
						sidebarAddons.attr('class', '').addClass('c-addons rubin');
		            }
		            
		            if (index == 7) {
						pS_content.removeClass('hide');
						$('#nav li').eq(2).addClass('active');
						sidebarAddons.attr('class', '').addClass('c-addons szmaragd');
		            }
		            
		            if (index == 8) {
						pD_content.removeClass('hide');
						$('#nav li').eq(2).addClass('active');
						sidebarAddons.attr('class', '').addClass('c-addons diament');
		            }
		            
					if (index == 9) {
						program_content.removeClass('hide');
		            }
		            
		            if (index == 10) {	// nagrody
						nagrody_content.removeClass('hide');
		            }
		            
		            if (index == 11) {	// nagrody1
		            	$('#nav li').eq(5).addClass('active');
						nagrody1_content.removeClass('hide');
		            }
		            
		            if (index == 12) {	// nagrody2
		            	$('#nav li').eq(5).addClass('active');
						nagrody2_content.removeClass('hide');
		            }
		            
		            if (index == 13) {	// nagrody3
		            	$('#nav li').eq(5).addClass('active');
						nagrody3_content.removeClass('hide');
						$('.section--nagrody-3-bg').fadeIn();
		            }
		            
		            
		            
					if ((index != 5) && (index != 6) && (index != 7) && (index != 8)) {
			            //sidebarAddons.attr('class', '').addClass('no-visible');
		            }
		            
		            if (index != 13) {
		            	$('.section--nagrody-3-bg').fadeOut();
		            }
		        },

		        onLeave: function(index, nextIndex, direction) {
		        	if ((index != 1) || (index != 2)) {
						mouse.fadeOut();
		            }
		            
		            if ((index == 5) || (index == 6) || (index == 7) || (index == 8)) {
		            	
		            	sidebarAddons.attr('class', '').addClass('c-addons no-visible');
		            }

		        	if (index == 6) {
			        	pR_content.addClass('hide');
			        }
			        
			       if (index == 7) {
			        	pS_content.addClass('hide');
			        }
			        
					if (index == 8) {
						pD_content.addClass('hide');
					}
					
					if (index == 9) {
						program_content.addClass('hide');
		            }
		            
		            if (index == 10) {
						nagrody_content.addClass('hide');
		            }
		            
		            if (index == 11) {
						nagrody1_content.addClass('hide');
		            }
		            
		            if (index == 12) {
						nagrody2_content.addClass('hide');
		            }
		            
		            if (index == 13) {
						nagrody3_content.addClass('hide');
		            }
		            
		            
		        }
			});
		},
		init: function() {
			L.pp();
		}
	};
	var N = {
		nav: function() {
			$('.c-nav li a, .js-goto').on('click', function(e) {
				e.preventDefault();
				var target = $(this).attr('href');
				goToTarget(target);
			});
		},
		init: function() {
			//N.nav();
		}
	};
	$(document).ready(function() {
		L.init();
		//N.init();
	});
});