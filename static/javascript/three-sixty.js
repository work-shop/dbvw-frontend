"use strict";

module.exports = function( $ ) {

	function setupThreeSixty() {

		$( document ).ready( function() {
			//console.log('three-sixty.js: setupThreeSixty');
			//console.log('three-sixty.js: VR View:');
			//console.log(VRView);
			//var VRView = window.VRView;



			// var image = $('#vrview').data('image');
			var image1 = $('#vrview1').data('image');
			var image2 = $('#vrview2').data('image');
			var image3 = $('#vrview3').data('image');
			var image4 = $('#vrview4').data('image');
			var image5 = $('#vrview5').data('image');


			if( !isEmpty(image1 )){
				var vrView1 = new VRView.Player('#vrview1', {
					image: image1,
					is_stereo: false
				});

				if( !isEmpty(image2 )){
					var vrView2 = new VRView.Player('#vrview2', {
						image: image2,
						is_stereo: false
					});
				}

				if( !isEmpty(image3 )){
					var vrView3 = new VRView.Player('#vrview3', {
						image: image3,
						is_stereo: false
					});
				}

				if( !isEmpty(image4 )){
					var vrView4 = new VRView.Player('#vrview4', {
						image: image4,
						is_stereo: false
					});
				}

				if( !isEmpty(image5 )){
					var vrView5 = new VRView.Player('#vrview5', {
						image: image5,
						is_stereo: false
					});
				}

			}

		});

	}

	function isEmpty(val){
		return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	return {
		setupThreeSixty: setupThreeSixty
	};
};