import airflux from 'airflux';
import { MoviesApi } from '../api';


/**
 * An action is an event in your application that any store or component can listen to and react
 * By default, every action is asynchonous.
 * A new actions with a async result:  basically, two sub actions are created: completed and failed
 */
export var addMovie = new airflux.Action( { asyncResult: true } );
addMovie.listen( MoviesApi.addMovie );


/**
 * We previously implemented the action find in the store, as the data are in the store.
 * getAll will now only do a call to a web service to get the informations.
 * We can simply use the `listen` function.
 *
 * `listen` will execute the function MoviesApi.getAll when the acttion is triggered.
 * If it's a promise, it will be map to the chil actions .completed and .failed.
 */
export var getAll = new airflux.Action( { asyncResult: true } );
getAll.listen( MoviesApi.getAll );


export var movieModified = new airflux.Action();

export var find = new airflux.Action( { asyncResult: true } );
