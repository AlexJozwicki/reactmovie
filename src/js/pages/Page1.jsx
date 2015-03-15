var React = require("react/addons");
var Reflux = require("reflux");
var YahooQuoteStore = require("../stores/YahooQuoteStore");
var YahooQuoteActions = require("../stores/YahooQuoteActions");

var Page1 = React.createClass({

    mixins:[Reflux.connect(YahooQuoteStore,"quotes")],

    getInitialState() {
        return ({
            quotes:[]
        });
    },

    componentDidMount() {
        YahooQuoteActions.getQuotes(["YHOO", "AAPL", "GOOG", "MSFT", "GE"]);
    },

    componentWillReceiveProps()  {
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
                {this.state.quotes.map(q => this.renderQuote(q) )}
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
