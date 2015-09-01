'use strict';

/**
 * Main module of the application.
 */
angular
  .module('mobishop', [
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'angular-storage'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('app', {
        url: "",
        controller: 'AppController',
        views : {
          'content' : {
            templateUrl: "tmp/public/views/index/content.html"
          }
        }
      })
      .state('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      });
  }).run(['$rootScope','user','$state','$urlRouter','$location','alerts',function($rootScope,user,$state,$urlRouter,$location,alerts){
    $rootScope.$on('$locationChangeSuccess', function(evt,to_location,from_location) {

    });
    $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
      var doesntExist = toState.name === '';
      if (doesntExist) {
        event.preventDefault();
        $state.go('404');
      }
      var is_logged_in = user.loggedIn();
      var requiresLogin = toState.logged_in || false;
      var requiresNOLogin = toState.not_logged_in || false;
      if(is_logged_in && requiresNOLogin){
        event.preventDefault();
        $state.go('app.dashboard');
        // $urlRouter.sync();
      }
      if(!is_logged_in && requiresLogin){
        event.preventDefault();
        $state.go('access.login');
        // $urlRouter.sync();
      }
    });
    $rootScope.$on('$stateNotFound',
    function(event, unfoundState, fromState, fromParams){
        event.preventDefault();
        console.log(unfoundState);
        if(unfoundState.abstract){
          var child = $state.get(unfoundState+'.index');
          console.log(child);
        }
        $state.go('404');
        // alerts.danger(unfoundState.to,' - 404 Not Found'); // "lazy.state"
        // console.log(unfoundState.toParams); // {a:1, b:2}
        // console.log(unfoundState.options); // {inherit:false} + default options
    });
    $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams){
      // console.log('$stateChangeSuccess',toParams);
    });
    $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error){
      // console.log('$stateChangeError',toParams);
    });
    $rootScope.$on('$viewContentLoading',
    function(event, viewConfig){
        // console.log('$viewContentLoading',viewConfig);
        // Access to all the view config properties.
        // and one special property 'targetView'
        // viewConfig.targetView
    });
    $rootScope.$on('$viewContentLoaded',
    function(event){

    });
    //ANIMATIONS
    // depends on ,
    // onEnter: function(title){
    //   if(title){ ... do something ... }
    // },
    // onExit: function(title){
    //   if(title){ ... do something ... }
    // }
  }]);
