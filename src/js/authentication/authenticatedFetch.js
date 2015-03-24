var _ 			= require( 'lodash' );
var AuthActions	= require( './AuthActions' );
var AuthApi 	= require( './AuthApi' );

function authenticatedFetch( url, options ) {
	options = options || {};

	_.assign( options.headers, {
		headers: {
			'X-AUTH-TOKEN': AuthApi.getToken()
		}
	} );

	return new Promise( function( resolve, reject ) {
		fetch( url, options )
		.then( ( response ) => {
			if( response.status === 401 )
				AuthActions.requiresLogin();
			else
				resolve( response );
		} )
		.catch( reject );
	});
}

module.exports = authenticatedFetch;
