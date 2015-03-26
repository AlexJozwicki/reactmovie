var React       = require( 'react' );
var Immutable   = require( 'immutable' );
var classnames  = require( 'classnames' );

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

// checking of types passed by the parents is done by setting the static attribute `propTypes`
Movie.propTypes = { movie: React.PropTypes.object.isRequired };



class MovieList extends React.Component {
    constructor(props) {
        super( props );
    }

    render() {
        return (
            <div>
                <ul className="thumbnails">
                { /* we use JavaScript maps to transform a collection of data into a collection of components */}
                { /* each child of this collection needs to have a unique `key` attribute to be identified by React */}
                { movies.map( ( movie ) => <Movie movie={movie} key={movie.id} /> )}
                </ul>
            </div>
        );
    }
}

module.exports = MovieList;
