var airflux = require( 'airflux' );

var MovieActions = {
    /**
     * An action is an event in your application that any store or component can listen to and react
     * By default, every action is asynchonous.
     */
    addMovie: new airflux.Action(),

    movieAdded: new airflux.Action()
};

module.exports = MovieActions;
