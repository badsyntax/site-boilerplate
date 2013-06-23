module.exports = function(grunt) {
  return {
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
    clean: {
      docs: ['docs']
    },
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
        options: {
          framework: {
            name: 'kss'
          },
          template: {
            src: 'src/docs/templates/styleguide',
            include: ''
          }
        },
        files: {
          'docs/styleguide': 'src/sass/*.scss',
        }
      }
    },
    copy: {
      styleguide: {
        files: [{
          expand: true, 
          src: ['public/css/*'], 
          dest: 'docs/styleguide'
        }]
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
  };
};