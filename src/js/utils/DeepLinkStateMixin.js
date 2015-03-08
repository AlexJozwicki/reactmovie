var Utils = require("./Utils");

var DeepLinkStateMixin = {

    _setPartialState: function(component, path, value){
        component.setState(Utils.updateIn(component.state, path, value));
    },

    linkState: function(path){
        return {
            value        : Utils.getIn(this.state, path),
            requestChange: this._setPartialState.bind(null, this, path)
        };
    }
};

module.exports = DeepLinkStateMixin;
