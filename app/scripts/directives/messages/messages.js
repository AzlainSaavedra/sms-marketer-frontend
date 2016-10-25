'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('standartApp')
  .directive('messages',function(){
    return {
      templateUrl:'scripts/directives/messages/messages.html',
      restrict: 'E',
      scope: {
        data:"="
      },
      controller: function ($rootScope, $scope, $timeout) {
        $rootScope.$on("showMessage", function (event, args) {
          $scope.data = args;
          $scope.data.show = true;
          $timeout(function () {
            $scope.data.show = false;
          }, 3000);
        });
      },
    }
  });


