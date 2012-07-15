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

  // routes from #/home
  Home.Router = Backbone.SubRouter.extend({ 
    routes: {
      ""            : "index"
    },
    index: function() {
      console.log('[home hdlr] home screen');
      var base = new Home.Views.Index();
      base.render(function(el) {
        $("#userapps").html(el);
      });
    }
  });

  // This will fetch the index template and render it.
  Home.Views.Index = Backbone.View.extend({
    template: "app/templates/index.jade",
    
    render: function(done) {
      var view = this;
      
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl(jade)();
        
        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    }
  });

  // Required, return the module for AMD compliance
  return Home;

});
