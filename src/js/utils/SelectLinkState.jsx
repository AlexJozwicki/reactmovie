var React = require("react/addons");

var SelectLinkState = React.createClass({
    render: function() {
        if (this.props.valueLink) {
            return (
                <select {...this.props} value={this.props.valueLink.value} valueLink={null} onChange={this.handleChange}>
                    {this.props.children}
                </select>
            );
        } else {

            return (
                <select {...this.props} onChange={this.handleChange}>
                    {this.props.children}
                </select>
            );
        }
    },

    handleChange: function(e) {
        var selectedValue;
        if (this.props.multiple) {
            // We have to iterate the `options` elements
            // to figure out which ones are selected.
            selectedValue = [];
            var options = e.target.options;
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    selectedValue.push(options[i].value);
                }
            }
        } else {
            selectedValue = e.target.value;
        }

        // then manually take care of any valueLink passed
        if (this.props.valueLink) {
            this.props.valueLink.requestChange(selectedValue);
        }

        // Fire onChange manually if it exists since we overwrote it
        if(this.props.onChange) { this.props.onChange(e); }

    }
});

module.exports = SelectLinkState;
