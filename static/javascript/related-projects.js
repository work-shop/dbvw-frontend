"use strict";

module.exports = function( $, configuration ) {

	var $rpNames = $('.rp-name');
	var $rpNamesAll = $('.rp-name-all');	
	var $rpSlugs = $('.rp-slug');
	var $rpProjects = $('.filters-button-group');
	var localStorageName = 'dbvwArchitectsCategoryName';
	var localStorageSlug = 'dbvwArchitectsCategorySlug';
	var rpCategory = {};
	var projectId = $('#project-header').data('id');


	//initialize
	function initialize(){

		$( document ).ready( function() {
			rpCategory = getCategory();
			updateLabels();
			updateLinks();
			getRelatedProjects();
			console.log('related-projects.js');
		});

	}


	function getCategory(){
		var name = localStorage.getItem(localStorageName);
		var slug = localStorage.getItem(localStorageSlug);
		var nameAll, categoryUrl;
		console.log('category: ' + name);

		if( name === 'all' || name === null || name === 'Work'){
			name = 'Projects';
			nameAll = 'All Projects';
			categoryUrl = '/work';
		} else{
			name = name + ' Projects';
			nameAll = name;
			categoryUrl = '/work/' + slug;
		}

		var rpCategory = {
			name: name,
			nameAll: nameAll,
			categoryUrl: categoryUrl,
			slug: slug
		};

		return rpCategory;
	}


	function updateLabels(){
		$rpNames.each(function(index, el) {
			$(this).text(rpCategory.name);
		});
		$rpNamesAll.each(function(index, el) {
			$(this).text(rpCategory.nameAll);
		});		
	}


	function updateLinks(){
		$rpSlugs.each(function(index, el) {
			$(this).attr('href', rpCategory.categoryUrl);
		});
	}	


	function getRelatedProjects(){
		var endpoint;

		if( rpCategory.name === 'Projects' ){
			endpoint = configuration.remote_api_custom + '/relatedprojects?category=all&current=' + projectId;
		} else{
			endpoint = configuration.remote_api_custom + '/relatedprojects?category=' + rpCategory.slug + '&current=' + projectId;
		}

		$.ajax({
			url: endpoint,
			dataType: 'json'
		})
		.done(function(data) {
			//console.log("success loading related projects");
			renderRelatedProjects(data);
		})
		.fail(function() {
			console.log("error loading related projects");
		})
		.always(function() {
			//console.log("completed request for related projects");
		});
		
	}


	function renderRelatedProjects( projects ){

		for( var i = 0; i < projects.length; i++ ){
			var _project = '#rp-' + i;
			var projectLink = projects[i].link; 
			var currentUrl = window.location.hostname;

			if( currentUrl === 'localhost' ){
				projectLink = projectLink.replace('http://dbvw.com', 'http://localhost:8080');
			}

			console.log(projects[i]);

			$(_project).find('.rp-project-title').html(projects[i].post_title); 
			$(_project).find('.rp-project-image').attr('src', projects[i].featured_image);	
			$(_project).find('.rp-project-link').attr('href', projectLink );			
		}

	}


	//return on object with the initialize function
	return {
		initialize: initialize
	};

};

