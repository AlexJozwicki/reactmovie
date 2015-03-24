var React = require("react/addons"),
    Reflux = require("reflux"),
    DefaultLoadingContent = require("./DefaultLoader");

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var OnReadyActions = Reflux.createActions([
    "updateStatus"
]);

var OnReadyStore = Reflux.createStore({
    listenables: OnReadyActions,

    init() {
        this.isReady = false;
    },

    value() {
        return this.isReady;
    },

    onUpdateStatus(isReady) {
        this.isReady = isReady;

        if( isReady ) {
            setTimeout( () => this.trigger( this.value() ), 500 );
        }
        else {
            this.trigger(this.isReady);
        }
    }
});


module.exports = {
    OnReadyActions: OnReadyActions,
    OnReadyStore  : OnReadyStore
};
