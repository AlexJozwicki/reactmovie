var _       = require( 'lodash' );
var React   = require( 'react/addons' );


/**
 * A component that is wired on Fluo or Reflux stores.
 *
 */
class FluxComponent extends React.Component {
    constructor( props, listenables ) {
        super( props );
        this.state = {};
        this.listenables = listenables;
        this.subscriptions = [];

        for( var key in this.listenables ) {
            let listenable = this.listenables[key];
            if( !_.isFunction( this[key] ) )
                this.state[key] = _.isFunction( listenable.value ) ? listenable.value() : void 0;
        }
    }

    /**
     * Checks whether every stores have returned a value
     * @private
     * @return {Boolean}
     */
    _storesConnected() {
        var res = true;
        for( var key in this.listenables ) {
            res = res && this.state[ key ];
        }
        return res;
    }

    /**
     * Listen to all stores
     */
    componentDidMount() {
        var thisComponent = this;
        for( var key in this.listenables ) {
            let listenable = this.listenables[key];
            if( _.isFunction( this[key] ) ) {
                this.subscriptions.push( listenable.listen( function() {
                    thisComponent[key]( ...arguments )
                } ) );
            }
            else
                this.subscriptions.push( listenable.listen( ( value ) => this.setState( { [key]: value } ) ) );
        }
    }


    /**
     * Unregister from the stores
     */
    componentWillUnmount() {
        this.subscriptions.forEach( ( unsubscribe ) => unsubscribe() );
    }
}

module.exports = FluxComponent;
