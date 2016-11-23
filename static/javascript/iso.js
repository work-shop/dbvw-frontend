
"use strict";

module.exports = function( $, Isotope ) {

	function setupIso() {

		$(window).on("load", function() {

			var grid = document.querySelector('#grid');
			var iso = new Isotope( grid, {
				itemSelector: '.grid-item',
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
				$buttonGroup.on( 'click', 'button', function() {
					
					$buttonGroup.find('.is-checked').removeClass('is-checked');
					$( this ).addClass('is-checked');

					if( $(this).hasClass('filter-all') === false){
						$('body').addClass('category-filtered');
					} 
					else if ( $(this).hasClass('filter-all') ){
						console.log('remove category-filtered');
						$('body').removeClass('category-filtered');
					}

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

