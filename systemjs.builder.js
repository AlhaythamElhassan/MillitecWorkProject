var path = require('path');
var Builder = require('systemjs-builder');
var del = require('del');

var builder = new Builder('public', 'public/systemjs.config.js');
/**
 *  other option { minify: false, sourceMaps: true, encodeNames:false}
 *  encodeNames has to be true to keep relative paths to files
 *  **/
builder.buildStatic('app/boot.js', './public/js/app/boot.js', { minify: true, encodeNames: false })
    .then(function() {
        del(['./public/js/app/**/*.js', '!./public/js/app/**/{boot.js,*.html,*.htm,*.css}'])
            .then(function(paths) {
                console.log('Deleted files and folders:\n', paths.join('\n'));
            });
        console.log('Build completed!');
    })
    .catch(function(err) {
        console.log('Build error!')
        console.log(err);
    });