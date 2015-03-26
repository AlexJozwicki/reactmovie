var React       = require( 'react' );
var Immutable   = require( 'immutable' );
var classnames  = require( 'classnames' );

class BasicReactSample extends React.Component {
    constructor(props) {
        super( props );
    }

    render() {
        return (
            <div>
                <h1>Welcome to React movie</h1>
            </div>
        );
    }
}

module.exports = BasicReactSample;
