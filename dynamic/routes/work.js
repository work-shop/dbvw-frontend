"use strict";


var route404 = require('./404.js'); 
var compose = require('../utilities/compose.js'); //helper to compose functions *magic
var destructure = require('../utilities/destructure-projects-response.js'); //destructure the response
var checkCategorySlug = require('../utilities/check-category-slug.js')(); //check if the category is valid

module.exports = function( wp, config, globals ) {

    var urlReplace = require('../utilities/resource-map.js')( config );

    return function( req, res ) {

        wp.projects().param('_embed', true).then( function( data ) {

            wp.namespace( 'acf/v2' ).options().then( function( dataOptions ) {

                wp.project_categories().then( function( project_categories ) {

                    function serveWork( category ){
                     res.render( 'work.html', {
                        globals: globals,
                        options: dataOptions.acf,
                        projects: data.map( compose( destructure, urlReplace ) ),
                        project_categories: project_categories,
                        routeCategory: category,

                        featured_image: function( project, size ) {
                            if ( typeof project.featured_media !== "undefined" && typeof project.featured_media[ size ] !== "undefined" ) {
                                return project.featured_media[ size ].source_url;
                            }      
                        },

                        project_featured_category: function( project, categories ) {
                            for (var i = 0; i < categories.length; i++) {
                                if ( project.id === categories[i].featured_project.ID ){
                                    return {
                                        category: categories[i].category.slug,
                                        supplemental_image: categories[i].supplemental_featured_image.sizes.category
                                    };
                                }
                            }
                        } 

                    });        
                 }     

                 if( typeof(req.params.category) === 'undefined' ){

                    serveWork();

                } else{
                    var category = req.params.category;

                    if( checkCategorySlug(category, project_categories) ){
                        serveWork( category );
                    } else{
                        route404()(req, res);
                    }

                }

                });//3rd request

            });//2nd request

        });//1st request

    };
};
