var Reflux = require("reflux");
var Moment = require("moment");
var YahooQuoteActions = require("./YahooQuoteActions");
var { YahooQuote } = require("../models");

const YahooDateTimePattern = "YYYY-MM-DD[T]HH:mm:ssZ";
const aLongTimeAgo = "2000-01-01T00:00:00Z";

var YahooQuoteStore = Reflux.createStore({
    init() {
        this.quotes = [];
        this.lastUpdateAt = Moment(aLongTimeAgo, YahooDateTimePattern);
        this.listenTo( YahooQuoteActions.getQuotes.completed,  'onQuotesLoaded' );
        this.listenTo( YahooQuoteActions.getQuotes.failed,     'onQuotesFailed' );
    },

    onQuotesLoaded(apiResponse) {

        /*
        * The object return by Yahoo API has this structure :
        *
        * - query:object
        *   - count:number
        *   - created:date
        *   - lang:string
        *   - results:object
        *       - quote:array of quote
        * */

        if(apiResponse.query && apiResponse.query.count > 0 && apiResponse.query.results.quote) {
            this.quotes = apiResponse.query.results.quote.map ( r => YahooQuote.fromObject(r) );
            this.lastUpdateAt = Moment(apiResponse.query.created, YahooDateTimePattern);
            this.trigger(this.quotes);
        }
    },

    onQuotesFailed(someError) {
        console.log('quotes api error', someError);
    }
});

module.exports = YahooQuoteStore;
