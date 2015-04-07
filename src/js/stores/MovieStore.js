import airflux from 'airflux';
import * as MovieActions from './MovieActions';
import Guid from '../utils/Guid';
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
    }

    /**
     * The `state` of the store is directly passed to components listening to it
     */
    get state() { return this.movies; }


    addMovie( movie ) {
        movie.id = Guid.generate();
        this.movies.push( movie );
        this.publishState();    // tell every component listening to it that something has changed

        // we publish an event that a movie was added. component could listen to this
        // to receive only the last movie added instead of the whole state.
        MovieActions.movieAdded( movie );
    }
}


export default new MovieStore();
