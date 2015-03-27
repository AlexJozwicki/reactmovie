var airflux = require( 'airflux' );
var { MoviesApi } = require( '../api' );

var MovieActions = {
    /**
     * An action is an event in your application that any store or component can listen to and react
     * By default, every action is asynchonous.
     */
    addMovie    : new airflux.Action( { asyncResult: true } ),

    /**
     * A new actions with a async result:  basically, two sub actions are created: completed and failed
     */
    getAll      : new airflux.Action( { asyncResult: true } ),

    find        : new airflux.Action( { asyncResult: true } )
};

/**
 * listen will execute the function getAll.
 * If it's a promise, it will be map to the chil actions .completed and .failed.
 */
MovieActions.getAll.listen( MoviesApi.getAll );

MovieActions.addMovie.listen( MoviesApi.addMovie );


module.exports = MovieActions;
