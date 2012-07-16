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
  var Home = namespace.module();
  var app = namespace.app;

  var Todo = namespace.module();
  // Todo model
  Todo.Model = Backbone.Model.extend({ });
  Todo.Collection = Backbone.Collection.extend({
    model: Todo.Model,
    url: '/api/todos'
  });

  // routes from #/home
  Home.Router = Backbone.SubRouter.extend({ 
    routes: {
      ""            : "index"
    },
    index: function() {
      console.log('[home hdlr] home screen');
      var base = new Home.Views.Index();
      base.render();
    }
  });

  var currentPage = '#home';

  // This will fetch the index template and render it.
  Home.Views.Index = Backbone.View.extend({
    template: "app/templates/index.jade",

    initialize: function() {
      /*
      app.Todos.bind('remove', this.render, this);
      */
      app.Todos.bind('reset', this.updateList, this);
      app.Todos.bind('change', this.updateList, this);
    },
    
    render: function() {
      var self = this;
      
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        var todos=JSON.parse(JSON.stringify(app.Todos));
        console.log(todos);
        self.el.innerHTML = tmpl(jade)({todos:todos});
        if(currentPage=='#home') {
          currentPage = '#index';
          // switch to the new page
          $('#dynpage').html(self.el);
          $.mobile.changePage($('#index'));
        } else {
          //$('#dynpage').live('pageinit', function() {
          //$('#dynpage').html(self.el);
          //$('#index').page('refresh');
          //});
        }
      });
    },
    
    updateList: function() {
      $('#todoitems').empty();
      var todos=JSON.parse(JSON.stringify(app.Todos));
      for(var i=0;i<todos.length;i++) {
        console.log(todos[i]);
        $('#todoitems').append('<li><a id="' + todos[i].id + '"><p> ' + todos[i].content +'</p></a></li>');
      }
      $('#todoitems').listview('refresh');
    }
  });

  // Required, return the module for AMD compliance
  return Home;

});
