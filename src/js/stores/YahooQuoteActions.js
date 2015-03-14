var Reflux = require("reflux");
var QuoteApi = require("../api").YahooApi.QuoteApi;

var YahooQuoteActions = {
    getQuotes : Reflux.createAction( { asyncResult: true } )
};

YahooQuoteActions.getQuotes.listenAndPromise( QuoteApi.getQuotes );

module.exports = YahooQuoteActions;
