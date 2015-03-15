var Reflux = require("reflux");
var Moment = require("moment");
var YahooQuoteActions = require("./YahooQuoteActions");
var { YahooQuote } = require("../models");

const YahooDateTimePattern = "YYYY-MM-DD[T]HH:mm:ssZ";
const aLongTimeAgo = "2000-01-01T00:00:00Z";

var YahooQuoteStore = Reflux.createStore({

    listenables:YahooQuoteActions,

    init() {
        this.quotes = {};
        this.lastUpdateAt = Moment(aLongTimeAgo, YahooDateTimePattern);
    },

    onRefreshQuotes() {
        var quotesSymbols = Object.keys(this.quotes);
        YahooQuoteActions.getQuotes(quotesSymbols);
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
        *       - quote:array of quote
        * */

        if(apiResponse.query && apiResponse.query.count > 0 && apiResponse.query.results.quote) {
            //this.quotes = apiResponse.query.results.quote.map ( r => YahooQuote.fromObject(r) );
            var quotes = apiResponse.query.results.quote.reduce ( (quotes, quoteObj) => {
                var quote = YahooQuote.fromObject(quoteObj);
                quotes[quote.symbol] = quote;
                return quotes;
            }, this.quotes );
            this.quotes = quotes;

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
