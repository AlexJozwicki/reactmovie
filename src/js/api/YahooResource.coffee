_           = require('lodash')
HttpFactory = require('../utils/HttpFactory')

YahooConfigInterceptor =
    request: ( config ) ->
        config.withCredentials = false;
        return config

    response: ( response, config ) ->
        if !!config.rawResponse
            return response
        else
            if response
                return JSON.parse(response)
            else
                return

    error: ( error ) ->
        try
            error.response = JSON.parse( error.response )
            return error
        catch e
            return error

Http = HttpFactory(YahooConfigInterceptor)

YahooResource = exports

YahooResource.get = (url, rawResponse) ->
    config =
        url: url.toString()
        rawResponse: rawResponse

    Http.get config

YahooResource.post = (url, data, rawResponse, progressCallback) ->
    config =
        url: url.toString()
        rawResponse: rawResponse
        data: data
        progressCallback: progressCallback

    Http.post config

