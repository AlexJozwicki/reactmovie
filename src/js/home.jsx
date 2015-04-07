import React from 'react';
import Router from 'react-router';
import { injectRouter } from './utils';


class NavBar extends React.Component {
    constructor( props ) {
        super( props );
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
              </div>
            </nav>
        );
    }
}

injectRouter( NavBar );


/**
 * Home is now the scaffolding component of the application:
 * React Router will always render this component.
 *
 * The component corresponding to the active route is rendered using Router.RouteHandler
 */
export default class Home extends React.Component {
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
