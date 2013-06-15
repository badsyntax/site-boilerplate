module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        '*.js',
        'src/js/**/*.js',
        'spec/js/**/*.js'
      ],
      options: {
        globals: {
          console: false,
          document: false,
          require: false
        }
      }
    },
    jasmine: {
      globals: {
        src: [
          'src/js/**/*.js',
        ],
        options: {
          specs: 'spec/js/**/*.js',
          helpers: [
            'spec/js/PhantomJSPolyfills.js'
          ]
        }
      },
      AMD: {
        src: [
          'src/js/**/*.js'
        ],
        options: {
          specs: 'spec/js/**/*.js',
          helpers: [
            'spec/js/PhantomJSPolyfills.js'
          ],
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfig: {
              baseUrl: ''
            }
          }
        }
      }
    },
    clean: ['docs'],
    jsdoc : {
      dist : {
        src: ['src/js/**/*.js'],
        options: {
          destination: 'docs/js'
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/sass',
          cssDir: 'public/css',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'src/sass',
          cssDir: 'public/css',
          environment: 'development',
          outputStyle: 'expanded'
        }
      }
    },
    watch: {
      styles: {
        files: 'src/sass/**/*.scss',
        tasks: ['sass:dev']
      }
    },
    modernizr: {
     devFile: "src/components/modernizr/modernizr.js",
     outputFile: "public/js/vendor/modernizr.js",
     // Based on default settings on http://modernizr.com/download/
     extra: {
       shiv: true,
       printshiv: false,
       load: true,
       mq: false,
       cssclasses: true
     },
     extensibility: {
       addtest: false,
       prefixed: false,
       teststyles: false,
       testprops: false,
       testallprops: false,
       hasevents: false,
       prefixes: false,
       domprefixes: false
     },
     uglify: true,
     parseFiles: true,
     files: ['src/js']
   }
  });

  // Load the tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks("grunt-modernizr");

  // Register custom tasks
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['lint', 'jasmine']);
  grunt.registerTask('docs', ['clean', 'jsdoc']);
  grunt.registerTask('build', ['test', 'compass:dev', 'modernizr']);
  grunt.registerTask('release', ['test', 'docs', 'compass:dist', 'modernizr']);
  grunt.registerTask('default', ['build']);
};