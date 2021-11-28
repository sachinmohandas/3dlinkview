'use strict';

var syncWorker;
var app = angular.module('threeDLinks', ['ngRoute', 'ngCookies', 'ngFlash', 'oc.lazyLoad', 'ngIdle']);

app.run(function ($rootScope, $location, $http, $window, $cookies, application, Flash, $timeout) {
    console.log('executing run');
});