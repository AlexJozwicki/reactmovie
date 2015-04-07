import React from 'react';
import Router from 'react-router';
import Home from './home';
import BasicReactSample from './BasicReactSample';
import MovieList from './MovieList';


/**
 * The routes of your application.
 *
 * The handler `Home` is the scaffolding of the application and is always rendered.
 * Afterwards, React Router will resolve the routes, and pass the proper React component to Home.
 * Home will then insert it into its rendering.
 */
const routes = (
    <Router.Route path="/" handler={Home}>
        <Router.DefaultRoute handler={MovieList} />
        <Router.Route name="MovieList" path="/list" addHandlerKey={true} handler={MovieList}/>
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
