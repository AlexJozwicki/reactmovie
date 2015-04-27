import _ from 'lodash';
import airflux from 'airflux';
import * as MovieActions from './MovieActions';
import { Guid } from '../utils';



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
        this.listenTo( MovieActions.addMovie.action.completed, this.movieAdded );
        this.listenTo( MovieActions.find    , this.find );
        this.listenTo( MovieActions.getAll.action.completed, this.gotAllMovies );
    }

    gotAllMovies( response ) {
        this.movies = response;
        this.publishState();
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


    movieAdded( movie ) {
        this.movies.push( movie );
        this.publishState();    // tell every component listening to it that something has changed
    }
}


export default new MovieStore();
