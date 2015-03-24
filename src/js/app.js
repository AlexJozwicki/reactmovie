require( 'whatwg-fetch' );

var React 	= require('react/addons');
var Router	= require('react-router');
var Home 	= require('./home');
var { Page1, Page2, Page3 } = require( "./pages" );


const routes = (
    <Router.Route path="/" handler={Home}>
        <Router.DefaultRoute handler={Page1} />
        <Router.Route name="page1" path="/page1" addHandlerKey={true} handler={Page1}/>
        <Router.Route name="page2" path="/page2" addHandlerKey={true} handler={Page2}/>
        <Router.Route name="page3" path="/page3" addHandlerKey={true} handler={Page3}/>
        <Router.NotFoundRoute handler={Page1}/>
    </Router.Route>
);

var HomeApp = Router.run( routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app-container'));
});
