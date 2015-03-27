var _               = require( 'lodash' );
var airflux         = require( 'airflux' );

var MovieActions    = require( './MovieActions' );
var { Guid }        = require( '../utils' );



/**
 * A store is a component that sits at the top of the hierarchy.
 * It provides data for any component that listens to it.
 */
class MovieStore extends airflux.Store {
    constructor() {
        super();
        this.movies = [];

        /**
         * Here we listen to the action `addMovie`
         */
        this.listenTo( MovieActions.addMovie.completed, this.movieAdded );
        this.listenTo( MovieActions.find    , this.find );
        this.listenTo( MovieActions.getAll.completed, this.gotAllMovies );
    }

    gotAllMovies( response ) {
        this.movies = response;
        this.publishState();
    }

    /**
     * The `state` of the store is directly passed to components listening to it
     */
    get state() { return this.movies; }

    find( id ) {
        MovieActions.find.completed( _.find( this.movies, { id: +id } ) );
    }


    movieAdded( movie ) {
        this.movies.push( movie );
        this.publishState();    // tell every component listening to it that something has changed
    }
}


module.exports = new MovieStore();
