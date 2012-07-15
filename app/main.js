require([
  "namespace",

  // Libs
  "use!jquery",
  "use!backbone",
  "use!jquerymobile",

  // Modules
  "modules/home",
],

function(namespace, $, Backbone, jquerymobile, Home) {

  // Shorthand the application namespace
  var app = namespace.app;

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      ":hash": "index"
    },

    initialize: function() {
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
    console.log('history started');
    $('tr').click(function() {
      var href = $(this).find("a").attr("href");
      if(href) {
        window.location = href;
      }
    });

    // let take the route in url and go there
    if(document.location.hash) {
      console.log('Router:'+document.location.hash);
      // send only the first part within 
      var mainpart = document.location.hash;
      if(mainpart.indexOf('/')!=-1) mainpart=mainpart.substr(0,mainpart.indexOf('/'));
      //console.log('main part='+mainpart);
      if(mainpart=='#') mainpart='#home';
      //console.log('main part='+mainpart);
      document.location.hash = mainpart;
    }
    Backbone.history.start();
  });

  /*
  // catch all the clicks
  //$(document).on("click", "a:not([data-bypass])", function(evt) {
  $(document).on('click', function (evt) {
      var href = window.location;
      console.log('Clicked :'+href);
      // @todo: Need to find a way to push a pass-thru
      if (href.hash && href.protocol != "javascript:") {
        console.log('Clicked (action on) :'+href.hash);
        
        // Stop the default event to ensure the link will not cause a page
        // refresh.
        evt.preventDefault();
        
        // `Backbone.history.navigate` is sufficient for all Routers and will
        // trigger the correct events.  The Router's internal `navigate` method
        // calls this anyways.
        Backbone.history.navigate(href.hash, true);
        //app.router.navigate(href.hash, true);
        //window.location.replace(href.hash);
      }
    });
  */

});
