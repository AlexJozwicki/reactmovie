import React from 'react';
import _ from 'lodash';
import Modal from './components/Modal';

import Movie from './Movie';
import MovieForm from './MovieForm';
import { Guid } from './utils';


/**
 * This is only the INITIAL list of movies and will never change.
 */
var movies = require( './data/movies' );


export default class MovieList extends React.Component {
    constructor(props) {
        super( props );
        this.state = {
            displayForm: false,
            movies: movies          // movies collection will be changed, so we put it in the state.
        };
    }

    saveMovie( movie ) {
        if( movie.id ) {
            _.merge( _.find( this.state.movies, { id: movie.id } ), movie );
            this.setState( { movies: this.state.movies, displayForm: false } );
        }
        else {
            movie.id = Guid.generate();
            this.state.movies.push( movie );
            this.setState( { movies: this.state.movies, displayForm: false } );
        }
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
                        <button className="btn btn-primary" onClick={() => this.showModal()}>Add movie</button>
                    </div>
                </header>
                <ul className="thumbnails">
                    { /* we use JavaScript maps to transform a collection of data into a collection of components */}
                    { /* each child of this collection needs to have a unique `key` attribute to be identified by React */}
                    { this.state.movies.map( ( movie ) => <Movie movie={movie} key={movie.id} /> )}
                </ul>
                <Modal title="Add a movie" visible={this.state.displayForm} onCloseRequest={() => this.showModal( false )}>
                    <MovieForm saveMovie={this.saveMovie.bind( this )}/>
                </Modal>
            </div>
        );
    }
}
