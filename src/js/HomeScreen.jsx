var React           = require( 'react' );


/**
 * Home Screen component, rendered into the DOM by app.js
 *
 * In React, everything is a component and inherits from React.Component.
 */
class Home extends React.Component {
    /**
     * Every component has a render method to render itself.
     * The render method returns a Component Tree using the JSX syntax.
     *
     * The JSX syntax helps creating a tree of components.
     * It is important to understand that each instance of a XML tag is directly converted
     * into a JavaScript object.
     * This is therefore legal:
     *     var foo = <span>foo</span>;
     * foo will be a JavaScript object like any other.
     *
     * Return can therefore only return one and only one component.
     */
    render(){
        return (
            <div id="wrapper">
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
                <div>
                    <h1>Welcome to React movie</h1>
                </div>
            </div>
        );
    }
}

module.exports = Home;
