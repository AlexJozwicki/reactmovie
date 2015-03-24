var React = require("react/addons");
var { InfodataApi } = require("../api");

class Page3 extends React.Component {
    constructor( props ) {
        super( props );
        this.state = { 
            data: {}
        };
    }

    componentDidMount() {
        InfodataApi.getDosDetails()
            .then( (response) => response.json() )
            .then( ( data ) => {
                this.setState({data: data[0]});
            })
            .catch((e) => { console.log("some errors", e); });
    }

    render() {
        return <div><code>{JSON.stringify(this.state.data.exe)}</code></div>;
    }
}

module.exports = Page3;
