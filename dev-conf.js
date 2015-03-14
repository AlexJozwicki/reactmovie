const yahooHost = "query.yahooapis.com";
const infodataHost = "kpmg.infodata.lu";

var AppConfig = {
    Yahoo: {
        host            : yahooHost,
        publicWebHost   : `http://${yahooHost}`
    },
    Infodata: {
        host            : infodataHost,
        publicWebHost   : `http://${infodataHost}`
    }
};

module.exports = AppConfig;
