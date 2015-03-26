var React       = require( 'react' );
var _           = require( 'lodash' );
var classnames  = require( 'classnames' );
var Modal       = require( './components/Modal' );
var Movie       = require( './Movie' );
var MovieForm   = require( './MovieForm' );
var Guid        = require( './utils/Guid' );


/**
 * This is only the INITIAL list of movies and will never change.
 */
const movies = [
    {
        id: 1,
        title : "Avatar",
        releaseYear : "2010",
        poster : "avatar.jpg",
        directors : "James Cameron",
        actors : "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang, Michelle Rodriguez",
        synopsis : "Sur la lointaine planète de Pandora, Jake Sully, un héros malgré lui, " +
            "se lance dans une quête de rédemption, de découverte, d'amour inattendu, dont l'issue sera un " +
            "combat héroïque pour sauver toute une civilisation.",
        rate : "3"
    },
    {
        id: 2,
        title : "Seigneur des Anneaux : La Communauté de l'Anneau",
        releaseYear : "2003",
        poster : "seigneurdesanneaux1.jpg",
        directors : "Peter Jackson",
        actors : "Elijah Wood, Sean Astin, Ian McKellen, Sala Baker, Viggo Mortensen",
        synopsis : "Frodon le Hobbit hérite de l'Anneau Unique, un instrument de pouvoir absolu" +
            "qui permettrait à Sauron, le Seigneur des ténèbres, de régner sur la Terre du Milieu." +
            " Commence alors un vaste périple visant à la destruction de l'objet.",
        rate : "5"
    },
    {
        id: 3,
        title : "The Grudge",
        releaseYear : "2004",
        poster : "thegrudge.jpg",
        directors : "Takashi Shimizu",
        actors : "Sarah Michelle Gellar, Jason Behr, Clea DuVall, Kadee Strickland, Bill Pullman",
        synopsis : "Dans ce qui paraît être une paisible maison de Tokyo se cache un épouvantable fléau. " +
            "Quiconque franchit le seuil de la demeure est aussitôt frappé par une malédiction qui ne tardera " +
            "pas à le tuer dans un sentiment d'indicible rage...",
        rate : "4"
    },
    {
        id: 4,
        title : "Yip Man 2",
        releaseYear : "2010",
        poster : "yipman.jpg",
        directors : "Wilson Yip",
        actors : "Donnie Yen, Sammo Hung Kam-Bo, Simon Yam, Lynn Hung, Xiaoming Huang",
        synopsis : "Film biographique sur la vie de Ip Man, pionnier du Wing Chun et maitre de Bruce Lee.",
        rate : "5"
    }
];



class MovieList extends React.Component {
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
        return (
            <div>
                <button className="btn btn-default" onClick={this.showModal.bind( this )}>Add movie</button>
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

module.exports = MovieList;
