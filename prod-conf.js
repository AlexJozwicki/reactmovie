const host = 'localhost:9000';

var AppConfig = {
    host            : host,
    adminWebHost    : `http://${host}`,
    publicWebHost   : `http://${host}`,
    notificationHost: `ws://${host}`
};

module.exports = AppConfig;