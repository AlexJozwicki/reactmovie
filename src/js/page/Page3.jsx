var React = require("react/addons"),
    $ = require("jquery");

var Page3 = React.createClass({

    getInitialState: () => {
        return {data: {}};
    },

    componentDidMount: function() {
        var self = this;
        $.ajax({
            url: "http://kpmg.infodata.lu/dos/AC.KPMG/detail",
            success: data => {
                self.setState({data: data[0]});
            }
        })
    },

    render: function() {
        return <div><code>{JSON.stringify(this.state.data.exe)}</code></div>;
    }
});

module.exports = Page3;
