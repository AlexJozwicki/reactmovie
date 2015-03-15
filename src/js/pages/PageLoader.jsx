var React = require('react/addons');

var PageLoader = React.createClass({
    getDefaultProps() {
        message:'loading page...'
    },

    render(){
        return (
            <div className="page-loader">
                <div className="loader">
                    <span className="lead"><i className="fa fa-fw fa-spinner fa-spin"></i>&nbsp;{this.props.message}</span>
                </div>
            </div>
        );
    }
});

module.exports = PageLoader;