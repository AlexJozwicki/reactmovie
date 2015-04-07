import React from 'react';


class BasicReactSample extends React.Component {
    constructor(props) {
        super( props );
        this.state = { name: 'John Doe' };  // the state holds the dynamic data of your components
    }

    /**
     * A function returning a ValueLink object is the recommanded way in React to bind inputs
     */
    linkState( key ) {
        return {
            value: this.state[ key ],
            requestChange: ( value ) => this.setState( { [key]: value } )
        };
    }

    render() {
        return (
            <div>
                <h1>Welcome {this.state.name} to React movie</h1>
                <input type="text" valueLink={this.linkState( 'name' )}/>
            </div>
        );
    }
}

module.exports = BasicReactSample;
