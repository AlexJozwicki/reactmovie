var Uri = require( './Uri' );


var Movies = {
    getAll() {
        return fetch( '/api/movies' ).then( ( response ) => response.json() );
    },

    addMovie( movie ) {
        return fetch( '/api/movies',
            { method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify( movie )
            } ).then( ( response ) => response.json() );
    }
};

module.exports = Movies;
