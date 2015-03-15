var React = require("react/addons");
var Router = require("react-router");
var Reflux = require("reflux");
var AppConfig = require("AppConfig");
var OnReadyStore = require("./utils/OnReady").OnReadyStore;
var OnReadyMixin = require("./utils/OnReady").OnReadyMixin;
var { Page1, Page2, Page3 } = require( "./pages" );

/**
 * Small loader
 */
var HomeLoader = <div id="loading-home" className='container'>
                    <div id="loader">
                        <span className="lead"><i className="fa fa-fw fa-spinner fa-spin"></i>&nbsp;Loading stuff, getting things ready...</span>
                    </div>
                 </div>;

var NavBar = React.createClass({

    mixin:[Reflux.connect(OnReadyStore,'isReady')],

    getInitialState() {
        return {
            showSpinner: false
        };
    },

    onUpdateStatus(isReady) {
        console.log("??", isReady);
        if(isReady) {
            setTimeout(function() {  // The spinner is displayed for at least 500ms
                this.setState({showSpinner:false});
            }.bind(this), 500);
        } else {
            this.setState({showSpinner:true});
        }
    },

    render() {
        
        var spinnerClasses = React.addons.classSet({"fa fa-lg fa-spinner fa-spin": this.state.showSpinner});

        return (
            <nav id='nav' className="navbar navbar-fixed-top" role="navigation">
                <ul className="">
                    <li>
                        <a href="#" title="Search" className="navbar-link">
                            <i className="fa fa-search"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#/page1" className="navbar-link main-ui-link">
                            Page1
                        </a>
                    </li>
                    <li>
                        <a href="#/page2" className="navbar-link main-ui-link">
                            Page2
                        </a>
                    </li>
                    <li>
                        <a href="#/page3" className="navbar-link main-ui-link">
                            Page3
                        </a>
                    </li>
                    <li>
                        <p className='navbar-text'><i className={spinnerClasses}/></p>
                    </li>
                </ul>
                <ul className="navbar-right">
                    <li>
                        <a href="#" title="Logout" className="navbar-link">
                            <i className='fa fa-sign-out'/>&nbsp;Sponge bob
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
});

/**
 *
 * HOME PAGE
 *
 */
var Home = React.createClass({

    mixins: [
        Router.Navigation,
        Router.State,
        OnReadyMixin(HomeLoader)
    ],

    getInitialState() {
        return {};
    },

    componentDidMount(){
        this.setReadyToRender();
    },

    componentWillReceiveProps(){
        this.setReadyToRender();
    },

    render(){
        var renderContent = () => {
            return (
                <div ref="app" id="wrapper" >
                    <NavBar/>
                    <div id="side"></div>
                    <div id="content" className="container">
                        <Router.RouteHandler />
                    </div>
                </div>
            );
        };
        return this.renderOnReady(renderContent);
    }
});

var routes = (
    <Router.Route path="/" handler={Home}>
        <Router.DefaultRoute handler={Page1} />
        <Router.Route name="page1" path="/page1" addHandlerKey={true} handler={Page1}/>
        <Router.Route name="page2" path="/page2" addHandlerKey={true} handler={Page2}/>
        <Router.Route name="page3" path="/page3" addHandlerKey={true} handler={Page3}/>
        <Router.NotFoundRoute handler={Page1}/>
    </Router.Route>
);

module.exports = routes;
