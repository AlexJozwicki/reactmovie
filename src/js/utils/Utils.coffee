Validator = require 'validator'
filter = require('lodash').filter

Utils = exports

Utils.getIn = (object, path) ->
    stack = path.split('.')
    while (stack.length > 1)
        object = object[stack.shift()]
    object[stack.shift()]

Utils.updateIn = (object, path, value) ->
    current = object
    stack = path.split('.')
    while (stack.length > 1)
        current = current[stack.shift()]
    current[stack.shift()] = value
    object

Utils.html =
    buildNode: (html, attrs, childs) ->
        host = document.createElement('div');
        host.innerHTML = html;
        node = host.children[0];
        for prop,attr of attrs
            node.setAttribute(prop, attr)

        if childs
            for child in childs
                node.appendChild(child)

        host.children[0];

    buildTextNode: (text) ->
        txtNode = document.createTextNode(text)
        txtNode

Utils.js =
    isArray:
        Array.isArray || (obj) -> return {}.toString.call(obj) is '[object Array]'

    isObject: (obj) ->
        Object.prototype.toString.call(obj) == '[object Object]'

    curry: (f) -> do (recur = (as) ->
        next = (bs...) ->
            args = (as or [])[0..]
            if args.push.apply(args, bs) < f.length and bs.length
                return recur args
            f args...
        if f.length > 1 then next else f
    )

    _ : {} # placeholder for partial
    partial: (f, as...) -> (bs...) ->
        args = as.concat bs
        i = args.length
        while i--
            if args[i] is Utils.js._
                args[i] = args.splice(-1)[0]
        f args...


Utils.validate =

    notEmpty: (value) ->
        !Validator.isNull(value)

    lt: Utils.js.curry (max, value) ->
        value < min

    lte: Utils.js.curry (max, value) ->
        value <= min

    gt: Utils.js.curry (min, value) ->
        value > min

    gte: Utils.js.curry (min, value) ->
        value >= min

    length: Utils.js.curry (min, max, value) ->
        Validator.isLength(value, min, max)

    minLength: Utils.js.curry (min, value) ->
        Validator.isLength(value, min)

    maxLength: Utils.js.curry (max, value) ->
        Validator.isLength(value, 0, max)

    email: (value) ->
        Validator.isEmail(value)

    isObjectId: (value) ->
        Validator.isMongoId(value)

    url: (value) ->
        Validator.isURL(value)

    match: Utils.js.curry (pattern, modifier, value) ->
        Validator.match(value, pattern, modifier)

    ascii: (value) ->
        Validator.isAscii(value)

    containsAtLeast: Utils.js.curry (min, value) ->
        Array.isArray(value) && value.length >= min

    matchAtLeast: Utils.js.curry (predicate, min, value) ->
        Array.isArray(value) && filter(value, predicate).length >= min
