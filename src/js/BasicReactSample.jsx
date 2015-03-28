var React       = require( 'react' );



class BasicReactSample extends React.Component {
    constructor() {
        super();

        /**
         * In the constructor of the component, we initialize the state.
         * The state is where a React component holds the changing data of your component.
         */
        this.state = {
            name: 'John Doe'
        };
    }

    /**
     * Returns a ValueLink object, used by React to link an input to your React application.
     * This particular function links an input to the state of the component.
     * You can create your own functions.
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
                { /* we pass our ValueLink object to the `valueLink` property of an input */ }
                <input type="text" valueLink={this.linkState( 'name' )}/>
            </div>
        );
    }
}

module.exports = BasicReactSample;
