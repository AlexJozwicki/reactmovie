var React       = require( 'react' );
var classnames  = require( 'classnames' );

class Modal extends React.Component {
    constructor(props) {
        super( props );
    }

    render() {
        if( !this.props.visible ) return null;

        return (
            <div className="modal fade in" tabIndex="-1" role="dialog">
                <div className="modal-backdrop fade in" style={{'height':'1000px'}} />
                <div className={"modal-dialog modal-lg"}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" onClick={this.props.onCloseRequest} className="close" data-dismiss="modal"><span>Close</span></button>
                            <h4 className="modal-title">{this.props.title || ''}</h4>
                        </div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    title   : React.PropTypes.string,
    visible : React.PropTypes.bool.isRequired,
    onCloseRequest: React.PropTypes.func.isRequired
};

module.exports = Modal;
