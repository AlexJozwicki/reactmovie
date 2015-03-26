var React       = require( 'react' );
var Immutable   = require( 'immutable' );
var classnames  = require( 'classnames' );

class BasicReactSample extends React.Component {
    constructor(props) {
        super( props );
        this.state = { name: 'John Doe' };
    }

    render() {
        return (
            <div>
                <h1>Welcome {this.state.name} to React movie</h1>
                <input type="text" value={this.state.name} onChange={( e, value ) => this.setState( { name: e.target.value } )}/>
            </div>
        );
    }
}

module.exports = BasicReactSample;
