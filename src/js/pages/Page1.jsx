var React = require("react/addons");
var Immutable = require("immutable");
var Reflux = require("reflux");
var YahooQuoteStore = require("../stores/YahooQuoteStore");
var YahooQuoteActions = require("../stores/YahooQuoteActions");
var YahooQuote = require("./components/YahooQuote");
var PageLoader = require("./PageLoader");
var OnReadyActions = require("../utils/OnReady").OnReadyActions;
var OnReadyMixin = require("../utils/OnReady").OnReadyMixin;

var QuotesLoader = <PageLoader message="Retrieving quotes..." />;

var Page1 = React.createClass({

    mixins: [
        OnReadyMixin(QuotesLoader, true),
        Reflux.listenTo(YahooQuoteStore, "onQuotesUpdate"),
        React.addons.PureRenderMixin
    ],

    getInitialState() {
        return ({ quotes: {} });
        //return ({});
    },

    _initQuotes() {
        this.setNotReadyToRender();
        OnReadyActions.updateStatus(false);
        YahooQuoteActions.refreshQuotes();
    },

    componentDidMount() {
        this._initQuotes();
    },

    componentWillReceiveProps() {
        this._initQuotes();
    },

    onQuotesUpdate(quotes) {
        this.setState({quotes: quotes}, () => {
            OnReadyActions.updateStatus(true);
            this.setReadyToRender();
        });
    },

    handleKeyDown: function(e){
        if(e.type === "keydown" && e.keyCode === 13) {
            e.preventDefault();
            var input = e.target.value.replace(/[\[\]{},;]/g, "");
            if(input && input.length > 0) {
                YahooQuoteActions.addQuoteSymbols([input.toUpperCase()]);
                OnReadyActions.updateStatus(false);
            }
            e.target.value = "";
        }
    },

    renderQuotes() {
        var symbols = this.state.quotes.keySeq().toArray();
        return (
            <div>
                <div className="col-sm-12">{YahooQuoteStore.lastUpdateAt.fromNow()}</div>
                {symbols.map(s => <YahooQuote key={s} quote={this.state.quotes.get(s)} />)}
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                    <div className="quote thumbnail">
                        <input className="new-quote-input" type="text" placeholder="type a quote (i.e. 'ge'), press enter" onKeyDown={this.handleKeyDown} />
                    </div>
                </div>
            </div>
        );
    },

    render() {
        return this.renderOnReady( this.renderQuotes );
    }
});

module.exports = Page1;
