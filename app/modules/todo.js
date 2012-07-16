define([
  "namespace",
  "jade",

  // Libs
  "use!backbone",

  // Modules
  "modules/subrouter"

  // Plugins
],

function(namespace, jade, Backbone) {

  // Create a new module
  var app = namespace.app;

  var MySync = function (method, model, options) {
    options.timeout = 10000; // required, or the application won't pick up on 404 responses
    options.dataType = "jsonp";
    return Backbone.sync(method, model, options);
  };

  var Todo = namespace.module();

  // Todo model
  Todo.Model = Backbone.Model.extend({ });
  Todo.Collection = Backbone.Collection.extend({
    model: Todo.Model,
    url: 'http://localhost:8080/api/v1/todos',
    sync: MySync
  });

  // Required, return the module for AMD compliance
  return Todo;

});
