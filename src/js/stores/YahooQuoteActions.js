var Reflux = require("reflux");
var QuoteApi = require("../api/YahooApi").QuoteApi;

var YahooQuoteActions = {

    // Trigger getQuotes with the current list of symbols stored in the store
    refreshQuotes: Reflux.createAction( { sync: true } ),

    // Trigger getQuotes on one specified quote (quote symbol as string)
    refreshQuote: Reflux.createAction( { sync: true} ),

    // Retrieve, from Yahoo API, a quote for each symbol specified in argument (either an array of string, or one string)
    // ~~~~~~~~~
    // With { asyncResult = true }, refluxJs generate children action (.completed, .failed) that will be wired
    // to the .then/.catch of any asynchronous action assigned with .listenAndPromise
    // ( ref: https://github.com/spoike/refluxjs#asynchronous-actions )
    getQuotes: Reflux.createAction( { asyncResult: true } ),

    // These actions expect an array of symbols to add or remove from the store
    addQuoteSymbols   : Reflux.createAction({sync: true}),
    removeQuoteSymbols: Reflux.createAction({sync: true})
};

// these actions must be triggered only if we have symbol(s) and symbol(s) not empty
YahooQuoteActions.getQuotes.shouldEmit = (symbols) => symbols && symbols.length > 0;
YahooQuoteActions.addQuoteSymbols.shouldEmit = (symbols) => symbols && symbols.length > 0;
YahooQuoteActions.removeQuoteSymbols.shouldEmit = (symbols) => symbols && symbols.length > 0;

// getQuotes action must apply the specified function (that return a promise) and listen for it resolve/reject
//YahooQuoteActions.getQuotes.listenAndPromise( QuoteApi.getQuotes );

// As we use now "fetch" for API request, if we want to get the json, we get another promise for that when calling .json()
YahooQuoteActions.getQuotes.listen( function( symbols ) {
    QuoteApi.getQuotes( symbols ).then( ( response ) => response.json() )
                                 .then( this.completed )
                                 .catch( this.failed );
});

module.exports = YahooQuoteActions;
