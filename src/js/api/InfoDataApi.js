var InfodataConfig = require("AppConfig").Infodata;
var Resource = require("./http/Resource").Resource;
var Uri = require("./http/Uri");

var resource = new Resource();

var InfodataApi = {
    getDosDetails () {
        return resource.get( new Uri( "{0}/dos/AC.KPMG/detail", InfodataConfig.publicWebHost) );
    }
};

module.exports = InfodataApi;
