var _ = require("lodash");
var HttpFactory = require("./HttpFactory");

const Interceptors = {
    defaultInterceptor      : {
        request( config ) {
            config.withCredentials = false;
            return config;
        },
        response( response, config ) {
            if(config.rawResponse) {
                return response;
            } else {
                if(response) {
                    return JSON.parse(response);
                } else {
                    return false;
                }
            }
        },
        error( error ) {
            try {
                error.response = JSON.parse(error.response);
                return error;
            } catch(e) {
                return error;
            }
        }
    },
    authenticatedInterceptor: {
        request(config) {

            config.headers.push({
                header: "X-AUTH-TOKEN",
                value : "" //TODO: set method to retrieve session token
            });

            if( _.isObject( config.data ) && !ArrayBuffer.prototype.isPrototypeOf( config.data ) ) {
                config.headers.push({
                    header: "Content-Type",
                    value : "application/json;charset=UTF-8"
                });
            }

            config.withCredentials = true;
            return config;
        },
        response(response, config) {
            if(config.rawResponse) {
                return response;
            } else {
                if(response) {
                    return JSON.parse(response);
                }
                else {
                    return false;
                }
            }
        },
        error(error) {
            //if( error.status === 401 ) {
                //TODO: what should be done? trigger a reflux action to go back on login page ?
            //}
            try {
                error.response = JSON.parse( error.response );
                return error;
            } catch(e) {
                return error;
            }
        }
    }
};

class Resource {
    constructor(interceptor) {
        this.interceptor = interceptor || Interceptors.defaultInterceptor;
        this.Http = HttpFactory();
    }

    get(url, rawResponse) {
        return this.Http.get({url: url.toString(), rawResponse: rawResponse});
    }

    post(url, data, rawResponse, progressCallback) {
        return this.Http.post({url: url.toString(), rawResponse: rawResponse, data: data, progressCallback: progressCallback});
    }

}

module.exports = { Resource: Resource, Interceptors: Interceptors};
