var Reflux = require("reflux");
var Immutable = require("immutable");
var Moment = require("moment");
var YahooQuoteActions = require("./YahooQuoteActions");
var { YahooQuote } = require("../models");
var isArray = require("../utils/Utils").js.isArray;
var isObject = require("../utils/Utils").js.isObject;

const YahooDateTimePattern = "YYYY-MM-DD[T]HH:mm:ssZ";
const aLongTimeAgo = "2000-01-01T00:00:00Z";

const defaultQuotes = Immutable.Map({
    YHOO: {},
    AAPL: {},
    GOOG: {},
    MSFT: {}
});

var YahooQuoteStore = Reflux.createStore({

    listenables: YahooQuoteActions,

    init() {
        this.quotes = defaultQuotes;
        this.lastUpdateAt = Moment(aLongTimeAgo, YahooDateTimePattern);
    },

    onRefreshQuotes() {
        var quotesSymbols = this.quotes.keySeq().toArray();
        if(quotesSymbols.length > 0) {
            YahooQuoteActions.getQuotes(quotesSymbols);
        } else {
            this.quotes = this.quotes.clear();
            this.lastUpdateAt = Moment();
            this.trigger(this.quotes);
        }
    },

    onRefreshQuote(symbol) {
        YahooQuoteActions.getQuotes([symbol]);
    },

    onGetQuotesCompleted(apiResponse) {

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

            if(isArray(apiQuotes)) {
                this.quotes = this.quotes.withMutations( (currentQuotes) => {
                    apiQuotes.forEach((quoteObj) => {
                        var quote = YahooQuote.fromObject(quoteObj);
                        currentQuotes.set(quote.symbol, quote);
                    });
                }).sortBy(q => q.symbol);

            } else if(isObject(apiQuotes)) {
                var quote = YahooQuote.fromObject(apiQuotes);
                this.quotes = this.quotes.set(quote.symbol, quote).sortBy(q => q.symbol);
            }

            this.lastUpdateAt = Moment(apiResponse.query.created, YahooDateTimePattern);
            this.trigger(this.quotes);
        }
    },

    onGetQuotesFailed(someError) {
        console.log("something went wrong with quotes api. Error:", someError);
    },

    onAddQuoteSymbols(symbols) {
        this.quotes = this.quotes.withMutations( (currentQuotes) => {
            symbols.forEach((symbol) => {
                if(!currentQuotes.has(symbol)) {
                    currentQuotes.set(symbol, {});
                }
            });
        });
        YahooQuoteActions.getQuotes(symbols);
    },

    onRemoveQuoteSymbols(symbols) {
        this.quotes = this.quotes.withMutations( (currentQuotes) => {
            symbols.forEach((symbol) => {
                currentQuotes.delete(symbol);
            });
        });
        this.trigger(this.quotes);
    }

});

module.exports = YahooQuoteStore;
