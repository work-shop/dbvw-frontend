"use strict";

var http = require('http');
var async = require('async');

var destructure = require('../utilities/destructure-projects-response.js'); //destructure the response

module.exports = function( cms, config, globals ) {

    var urlReplace = require('../utilities/resource-map.js')( config );

    return function( req, res ) {

        cms.namespace( 'acf/v2' ).options().then( function( data ) {

            //array to map over, function to transform it, callback
            async.map( data.acf.client_testimonials, resolveProject, function( err, results ) {

                // DON'T FORGET TO CHECK err

                data.acf.client_testimonials = results;

                //renders a template file, and exposes an object with whatever data you want in it
                res.render( 'about.html', {

                    globals: globals,   
                    options: data.acf,
                    featured_media: function( project, size ) {
                        //be sure to introduce a new guard here to check if the size is a size
                        if ( typeof project.featured_media !== "undefined" && typeof project.featured_media[ size ] !== "undefined" ) {
                            return project.featured_media[ size ].source_url;
                        } 
                    }

                });

            });



        });

    };

    function resolveProject( item, callback ) {
        cms.projects()
        .id( item.associated_project.ID )
        .param( '_embed', true )
        .then( function( data ) {

            callback( null, {
                quote: item.quote,
                name: item.name,
                associated_project: destructure( urlReplace( data ) )
            });

        });
    }

};

