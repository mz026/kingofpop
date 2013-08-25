'use strict';

/* jasmine specs for controllers go here */

describe('AlbumsController', function(){
  var http, scope, controller;
  var mockAlbumns = [{}, {}]
    , albumUrl = "/assets/jsons/albums.json";

  beforeEach(module('myApp.controllers'));
  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller){
    http = _$httpBackend_;
    scope = $rootScope.$new();
    controller = $controller;
  }));

  beforeEach(function(){
    http.whenGET(albumUrl).respond(mockAlbumns);
  });
  

  afterEach(function() {
    http.verifyNoOutstandingRequest();
    http.verifyNoOutstandingExpectation();
  })

  function createController () {
    controller("AlbumsController", {
      $scope: scope
    });
  }

  it("sends request to server to fetch albums data", function(){
    http.expectGET(albumUrl).respond(mockAlbumns);

    createController();
    http.flush();
  });

  it("sets albumns to $scope.albums after fetching success", function(){
    createController();
    http.flush();

    expect(scope.albums).toEqual(mockAlbumns);
  });

  it("sets $scope.currentAlbum to the first album returnd by server", function(){
    createController();
    http.flush();

    expect(scope.currentAlbum).toBe(mockAlbumns[0]);
  });
  
  it("$watch currentAlbum to trigger 'currentAlbumChanged' event", function(){
    var album1 = {}
      , album2 = {};

    createController();
    http.flush();
    scope.currentAlbum = album1;
    scope.$digest();

    spyOn(scope, "$broadcast");
    scope.currentAlbum = album2;
    scope.$digest();

    expect(scope.$broadcast).toHaveBeenCalledWith("currentAlbumChanged");
  });
  
  
  describe("$scope.setCurrentAlbum(album)", function(){
    it("sets $scope.currentAlbum to album", function(){
      var album = {};
      createController();
      http.flush();

      scope.setCurrentAlbum(album);

      expect(scope.currentAlbum).toBe(album);
    });
  });

  
  
});
