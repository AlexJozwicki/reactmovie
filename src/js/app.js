require( 'whatwg-fetch' );

var React = require('react/addons'),
    Router = require('react-router'),
    HomeRoutes = require('./home');

var HomeApp = Router.run(HomeRoutes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app-container'));
});




