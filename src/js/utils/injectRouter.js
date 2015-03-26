var React           = require( 'react' );


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

module.exports = injectRouter;
