var React = require("react/addons");
var Immutable = require("immutable");
var Contact = require("../models/Contact");
var { FormValidation, Utils } = require("../utils");
var classnames = require( 'classnames' );
var Validate = Utils.validate;


class Page2 extends React.Component {
    constructor(props) {
        super( props );
        this.state = {
            contact: new Contact(),
            formState: Page2.formValidator.pristineState()
        };

        // Auto-bind
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    _validateField(path, value){
        let updatedContact = Utils.updateIn(this.state.contact, path, value);
        let updatedFormState = Page2.formValidator.validate(this.state.formState, updatedContact, path);
        this.setState({contact: updatedContact, formState: updatedFormState});
    }

    linkState(path) {
        return {
            value: Utils.getIn(this.state.contact, path),
            requestChange: (value) => this._validateField(path, value)
        };
    }

    radioLinkState(path, value) {
        return {
            value: value === Utils.getIn(this.state.contact, path),
            requestChange: (check) => {
                if (check) {
                    this._validateField(path, value)
                }
            }
        };
    }

    isFormValid(){ return FormValidation.isFormValid(this.state.formState); }

    inputStateClass(field) {
        return classnames({"form-control": true, "has-error":!FormValidation.isFieldValid(this.state.formState, field)});
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("contact submitted", this.state.contact);
    }

    onReset(e) {
        e.preventDefault();
        this.setState({contact: new Contact(), formState: Page2.formValidator.pristineState()});
    }

    render() {
        return (
            <div>
                <div className="col-sm-12">
                    <h3>Contact form</h3>
                    <form className="form-horizontal contact-form" autoComplete="off">
                        <div className="form-group">
                            <div className="col-sm-6">
                                <input type="text" className={this.inputStateClass("firstName")} placeholder="First name (not empty)" valueLink={this.linkState("firstName")}/>
                            </div>
                            <div className="col-sm-6">
                                <input type="text" className={this.inputStateClass("lastName")} placeholder="Last name (not empty)" valueLink={this.linkState("lastName")} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-6">
                                <input type="email" className={this.inputStateClass("email")} placeholder="Email (valid email)" valueLink={this.linkState("email")} />
                            </div>
                            <div className="col-sm-6">
                                <select className={this.inputStateClass("language")} valueLink={this.linkState("language")}>
                                    <option value="">Your preferred language</option>
                                    {Page2.languages.entrySeq().map( ([k,v]) => <option key={k} value={k}>{v}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-6">
                                <input type="number" min="0" className={this.inputStateClass("age")} placeholder="Age (min. 5)" valueLink={this.linkState("age")}/>
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
                        <div className="form-group">
                            <div className="col-sm-3 pull-right">
                                <button onClick={this.onReset} className="btn btn-warning">Reset</button>
                                <button onClick={this.onSubmit} disabled={!this.isFormValid()} type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                    <hr />
                </div>

                <div className="col-sm-12">
                    <p>Contact object</p>
                    <pre>{JSON.stringify(this.state.contact, null, '  ')}</pre>
                </div>
                <div className="col-sm-12">
                    <p>FormState object</p>
                    <pre>{JSON.stringify(this.state.formState, null, '  ')}</pre>
                </div>
            </div>
        );
    }
}

Page2.languages      = Immutable.Map({de: "German", en: "English", fr: "French"});
Page2.movies         = Immutable.Set.of(["Saturday night fever", "Fight Club", "Wayne's World", "Ghost", "The Fifth Element"]);

Page2.formValidator  = new FormValidation({
    firstName : Validate.notEmpty,
    lastName  : Validate.notEmpty,
    email     : Validate.email,
    language  : Validate.notEmpty,
    age       : Validate.gte(5),
    gender    : Validate.notEmpty
});

module.exports = Page2;
