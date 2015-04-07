import React from 'react';
import Router from 'react-router';
import classnames from 'classnames';
import { Guid, injectRouter } from './utils';
import FluxComponent    from 'airflux/lib/FluxComponent';
import * as MovieActions from './stores/MovieActions';
import Immutable        from 'immutable';


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
        super( props, { movieAdded: MovieActions.movieAdded, movieModified: MovieActions.movieModified } )
        this.state = { notifications: Immutable.List() };
    }

    /**
     * We display a small notification that a movie was added
     */
    movieAdded( movie ) {
        this.setState( { notifications: this.state.notifications.push( { id: Guid.generate(), message: `${movie.title} was added` } ) } );
        setTimeout( () => this.setState( { notifications: this.state.notifications.shift() } ), 3000 );
    }

    /**
     * We display a small notification that a movie was added
     */
    movieModified( movie ) {
        this.setState( { notifications: this.state.notifications.push( { id: Guid.generate(), message: `${movie.title} was modified` } ) } );
        setTimeout( () => this.setState( { notifications: this.state.notifications.shift() } ), 3000 );
    }

    render(){
        return (
            <div id="wrapper">
                <NavBar/>
                { this.state.notifications.map( ( notification ) => <div key={notification.id} className="alert alert-success">{notification.message}</div> ) }
                <Router.RouteHandler />
            </div>
        );
    }
}

export default injectRouter( Home );
