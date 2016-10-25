'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('standartApp')
  .directive('sidebarSearch',function() {
    return {
      templateUrl:'scripts/directives/sidebar/sidebar-search/sidebar-search.html',
      restrict: 'E',
      scope: {
        filtertext: "=",
        filterdata : "&"
      },
      controller: function ($scope) {
        this.filtertext = 'BK';
      },
      controllerAs: 'ctrl',
      bindToController: true,
    }
  });
