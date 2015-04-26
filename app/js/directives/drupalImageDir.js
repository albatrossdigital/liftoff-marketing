'use strict';

angular.module('drupalImage', [
  'drupalService'
])

.directive('drupalImageId', function factory($window, $browser, File) {
  return {
    restrict: 'A',
    template: '<img src="{{src}}" alt="{{alt}}" title="{{title}}" />',
    replace: true,
    scope: {
      drupalImageId: '@',
      drupalImageStyle: '@'
    },
    link: function($scope, $rootScope, $element) {
      File.query({fid: $scope.drupalImageId}).$promise.then(function(data) {
        $scope.src = data.url.replace('files/', 'files/styles/' + $scope.drupalImageStyle + '/public/');
        $scope.alt = data.field_file_image_alt_text;
        $scope.title = data.field_file_image_title_text;
      });
    }
  }
})