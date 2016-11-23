
"use strict";

module.exports = function( $, Isotope ) {

	function setupIso() {

		$(window).on("load", function() {

			var grid = document.querySelector('#grid');
			var iso = new Isotope( grid, {
				itemSelector: '.grid-item',
				transitionDuration: '0.5s',
				hiddenStyle: {
					opacity: 0
				},
				visibleStyle: {
					opacity: 1
				},
				masonry: {
					columnWidth: '.grid-sizer',
					gutter: '.gutter-sizer'
				}
			});


			// bind filter button click
			$('.filters').on( 'click', 'button', function() {
				var filterValue = $( this ).attr('data-filter');
				iso.arrange({
					  // item element provided as argument
					  filter: function( itemElem ) {
					  	var flag = $(itemElem).hasClass(filterValue);
					  	return flag;
					  }
					});
			});

			// change is-checked class on buttons
			$('.button-group').each( function( i, buttonGroup ) {
				
				var $buttonGroup = $( buttonGroup );
				var $workIntroductions = $('.work-introduction-category');
				$buttonGroup.on( 'click', 'button', function() {
					
					//toggle button classes
					$buttonGroup.find('.is-checked').removeClass('is-checked');
					$(this).addClass('is-checked');

					//get the current category we're filtered to, and apply classes accordingly
					var currentCategory = $(this).data('category');
					var currentIntroduction = '.work-introduction-category-' + currentCategory;
					
					$workIntroductions.filter('.active').removeClass('active').addClass('inactive');
					$(currentIntroduction).removeClass('inactive').addClass('active');					

					//apply global classes to manage what the specifics of the category we're viewing
					if( currentCategory !== 'all' ){
						$('body').addClass('category-filtered');
					} 
					else if ( currentCategory === 'all' ){
						$('body').removeClass('category-filtered');
					}

					//jump to the top of the page
					$('html,body').animate({
						scrollTop: 0
					},250);

				});
			});			

		});

	}

	return {
		setupIso: setupIso
	};
};

