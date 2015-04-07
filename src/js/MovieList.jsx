import React            from 'react' ;
import _                from 'lodash' ;
import classnames       from 'classnames' ;
import Movie            from './Movie' ;
import { injectRouter } from './utils';


import * as MovieActions from './stores/MovieActions';
import MovieStore       from './stores/MovieStore' ;
import FluxComponent    from 'airflux/lib/FluxComponent' ;


/**
 * MovieList now extends FluxComponent.
 * FluxComponent listens to Stores and Actions of the Flux pattern.
 */
class MovieList extends FluxComponent {
    constructor(props) {
        // the state of MovieStore will be placed directly to the `movies` variable of the state
        super( props, { movies: MovieStore } );
    }

    componentDidMount() {
        super.componentDidMount();
        MovieActions.getAll();
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

export default injectRouter( MovieList );
