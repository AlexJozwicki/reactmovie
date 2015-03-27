var Uri = require( './Uri' );
var { checkStatusJsonError, parseJson } = require( './FetchTransformers' );


var Movies = {
    getAll() {
        return fetch( '/api/movies' ).then( parseJson );
    },

    addMovie( movie ) {
        var options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( movie )
        };

        return fetch( '/api/movies', options ).then( checkStatusJsonError ).then( parseJson );
    }
};


module.exports = Movies;
