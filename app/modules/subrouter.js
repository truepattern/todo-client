// Backbone.SubRoute extends the functionality of Backbone.Router such
// that each of an application's modules can define its own
// module-specific routes.
// This  is based on a Gist by Tim Branyan: https://gist.github.com/1235317
// Model N, Inc. spun a repo out of it at https://github.com/ModelN/backbone.subroute
// @jessebeach turned it into a module and baked it into an instance of the Backbone Boilerplate (by Tim Branyen) 

define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules
  
  // Plugins
], function (namespace, Backbone) {
	
  // Create a new module
  var SubRouter = namespace.module();

  Backbone.SubRouter = Backbone.Router.extend( {
    constructor:function ( prefix ) {
      var routes = {};
        
      // Prefix is optional, set to empty string if not passed
      this.prefix = prefix = prefix || "";

      // Allow for optionally omitting trailing /.  Since base routes do not
      // trigger with a trailing / this is actually kind of important =)
      if ( prefix.substr( -1 ) != "/" ) {
        prefix = prefix + '/';
      }
      
      // Every route needs to be prefixed
      _.each( this.routes, function ( callback, path ) {
        if ( path ) {
          routes[prefix + path] = callback;
        } else {
          // If the path is "" just set to prefix, this is to comply
          // with how Backbone expects base paths to look gallery vs gallery/
          routes[prefix.substr( 0, prefix.length - 1 )] = callback;
        }
      } );
            
      // Must override with prefixed routes
      this.routes = routes;
        
      // Required to have Backbone set up routes
      Backbone.Router.prototype.constructor.call( this );
    },
    navigate:function ( route, options ) {
      if ( route.substr( 0, 1 ) != '/' && 
           route.indexOf( this.prefix.substr( 0, this.prefix.length - 1 ) ) !== 0 ) {
        route = this.prefix + route;
      }
      Backbone.Router.prototype.navigate.call( this, route, options );
    }
  });
  return SubRouter;
});
