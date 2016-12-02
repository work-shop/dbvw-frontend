"use strict";

var empty = require('../utilities/empty.js');
var destructure = require('../utilities/destructure-projects-response.js');

module.exports = function( wp, options, globals, pageId, pageName ) {

    var urlReplace = require('../utilities/resource-map.js')( options );
    var template = pageName + '.html';

    return function( req, res, next ) {

        wp.namespace( 'acf/v2' ).options().then( function( options ) {
            wp.about().param('_embed', true).id( pageId ).then( function( data ) {

                if ( empty( data ) ) {
                    var err = new Error();
                    err.status = 404;
                    next( err );
                } else {
                    res.render( template, { 
                        globals: globals,
                        options: options.acf,
                        item: data
                    } );
                }

            });//2nd request

        });//1st request

    };
};
