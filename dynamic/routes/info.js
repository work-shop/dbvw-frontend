"use strict";

var empty = require('../utilities/empty.js');
var destructure = require('../utilities/destructure-projects-response.js');

module.exports = function( wp, options, globals ) {

    var urlReplace = require('../utilities/resource-map.js')( options );



    return function( req, res ) {

        var originalUrl = req.originalUrl;
        if (originalUrl.charAt(0) === "/") originalUrl = originalUrl.substr(1);
        if (originalUrl.charAt(originalUrl.length - 1) === "/") originalUrl = originalUrl.substr(0, originalUrl.length - 1);
        
        var pageName = originalUrl;
        var template = pageName + '.html';

        wp.namespace( 'acf/v2' ).options().then( function( options ) {
            wp.about().param('_embed', true).filter( 'name', pageName ).then( function( data ) {

                if( pageName === 'careers'){
                    wp.jobs().param('_embed', true).then( function( jobs ) {
                        res.render( template, { 
                            globals: globals,
                            options: options.acf,
                            item: data[0],
                            jobs: urlReplace(jobs)
                        } );
                    });
                }else{
                    res.render( template, { 
                        globals: globals,
                        options: options.acf,
                        item: data[0]
                    } );
                }

            });//2nd request
        });//1st request

    };//return function

};