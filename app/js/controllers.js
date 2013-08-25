'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AlbumsController', function($scope, $http) {
    $http.get("/assets/jsons/albums.json").success(function(albums) {
      $scope.albums = albums;
      $scope.currentAlbum = $scope.albums[0];
    });

    $scope.setCurrentAlbum = function(album) {
      $scope.currentAlbum = album;
    };

    $scope.$watch("currentAlbum", function() {
      $scope.$broadcast("currentAlbumChanged");
    });
  });
