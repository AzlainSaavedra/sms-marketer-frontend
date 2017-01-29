/**
 * Created by sazlain on 24/09/16.
 */
/**
 * Created by sazlain on 09/09/16.
 */
(function(){
  "use strict";
  angular.module('standartApp')
    .factory('commonFactory',['$http','$q','$timeout','$filter', function ($http,$q,$timeout, $filter) {

      var dataFactory = {};
      dataFactory.rules = [];

      dataFactory.showMessage = showMessage;
      dataFactory.getRols = getRols;
      dataFactory.rolsNames = rolsNames

      function showMessage(idMessage){
        idMessage = true;
        $timeout(function (){
          idMessage = false;
        }, 3000);
      }

      function getRols(){
        var defer = $q.defer();
        $http.get(url_base + "/rule").then(function (response) {
            dataFactory.rules = response.data.data
          defer.resolve(response.data.data);
        }).catch(function (response) {
          defer.reject(response);
        });
        return defer.promise;
      }

      function rolsNames(rol) {
          return $filter('ruleName')(rol, dataFactory.rules);
      }

      return dataFactory;
    }]);
})();
