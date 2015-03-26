var React = require("react");

class PageLoader extends  React.Component {
    constructor( props ) {
        super( props );
    }

    render(){
        return (
            <div className="page-loader">
                <div className="loader">
                    <span className="lead"><i className="fa fa-fw fa-spinner fa-spin"></i>&nbsp;{this.props.message}</span>
                </div>
            </div>
        );
    }
};

PageLoader.defaultProps = { message: "loading page..." };

module.exports = PageLoader;
