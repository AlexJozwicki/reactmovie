var React = require("react/addons");
var Reflux = require("reflux");
var YahooQuoteStore = require("../stores/YahooQuoteStore");
var YahooQuoteActions = require("../stores/YahooQuoteActions");
var PageLoader = require("./PageLoader");
var OnReadyMixin = require("../utils/OnReady").OnReadyMixin;

var QuotesLoader = <PageLoader message="Retrieving quotes..." />;

var Page1 = React.createClass({

    mixins:[
        OnReadyMixin(QuotesLoader, true),
        Reflux.listenTo(YahooQuoteStore,"onQuotesUpdate")
    ],

    getInitialState() {
        return ({
            quotes:{}
        });
    },

    _initQuotes() {
        this.setNotReadyToRender();
        YahooQuoteActions.refreshQuotes();
    },

    componentDidMount() {
        this._initQuotes();
    },

    componentWillReceiveProps() {
        this._initQuotes();
    },

    onQuotesUpdate(quotes) {
        this.setState({quotes: quotes}, () => this.setReadyToRender());
    },

    onRemoveQuote(symbol) {
        YahooQuoteActions.removeQuoteSymbols([symbol]);
    },

    handleKeyDown: function(e){
        if(e.type == 'keydown' && e.keyCode === 13) {
            e.preventDefault();
            var input = e.target.value.replace(/[\[\]{},;]/g,'');
            if(input && input.length >0) {
                YahooQuoteActions.addQuoteSymbols([input.toUpperCase()]);
            }
            e.target.value = "";
        }
    },

    renderQuoteDetails(quote) {
        if(quote.Name) {
            return [
                <span key="qname"><b>{quote.Name}</b> <small>({quote.symbol})</small></span>,
                <ul key="qdetail">
                    <li>{quote.BookValue} {quote.Currency}</li>
                    <li>{quote.StockExchange}</li>
                    <li>{quote.Open} / {quote.DaysRange}</li>
                </ul>
            ];
        } else {
            return <span key="notfound">Quote with symbol <b>[{quote.symbol}]</b> was not found</span>;
        }
    },

    renderQuote(quote) {
        return (
            <div key={quote.symbol} className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                <div className="quote thumbnail">
                    {this.renderQuoteDetails(quote)}
                    <button type="button" onClick={this.onRemoveQuote.bind(null, quote.symbol)} className="btn btn-remove btn-warning btn-xs">Remove</button>
                </div>
            </div>
        );
    },

    renderQuotes() {
        return (
            <div>
                <div className="col-sm-12">{YahooQuoteStore.lastUpdateAt.fromNow()}</div>
                {Object.keys(this.state.quotes).sort().map( symbol => this.renderQuote(this.state.quotes[symbol]) )}
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                    <div className="quote thumbnail">
                        <input className="new-quote-input" type="text" placeholder="type a new quote symbol (i.e. 'ge')" onKeyDown={this.handleKeyDown} />
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
