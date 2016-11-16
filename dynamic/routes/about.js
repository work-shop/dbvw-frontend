"use strict";

var http = require('http');
var async = require('async');

var destructure = require('../utilities/destructure-projects-response.js'); //destructure the response

module.exports = function( cms, config, globals ) {

    var urlReplace = require('../utilities/resource-map.js')( config );

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

    return function( req, res ) {

        //constructs the request string, 'then' makes the request, and calls the callback function you specify, with the 'data'
        cms.namespace( 'acf/v2' ).options().then( function( data ) {

            //array to map over, function to transform it, callback
            async.map( data.acf.client_testimonials, resolveProject, function( err, results ) {

                // DON'T FORGET TO CHECK err

                data.acf.client_testimonials = results;

                console.log(data.acf.client_testimonials);

                //renders a template file, and exposes an object with whatever data you want in it
                res.render( 'about.html', {

                    globals: globals,   //global data
                    options: data.acf,   //route specific data
                    featured_media: function( project ) {
                        if ( typeof project.featured_media !== "undefined" ) {
                            return project.featured_media.large.source_url;
                        } else {
                            return undefined;
                        }
                    }

                });

            });



        });

    };
};

