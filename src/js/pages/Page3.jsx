var React = require("react/addons");
var InfodataApi = require("../api/InfoDataApi");

var Page3 = React.createClass({

    getInitialState() {
        return {data: {}};
    },

    componentDidMount() {

        InfodataApi.getDosDetails()
            .then((data) => {
                this.setState({data: data[0]});
            })
            .catch((e) => { console.log("some errors", e); });
    },

    render() {
        return <div><code>{JSON.stringify(this.state.data.exe)}</code></div>;
    }
});

module.exports = Page3;
