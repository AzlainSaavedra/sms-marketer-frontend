'use strict';

/**
 * @ngdoc function
 * @name standartApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the standartApp
 */
angular.module('standartApp')
    .controller('UsersCtrl',['$scope','$rootScope','NgTableParams','user', function ($scope, $rootScope, NgTableParams, userFact) {

        $scope.usersList = [];
        $scope.user = {};
        $scope.initCtrl = initCtrl;
        $scope.getUsers = getUsers;
        $scope.getUser = getUser;
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.removeUser = removeUser;
        $scope.initTable = initTable;
        $scope.showUserForm = showUserForm;
        $scope.showModalDeleteUser = showModalDeleteUser;

        $scope.initCtrl();


        /**
         * Mostrar modal para cerrar la sesion
         */
        function showUserForm(verb, user) {
            console.log(user)
            $("#modalUser").modal("show");
            switch (verb){
                case "add":
                    $scope.titleForm = "Agregar usuario";
                    $scope.btnOk = "Agregar";
                    $scope.user.status = true;
                    $('input[name=status]').attr("disabled","disabled");
                    $('#email').removeAttr("disabled");
                    break;

                case "edit":
                    $scope.titleForm = "Editar usuario";
                    $scope.btnOk = "Guardar";
                    $scope.user = angular.copy(user);
                    $('input[name=status]').removeAttr("disabled");
                    $('#email').attr("disabled","disabled");
                    if (!$scope.user.idType) {
                        $scope.user.idType = "V";
                    }
                    break;
            }

            //$scope.user.idType = "V";
        }

        /**
         * Mostrar modal para cerrar la sesion
         */
        function showModalDeleteUser(user) {
            $("#modalDeleteUser").modal("show");
            $scope.user = angular.copy(user);
        }

        function initCtrl() {
            $scope.getUsers();
        }

        function initTable(dataset) {
            $scope.usersTable = new NgTableParams({
                page: 1,
                count: 10
            }, {
                dataset: dataset
            })
        }

        function getUsers() {
            userFact.getUsers().then(function (response) {
                $scope.usertList = response.Clients
                $scope.initTable($scope.usertList);
            })
        }

        function getUser(id) {
            userFact.getUser(id).then(function (response) {
                console.log(response)
            })
        }

        function addUser(user, form) {
            userFact.postUser(user).then(function (response) {
                console.log(response)
                $scope.getUsers();
                $('#modalUser').modal("hide");
                $scope.user = {};
                form.$setPristine();
                form.$setUntouched();
                $rootScope.showMessage("Usuario agregado exitosamente!.", "success");
            }).catch(function (err) {
                $rootScope.showMessage("Error en la operacion!.", "danger");
            })
        }

        function updateUser(user, form) {
            userFact.putUser(user).then(function (response) {
                $scope.getUsers();
                $('#modalUser').modal("hide");
                $scope.user = {};
                form.$setPristine();
                form.$setUntouched();
                $rootScope.showMessage("Usuario actualizado exitosamente!.", "success");
            }).catch(function (err) {
                $rootScope.showMessage("Error en la operacion!.", "danger");
            })
        }

        function removeUser() {
            userFact.deleteUser($scope.user.id).then(function (response) {
                $scope.getUsers();
                $('#modalDeleteUser').modal("hide");
                $rootScope.showMessage("Usuario guardado exitosamente!.", "success");
            }).catch(function (err) {
                $rootScope.showMessage("Error en la operacion!.", "danger");
            })
        }
    }]);
