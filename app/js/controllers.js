'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AlbumsController', function($scope, $http) {
    $http.get("/assets/jsons/albums.json").success(function(albums) {
      $scope.albums = albums;
    });
  });
