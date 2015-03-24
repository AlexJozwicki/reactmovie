var InfodataConfig = require("AppConfig").Infodata;
var { Uri } = require("../utils/index");


var InfodataApi = {
    getDosDetails () {
        return fetch( new Uri( "{0}/dos/AC.KPMG/detail", InfodataConfig.publicWebHost) );
    }
};

module.exports = InfodataApi;
