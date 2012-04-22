/**
 * Configuration settings
 */
var config = {};

// application data
config.app = {};
config.app.title = 'Todo App';
config.app.version = '0.0.1';
config.app.key = 'todos';
config.app.secret = 'XoB_kCoL';
  
// preview server related settings
config.server =  {};
config.server.port = process.env.PORT || 8081;

// export the config
module.exports = config;
