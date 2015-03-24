var React           = require( 'react/addons' );
var Router          = require( 'react-router' );
var OnReadyStore    = require( './utils/OnReady' ).OnReadyStore;
var OnReadyActions  = require( './utils/OnReady' ).OnReadyActions;
var classnames      = require( 'classnames' );

var { FluxComponent } = require( './utils/flux' );

function injectRouter( cl ) {
    cl.contextTypes = {
        router: React.PropTypes.func.isRequired
    };

    return cl;
}


/**
 * Small loader
 */
var HomeLoader = <div id="loading-home" className='container'>
                    <div id="loader">
                        <span className="lead"><i className="fa fa-fw fa-spinner fa-spin"></i>&nbsp;Loading stuff, getting things ready...</span>
                    </div>
                 </div>;


class NavBar extends FluxComponent {
    constructor( props ) {
        super( props, { isReady: OnReadyStore } );
    }

    render() {
        var spinnerClasses = classnames({"fa fa-lg fa-spinner fa-spin": !this.state.isReady});

        return (
            <nav id='nav' className="navbar navbar-fixed-top" role="navigation">
                <ul className="">
                    <li>
                        <a href="#" title="Search" className="navbar-link">
                            <i className="fa fa-search"></i>
                        </a>
                    </li>
                    <li>
                        <a href={this.context.router.makeHref( 'page1' )} className="navbar-link main-ui-link">
                            Page1
                        </a>
                    </li>
                    <li>
                        <a href={this.context.router.makeHref( 'page2' )} className="navbar-link main-ui-link">
                            Page2
                        </a>
                    </li>
                    <li>
                        <a href={this.context.router.makeHref( 'page3' )} className="navbar-link main-ui-link">
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
}
injectRouter( NavBar );



/**
 *
 * HOME PAGE
 *
 */
class Home extends React.Component {
    constructor( props ) {
        super( props )
    }

    componentDidMount(){
        OnReadyActions.updateStatus( true )
    }

    render(){
        return (
            <div ref="app" id="wrapper" >
                <NavBar/>
                <div id="side"></div>
                <div id="content" className="container">
                    <Router.RouteHandler />
                </div>
            </div>
        );
    }
}

module.exports = injectRouter( Home );
