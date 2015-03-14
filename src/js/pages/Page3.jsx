var React = require("react/addons");
var { InfodataApi } = require("../api");

var Page3 = React.createClass({

    getInitialState() {
        return {data: {}};
    },

    componentDidMount() {

        InfodataApi.getDosDetails()
            .then((data) => {
                this.setState({data: data[0]});
            })
            .catch((e) => {});
    },

    render() {
        return <div><code>{JSON.stringify(this.state.data.exe)}</code></div>;
    }
});

module.exports = Page3;
