var airflux = require( 'airflux' );

var MovieActions = {
    /**
     * An action is an event in your application that any store or component can listen to and react
     * By default, every action is asynchonous.
     */
    addMovie        : new airflux.Action(),

    movieAdded      : new airflux.Action(),

    movieModified   : new airflux.Action(),

    /**
     * We define the action find as having an asynchronous result.
     * `asyncResult` creates 2 child actions:
     * - completed
     * - failed
     *
     * Components and stores can listen to find.completed and find.failed.
     * The search is implementend in the MovieStore.
     */
    find            : new airflux.Action( { asyncResult: true } )
};

module.exports = MovieActions;
