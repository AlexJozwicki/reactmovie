var airflux = require( 'airflux' );
var MovieActions = require( './MovieActions' );
var Guid        = require( '../utils/Guid' );


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


/**
 * A store is a component that sits at the top of the hierarchy.
 * It provides data for any component that listens to it.
 */
class MovieStore extends airflux.Store {
    constructor() {
        super();
        this.movies = movies;

        /**
         * Here we listen to the action `addMovie`
         */
        this.listenTo( MovieActions.addMovie, this.addMovie );
    }

    /**
     * The `state` of the store is directly passed to components listening to it
     */
    get state() { return this.movies; }


    addMovie( movie ) {
        movie.id = Guid.generate();
        this.movies.push( movie );
        this.publishState();    // tell every component listening to it that something has changed

        // we publish an event that a movie was added. component could listen to this
        // to receive only the last movie added instead of the whole state.
        MovieActions.movieAdded( movie );
    }
}


module.exports = new MovieStore();
