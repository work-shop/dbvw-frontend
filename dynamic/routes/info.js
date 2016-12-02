"use strict";

var empty = require('../utilities/empty.js');
var destructure = require('../utilities/destructure-projects-response.js');

module.exports = function( wp, options, globals, pageId, pageName ) {

    var urlReplace = require('../utilities/resource-map.js')( options );
    var template = pageName + '.html';
    var jobs;

    return function( req, res ) {

        wp.namespace( 'acf/v2' ).options().then( function( options ) {
            wp.about().param('_embed', true).id( pageId ).then( function( data ) {

                if( pageName === 'careers'){
                    wp.jobs().param('_embed', true).then( function( jobs ) {
                        res.render( template, { 
                            globals: globals,
                            options: options.acf,
                            item: data,
                            jobs: urlReplace(jobs)
                        } );
                    });
                }else{
                    res.render( template, { 
                        globals: globals,
                        options: options.acf,
                        item: data
                    } );
                }

            });//2nd request
        });//1st request

    };//return function

};
