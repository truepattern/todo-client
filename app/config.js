// Set the require.js configuration for your application.
require.config({
  // Initialize the application with the main application file
  deps: ["main"],

  paths: {
    // JavaScript folders
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",

    // Libraries
    jquery: "../assets/js/libs/jquery",
    jquerymobile: "../assets/js/libs/jquerymobile",
    underscore: "../assets/js/libs/underscore",
    backbone: "../assets/js/libs/backbone",
    jade: "../assets/js/libs/jade-runtime",

    // Shim Plugin
    use: "../assets/js/plugins/use"
  },

  use: {

    backbone: {
      deps: ["use!underscore", "use!jquery"],
      attach: "Backbone"
    },

    jade: {
      attach: "jade"
    },

    jquery: {
      attach: "$"
    },

    jquerymobile: {
      deps: ["use!jquery"],
      attach: "jquerymobile"
    },

    underscore: {
      attach: "_"
    }
  }
});
