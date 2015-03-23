Utils = require "./Utils"

FormManager = exports

FormManager.FormValidation = class FormValidation
    constructor: (@_fields) ->

        @pristine = true
        @invalid = true

        for fieldName, validationFct of @_fields
            @_fields[fieldName] =
                validate:validationFct
                isValid:false
                isPristine:true

    setPristine: (values) ->
        @pristine = true
        for f,v of @_fields
            @validate(f, values(f))
            v.isPristine = true

    _validateForm: (values) ->
        for f,v of @_fields
            @validate(f, values(f))

    setDirty: (fieldName) ->
        if(@_fields[fieldName])
            @_fields[fieldName].isPristine = false
            @pristine = false

    _updateFormStatus: ->
        state = true
        for f,v of @_fields
            state = state && v.isValid
        @invalid = !state

    isPristine: (fieldName) ->
        if @_fields[fieldName]
            @_fields[fieldName].isPristine
        else true

    isValid: (fieldName) ->
        if @_fields[fieldName]
            @_fields[fieldName].isValid
        else true

    validate: (fieldName, value) ->
        if(@_fields[fieldName])
            if(Utils.js.isArray(@_fields[fieldName].validate))
                isValid = true
                for fct in @_fields[fieldName].validate
                    isValid = isValid && fct(value)
                @_fields[fieldName].isValid = isValid
            else
                @_fields[fieldName].isValid = @_fields[fieldName].validate(value)
            @_updateFormStatus()