var React       = require( 'react' );
var _           = require( 'lodash' );
var classnames  = require( 'classnames' );

var FluxComponent= require( 'airflux/lib/FluxComponent' );

var { injectRouter }= require( './utils' );

var MovieActions= require( './stores/MovieActions' );
var MovieStore  = require( './stores/MovieStore' );
var Movie       = require( './Movie' );


/**
 * MovieList now extends FluxComponent.
 * FluxComponent listens to Stores and Actions of the Flux pattern.
 */
class MovieList extends FluxComponent {
    constructor(props) {
        // the state of MovieStore will be placed directly to the `movies` variable of the state
        super( props, { movies: MovieStore } );
    }


    render() {
        var headingStyle = {
            margin: '0 0 1em 0'
        };

        return (
            <div className="container">
                <header className="row">
                    <div className="col-md-6 col-md-offset-1"><h1 style={headingStyle}>My movies <small>{this.state.movies.length} movies</small></h1></div>
                </header>

                <ul className="thumbnails">
                    { /* the state is still accessible, just as before */}
                    { this.state.movies.map( ( movie ) => <Movie movie={movie} key={movie.id} /> )}
                </ul>
            </div>
        );
    }
}
injectRouter( MovieList );

module.exports = MovieList;
