var React = require("react/addons");
var Reflux = require("reflux");
var YahooQuoteStore = require("../stores/YahooQuoteStore");
var YahooQuoteActions = require("../stores/YahooQuoteActions");

var Page1 = React.createClass({

    mixins:[Reflux.connect(YahooQuoteStore,"quotes")],

    getInitialState() {
        return ({
            defaultQuotesSymbols:["YHOO", "AAPL", "GOOG", "MSFT", "GE"],
            quotes:[]
        });
    },

    componentDidMount() {
        YahooQuoteActions.addQuoteSymbols(this.state.defaultQuotesSymbols);
    },

    // As react-router could trigger refresh of page without component dismount, but with componentWillReceiveProps,
    // so we have to manage this case.
    componentWillReceiveProps()  {
        YahooQuoteActions.refreshQuotes();
    },

    renderQuote(quote) {
        return (
            <div key={quote.symbol} className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                <div className="quote thumbnail">
                    <span><b>{quote.Name}</b> <small>({quote.symbol})</small></span>
                    <ul>
                        <li>{quote.BookValue} {quote.Currency}</li>
                        <li>{quote.StockExchange}</li>
                        <li>{quote.Open} / {quote.DaysRange}</li>
                    </ul>
                </div>
            </div>
        );
    },

    renderQuotes() {
        return (
            <div>
                <div className="col-sm-12">{YahooQuoteStore.lastUpdateAt.fromNow()}</div>
                {Object.keys(this.state.quotes).map(symbol => this.renderQuote(this.state.quotes[symbol]) )}
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                    <div className="thumbnail">
                        <span>A new one</span>
                    </div>
                </div>
            </div>
        );
    },

    render() {
        return <div>{this.renderQuotes()}</div>;
    }
});

module.exports = Page1;
