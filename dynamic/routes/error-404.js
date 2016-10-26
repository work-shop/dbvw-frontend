module.exports = function( ) {
    return function( err, req, res, next ) {
        if ( err.status === 404 ) {
            res.render( '404.html', {});
        } else {
            next( err );
        }
    };
};
