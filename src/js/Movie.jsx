var React       = require( 'react' );
var { injectRouter }= require( './utils' );

/**
 * Movie class does the rendering of a single movie.
 * Data from the parents are passed using the `props` parameters.
 * Props are available throughout your class using `this.props`
 */
class Movie extends React.Component {
    constructor(props) {
        super( props );
    }

    /**
     * Conditional part of your component can go into separate functions, with a guard.
     * A function can return `undefined` and be used inside a JSX block: nothing will be rendered.
     */
    renderPoster() {
        if( !this.props.movie.poster ) return;

        return <img src={ `images/${this.props.movie.poster}`} className="col-xs-6 col-md-3" />;
    }

    render() {
        var movie = this.props.movie;

        return (
            <div className="row">
                { this.renderPoster() }
                <div className="col-xs-6 col-md-9">
                    <h3>
                        {movie.title}
                        { /* the second argument of makeHref is an object with the route params */ }
                        <a className="btn btn-info" href={this.context.router.makeHref( 'EditMovie', { id: movie.id} )}>Edit</a>
                    </h3>
                    <p><b>Year : </b>{movie.releaseYear}</p>
                    <p><b>Directors : </b>{movie.directors}</p>
                    <p><b>Actors : </b>{movie.actors}</p>
                    <p><b>Synopsis : </b>{movie.synopsis}</p>
                    <p><b>Rating : </b>{movie.rate}</p>
                </div>
            </div>
        );
    }
}

// checking of types passed by the parents is done by setting the static attribute `propTypes`
Movie.propTypes = { movie: React.PropTypes.object.isRequired };

module.exports = injectRouter( Movie );
