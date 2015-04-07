import React from 'react';
import HomeScreen from './HomeScreen';


/**
 * Render your React application into the DOM.
 * The correct way is to always render into a div and not directly the body, as third party scripts
 * can add scripts inside the body.
 */
React.render( <HomeScreen/>, document.getElementById('app-container') );
