var YahooConfig = require("AppConfig").Yahoo;
var Resource = require("./Resource").Resource;
var { Uri, Utils} = require("../utils/index");

// Yahoo query for Quotes :
// q=select * from yahoo.finance.quotes where symbol in ("YHOO","AAPL","GOOG","MSFT")
// env= http://datatables.org/alltables.env
// format=json

var resource = new Resource();

var buildYahooParams = (query, env, format) => {
    return {
        q     : query || "",
        env   : env || "http://datatables.org/alltables.env",
        format: format || "json"
    };
};

var YahooApi = {

    QuoteApi: {
        getQuotes: (quotes) => {

            var flattenQuotes = "";
            if(Utils.js.isArray(quotes)) {
                flattenQuotes = quotes.map( q => `\"${q}\"` ).join(",");
            } else {
                flattenQuotes = `\"${quotes}\"`;
            }

            var query = `select * from yahoo.finance.quotes where symbol in (${flattenQuotes})`;
            return resource.get( new Uri( "{0}/v1/public/yql", YahooConfig.publicWebHost).query(buildYahooParams(query)) );
        }
    }
};

module.exports = YahooApi;
