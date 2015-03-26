var React = require("react/addons");
var Immutable = require("immutable");
var Contact = require("../models/Contact");
var { FormValidation, Utils } = require("../utils");
var classnames = require("classnames");
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
        this._setAndValidateContact = this._setAndValidateContact.bind(this);
    }

    _setAndValidateContact(path, value) {
        let updatedState = Utils.updateIn(this.state, path, value);
        updatedState.formState = Page2.formValidator.validate(this.state.formState, updatedState, path);
        this.setState(updatedState);
    }

    linkState(path, apply = this._setAndValidateContact) {
        return {
            value: Utils.getIn(this.state, path),
            requestChange: (value) => apply(path, value)
        };
    }

    radioLinkState(path, value, apply = this._setAndValidateContact) {
        return {
            value: value === Utils.getIn(this.state, path),
            requestChange: (check) => {
                if (check) {
                    apply(path, value)
                }
            }
        };
    }

    checkLinkState(path, apply = this._setAndValidateContact) {
        return {
            value: Utils.getIn(this.state, path),
            requestChange: (check) => {
                apply(path, check)
            }
        };
    }

    seqLinkState(path) {
        return {
            value: Utils.getIn(this.state, path),
            requestChange: (value, anythingElse) => {
                console.log(value);
                var setOfMovies = Immutable.Set.of(...this.state.contact.favoriteMovies).withMutations( movies => {
                    if(movies.get(value)) {
                        movies.remove(value);
                    } else {
                        movies.add(value);
                    }
                });
                console.log(setOfMovies.toArray());
                this.state.contact.favoriteMovies = setOfMovies.toArray();
                this.setState(this.state);
            }
        }
    }

    onChange(e){
        console.log(e.target.value);
        console.log(e.target.options);
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
                                <input type="text" className={this.inputStateClass("contact.firstName")} placeholder="First name (not empty)" valueLink={this.linkState("contact.firstName")}/>
                            </div>
                            <div className="col-sm-6">
                                <input type="text" className={this.inputStateClass("contact.lastName")} placeholder="Last name (not empty)" valueLink={this.linkState("contact.lastName")} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-6">
                                <input type="email" className={this.inputStateClass("contact.email")} placeholder="Email (valid email)" valueLink={this.linkState("contact.email")} />
                            </div>
                            <div className="col-sm-6">
                                <select className={this.inputStateClass("contact.language")} valueLink={this.linkState("contact.language")}>
                                    <option value="">Your preferred language</option>
                                    {Page2.languages.entrySeq().map( ([k,v]) => <option key={k} value={k}>{v}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-6">
                                <input type="number" min="0" className={this.inputStateClass("contact.age")} placeholder="Age (min. 5)" valueLink={this.linkState("contact.age")}/>
                            </div>
                            <div className="col-sm-6">
                                <label className="radio-inline">
                                    <input type="radio" name="gender" checkedLink={this.radioLinkState("contact.gender", "m")} />
                                    Male
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" name="gender" checkedLink={this.radioLinkState("contact.gender", "f")} />
                                    Female
                                </label>
                            </div>
                        </div>

                        <!-- valueLink={this.seqLinkState("contact.favoriteMovies")} -->

                        <div className="form-group">
                            <select className="form-control" multiple={true} onChange={this.onChange}>
                                {Page2.movies.toSeq().map( (v, i) => <option key={i} value={v}>{v}</option> )}
                            </select>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-6">
                                <label className="checkbox-inline">
                                    <input type="checkbox" checkedLink={this.checkLinkState("contact.tscs")} />I have read the terms and conditions
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

Page2.languages     = Immutable.Map({de: "German", en: "English", fr: "French"});
Page2.movies        = Immutable.Set.of("Saturday night fever", "Fight Club", "Wayne's World", "Ghost", "The Fifth Element");

Page2.formValidator = new FormValidation({
    "contact.firstName" : Validate.notEmpty,
    "contact.lastName"  : Validate.notEmpty,
    "contact.email"     : Validate.email,
    "contact.language"  : Validate.notEmpty,
    "contact.age"       : Validate.gte(5),
    "contact.gender"    : Validate.notEmpty,
    "contact.tscs"      : (value) => value == true
});

module.exports = Page2;
