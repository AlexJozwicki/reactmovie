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
     * A ValueLink is a JavaScript object with a `value` and a `requestChange` function.
     *
     * This particular function links an input to the state of the component.
     *
     * ValueLink is THE correct way to bind an input in React. You should always use a ValueLink and avoid as much as
     * possible using plain onChange.
     *
     * Don't hesitate to create your own function returning a ValueLink object!
     * The implementation of requestChange can be anything you want: mapped directly to a variable of a store, setting
     * a dirty/modified flag, triggering an asynchronous action on a server (like a search, using a debounce function)..
     *
     * Checkboxes are a special case. The valueLink object will have the same interface (value/requestChange), but
     * will be passed to the checkbox using `checkedLink` instead of `valueLink`.
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
