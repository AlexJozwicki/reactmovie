var React           = require( 'react' );
var BasicReactSample = require( './BasicReactSample' );


/**
 * We start to split components into their own classes
 */
class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand" href="#">React movie</a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li><a href="#">My movies</a></li>
                  </ul>
                </div>
              </div>
            </nav>
        );
    }
}


/**
 * Home now composes several components together
 * - NavBar defined here
 * - BasicReactSample defined in another file, included using require
 */
class Home extends React.Component {
    render(){
        return (
            <div id="wrapper">
                <NavBar/>
                <BasicReactSample />
            </div>
        );
    }
}

module.exports = Home;
