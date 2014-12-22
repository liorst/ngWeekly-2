'use strict'
var app = angular.module('my.directives', [])
    .directive('injectRandomData', function() {
        return {
            restrict: 'E', //restrict the directive to be used as an element only
            transclude: true,
            scope:true,
            template: '<div><div>{{randomText}}</div><ng-transclude></ng-transclude><div>{{randomText}}</div></div>',
            link: function(scope, element, attrs) {
                scope.randomText = Math.random();
            }
        };
    })
    .directive('trimSpaces', function() {
        return {
            restrict: 'A', //use the directive as an attribute only,
            scope: true,
            link: function(scope, element, attrs) {
                function recursiveTrim(root) {
                  var regex = new RegExp(' ', 'g');
                    angular.forEach(root.children, function(child) {
                        recursiveTrim(child.children);
                    });
                    root.text(root.text().replace(regex, '_'));
                }
                recursiveTrim(element);
            }
        };
    })
    .directive('tvScreen', function($timeout) {
        return {
            restrict: 'E',
            scope: {
                'text': '@',
                'latency': '='
            },
            templateUrl: 'tvScreen.html',
            link: function(scope, element, attrs) {
                var i = 0,
                  length = scope.text.length,
                  latency = scope.latency || 50;
                  scope.buffer = [];
                (function insertToBuffer(letter) {
                  $timeout(function() {
                    scope.buffer.push(letter);
                    if (i < length) {
                      insertToBuffer(scope.text[i]);
                    i++;
                    }
                  }, latency);
                })();
            }
        };
    })
    .directive('blink', function ($interval) {
      return {
        restrict: 'A',
        scope:{
          'duration':'='
        },
        link: function (scope, element, attrs) {
          var duration = scope.duration || 500;
          $interval(function(){
            if(element.hasClass('hidden')){
              element.removeClass('hidden');
            }
            else{
              element.addClass('hidden');
            }
          }, duration);
        }
      };
    });
