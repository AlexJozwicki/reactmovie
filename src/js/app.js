var React   = require('react');
var Home    = require('./home');


/**
 * Render your React application into the DOM.
 * The correct way is to always render into a div and not directly the body, as third party scripts
 * can add scripts inside the body.
 */

React.render(<Home/>, document.getElementById('app-container'));
