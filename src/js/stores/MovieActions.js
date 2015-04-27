import airflux from 'airflux';


/**
 * An action is an event in your application that any store or component can listen to and react
 * By default, every action is asynchonous.
 */
export var addMovie = new airflux.Action().asFunction;


export var movieAdded = new airflux.Action().asFunction;

export var movieModified = new airflux.Action().asFunction;

/**
 * We define the action find as having an asynchronous result.
 * `asyncResult` creates 2 child actions:
 * - completed
 * - failed
 *
 * Components and stores can listen to find.completed and find.failed.
 * The search is implementend in the MovieStore.
 */
export var find = new airflux.Action().asyncResult().asFunction;
