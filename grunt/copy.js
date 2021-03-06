// COPY
// Copies remaining files to places other tasks can use
module.exports = function(grunt) {

    'use strict';

    // Read manifest files from plugins and copies assets to destination (it existing)
    grunt.registerTask('copy:plugins', function (dest) {
        var settings = grunt.config.get('settings');
        var dir = '.tmp';
        if(dest === 'dist') {
            dir = grunt.config.get('goteo').dist;
        }

        for(var plugin in settings.plugins) {
            if(settings.plugins[plugin].active && grunt.file.exists('extend/' + plugin + '/manifest.yml')) {
                grunt.file.setBase('extend/' + plugin);
                var manifest = grunt.file.readYAML('manifest.yml');
                if(manifest.assets) {
                    for(var origin in manifest.assets) {
                        var destination = '../../' + dir + '/' + manifest.assets[origin];
                        if(!grunt.file.exists(origin)) {
                            grunt.fail.warn('Plugin asset [extend/' + plugin + '/' + origin + '] not found');
                        }
                        if(grunt.file.isFile(origin)) {
                            grunt.verbose.writeln('Found plugin [' + plugin + '] with asset [' + origin + '] , copying to [' + destination + ']');
                            grunt.file.copy(origin, destination);
                        }
                        else {
                            var files = grunt.file.expandMapping('**/*', destination, {cwd: origin});
                            for(var i in files) {
                                var o = files[i].src;
                                var d = files[i].dest;
                                // console.log('COPY',o,'TO',d);
                                if(grunt.file.isFile(o.toString())) {
                                    grunt.verbose.writeln('Found plugin [' + plugin + '] with asset [' + o + '] , copying to [' + d + ']');
                                    grunt.file.copy(o.toString(), d);
                                }
                            }
                        }
                    }
                }
                grunt.file.setBase('../../');
            }
        }
    });

    grunt.config('copy', {
        devel: {
            expand: true,
            dot: true,
            cwd: '<%= goteo.app %>',
            dest: '.tmp',
            src: '**/*'
        },

        dist: {
            expand: true,
            dot: true,
            cwd: '<%= goteo.app %>',
            dest: '<%= goteo.dist %>',
            src: '**/*'
        },

        // some files will be modified in order to add .js an .css revisioned files (minified, etc)
        headers: {
            expand: true,
            dot: true,
            cwd: '<%= goteo.templates %>/default/',
            dest: '<%= goteo.dist %>/templates/',
            src: '**/templates/**/styles.php'
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
};
