"use strict";

var maybeRendered = require('../utilities/maybe-with-default.js')( { rendered: undefined } ); //use the maybe pattern to check if something is defined
var maybeSourceUrl = require('../utilities/maybe-with-default.js')( { 'wp:featuredmedia': [ {media_details: { sizes: undefined } }]} );
var getCategories = require('../utilities/get-categories.js')();

module.exports = function ( r ) {

    try {

        //console.log( r.acf );

        var x = {
            title: maybeRendered( r.title ).rendered, //if r has a field called title, we can use it
            slug: r.slug,
            type: r.type,
            modified: r.modified,
            id: r.id,
            link: r.link,

            categories: getCategories(r._embedded['wp:term'][0]),

            // isFeatured: checkCategoryFeatured(r.)

            featured_media: maybeSourceUrl( r._embedded )['wp:featuredmedia'][0].media_details.sizes,
            featured_image: maybeSourceUrl( r._embedded )['wp:featuredmedia'][0].media_details,
            content: maybeRendered( r.content ).rendered,
            description: {
                short: r.acf.description,
                long:  r.acf.description_long,
            },
            client: r.acf.client,
            timeline: r.acf.timeline,
            services: r.acf.services,
            gallery: r.acf.gallery
        };

        //console.log(x);

        return x;

    } catch ( e ) {

        console.error( e.message );
        return {};

    }

};
