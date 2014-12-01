'use strict';

function Klass(){
  return this;
}
Klass.prototype.blue = function(){
  this.blue = true;
}
angular.module('CountryExplorer', [])
  .service('myKlass', Klass)
  .controller('TestKlassCtrl', function(myKlass, $timeout){
    console.info(myKlass.blue);
  })
  .factory('Countries', function($http, myKlass){
    myKlass.blue();
    console.info(myKlass.blue);
    var endpoint = 'http://restcountries.eu/rest/v1/name/',
      api = {
        get: function(name){
          var url = endpoint + name + '?fullText=true';
          return $http.get(url).then(function(response){
            return response.data[0];
          });
        }
      };
    return api;
  })
  .controller('MainCtrl', function($scope, Countries){
    //initialize the object with some data
    $scope.country = {
        name:'Jamaica',
        region:'America',
        famousPerson: 'Usain Bolt'
        //Some more default data data
      };
    $scope.input = {
      country: $scope.country,
      show:'end'
    };
    $scope.playGame = function(){
      delete $scope.input.guess;
      if($scope.input.country.name.length > 2){
        $scope.input.show = 'guess';
        $scope.result = false;
      }
    };
    function finishGame(result){
      $scope.play = false;
      $scope.input.show = 'end';
      $scope.result = result;
    }
    $scope.restartGame = function(){
      $scope.input.guess = null;
      $scope.input.show = 'play';
      $scope.play = true;
    };

    $scope.getThatData = function(){
      Countries.get($scope.input.country.name).then(function(country){
        //Do something with response
        $scope.country = country;
        finishGame(country.capital);
      }, function(){
        finishGame(null);
      });
    };
  });
