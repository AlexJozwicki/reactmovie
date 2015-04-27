import { checkStatusJsonError, parseJson } from './FetchTransformers';


/**
 * We use the fetch API to do AJAX call.
 * fetch returns a Promise object.
 * We use then to parse the JSON, which itself returns a new Promise.
 *
 * See: http://jakearchibald.com/2015/thats-so-fetch/
 */
export function getAll() {
    return fetch( '/api/movies' ).then( parseJson );
}


export function addMovie( movie ) {
    var options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( movie )
    };

    return fetch( '/api/movies', options ).then( checkStatusJsonError ).then( parseJson );
}
