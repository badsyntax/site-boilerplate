module.exports = function(grunt) {

  /* Set the config */
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
      extra: {
        shiv: false,
        printshiv: false,
        load: false,
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
    },
    styleguide: {
      dist: {
          name: 'Style Guide',
          framework: 'kss-node',
          files: {
            'docs/css/core': 'src/sass/core/*.scss',
            'docs/css/components': 'src/sass/components/*.scss',
          }
      }
    },
    connect: {
      docs: {
        options: {
          port: 9001,
          base: 'docs',
          keepalive: true
        }
      }
    }
  });

  /* Load the tasks */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks("grunt-modernizr");
  grunt.loadNpmTasks('grunt-styleguide');

  /* Register custom tasks */
  grunt.registerTask('viewdocs', 'Spins up a connect server to display the API documentation', function() {
    grunt.task.run('connect:docs');
  });
  grunt.registerTask('lint', 'Checks code for syntax errors.', ['jshint']);
  grunt.registerTask('test', 'Runs all the tests.', ['lint', 'jasmine']);
  grunt.registerTask('docs', 'Generates the API documentation.', ['clean', 'jsdoc', 'styleguide:dist']);
  grunt.registerTask('build', 'The development build task.', ['modernizr', 'test', 'compass:dev']);
  grunt.registerTask('release', 'The production build task.', ['modernizr', 'test', 'compass:dist', 'docs']);
  grunt.registerTask('default', 'Our default task for running `grunt`.', ['build']);
};