module.exports = function(grunt) {

var rewrite = require('connect-modrewrite');
    
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
   handlebars: {
    all: {
	options: {
		processName: function(filePath) {
	return filePath.replace(/www\//g, "");
}
},
        files: {
            "www/js/templates.js": ["www/templates/**/*.hbs"]
        }
    }
   },
      connect: {
    server: {
        options: {
            keepalive: true,
            base: 'www',
	    protocol: 'http',
            hostname: 'localhost',
            port: '8888',
	    middleware: function(connect, options, middlewares) {

                // the rules that shape our mod-rewrite behavior
                var rules = [
                    '!\\.html|\\.ico|\\.ttf|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
                ];

                // add rewrite as first item in the chain of middlewares
                middlewares.unshift(rewrite(rules));

                return middlewares;
            }
        }
    }
      },
watch: {
options: {
        atBegin: true
    },
            handlebars: {
                files: ['www/templates/**/*.hbs'],
                tasks: ['handlebars']
            }
        }
          
});

grunt.loadNpmTasks('grunt-contrib-connect');
    
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

  grunt.loadNpmTasks('grunt-contrib-watch');


};
