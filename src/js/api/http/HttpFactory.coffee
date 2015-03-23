Promise     = require('es6-promise').Promise
_           = require( 'lodash' )
RestError   = require( './RestError' )

defaultConfig =
    headers: []
    timeoutDelay: 30 * 1000

defaultInterceptor =
    request: ( config ) ->
        if( _.isObject( config.data ) && !ArrayBuffer.prototype.isPrototypeOf( config.data ) )
            config.headers.push
                header: 'Content-Type'
                value: 'application/json;charset=UTF-8'

        return config

    response: ( response ) ->
        try
            return JSON.parse( response )
        catch e
            return response

    error: ( error ) ->
        try
            error.response = JSON.parse( response )
            return error
        catch e
            return error

HttpFactory = ( interceptor ) ->
    if not interceptor?
        interceptor = defaultInterceptor

    onLoad = (req, resolve, reject, config) ->
        switch
            when req.status >= 200 && req.status <= 206
                resolve( interceptor.response( req.response, config ) )
            when req.status == 401
                reject interceptor.error( new RestError('Unauthorized', req.status, req.response ) )
            when req.status == 403
                reject interceptor.error( new RestError('Forbidden', req.status, req.response) )
            else
                reject interceptor.error( new RestError(req.statusText, req.status, req.response) )

    get: ( config ) ->
        new Promise (resolve, reject) ->
            req = new XMLHttpRequest
            config = interceptor.request( _.merge( config, defaultConfig ) )
            req.open 'GET', config.url
            req.withCredentials = config.withCredentials

            for header in config.headers
                req.setRequestHeader header.header, header.value

            req.onload = onLoad.bind(@, req, resolve, reject, config)
            req.onerror = ->
                reject new RestError('Network Error: '+req.statusText, req.status)

            req.timeout = config.timeoutDelay
            req.ontimeout = ->
                reject new RestError( 'Timeout', 408 )

            req.send()

    post: ( config ) ->
        new Promise (resolve, reject) ->
            req = new XMLHttpRequest
            config = interceptor.request( _.merge( config, defaultConfig ) )
            req.open 'POST', config.url
            req.withCredentials = config.withCredentials

            for header in config.headers
                req.setRequestHeader header.header, header.value
            req.onload = onLoad.bind(@, req, resolve, reject, config)
            req.onerror = ->
                reject new RestError('Network Error: '+req.statusText, req.status)

            req.timeout = config.timeoutDelay
            req.ontimeout = ->
                reject new RestError( 'Timeout', 408 )

            if config.progressCallback
                req.upload.addEventListener( 'progress', config.progressCallback, false )

            if( _.isObject( config.data ) && !ArrayBuffer.prototype.isPrototypeOf( config.data ) )
                req.send( JSON.stringify( config.data ) )
            else
                req.send( config.data )


module.exports = HttpFactory
