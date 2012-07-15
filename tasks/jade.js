/*
 * Grunt Task File
 * ---------------
 *
 * Task: Jade
 * Description: Compile jade templates to JST file
 * Dependencies: None
 *
 */

module.exports = function(grunt) {

  var config = grunt.config;
  var file = grunt.file;
  var log = grunt.log;

  grunt.registerMultiTask("jade",
    "Compile jade templates to JST file", function() {

    // If namespace is specified use that, otherwise fallback
    var namespace = config("meta.jade.namespace") || "JST";

    // Create JST file.
    var files = file.expand(this.data);
    file.write(this.target, grunt.helper("jade", files, namespace));

    // Fail task if errors were logged.
    if (grunt.errors) { return false; }

    // Otherwise, print a success message.
    log.writeln("File \"" + this.target + "\" created.");
  });

  grunt.registerHelper("jade", function(files, namespace) {
    namespace = "this['" + namespace + "']";

    // Comes out looking like this["JST"] = this["JST"] || {};
    var contents = namespace + " = " + namespace + " || {};\n\n";

    // Compile the template and get the function source
    contents += files ? files.map(function(filepath) {
      console.log('compiling file:'+filepath);
      //console.log('compiling file:'+file.read(filepath));
      var jade = require('jade');
      var options = { filename: filepath, compileDebug:true, client:true };
      var templateFunction = 
        require("jade").compile(file.read(filepath),options).toString().substring(18);

      return namespace + "['" + filepath + "'] = function (jade) { return function " + templateFunction + ' };';
    }).join("\n\n") : "";

    return contents;
  });

};
