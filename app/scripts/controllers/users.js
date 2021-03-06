'use strict';

/**
 * @ngdoc function
 * @name standartApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the standartApp
 */
angular.module('standartApp')
    .controller('UsersCtrl',['$scope','$rootScope','NgTableParams','user','$location','$window','commonFactory',
        function ($scope, $rootScope, NgTableParams, userFact, $location, $window, commonFactory) {

        $scope.usersList = [];
        $scope.user = {};
        $scope.typeUserForm = true;
        $scope.initCtrl = initCtrl;
        $scope.getUsers = getUsers;
        $scope.getUser = getUser;
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.removeUser = removeUser;
        $scope.initTable = initTable;
        $scope.showUserForm = showUserForm;
        $scope.showModalDeleteUser = showModalDeleteUser;
        $scope.resetForm = resetForm;

        $scope.initCtrl();






        /**
         * Mostrar modal para cerrar la sesion
         */
        function showUserForm(verb, user) {
            $scope.user=null;
            $("#modalUser").modal("show");
            switch (verb){
                case "add":
                    $scope.typeUserForm = true;
                    $scope.titleForm = "Agregar usuario";
                    $scope.btnOk = "Agregar";
                    $scope.user = {
                        status: 1
                    }
                    //$('input[name=status]').attr("disabled","disabled");
                    //$('#email').removeAttr("disabled");
                    break;

                case "edit":
                    $scope.user=null;
                    $scope.user=user;
                    $scope.typeUserForm = false;
                    $scope.titleForm = "Editar usuario";
                    $scope.btnOk = "Guardar";
                    $scope.user = angular.copy(user);
                    if(user.rule_id==1)
                        $('input[name=status]').attr("disabled","disabled");
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
                $scope.usertList = response.data;
                $scope.usertList.forEach(function (item) {
                    item.rolName = commonFactory.rolsNames(item.rule_id);
                })
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
                if(response.status != 'error'){
                    $scope.getUsers();
                    $('#modalDeleteUser').modal("hide");
                    $rootScope.showMessage("Usuario guardado exitosamente!.", "success");
                }else{
                    $('#modalDeleteUser').modal("hide");
                    $rootScope.showMessage(response.data, "danger");
                }

            }).catch(function (err) {
                $rootScope.showMessage("Error en la operacion!.", "danger");
            })
        }
        
        function resetForm(form) {
            form.$setPristine(true);
            form.$setDirty(false);
            form.submited = false;
            $scope.user = null;
        }
    }]);
