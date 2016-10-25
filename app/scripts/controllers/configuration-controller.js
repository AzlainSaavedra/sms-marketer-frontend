'use strict';

/**
 * @ngdoc function
 * @name standartApp.controller:ConfigurationControllerCtrl
 * @description
 * # ConfigurationControllerCtrl
 * Controller of the standartApp
 */
angular.module('standartApp')
  .controller('ConfigurationController', function ($scope, $rootScope, authFactory, $timeout) {

    /*
    * Motodos publicos
    * */
    $scope.passwordChange = passwordChange;

    function passwordChange(){
      $scope.user = JSON.parse(localStorage.getItem("userStandartApp")).User;
      var data = {
        id:$scope.user.id,
        email: $scope.user.email,
        oldPass: $scope.oldPassword,
        newPass: $scope.newPassword,
      }
      authFactory.passwordChange(data).then(function (response) {
        resetForm($scope.resetForm);
        if(response.data == "Error" && response.message == "PASSWORD_NOT_MATCH"){
          $rootScope.showMessage("Error la contraseña actual es incorrecta.","danger");
          return;
        }
        if(response.data == "Error" && response.message == "SQL_ERROR"){
          $rootScope.showMessage("Error en el servidor. Por favor intentelo de nuevo.","danger");
          return;
        }
        $rootScope.showMessage("Su contraseña ha sido modificada exitosamente!.","success");

      })
    }

    function resetForm(form){
      $scope.oldPassword = "";
      $scope.newPassword = "";
      $scope.repeatPassword = "";
      form.$setPristine();
      form.$setUntouched();
    }
  });


