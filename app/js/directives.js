'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .config(function($provide) {
    $provide.value("$", window.$);
  })
  .directive("fadeInAfterImageLoaded", function($) {
    return {
      link: function(scope, element, attr) {
        scope.$on("currentAlbumChanged", function() {
          $(element).hide();
          $(element).imagesLoaded(function() {
            $(element).fadeIn();
          });
          
        });
      }
    }
  });
