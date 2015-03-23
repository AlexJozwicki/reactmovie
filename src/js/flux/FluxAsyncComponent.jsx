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
     * Whether the components can be rendered; we check every value returned by the stores we listen to
     * @private
     * @return {Boolean}
     */
    _canBeRendered() {
        var res = true;
        for( var key in this.stores ) {
            res = res && this.state[ key ];
        }
        return res;
    }

    /**
     * Rendering a default loader. Can be overriden by the caller.
     * @return {React.Component}
     */
    renderLoader() {
        return <PageLoader message="Loading..." />;
    }

    render( component ) {
        if( this._canBeRendered() ) 
            return this.renderAsync();
        else
            return this.renderLoader();
    }
}

module.exports = FluxAsyncComponent;
