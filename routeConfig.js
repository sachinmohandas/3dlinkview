'use strict';
var app = angular.module('threeDLinks');

app.config(function ($routeProvider) {
    console.log('executing config routeProvider');
    $routeProvider
        .when('', {
            templateUrl: '3d.html',
            controller: '3DController',
        })
        .otherwise({
            redirectTo: '',
        });
});