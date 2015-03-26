// https://github.com/github/fetch
// require here because it's polyfill...
require( 'whatwg-fetch' );

var React   = require('react');
var Router  = require('react-router');
var Home    = require('./home');
var { Page1, Page2, Page3 } = require( "./pages" );


/**
 * The routes of your application
 */
const routes = (
    <Router.Route path="/" handler={Home}>
        <Router.DefaultRoute handler={Page1} />
        <Router.Route name="page1" path="/page1" addHandlerKey={true} handler={Page1}/>
        <Router.Route name="page2" path="/page2" addHandlerKey={true} handler={Page2}/>
        <Router.Route name="page3" path="/page3" addHandlerKey={true} handler={Page3}/>
        <Router.NotFoundRoute handler={Page1}/>
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
