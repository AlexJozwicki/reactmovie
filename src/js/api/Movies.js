var Uri = require( './Uri' );

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

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
            } ).then( status ).then( ( response ) => response.json() );
    }
};

module.exports = Movies;
