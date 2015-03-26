var React           = require( 'react' );
var _               = require( 'lodash' );
var { injectRouter }= require( './utils' );

var MovieActions= require( './stores/MovieActions' );
var MovieStore  = require( './stores/MovieStore' );
var FluxComponent= require( 'airflux/lib/FluxComponent' );


/**
 * The form to edit a movie
 */
class MovieForm extends React.Component {
    constructor( props ) {
        super( props );

        /**
         * As a rule of thumb, props should never be put into the state.
         * Here, `props.movie` should never be placed in a state.
         * We do place here a copy that is going to be edited. Props will hold the initial movie (if any)
         *
         * @type {Object}
         */
        this.state = { movie: props.movie };
    }


    /**
     * A function returning a ValueLink object is the recommanded way in React to bind inputs
     */
    linkMovieState( key ) {
        return {
            value: this.state.movie[ key ],
            requestChange: ( value ) => {
                /**
                 * setState replaces a whole key. therefore we need to change the movie object and repass it
                 * to setState.
                 * Stay tuned for a better way to do this in the next steps..
                 */
                var movieState = this.state.movie;
                movieState[ key ] = value;
                this.setState( { movie: movieState } )
            }
        };
    }

    saveMovie() {
        MovieActions.addMovie( this.state.movie );
        this.context.router.transitionTo( 'MovieList' );
    }

    render() {
        return (
            <div>
                <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="control-group">
                            <label className="control-label">Title :</label>
                            <input type="text" valueLink={this.linkMovieState( 'title' )}/>
                        </div>
                        <div className="control-group">
                            <label className="control-label">Year :</label>
                            <input type="text" valueLink={this.linkMovieState( 'releaseYear' )}/>
                        </div>
                        <div className="control-group">
                            <label className="control-label">Directors : </label>
                            <input type="text" valueLink={this.linkMovieState( 'directors' )}/>
                        </div>
                        <div className="control-group">
                            <label className="control-label">Actors :</label>
                            <input type="text" valueLink={this.linkMovieState( 'actors' )}/>
                        </div>
                        <div className="control-group">
                            <label className="control-label">Stars :</label>
                            <input type="number" placeholder="Between 1 and 5" valueLink={this.linkMovieState( 'rate' )}/>
                        </div>
                    </form>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={this.saveMovie.bind( this )}>Save changes</button>
                </div>
            </div>
        );
    }
}

MovieForm.propTypes = {
    movie       : React.PropTypes.object,
    saveMovie   : React.PropTypes.func.isRequired
};
injectRouter( MovieForm );


class MovieEditor extends FluxComponent {
    constructor( props ) {
        super( props, { movieLoaded: MovieActions.find.completed } );
        this.state = { movie: null };
    }

    loadMovie() {
        var id = this.context.router.getCurrentParams().id;
        if( id ) {
            MovieStore.find( id );
        }
        else {
            this.setState( { movie: {} } );
        }
    }

    movieLoaded( movie ) {
        this.setState( { movie: movie } );
    }

    componentDidMount() {
        super.componentDidMount();
        this.loadMovie();
    }

    componentWillReceiveProps( nextProps ) {
        this.loadMovie();
    }

    render() {
        if( !this.state.movie ) return null;

        return (
            <MovieForm movie={this.state.movie}/>
        );
    }
}
injectRouter( MovieEditor );


module.exports = MovieEditor;
