import _ from 'lodash';
import airflux from 'airflux';
import * as MovieActions from './MovieActions';
import { Guid } from '../utils';
import movies from '../data/movies';



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
        this.listenTo( MovieActions.find    , this.find );
    }

    /**
     * The `state` of the store is directly passed to components listening to it
     */
    get state() { return this.movies; }


    /**
     * Here, we respond to the find ation.
     * As we currently have to search the store, the best place to implement the action is here.
     * We can trigger manually the child actions completed/failed from here.
     */
    find( id ) {
        var movie = _.find( this.movies, { id: +id } );
        if( movie )
            MovieActions.find.completed( movie );
        else
            MovieActions.find.failed( 'The movie could not be found in the database' );
    }


    addMovie( movie ) {
        if( movie.id ) {
            var movieToModify = _.find( this.movies, { id: movie.id } );
            _.assign( movieToModify, movie );

            // we publish an event that a movie was added. component could listen to this
            // to receive only the last movie added instead of the whole state.
            MovieActions.movieModified( movie );
        }
        else {
            movie.id = Guid.generate();
            this.movies.push( movie );

            // we publish an event that a movie was added. component could listen to this
            // to receive only the last movie added instead of the whole state.
            MovieActions.movieAdded( movie );
        }

        this.publishState();    // tell every component listening to it that something has changed
    }
}


export default new MovieStore();
