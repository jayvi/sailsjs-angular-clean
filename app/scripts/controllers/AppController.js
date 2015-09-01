'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('mobishop')
  .controller('AppController', ['user', 'alerts', 'utils', '$scope', '$rootScope', '$state', function(user, alerts, utils, $scope, $rootScope, $state) {

        // App globals
        $scope.app = {
            name: 'CoursesApp',
            description: 'Freeware WebApp for education',
            layout: {
                menuPin: false,
                menuBehind: false,
                theme: 'pages/css/pages.css'
            },
            author: 'mimo',
            user: user,
            alerts: alerts,
            utils: utils,
            permissions: {}

        }
        // Checks if the given state is the current state
        $scope.is = function(name) {
            return $state.is(name);
        }

        // Checks if the given state/child states are present
        $scope.includes = function(name) {
            return $state.includes(name);
        }

        // Broadcasts a message to pgSearch directive to toggle search overlay
        $scope.showSearchOverlay = function() {
            $scope.$broadcast('toggleSearchOverlay', {
                show: true
            })
        }

    }]).
    factory('user',['$q', '$http', 'store', function($q, $http, store) {
        return {
            clear: function() {
                store.set('user', {});
            },
            permissions: function(resource) {
                var deferred = $q.defer();
                var user = _.isUndefined(store.get('user')) ? {} : store.get('user');
                $http.post('api/user/permissions', {
                    token: user.token,
                    resource: resource
                }).success(function(data) {
                    if (data.status) {
                        deferred.resolve(data.permissions);
                        return;
                    }
                    deferred.reject();
                });
                return deferred.promise;
            },
            loggedIn: function() {
                var user = _.isNull(store.get('user')) ? {} : store.get('user');
                return !_.isEmpty(user) && !_.isEmpty(user.token) && !_.isUndefined(user.token);
            },
            getEmail: function() {
                var user = _.isNull(store.get('user')) ? {} : store.get('user');
                return user.email;
            },
            setEmail: function(email) {
                var user = _.isNull(store.get('user')) ? {} : store.get('user');
                user.email = email;
                store.set('user', user);
            },
            getToken: function() {
                var user = _.isNull(store.get('user')) ? {} : store.get('user');
                return user.token;
            },
            setFname: function(fname) {
                var user = _.isNull(store.get('user')) ? {} : store.get('user');
                user.fname = fname;
                store.set('user', user);
            },
            setLname: function(lname) {
                var user = _.isNull(store.get('user')) ? {} : store.get('user');
                user.lname = lname;
                store.set('user', user);
            },
            setUsername: function(username) {
                var user = _.isNull(store.get('user')) ? {} : store.get('user');
                user.username = username;
                store.set('user', user);
            },
            setToken: function(token) {
                var user = _.isNull(store.get('user')) ? {} : store.get('user');
                user.token = token;
                store.set('user', user);
            }
        };
    }]).
    factory('utils',[function() {
      return {
        generate_uid : function(obj_type) {
          obj_type = obj_type||'CRS';
          // http://www.ietf.org/rfc/rfc4122.txt
          var uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
          // inject the type
          var temp = uid.split('-',1);
          var l = temp[0].length;
          //remove it
          var uid1 = uid.slice(l);
          uid2 = uid.replace(temp,'');

          return temp[0]+'-'+obj_type+uid2;
        }
      }
    }]).
    factory('alerts',['store',function(store) {
        return {
            default: function(position,message){
              $('body').pgNotification({
                  style: 'flip',
                  message: message,
                  position: position,
                  timeout: 0,
                  type: 'default'
              }).show();
            },
            warning: function(position,message) {
              $('body').pgNotification({
                  style: 'flip',
                  message: message,
                  position: position,
                  timeout: 0,
                  type: 'warning'
              }).show();
            },
            info: function(position,message){
              $('body').pgNotification({
                  style: 'flip',
                  message: message,
                  position: position,
                  timeout: 0,
                  type: 'info'
              }).show();
            },
            success: function(position,message) {
              $('body').pgNotification({
                  style: 'flip',
                  message: message,
                  position: position,
                  timeout: 0,
                  type: 'success'
              }).show();
            },
            danger: function(position,message) {
              $('body').pgNotification({
                  style: 'flip',
                  message: message,
                  position: position,
                  timeout: 0,
                  type: 'danger'
              }).show();
            }
        };
    }])
angular.module('mobishop')
    .directive('includeReplace', function() {
        return {
            require: 'ngInclude',
            restrict: 'A',
            link: function(scope, el, attrs) {
              console.log(scope,el,attrs);
                el.replaceWith(el.children());
            }
        };
    })
