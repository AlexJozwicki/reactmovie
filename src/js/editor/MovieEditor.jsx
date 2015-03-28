var _               = require( 'lodash' );
var React           = require( 'react' );
var FluxComponent   = require( 'airflux/lib/FluxComponent' );

var { injectRouter }= require( '../utils' );

var MovieActions    = require( '../stores/MovieActions' );
var MovieStore      = require( '../stores/MovieStore' );
var MovieForm       = require( './MovieForm' );


/**
 * The other half of the page.
 * This Flux component does the loading/synchronising with Flux stores and actions.
 *
 * It is best to keep the code loading data from the one rendering it.
 * This ensures simple thing such as the MovieForm will always receives an Movie object in props,
 * and doesn't have to to checks whether it has an object.
 *
 */
class MovieEditor extends FluxComponent {
    constructor( props ) {
        super( props, { movieLoaded: MovieActions.find.completed, onError: MovieActions.find.failed } );
        this.state = { movie: null, error: null };
    }

    loadMovie() {
        var id = this.context.router.getCurrentParams().id;
        if( id ) {
            // reinit first
            this.setState( { movie: null, error: null } );
            MovieActions.find( id );
        }
        else {
            this.setState( { movie: {}, error: null } );
        }
    }

    movieLoaded( movie ) {
        this.setState( { movie: movie } );
    }

    onError( e ) {
        this.setState( { movie: null, error: e } );
    }

    /**
     * When the component is mounted by React router, we trigger the actions to load the movie.
     */
    componentDidMount() {
        // classes inheriting from FluxComponent need to call `super.componentDidMount`
        super.componentDidMount();
        this.loadMovie();
    }

    /**
     * When an id of the route changes, React router keeps the same component mounted, and just
     * sends out new props.
     */
    componentWillReceiveProps( nextProps ) {
        this.loadMovie();
    }

    render() {
        if( this.state.error ) {
            return <div>{this.state.error}</div>
        }
        else if( !this.state.movie ) {
            return <div>Loading...</div>;
        }

        return (
            <MovieForm movie={this.state.movie}/>
        );
    }
}
injectRouter( MovieEditor );


module.exports = MovieEditor;
