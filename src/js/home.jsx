var React           = require( 'react' );
var Router          = require( 'react-router' );
var classnames      = require( 'classnames' );

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
            <Router.RouteHandler />
        );
    }
}

module.exports = injectRouter( Home );
