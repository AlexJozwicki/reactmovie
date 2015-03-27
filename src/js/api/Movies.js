var Uri = require( './Uri' );


var Movies = {
    getAll() {
        return fetch( '/api/movies' ).then( ( response ) => response.json() );
    }
};

module.exports = Movies;
