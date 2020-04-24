var foreCast = angular.module('foreCastApp',['ngRoute','ngResource']);

// routes configure

foreCast.config(function($routeProvider){
    
    $routeProvider
    
    .when('/',{
        templateUrl:'pages/home.htm',
        controller: 'homeController'
    })

    .when('/forecast',{
        templateUrl:'pages/forecast.htm',
        controller: 'foreCastController'
    })
      
    .when('/forecast/:city',{
        templateUrl:'pages/forecast.htm',
        controller: 'foreCastController'
    })  
    
});


foreCast.service('cityService',function(){
    this.city = 'Hyderabad';
    
})

// creating home controller

foreCast.controller('homeController',['$scope','cityService',function($scope,cityService){
    
    $scope.city = cityService.city;
    
    $scope.$watch('city',function(){
        cityService.city = $scope.city;
    })
    
}]);

// creating forecast controller

foreCast.controller('foreCastController',['$scope','$resource','$routeParams','$filter','cityService', function($scope,$resource,$routeParams,$filter,cityService){
    // if routing is used for passing data
//    $scope.city = $filter('uppercase')($routeParams.city);
    
    // if service is used
                                          
$scope.city = cityService.city;
    
    $scope.weatherApi = $resource('http://api.openweathermap.org/data/2.5/forecast', { callback : 'JSON_CALLBACK'} , { get : { method: 'JSONP'}});
       
   $scope.weatherResults =  $scope.weatherApi.get({q: $scope.city, cnt:4,appid:'f9ec0d3a10fcae17805ee11f50315795'});    
    
    $scope.convertToFahrenheit = function(temperature){
        return Math.round((1.8 * (temperature - 273)) + 32);
    }
    
    $scope.convertToDate = function(date){
        return new Date(date * 1000);
    }
    
    console.log($scope.weatherResults);

    
}]);

// directive

foreCast.directive('weatherDetails',function(){
    
    return {
        restrict:'E',
        templateUrl:'directives/weatherDetails.htm',
        replace: true,
        scope: {
            weatherData:'=',
            temConversion:'&',
            dateConversion:'&',
            dateFormat:'@'
        }
    }
})



