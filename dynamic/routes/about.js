"use strict";

var http = require('http');
var async = require('async');

var destructure = require('../utilities/destructure-projects-response.js'); //destructure the response

module.exports = function( wp, config, globals ) {

    var urlReplace = require('../utilities/resource-map.js')( config );

    return function( req, res ) {

        wp.namespace( 'acf/v2' ).options().then( function( data ) {

            wp.people().perPage(50).param('_embed', true).then( function( people ) {

                //array to map over, function to transform it, callback
                async.map( data.acf.client_testimonials, resolveProject, function( err, results ) {

                    // DON'T FORGET TO CHECK err

                    data.acf.client_testimonials = results;

                    //renders a template file, and exposes an object with whatever data you want in it
                    res.render( 'about.html', {

                        globals: globals,
                        options: data.acf,
                        people: people,
                        featured_image: function( project, size ) {
                            if ( typeof project.featured_media !== "undefined" && typeof project.featured_media[ size ] !== "undefined" ) {
                                return project.featured_media[ size ].source_url;
                            }
                        }
                    });

                });//3rd request
            });//2nd request
        });//1st request

    };

    function resolveProject( item, callback ) {

        globals.log.log( 'resolveProject' );

        if( typeof item.associated_project.ID !== 'undefined'  ){

            wp.projects()
            .id( item.associated_project.ID )
            .param( '_embed', true )
            .then( function( data ) {
               callback( null, {
                quote: item.quote,
                name: item.name,
                associated_project: destructure( urlReplace( data ) )
            }).catch( function( err ) {

                globals.log.error( err );
                callback( err );

            });
           });

        } else{
           globals.log.log( 'no associated project' );
       }

   }

};
