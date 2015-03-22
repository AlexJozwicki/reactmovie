var React = require("react/addons");
var YahooQuoteActions = require("../../stores/YahooQuoteActions");

var YahooQuote = React.createClass({

    mixins:[React.addons.PureRenderMixin],

    onRemoveQuote(symbol) {
        YahooQuoteActions.removeQuoteSymbols([symbol]);
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

    render() {
        console.log("render", this.props.quote.symbol);
        return (
            <div key={this.props.quote.symbol} className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                <div className="quote thumbnail">
                    {this.renderQuoteDetails(this.props.quote)}
                    <button type="button" onClick={this.onRemoveQuote.bind(null, this.props.quote.symbol)} className="btn btn-remove btn-warning btn-xs">Remove</button>
                </div>
            </div>
        );
    }
});

module.exports = YahooQuote;