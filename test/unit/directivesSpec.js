'use strict';

/* jasmine specs for directives go here */

describe('fade-in-after-image-loaded directive', function() {
  var mock$, mockElement, tag, scope;

  beforeEach(module('myApp.directives'));
  beforeEach(function(){
    module(function($provide) {
      mockElement = {
        hide: jasmine.createSpy("hide")
        , imagesLoaded: jasmine.createSpy("imagesLoaded")
        , fadeIn: jasmine.createSpy("fadeIn")
      };
      mock$ = function() {
        return mockElement;
      };
      $provide.value("$", mock$);
    });
  });

  beforeEach(inject(function($rootScope){
    scope = $rootScope.$new();
    tag = "<div fade-in-after-image-loaded></div>";  
  }));
  
  describe("$on 'currentAlbumChanged'", function(){
    it("hides the element", inject(function($compile){
      $compile(tag)(scope);
      scope.$broadcast("currentAlbumChanged");

      expect(mockElement.hide).toHaveBeenCalled();
    }));

    it("registers a loaded callback using 'imagesLoaded' to fadeIn the element"
      , inject(function($compile){
    
      var onLoad;
      mockElement.imagesLoaded = function(cb) {
        onLoad = cb;
      };
      spyOn(mockElement, "imagesLoaded").andCallThrough();

      $compile(tag)(scope);
      scope.$broadcast("currentAlbumChanged");
      onLoad();

      expect(mockElement.imagesLoaded).toHaveBeenCalled();
      expect(mockElement.fadeIn).toHaveBeenCalled();
    }));
  });
});
