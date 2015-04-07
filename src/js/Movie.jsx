import React from 'react';

/**
 * Movie class does the rendering of a single movie.
 * Data from the parents are passed using the `props` parameters.
 * Props are available throughout your class using `this.props`
 */
export default class Movie extends React.Component {
    constructor(props) {
        super( props );
    }

    renderPoster() {
        if( !this.props.movie.poster ) return;

        return <img src={ `images/${this.props.movie.poster}`} className="col-xs-6 col-md-3" />;
    }

    render() {
        return (
            <div className="row">
                { this.renderPoster() }
                <div className="col-xs-6 col-md-9">
                    <h3>{this.props.movie.title}</h3>
                    <p><b>Year : </b>{this.props.movie.releaseYear}</p>
                    <p><b>Directors : </b>{this.props.movie.directors}</p>
                    <p><b>Actors : </b>{this.props.movie.actors}</p>
                    <p><b>Synopsis : </b>{this.props.movie.synopsis}</p>
                    <p><b>Rating : </b>{this.props.movie.rate}</p>
                </div>
            </div>
        );
    }
}

// checking of types passed by the parents is done by setting the static attribute `propTypes`
Movie.propTypes = { movie: React.PropTypes.object.isRequired };
