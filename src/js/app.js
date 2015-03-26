// https://github.com/github/fetch
// require here because it's polyfill...
require( 'whatwg-fetch' );

var React   = require('react');
var Router  = require('react-router');
var Home    = require('./home');
var BasicReactSample = require( './BasicReactSample' );
var MovieList = require( './MovieList' );
var MovieEditor = require( './MovieEditor' );


/**
 * The routes of your application
 */
const routes = (
    <Router.Route path="/" handler={Home}>
        <Router.DefaultRoute handler={BasicReactSample} />
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
