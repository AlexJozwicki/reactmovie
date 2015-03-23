var React = require("react/addons");

var YahooQuote = React.createClass({

    // PureRenderMixin allow to trigger the rendering only if there's a change in updated props
    // Thanks to immutable collection in the YahooQuoteStore we can accomplish safe equality checks
    mixins:[React.addons.PureRenderMixin],

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
        return (
            <div key={this.props.quote.symbol} className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                <div className="quote thumbnail">
                    {this.renderQuoteDetails(this.props.quote)}
                    <button type="button" onClick={this.props.onRemove.bind(null, this.props.quote.symbol)} className="btn btn-remove btn-warning btn-xs">Remove</button>
                    <button type="button" onClick={this.props.onRefresh.bind(null, this.props.quote.symbol)} className="btn btn-refresh btn-primary btn-xs">Refresh</button>
                </div>
            </div>
        );
    }
});

module.exports = YahooQuote;