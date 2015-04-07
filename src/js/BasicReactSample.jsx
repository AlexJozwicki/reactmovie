import React from 'react';



export default class BasicReactSample extends React.Component {
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

    changeName( name ) {
        /**
         * Every changes of your state goes through a `setState` call.
         * React will then decide whether your components need repainting.
         */
        this.setState( { name: name } );
    }

    render() {
        return (
            <div>
                <h1>Welcome {this.state.name} to React movie</h1>
                { /* any valid JavaScript excpression can go inside the brackets */ }
                { /* state is accessed by using this.state. HMTL events take a function that will be */ }
                { /* called when the even is fired. */ }
                <input type="text" value={this.state.name} onChange={( e ) => this.changeName( e.target.value )}/>
            </div>
        );
    }
}
