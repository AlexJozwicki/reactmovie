var React           = require( 'react' );
var Router          = require( 'react-router' );
var classnames      = require( 'classnames' );
var FluxComponent   = require( 'airflux/lib/FluxComponent' );
var MovieActions    = require( './stores/MovieActions' );
var Immutable       = require( 'immutable' );
var { Guid,
      injectRouter }= require( './utils' );


class NavBar extends React.Component {
    constructor( props ) {
        super( props );
    }

    /**
     * We use this.context.router.makeHref to generate a link to a route.
     * The first arguments is the name of the route, as defined in the routes of app.js
     */
    render() {
        return (
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand" href="#">React movie</a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li><a href={this.context.router.makeHref( 'MovieList' )}>My movies</a></li>
                    <li><a href={this.context.router.makeHref( 'NewMovie' )}>Add movie</a></li>
                  </ul>
                </div>
              </div>
            </nav>
        );
    }
}
injectRouter( NavBar );




/**
 *
 * HOME PAGE
 *
 */
class Home extends FluxComponent {
    constructor( props ) {
        // we listen to the `movieAdded` action, which will call the `movieAdded` method of our class
        super( props, {
            movieAdded      : MovieActions.addMovie.completed,
            addMovieFailed  : MovieActions.addMovie.failed
        } );

        this.state = { notifications: Immutable.List()};
    }

    /**
     * We display a small notification that a movie was added
     */
    movieAdded( movie ) {
        this.addNotification( `${movie.title} was added` );
    }

    addMovieFailed( error ) {
        this.addNotification( `${error.error}` );
    }

    addNotification( message, isError = false ) {
        this.setState( { notifications: this.state.notifications.push( { id: Guid.generate(), message: message, isError: isError } ) } );
        setTimeout( () => this.setState( { notifications: this.state.notifications.shift() } ), 3000 );
    }

    render(){
        return (
            <div id="wrapper">
                <NavBar/>
                { this.state.notifications.map( ( notification ) =>
                    <div key={notification.id} className={classnames( 'alert', { 'alert-success': !notification.isError, 'alert-danger': notification.isError } )}>{notification.message}</div>
                )}
                <Router.RouteHandler />
            </div>
        );
    }
}

module.exports = injectRouter( Home );
