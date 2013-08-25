'use strict';

/* jasmine specs for controllers go here */

describe('AlbumsController', function(){
  var http, scope, controller;
  var mockAlbumns = []
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
  
  
  
  
});
