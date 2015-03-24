var _                   = require( 'lodash' );
var Reflux              = require('reflux');
var Immutable           = require('immutable');
var Moment              = require('moment');
var YahooQuoteActions   = require('./YahooQuoteActions');
var { YahooQuote }      = require('../models');

const YahooDateTimePattern = "YYYY-MM-DD[T]HH:mm:ssZ";
const aLongTimeAgo      = "2000-01-01T00:00:00Z";

const defaultQuotes = Immutable.Map({
    YHOO: {},
    AAPL: {},
    GOOG: {},
    MSFT: {}
});

var YahooQuoteStore = Reflux.createStore({
    init() {
        this.quotes = defaultQuotes;
        this.lastUpdateAt = Moment(aLongTimeAgo, YahooDateTimePattern);

        this.listenTo( YahooQuoteActions.refreshQuotes, this.refreshQuotes );
        this.listenTo( YahooQuoteActions.refreshQuote, this.refreshQuote );
        this.listenTo( YahooQuoteActions.getQuotes.completed, this.getQuotesCompleted );
        this.listenTo( YahooQuoteActions.getQuotes.failed, this.getQuotesFailed );
        this.listenTo( YahooQuoteActions.addQuoteSymbols, this.addQuoteSymbols );
        this.listenTo( YahooQuoteActions.removeQuoteSymbols, this.removeQuoteSymbols );
    },

    /**
     * This should return the same value as every trigger
     */
    value() {
        return this.quotes;
    },


    refreshQuotes() {
        var currentQuotes = this.quotes;
        this.quotes = currentQuotes.clear();
        this.trigger( this.value() );

        var quotesSymbols = currentQuotes.keySeq().toArray();
        if(quotesSymbols.length > 0) {
            YahooQuoteActions.getQuotes(quotesSymbols);
        } else {
            this.lastUpdateAt = Moment();
            this.trigger( this.value() );
        }
    },

    refreshQuote(symbol) {
        YahooQuoteActions.getQuotes([symbol]);
    },

    getQuotesCompleted(apiResponse) {
        /*
        * The object returned by Yahoo API has this structure :
        *
        * - query:object
        *   - count:number
        *   - created:date
        *   - lang:string
        *   - results:object
        *       - quote:array of quote or one quote object if only one
        * */

        if(apiResponse.query && apiResponse.query.count > 0 && apiResponse.query.results.quote) {

            var apiQuotes = apiResponse.query.results.quote;

            if(_.isArray(apiQuotes)) {
                this.quotes = this.quotes.withMutations( (currentQuotes) => {
                    apiQuotes.forEach((quoteObj) => {
                        var quote = YahooQuote.fromObject(quoteObj);
                        currentQuotes.set(quote.symbol, quote);
                    });
                }).sortBy(q => q.symbol);

            } else if(_.isObject(apiQuotes)) {
                var quote = YahooQuote.fromObject(apiQuotes);
                this.quotes = this.quotes.set(quote.symbol, quote).sortBy(q => q.symbol);
            }

            this.lastUpdateAt = Moment(apiResponse.query.created, YahooDateTimePattern);
            this.trigger(this.value());
        }
    },

    getQuotesFailed(someError) {
        console.log("something went wrong with quotes api. Error:", someError);
    },

    addQuoteSymbols(symbols) {
        this.quotes = this.quotes.withMutations( (currentQuotes) => {
            symbols.forEach((symbol) => {
                if(!currentQuotes.has(symbol)) {
                    currentQuotes.set(symbol, {});
                }
            });
        });
        YahooQuoteActions.getQuotes(symbols);
    },

    removeQuoteSymbols(symbols) {
        this.quotes = this.quotes.withMutations( (currentQuotes) => {
            symbols.forEach((symbol) => {
                currentQuotes.delete(symbol);
            });
        });
        this.trigger(this.value());
    }

});

module.exports = YahooQuoteStore;
