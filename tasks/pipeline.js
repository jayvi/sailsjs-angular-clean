/**
 * grunt/pipeline.js
 */
var cssFilesToInject = [
  'styles/main.css',
  'styles/main.css.map'
];
var jsFilesToInject = [
  '../../bower_components/jquery/dist/jquery.js',
  '../../bower_components/lodash/lodash.js',
  '../../bower_components/angular/angular.js',
  '../../bower_components/angular-animate/angular-animate.js',
  '../../bower_components/ui-router/release/angular-ui-router.js',
  '../../bower_components/oclazyload/dist/ocLazyLoad.js',
  '../../bower_components/angular-sanitize/angular-sanitize.js',
  '../../bower_components/angular-touch/angular-touch.js',
  '../../bower_components/a0-angular-storage/dist/angular-storage.js',
  'dependencies/ui-bootstrap.js',
  'dependencies/sails.io.js',
  'scripts/app.js',
  'scripts/controllers/AppController.js'
];
var templateFilesToInject = [
  // 'templates.html'
];
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return 'tmp/public/'+path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return 'tmp/public/'+path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'tmp/public/'+path;
});
