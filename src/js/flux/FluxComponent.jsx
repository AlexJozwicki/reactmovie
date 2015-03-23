var React = require( 'react/addons' );


/**
 * A component that is wired on Reflux stores.
 */
class FluxComponent extends React.Component {
    constructor( props, stores ) {
        super( props );
        this.state = {};
        this.stores = stores;
        this.subscriptions = [];
    }

    /**
     * Listen to all stores
     */
    componentDidMount() {
        for( var key in this.stores ) {
            this.state[key] = void 0;
            this.subscriptions.push( this.stores[key].listen( ( value ) => this.setState( { [key]: value } ) ) );
        }
    }

    /**
     * Unregister from the stores 
     */
    componentWillMount() {
        this.subscriptions.forEach( ( unsubscribe ) => unsubscribe() );
    }
}

module.exports = FluxComponent;
