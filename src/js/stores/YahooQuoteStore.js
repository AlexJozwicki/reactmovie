var Reflux = require("reflux");
var Moment = require("moment");
var YahooQuoteActions = require("./YahooQuoteActions");
var { YahooQuote } = require("../models");
var isArray = require("../utils/Utils").js.isArray;
var isObject = require("../utils/Utils").js.isObject;

const YahooDateTimePattern = "YYYY-MM-DD[T]HH:mm:ssZ";
const aLongTimeAgo = "2000-01-01T00:00:00Z";
const defaultQuotes = { // default quotes
    YHOO:{},
    AAPL:{},
    GOOG:{},
    MSFT:{}
};

var YahooQuoteStore = Reflux.createStore({

    listenables:YahooQuoteActions,

    init() {
        this.quotes = defaultQuotes;
        this.lastUpdateAt = Moment(aLongTimeAgo, YahooDateTimePattern);
    },

    onRefreshQuotes() {
        var quotesSymbols = Object.keys(this.quotes);
        if(quotesSymbols.length > 0) {
            YahooQuoteActions.getQuotes(quotesSymbols);
        } else {
            this.quotes = {};
            this.lastUpdateAt = Moment();
            this.trigger(this.quotes);
        }
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
                var quotes = apiQuotes.reduce ( (quotes, quoteObj) => {
                    var quote = YahooQuote.fromObject(quoteObj);
                    quotes[quote.symbol] = quote;
                    return quotes;
                }, this.quotes );
                this.quotes = quotes;

            } else if(isObject(apiQuotes)) {
                var quote = YahooQuote.fromObject(apiQuotes);
                this.quotes[quote.symbol] = quote;
            }

            this.lastUpdateAt = Moment(apiResponse.query.created, YahooDateTimePattern);
            this.trigger(this.quotes);
        }
    },

    onGetQuotesFailed(someError) {
        console.log('something went wrong with quotes api. Error:', someError);
    },

    onAddQuoteSymbols(symbols) {
        symbols.forEach((symbol) => {
            if(!this.quotes[symbol]) {
                this.quotes[symbol] = {};
            }
        });
        YahooQuoteActions.refreshQuotes();
    },

    onRemoveQuoteSymbols(symbols) {
        symbols.forEach((symbol) => {
            delete this.quotes[symbol];
        });
        this.trigger(this.quotes);
    }

});

module.exports = YahooQuoteStore;
