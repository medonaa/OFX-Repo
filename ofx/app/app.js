/*######################*********************#############################

Created by: Medona A
Created On: 07/05/2018

######################*********************##############################*/

var ofxApp = angular.module('ofxApp', ['ngRoute', 'ngResource']);

ofxApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when("/quickquote", {
            templateUrl: "/app/views/quickQuote.html",
            controller: "quickQuoteController"
        });

    $routeProvider.otherwise({
        redirectTo: "/quickquote"
    });
}]);


