/* @flow */
var _ = require( "lodash" );
var Rtti = require( "./Rtti");

/**
 * Represents a YahooQuote.
 */
class YahooQuote extends Rtti {

    constructor(symbol, Name, Currency, StockExchange, BookValue) {
        this.symbol = symbol;
        this.Name = Name;
        this.Currency = Currency;
        this.StockExchange = StockExchange;
        this.BookValue = BookValue;
    }

    /**
     * Merges the default value with that of an object
     * @param  {Object} object plain JS object modeling a YahooQuote
     * @return {YahooQuote}
     */
    static fromObject( object )/*:YahooQuote*/ {
        var quote = _.merge( new YahooQuote(), _.cloneDeep( object ) );
        return quote;
    }
}

/** @type {String} Static RTTI: must be done manually since names are uglified */
YahooQuote.class = "YahooQuote";

module.exports = YahooQuote;

/*** YahooQuote content sample : ***/

/*AfterHoursChangeRealtime: null
 AnnualizedGain: null
 Ask: "42.94"
 AskRealtime: null
 AverageDailyVolume: "17223400"
 Bid: "42.77"
 BidRealtime: null
 BookValue: "41.35"
 Change: "-0.08"
 ChangeFromFiftydayMovingAverage: "-1.29"
 ChangeFromTwoHundreddayMovingAverage: "-2.38"
 ChangeFromYearHigh: "-9.75"
 ChangeFromYearLow: "10.72"
 ChangePercentRealtime: null
 ChangeRealtime: null
 Change_PercentChange: "-0.08 - -0.19%"
 ChangeinPercent: "-0.19%"
 Commission: null
 Currency: "USD"
 DaysHigh: "42.98"
 DaysLow: "42.44"
 DaysRange: "42.44 - 42.98"
 DaysRangeRealtime: null
 DaysValueChange: null
 DaysValueChangeRealtime: null
 DividendPayDate: null
 DividendShare: null
 DividendYield: null
 EBITDA: "682.48M"
 EPSEstimateCurrentYear: "0.90"
 EPSEstimateNextQuarter: "0.20"
 EPSEstimateNextYear: "0.92"
 EarningsShare: "7.45"
 ErrorIndicationreturnedforsymbolchangedinvalid: null
 ExDividendDate: null
 FiftydayMovingAverage: "44.16"
 HighLimit: null
 HoldingsGain: null
 HoldingsGainPercent: null
 HoldingsGainPercentRealtime: null
 HoldingsGainRealtime: null
 HoldingsValue: null
 HoldingsValueRealtime: null
 LastTradeDate: "3/13/2015"
 LastTradePriceOnly: "42.87"
 LastTradeRealtimeWithTime: null
 LastTradeTime: "4:00pm"
 LastTradeWithTime: "4:00pm - <b>42.87</b>"
 LowLimit: null
 MarketCapRealtime: null
 MarketCapitalization: "40.13B"
 MoreInfo: null
 Name: "Yahoo! Inc."
 Notes: null
 OneyrTargetPrice: "57.84"
 Open: "42.71"
 OrderBookRealtime: null
 PEGRatio: "-4.52"
 PERatio: "5.76"
 PERatioRealtime: null
 PercebtChangeFromYearHigh: "-18.53%"
 PercentChange: "-0.19%"
 PercentChangeFromFiftydayMovingAverage: "-2.91%"
 PercentChangeFromTwoHundreddayMovingAverage: "-5.25%"
 PercentChangeFromYearLow: "+33.34%"
 PreviousClose: "42.95"
 PriceBook: "1.04"
 PriceEPSEstimateCurrentYear: "47.63"
 PriceEPSEstimateNextYear: "46.60"
 PricePaid: null
 PriceSales: "8.71"
 SharesOwned: null
 ShortRatio: "1.20"
 StockExchange: "NMS"
 Symbol: "YHOO"
 TickerTrend: null
 TradeDate: null
 TwoHundreddayMovingAverage: "45.25"
 Volume: "9087016"
 YearHigh: "52.62"
 YearLow: "32.15"
 YearRange: "32.15 - 52.62"
 symbol: "YHOO"*/
