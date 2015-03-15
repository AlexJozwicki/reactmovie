var InfodataConfig = require("AppConfig").Infodata;
var Resource = require("./Resource").Resource;
var { Uri } = require("../utils/index");

var resource = new Resource();

var InfodataApi = {
    getDosDetails () {
        return resource.get( new Uri( "{0}/dos/AC.KPMG/detail", InfodataConfig.publicWebHost) );
    }
};

module.exports = InfodataApi;
