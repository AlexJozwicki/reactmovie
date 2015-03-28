var React       = require( 'react' );
var movies      = require( './data/movies' );


/**
 * Movie class does the rendering of a single movie.
 * Data from the parents are passed using the `props` parameters.
 * Props are available throughout your class using `this.props`
 */
class Movie extends React.Component {
    constructor(props) {
        super( props );
    }

    render() {
        return (
            <div className="row">
                <img src={ `images/${this.props.movie.poster}`} className="col-xs-6 col-md-3" />
                <div className="col-xs-6 col-md-9">
                    <h3>{this.props.movie.title}</h3>
                    <p><b>Year : </b>{this.props.movie.releaseYear}</p>
                    <p><b>Réalisateur : </b>{this.props.movie.directors}</p>
                    <p><b>Acteurs : </b>{this.props.movie.actors}</p>
                    <p><b>Synopsis : </b>{this.props.movie.synopsis}</p>
                    <p><b>Note : </b>{this.props.movie.rate}</p>
                </div>
            </div>
        );
    }
}

/**
 * checking of types passed by the parents is done by setting the static attribute `propTypes`
 */
Movie.propTypes = { movie: React.PropTypes.object.isRequired };


/**
 * Our movie list component
 */
class MovieList extends React.Component {
    render() {
        return (
            <div className="container">
                { /* we use JavaScript maps to transform a collection of data into a collection of components */}
                { /* each child of this collection needs to have a unique `key` attribute to be identified by React */}
                { movies.map( ( movie ) => <Movie movie={movie} key={movie.id} /> )}
            </div>
        );
    }
}

module.exports = MovieList;
