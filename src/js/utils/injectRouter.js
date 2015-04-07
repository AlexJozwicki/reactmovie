import React from 'react';

/**
 * Injects the router into the class
 * @param  {React.Component} cl the class of your component
 * @return {React.Component}
 */
export default function injectRouter( cl ) {
    cl.contextTypes = {
        router: React.PropTypes.func.isRequired
    };

    return cl;
}
