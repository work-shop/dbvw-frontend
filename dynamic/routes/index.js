"use strict";

module.exports = function( cms, config, schema ) {
    return function( req, res ) {

        //cms.posts() constructs the request string, when you call 'then' it makes the request, and calls the callback function you specify, with the 'data'
        cms.namespace( 'acf/v2' ).options().then( function( data ) {

            //renders a template file, and exposes an object with whatever data you want in it
            res.render( 'index.html', {
                acf_options: data,
                site_title: schema.name,
                site_description: schema.description,
                development: config.development || false
            });

        });

    };
};
