var React = require("react/addons");
var QuoteApi = require("../api/YahooApi").QuoteApi;

var Page1 = React.createClass({

    componentDidMount: () => {
        QuoteApi.getQuotes(["YHOO", "AAPL", "GOOG", "MSFT"]);
    },

    render: () => {
        return <div>Page1</div>;
    }
});

module.exports = Page1;
