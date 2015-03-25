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
        return {
            dirty : false,
            valid : false,
            fields: fields
        }
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
        return {
            dirty:true,
            valid:isFormValid,
            fields:fields
        }
    }

    isFieldValid(currentState, field) {
        return currentState.fields[field] && currentState.fields[field].valid;
    }
}

module.exports = FormValidation;
