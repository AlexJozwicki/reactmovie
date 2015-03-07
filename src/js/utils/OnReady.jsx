var React = require('react/addons'),
    Reflux = require('reflux'),
    DefaultLoadingContent = require('./DefaultLoader');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var OnReadyActions = Reflux.createActions([
    'updateStatus'
]);

var OnReadyStore = Reflux.createStore({
    listenables: OnReadyActions,

    init: function() {
        var isReady = false;
    },

    onUpdateStatus: function(isReady){
        this.isReady = isReady;
        this.trigger(isReady);
    }
});

var OnReadyMixin = function(loadingComponent, doAnimation) {

    if(!loadingComponent)
        loadingComponent = DefaultLoadingContent;

    return {

        getInitialState: function(){
            return {isReady:false}
        },

        setReadyToRender: function(){
            this.setState({isReady:true});
            OnReadyActions.updateStatus(true);
        },

        setNotReadyToRender: function(){
            this.setState({isReady:false});
            OnReadyActions.updateStatus(false);
        },

        renderOnReady: function (renderContent) {

            var key = 'onReady-loader';
            var content = loadingComponent;
            if(this.state.isReady) {
                key = 'onReader-content';
                content = renderContent.call( this );
            }

            if(doAnimation) {
                return (
                    <ReactCSSTransitionGroup transitionName="on-ready" component="div" className="transition-wrapper">
                        <div className="transition-element" key={key}>{content}</div>
                    </ReactCSSTransitionGroup>
                );
            } else {
                return content;
            }


        }
    }

}

module.exports = {
    OnReadyActions: OnReadyActions,
    OnReadyMixin: OnReadyMixin,
    OnReadyStore: OnReadyStore
};
