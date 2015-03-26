var React           = require( 'react' );
var Router          = require( 'react-router' );
var classnames      = require( 'classnames' );
var FluxComponent   = require( 'airflux/lib/FluxComponent' );
var MovieActions    = require( './stores/MovieActions' );
var Immutable       = require( 'immutable' );


/**
 * Injects the router into the class
 * @param  {React.Component} cl the class of your component
 * @return {React.Component}
 */
function injectRouter( cl ) {
    cl.contextTypes = {
        router: React.PropTypes.func.isRequired
    };

    return cl;
}


class NavBar extends FluxComponent {
    constructor( props ) {
        // we listen to the `movieAdded` action, which will call the `movieAdded` method of our class
        super( props, { movieAdded: MovieActions.movieAdded } );
        this.state = { notifications: Immutable.List() };
    }

    /**
     * We display a small notification that a movie was added
     */
    movieAdded( movie ) {
        this.setState( { notifications: this.state.notifications.push( `${movie.title} was added` ) } );
        setTimeout( () => this.setState( { notifications: this.state.notifications.shift() } ), 3000 );
    }

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
                  </ul>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    { this.state.notifications.map( ( notification ) => <li>{notification}</li> ) }
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
class Home extends React.Component {
    constructor( props ) {
        super( props )
    }

    render(){
        return (
            <div id="wrapper">
                <NavBar/>
                <Router.RouteHandler />
            </div>
        );
    }
}

module.exports = injectRouter( Home );
