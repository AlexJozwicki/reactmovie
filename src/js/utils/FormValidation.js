var Immutable = require("immutable");
var Utils = require("./Utils");

class FormValidation {
    constructor(validationRules) {
        this.validationRules = Immutable.Map(validationRules);
    }

    pristineState(){
        var fields = {};
        for (let field of this.validationRules.keySeq()) {
            fields[field] = {
                valid: false,
                dirty: false
            }
        }
        var state = {
            dirty : false,
            valid : false,
            fields: fields
        };

        state.isFieldValid = (fieldName) => {return FormValidation.isFieldValid(state, fieldName)};
        return state;
    }

    validate(previousState, values, currentField = void 0) {

        var fields = {};
        var isFormValid = true;

        for(let field of Object.keys(previousState.fields)) {
            let isFieldValid = this.validationRules.get(field)(Utils.getIn(values, field));
            isFormValid = isFormValid && isFieldValid;
            fields[field] = {
                valid: isFieldValid,
                dirty: (currentField === field) ? true : previousState.fields[field].dirty
            }
        }
        var state = {
            dirty:true,
            valid:isFormValid,
            fields:fields
        };

        state.isFieldValid = (fieldName) => { return FormValidation.isFieldValid(state, fieldName) };
        return state;
    }
}

FormValidation.isFieldValid = (formState, fieldName) => {
    var field = formState.fields[fieldName];
    if(field) {
        return !field.dirty || field.valid;
    } else {
        return true;
    }
};

module.exports = FormValidation;
