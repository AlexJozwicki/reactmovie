var _ = require( 'lodash' );


function authenticatedFetch( url, options ) {
	_.assign( options.headers, {
		headers: {
			'X-AUTH-TOKEN': '' // TODO: plug into the auth system
		}
	} );

	return new Promise( function( resolve, reject ) {
		fetch( url, options )
		.then( ( response ) => {
			if( response.status === 401 ) {
				// TODO: trigger a login
			}

			resolve( response );
		} )
		.catch( reject );
	});
}

module.exports = authenticatedFetch;