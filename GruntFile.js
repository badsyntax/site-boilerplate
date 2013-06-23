module.exports = function(grunt) {

  /* Set the config */
  grunt.initConfig(require('./grunt/config')(grunt));

  /* Load the tasks */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-styleguide');
  grunt.loadNpmTasks('grunt-contrib-copy');

  /* Register custom tasks */

  /** Spins up a connect server to display the API documentation. */
  grunt.registerTask('viewdocs', function() {
    grunt.task.run('connect:docs');
  });
  
  /** Checks code for syntax errors. */
  grunt.registerTask('lint', 
    ['jshint']
  );
  
  /** Runs the javascript tests. */
  grunt.registerTask('test',
    ['lint', 'jasmine']
  );
  
  /** Generates the API documentation. */
  grunt.registerTask('docs', 
    ['clean:docs', 'jsdoc:dist', 'styleguide:dist', 'copy:styleguide']
  );
  
  /** The development build task. */
  grunt.registerTask('build', 
    ['modernizr', 'test', 'compass:dev']
  );
  
  /** The production build task. */
  grunt.registerTask('release', 
    ['modernizr', 'test', 'compass:dist', 'docs']
  );
  
  /** The default task for running `grunt`. */
  grunt.registerTask('default', 
    ['build']
  );
};