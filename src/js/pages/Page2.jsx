var React = require("react");
var Immutable = require("immutable");
var Contact = require("../models/Contact");
var { FormValidation, Utils } = require("../utils");
var Validate = Utils.validate;


class Page2 extends React.Component {
    constructor(props) {
        super( props );
        this.state = {
            contact: Page2.defaultContact,
            formState: Page2.formValidator.pristineState()
        };
    }

    linkState(path) {
        return {
            value: Utils.getIn(this.state.contact, path),
            requestChange: (value) => {
                let updatedContact = Utils.updateIn(this.state.contact, path, value);
                let updatedFormState = Page2.formValidator.validate(this.state.formState, updatedContact, path);
                this.setState({contact: updatedContact, formState: updatedFormState});
            }
        };
    }

    radioLinkState(path, value) {
        return {
            value: value === Utils.getIn(this.state.contact, path),
            requestChange: (check) => {
                if (check) {
                    this.setState({contact: Utils.updateIn(this.state.contact, path, value)});
                }
            }
        };
    }

    render() {
        return (
            <div>
                <div className="col-sm-12">
                    <form className="form-horizontal contact-form" autoComplete="off">
                        <div className="form-group">
                            <div className="col-sm-6">
                                <input type="text" className="form-control" placeholder="First name" valueLink={this.linkState("firstName")}/>
                            </div>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" placeholder="Last name" valueLink={this.linkState("lastName")} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-6">
                                <input type="email" className="form-control" placeholder="Email" valueLink={this.linkState("email")} />
                            </div>
                            <div className="col-sm-6">
                                <select className="form-control" valueLink={this.linkState("language")}>
                                    <option value="">Your preferred language</option>
                                    {Page2.languages.entrySeq().map( ([k,v]) => <option key={k} value={k}>{v}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-6">
                                <input type="number" className="form-control" placeholder="Age" valueLink={this.linkState("age")}/>
                            </div>
                            <div className="col-sm-6">
                                <label className="radio-inline">
                                    <input type="radio" name="gender" checkedLink={this.radioLinkState("gender", "m")} />
                                    Male
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" name="gender" checkedLink={this.radioLinkState("gender", "f")} />
                                    Female
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-sm-12">
                    <pre>{JSON.stringify(this.state.contact, null, '  ')}</pre>
                </div>
                <div className="col-sm-12">
                    <pre>{JSON.stringify(this.state.formState, null, '  ')}</pre>
                </div>
            </div>
        );
    }
};

Page2.languages = Immutable.Map({de: "German", en: "English", fr: "French"});

Page2.movies = Immutable.Set.of(["Saturday night fever", "Fight Club", "Wayne's World", "Ghost", "The Fifth Element"]);

Page2.defaultContact = new Contact("", "", "", "");

Page2.formValidator = new FormValidation({
    firstName: Validate.notEmpty,
    lastName: Validate.notEmpty
});

module.exports = Page2;
