'use strict';

/**
 * @ngdoc function
 * @name standartApp.controller:MastercontrollerCtrl
 * @description
 * # MastercontrollerCtrl
 * Controller of the standartApp
 */
angular.module('standartApp')
    .controller('masterController', function ($rootScope, $scope, $auth, $state, authFactory, $interval, $controller, commonFactory) {

        $controller('ConfigurationController', {$scope: $scope});

        $rootScope.envName = "";

        $rootScope.logout = logout;
        $rootScope.closeSession = closeSession;
        $rootScope.getRols = getRols;
        $rootScope.rules = {};
        $scope.dataMessages = {
            type: "",
            show: false,
            message: ""
        };

        $scope.getRols();

        /*
         * Metodo para cerrar sesion
         *
         *
         * glyphicon glyphicon-th
         * */
        function logout(id) {
            $("#modalLogout").modal("hide");
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $auth.logout()
                .then(function (data) {
                    // Si se ha logueado correctamente, lo tratamos aquí.
                    // Podemos también redirigirle a una ruta
                    localStorage.setItem("standartApp_remember_session", false);
                    localStorage.removeItem("userStandartApp");
                    $state.go("login");
                })
                .catch(function (response) {
                    // Si ha habido errores llegamos a esta parte
                });
        }

        /**
         * Mostrar modal para cerrar la sesion
         */
        function closeSession() {
            $("#modalLogout").modal("show");
        }

        function getRols() {
            commonFactory.getRols().then(function (response) {
                $rootScope.rules = response;
            })
        }

        $rootScope.showMessage = function (message, type) {
            $scope.dataMessages = {
                type: type,
                show: false,
                message: message,
            }
            $rootScope.$emit("showMessage", $scope.dataMessages);
        }
    });
