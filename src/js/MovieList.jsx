var React       = require( 'react' );
var _               = require( 'lodash' );
var Modal           = require( './components/Modal' );
var Movie           = require( './Movie' );
var MovieForm       = require( './MovieForm' );


var MovieActions    = require( './stores/MovieActions' );
var MovieStore      = require( './stores/MovieStore' );
var FluxComponent   = require( 'airflux/lib/FluxComponent' );


/**
 * MovieList now extends FluxComponent.
 * FluxComponent listens to Stores and Actions of the Flux pattern.
 */
class MovieList extends FluxComponent {
    constructor(props) {
        // the state of MovieStore will be placed directly to the `movies` variable of the state
        super( props, { movies: MovieStore } );

        // FluxComponent already sets the state to that of the stores.
        // Don't replace the objet but add keys to it
        this.state.displayForm= false;
    }

    saveMovie( movie ) {
        /**
         * We publish an event `addMovie` to the whole application.
         * MovieStore will update itself, and broadcast its new state to everyone, including MovieList.
         * MovieList will then rerender itself
         */
        MovieActions.addMovie( movie );
        this.showModal( false );
    }

    showModal( shown = true ) {
        this.setState( { displayForm: shown } );
    }

    render() {
        /**
         * Styles are declared using the DOM notations
         */
        var headingStyle = {
            margin: '0 0 1em 0'
        };

        /**
         * Any property you want to set has to be set using the DOM syntax and not HTML:
         * - className instead of class
         * - onClick instead of just onclick (with a C uppercase)
         * - style is not a string but an object, with keys.
         * - keys of style will be for example backgroundColor
         */
        return (
            <div className="container">
                <header className="row">
                    <div className="col-md-6 col-md-offset-1"><h1 style={headingStyle}>My movies <small>{this.state.movies.length} movies</small></h1></div>
                    <div className="col-md-3">
                        <button className="btn btn-primary" onClick={() => this.showModal( true )}>Add movie</button>
                    </div>
                </header>

                <ul className="thumbnails">
                    { /* the state is still accessible, just as before */}
                    { this.state.movies.map( ( movie ) => <Movie movie={movie} key={movie.id} /> )}
                </ul>
                <Modal title="Add a movie" visible={this.state.displayForm} onCloseRequest={() => this.showModal( false )}>
                    <MovieForm saveMovie={this.saveMovie.bind( this )}/>
                </Modal>
            </div>
        );
    }
}

module.exports = MovieList;
