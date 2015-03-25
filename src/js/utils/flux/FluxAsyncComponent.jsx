var React           = require( 'react/addons' );
var FluxComponent   = require( './FluxComponent' );

/**
 * A component that will display its child once every store has returned a value.
 */
class FluxAsyncComponent extends FluxComponent {
    constructor( props, stores ) {
        super( props, stores );
    }


    /**
     * Rendering a default loader. Can be overriden by the caller.
     * @return {React.Component}
     */
    renderLoader() {
        return <PageLoader message="Loading..." />;
    }

    render( component ) {
        if( this.areStoresConnected() )
            return this.renderAsync();
        else
            return this.renderLoader();
    }
}

module.exports = FluxAsyncComponent;
