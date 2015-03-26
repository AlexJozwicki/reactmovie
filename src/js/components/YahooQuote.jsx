var React = require("react");
var Immutable = require("immutable");

class YahooQuote extends React.Component {

    constructor( props ) {
        super( props );
    }

    // Pure Rendering
    shouldComponentUpdate(nextProps, nextState) {
        return !!nextProps && !Immutable.is(this.props.quote, nextProps.quote);
    }

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
    }

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
};

YahooQuote.propTypes = {
    quote: React.PropTypes.object.isRequired
};

module.exports = YahooQuote;
