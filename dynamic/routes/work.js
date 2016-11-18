"use strict";


var compose = require('../utilities/compose.js'); //helper to compose functions *magic
var destructure = require('../utilities/destructure-projects-response.js'); //destructure the response

module.exports = function( wp, config, globals ) {

    var urlReplace = require('../utilities/resource-map.js')( config );

    return function( req, res ) {

        wp.projects().param('_embed', true).then( function( data ) {

            wp.namespace( 'acf/v2' ).options().then( function( dataOptions ) {

                wp.project_categories().then( function( project_categories ) {

                    res.render( 'work.html', {
                        globals: globals,
                        options: dataOptions.acf,
                        projects: data.map( compose( destructure, urlReplace ) ),
                        project_categories: project_categories,
                        featured_image: function( project, size ) {
                            if ( typeof project.featured_media !== "undefined" && typeof project.featured_media[ size ] !== "undefined" ) {
                                return project.featured_media[ size ].source_url;
                            } 
                        }       
                    });//render

                });//3rd request

            });//2nd request

        });//1st request

    };
};
