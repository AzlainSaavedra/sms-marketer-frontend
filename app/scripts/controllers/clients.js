'use strict';

/**
 * @ngdoc function
 * @name standartApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the standartApp
 */
angular.module('standartApp')
    .controller('ClientsCtrl', function ($scope, $rootScope, NgTableParams, clientFactory) {

        $scope.client = {};
        $scope.clientSelected = {};
        $scope.initCtrl = initCtrl;
        $scope.getClients = getClients;
        $scope.getClient = getClient;
        $scope.updateClient = updateClient;
        $scope.deleteClient = deleteClient;
        $scope.initTable = initTable;
        $scope.showEditClienteForm = showEditClienteForm;
        $scope.showModalDeleteClient = showModalDeleteClient;

        $scope.initCtrl();


        /**
         * Mostrar modal para cerrar la sesion
         */
        function showEditClienteForm(client) {
            $("#modalEditClient").modal("show");
            $scope.clientSelected = angular.copy(client);
            if (!$scope.clientSelected.idType) {
                $scope.clientSelected.idType = "V";
            }
            //$scope.client.idType = "V";
        }

        /**
         * Mostrar modal para cerrar la sesion
         */
        function showModalDeleteClient(client) {
            $("#modalDeleteClient").modal("show");
            $scope.clientSelected = angular.copy(client);
        }

        function initCtrl() {
            $scope.getClients();
        }

        function initTable(dataset) {
            $scope.clientsTable = new NgTableParams({
                page: 1,
                count: 10
            }, {
                dataset: dataset
            })
        }

        function getClients() {
            clientFactory.getClients().then(function (response) {
                $scope.clientList = response.Clients
                $scope.initTable($scope.clientList);
            })
        }

        function getClient(id) {
            clientFactory.getClient(id).then(function (response) {
                console.log(response)
            })
        }

        function updateClient(client, form) {
            clientFactory.putClient(client).then(function (response) {
                $scope.getClients();
                $('#modalEditClient').modal("hide");
                $scope.clientSelected = {};
                form.$setPristine();
                form.$setUntouched();
                $rootScope.showMessage("Cliente guardado exitosamente!.", "success");
            }).catch(function (err) {
                $rootScope.showMessage("Error en la operacion!.", "danger");
            })
        }

        function deleteClient() {
            clientFactory.deleteClient($scope.clientSelected.id).then(function (response) {
                $scope.getClients();
                $('#modalDeleteClient').modal("hide");
                $rootScope.showMessage("Cliente guardado exitosamente!.", "success");
            }).catch(function (err) {
                $rootScope.showMessage("Error en la operacion!.", "danger");
            })
        }
    });
