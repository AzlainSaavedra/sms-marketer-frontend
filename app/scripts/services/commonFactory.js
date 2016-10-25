/**
 * Created by sazlain on 24/09/16.
 */
/**
 * Created by sazlain on 09/09/16.
 */
(function(){
  "use strict";
  angular.module('standartApp')
    .factory('commonFactory',['$http','$q','$timeout', function ($http,$q,$timeout) {

      var dataFactory = {};

      dataFactory.showMessage = showMessage;
      dataFactory.getRols = getRols;

      function showMessage(idMessage){
        idMessage = true;
        $timeout(function (){
          idMessage = false;
        }, 3000);
      }

      function getRols(){
        var defer = $q.defer();
        $http.get(url_base + "/rule").success(function (response) {
          defer.resolve(response);
        }).error(function (response) {
          defer.reject(response);
        });
        return defer.promise;
      }

      return dataFactory;
    }]);
})();
