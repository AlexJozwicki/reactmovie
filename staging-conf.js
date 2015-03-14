const yahooHost = "query.yahooapis.com";
const infodataHost = "kpmg.infodata.lu";

var AppConfig = {
    yahoo: {
        host            : yahooHost,
        publicWebHost   : `http://${yahooHost}`
    },
    infodata: {
        host            : infodataHost,
        publicWebHost   : `http://${infodataHost}`
    }
};

module.exports = AppConfig;
