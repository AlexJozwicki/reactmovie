var React = require("react/addons");
var Immutable = require("immutable");
var Contact = require("../models/Contact");
var SelectLinkState = require("../components/SelectLinkState");
var FormValidation = require("../utils/FormValidation");
var Utils = require("../utils/Utils");
var Validate = Utils.validate;

var Page2 = React.createClass({

    statics: {
        languages: Immutable.Map({de: "German", en: "English", fr: "French"}),
        gender: Immutable.Map({m: "Male", f: "Female"}),
        movies: Immutable.Set.of(["Saturday night fever", "Fight Club", "Wayne's World", "Ghost", "The Fifth Element"]),
        defaultContact: new Contact("", "", "", ""),
        formValidationRules: {
            firstName: Validate.notEmpty,
            lastName: Validate.notEmpty
        }
    },

    getInitialState() {
        return ({
            contact: Page2.defaultContact,
            formState: Page2.formValidationRules,
            formValidation: new FormValidation(Page2.formValidationRules)
        });
    },

    validateField(path, value) {
        this.state.formValidation.validate(path, value);
    },

    linkState(path) {
        return {
            value: Utils.getIn(this.state.contact, path),
            requestChange: (value) => {
                this.validateField(path, value);
                this.setState({contact: Utils.updateIn(this.state.contact, path, value)});
            }
        };
    },

    radioLinkState(path, value) {
        return {
            value: value === Utils.getIn(this.state.contact, path),
            requestChange: (check) => {
                if (check) {
                    this.setState({contact: Utils.updateIn(this.state.contact, path, value)});
                }
            }
        };
    },

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
                                <SelectLinkState className="form-control" valueLink={this.linkState("language")}>
                                    <option value="">Your preferred language</option>
                                    {Page2.languages.map((v, k) => <option value={k}>{v}</option>)}
                                </SelectLinkState>
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
                    <pre>{JSON.stringify(this.state.formValidation, null, '  ')}</pre>
                </div>
            </div>
        );
    }
});

module.exports = Page2;
