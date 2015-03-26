var React       = require( 'react' );
var _           = require( 'lodash' );



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
        this.state = { movie: _.clone( props.movie || {} ) };
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
        this.props.saveMovie( this.state.movie );
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


module.exports = MovieForm;
