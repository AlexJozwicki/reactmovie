var Reflux = require( 'reflux' );

var testUtils = {
    testAction : function (action, callback) {
        Reflux.createStore().listenTo(action, function () {
            callback.apply(this, arguments);
            action.emitter.removeAllListeners();
        });
    }
}

module.exports = testUtils;
