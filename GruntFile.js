module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            files: ['*.js', 'lib/*.js', 'test/*.js'],
            options: {
                esnext: true,
                globals: {
                    jQuery: true
                }
            }
        },
        less: {
            production: {
                options: {
                    paths: ["less"],
                    cleancss: true
                },
                files: {
                    "dist/css/style.css": ["less/*.less"]
                }
            }
        },
        autoprefixer: {
            single_file: {
                src: "dist/css/style.css",
                dest: "dist/css/style.css"
            }
        },
        browserify: {
            options: {
                browserifyOptions: { debug: true }
            },
            client: {
                src: ["app-client.js"],
                dest: 'dist/js/main.js'
            }
        },
        watch: {
            scripts: {
                files: ["app-client.js", "lib/*.js"],
                tasks: ['hint', 'browserify'],
                options: { spawn: true }
            },
            css: {
                files: ["less/*.less"],
                tasks: ["css"],
                options: { spawn: true }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask('hint', ['jshint']);
    grunt.registerTask('css', ["less", "autoprefixer"]);
    grunt.registerTask('js', ["browserify"]);

    grunt.registerTask('default', ["hint", "css", "js"]);

};