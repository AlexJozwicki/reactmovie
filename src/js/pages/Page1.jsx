var _ = require( 'lodash' );
var React = require("react/addons");
var Reflux = require("reflux");
var YahooQuoteStore = require("../stores/YahooQuoteStore");
var YahooQuoteActions = require("../stores/YahooQuoteActions");
var YahooQuote = require("./components/YahooQuote");
var PageLoader = require("./PageLoader");



class FluxComponent extends React.Component {
    constructor( props, stores ) {
        super( props );
        this.state = {};
        this.stores = stores;
        this.subscriptions = [];
    }

    componentDidMount() {
        for( var key in this.stores ) {
            this.state[key] = {};
            this.subscriptions.push( this.stores[key].listen( ( value ) => this.setState( { [key]: value } ) ) );
        }
    }

    componentWillMount() {
        this.subscriptions.forEach( ( unsubscribe ) => unsubscribe() );
    }
}

class FluxAsyncComponent extends FluxComponent {
    constructor( props, stores ) {
        super( props, stores );
        this.state = { render: false };
    }

    resolve( action, reaction, result ) {
        var thisComponent = this;

        this.setState( {render: false}, () => {
            var unsubscribe = reaction.listen( function() {
                unsubscribe();
                if( _.isFunction( result ) ) {
                    result.apply( thisComponent, arguments );
                    thisComponent.setState( { render: true } );
                }
                else {
                    thisComponent.setState( { render: true, [result]: arguments[0] } );
                }
            });
            action();
        } );
    }

    componentDidMount() {
        super.componentDidMount();
        this.load();
    }

    componentWillReceiveProps() {
        this.load();
    }

    renderLoader() {
        return <PageLoader message="Retrieving quotes..." />;
    }

    render( component ) {
        if( this.state.render ) 
            return this.renderAsync();
        else
            return this.renderLoader();
    }
}


class YahooQuotes extends React.Component {
    constructor( props ) {
        super( props );
    }

    onRemoveQuote(symbol) {
        YahooQuoteActions.removeQuoteSymbols([symbol]);
    }

    onRefreshAllQuotes() {
        YahooQuoteActions.refreshQuotes();
    }

    onRefreshQuote(symbol) {
        YahooQuoteActions.refreshQuote(symbol);
    }

    handleKeyDown(e){
        if(e.type === "keydown" && e.keyCode === 13) {
            e.preventDefault();
            var input = e.target.value.replace(/[\[\]{},;]/g, "");
            if(input && input.length > 0) {
                YahooQuoteActions.addQuoteSymbols([input.toUpperCase()]);
            }
            e.target.value = "";
        }
    }

    render() {
        var symbols = this.props.quotes.keySeq().toArray();
        return (
            <div>
                <div className="col-sm-12">
                    <p>{YahooQuoteStore.lastUpdateAt.fromNow()}</p>
                    <button className="btn btn-primary btn-xs" onClick={this.onRefreshAllQuotes}>Refresh all quotes</button>
                    <hr/>
                </div>
                {symbols.map(s => <YahooQuote key={s} quote={this.props.quotes.get(s)} onRemove={this.onRemoveQuote} onRefresh={this.onRefreshQuote} />)}
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                    <div className="quote thumbnail">
                        <input className="new-quote-input" type="text" placeholder="type a quote (i.e. 'ge'), press enter" onKeyDown={this.handleKeyDown} />
                    </div>
                </div>
            </div>
        );
    }
}



class Page1 extends FluxAsyncComponent {
    constructor( props ) {
        super( props, { quotes: YahooQuoteStore } );
    }

    load() {
        this.resolve( YahooQuoteActions.refreshQuotes, YahooQuoteStore, 'quotes' );
    }

    renderAsync() {
        return <YahooQuotes quotes={this.state.quotes}/>;
    }
}

module.exports = Page1;
