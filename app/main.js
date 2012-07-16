require([
  "namespace",

  // Libs
  "use!jquery",
  "use!backbone",
  "use!jquerymobile",

  // Modules
  "modules/home",
  "modules/todo"
],

function(namespace, $, Backbone, jquerymobile, Home, Todo) {

  // Shorthand the application namespace
  var app = namespace.app;

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      ":hash": "index"
    },

    initialize: function() {
      app.Todos = new Todo.Collection();
      app.Todos.fetch();
      this.home = new Home.Router("home");
    },
    
    index: function(hash) {
      console.log('unhandled route :'+hash);
    }
  });

  // Treat the jQuery ready function as the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  $(function() {
    console.log('app started');

    // instantiate router
    app.router = new Router();
    console.log('Router:'+document.location.hash);

    // send only the first part within 
    var mainpart = document.location.hash;
    if(mainpart.indexOf('/')!=-1) mainpart=mainpart.substr(0,mainpart.indexOf('/'));
    if(!mainpart || mainpart=='#') mainpart='#home';
    document.location.hash = mainpart;
    app.router.navigate(mainpart, true);
    Backbone.history.start();
  });

});
