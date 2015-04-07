import React from 'react';
import Router from 'react-router';
import Home from './home';
import BasicReactSample from './BasicReactSample';
import MovieList from './MovieList';
import MovieEditor from './editor';


/**
 * The routes of your application
 */
const routes = (
    <Router.Route path="/" handler={Home}>
        <Router.DefaultRoute handler={MovieList} />
        <Router.Route name="MovieList" path="/list" addHandlerKey={true} handler={MovieList}/>
        <Router.Route name="EditMovie" path="/edit/:id" addHandlerKey={true} handler={MovieEditor}/>
        <Router.Route name="NewMovie" path="/edit" addHandlerKey={true} handler={MovieEditor}/>
        <Router.NotFoundRoute handler={BasicReactSample}/>
    </Router.Route>
);

/**
 * Render your React application into the DOM.
 * The correct way is to always render into a div and not directly the body, as third party scripts
 * can add scripts inside the body.
 */
var HomeApp = Router.run( routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app-container'));
});
