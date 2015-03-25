var Immutable = require("immutable");
var Utils = require("./Utils");

class FormValidation {
    constructor(validationRules) {
        this.validationRules = Immutable.Map(validationRules);
    }

    pristineState(){
        var fields = Immutable.Map().withMutations( (f) => {
            for (let field of this.validationRules.keySeq()) {
                f.set(field,{
                    valid: false,
                    dirty: false
                });
            }
        });
        var state = Immutable.Map({
            dirty:false,
            valid:false,
            fields:fields
        });
        return state;
    }

    validate(previousState, values, currentField = void 0) {
        var isFormValid = true;
        var fields = previousState.get("fields").withMutations((f) => {
            for(let field of f.keySeq()) {
                let isFieldValid = this.validationRules.get(field)(Utils.getIn(values, field));
                isFormValid = isFormValid && isFieldValid;
                f.set(field, {
                    valid: isFieldValid,
                    dirty: (currentField === field) ? true : previousState.getIn(["fields", field]).dirty
                });
            }
        });

        return previousState.withMutations((s) => {
            s.set("dirty", true);
            s.set("valid", isFormValid);
            s.set("fields", fields);
        });

    }
}

FormValidation.isFieldValid = (formState, fieldName) => {
    var field = formState.getIn(["fields", fieldName]);
    if(field) {
        return !field.dirty || field.valid;
    } else {
        return true;
    }
};

FormValidation.isFormValid = (formState) => formState.get("valid");

module.exports = FormValidation;
