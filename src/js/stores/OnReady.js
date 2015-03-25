var airflux = require("airflux");

var OnReadyActions = {
    updateStatus: new airflux.Action()
};

class OnReadyStore extends airflux.Store {
    constructor() {
        super();
        this.isReady = false;
        this.listenTo( OnReadyActions.updateStatus, this.statusUpdated );
    }

    value() {
        return this.isReady;
    }

    statusUpdated(isReady) {
        this.isReady = isReady;

        if( isReady ) {
            setTimeout( () => this.trigger( this.value() ), 500 );
        }
        else {
            this.trigger(this.isReady);
        }
    }
}


module.exports = {
    OnReadyActions: OnReadyActions,
    OnReadyStore  : new OnReadyStore()
};
