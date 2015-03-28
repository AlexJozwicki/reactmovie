var airflux         = require( 'airflux' );
var MovieActions    = require( './MovieActions' );
var Guid            = require( '../utils/Guid' );
var movies          = require( '../data/movies' );



/**
 * A store is a component that sits at the top of the hierarchy.
 * It provides data for any component that listens to it.
 */
class MovieStore extends airflux.Store {
    constructor() {
        super();
        this.movies = movies;

        /**
         * Here we listen to the action `addMovie`
         */
        this.listenTo( MovieActions.addMovie, this.addMovie );
    }

    /**
     * The `state` of the store is directly passed to components listening to it
     */
    get state() { return this.movies; }


    addMovie( movie ) {
        movie.id = Guid.generate();
        this.movies.push( movie );
        this.publishState();    // tell every component listening to it that something has changed
    }
}


module.exports = new MovieStore();
