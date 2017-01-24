/**
 * Created by sazlain on 09/09/16.
 */
(function () {
    "use strict";
    angular.module('standartApp')
        .controller('loginController', ['$scope', '$http', '$q', '$rootScope', '$log', '$state', '$auth', '$timeout',
            'authFactory', 'clientFactory',
            function ($scope, $http, $q, $rootScope, $log, $state, $auth, $timeout, authFactory, user) {

                $scope.email = "";
                $scope.password = "";
                $scope.alertMsgLoginFailed = false;
                $scope.alertMsgRegisterSuccess = false;
                $scope.alertMsgRegisterError = false;
                $scope.alertMsgServerError = false;
                $scope.alertMsgResetPasswordError = false;
                $scope.alertMsgResetPasswordSuccess = false;

                $scope.login = function () {
                    $('#login-submit').attr('disabled', 'disabled');
                    $auth.login({
                        email: $scope.email,
                        password: $scope.password
                    })
                        .then(function (response) {
                            if (typeof response.data.Error !== "undefined") {
                                if (response.data.Error == 'invalid_credentials') {
                                    $rootScope.showMessage("Usuario o clave incorrecta. Por favor intentelo de nuevo.", "danger");
                                    $('#login-submit').removeAttr('disabled');
                                } else {
                                    $rootScope.showMessage("Error en el servidor. Por favor verifique su conexión e inténtelo de nuevo", "danger");
                                    $('#login-submit').removeAttr('disabled');
                                }
                                return;
                            }
                            // Si se ha logueado correctamente, lo tratamos aquí.
                            // Podemos también redirigirle a una ruta
                            authFactory.userAuth().then(function (response) {
                                localStorage.setItem("userStandartApp", JSON.stringify(response))
                                switch (response.user.rule_id) {
                                    case 1:
                                        $rootScope.envName = "adminDashboard";
                                        break;
                                    case 2:
                                        break;
                                    case 3:
                                        $rootScope.envName = "main";
                                        break;
                                }
                                $('#login-submit').removeAttr('disabled');
                                $state.go($rootScope.envName + ".clients");

                            }).catch(function (err) {
                                console.log(err)
                                $rootScope.showMessage("Error del sistema. Por favor intentelo de nuevo.", "danger");
                                $('#login-submit').removeAttr('disabled');
                            });

                        })
                        .catch(function (err) {
                            // Si ha habido errores llegamos a esta parte
                            $('#login-submit').removeAttr('disabled');
                            $rootScope.showMessage("Error del sistema. Por favor intentelo de nuevo.", "danger");
                        });
                }

                $scope.register = function () {
                    $auth.signup({
                        email: $scope.registerEmail,
                        password: $scope.registerPassword,
                        nombre: $scope.nombre,
                        apellido: $scope.apellido,
                        rule_id: 3,
                    })
                        .then(function (response) {
                            if (typeof response.data.Error !== "undefined") {
                                if (response.data.Error == 1062) {
                                    $rootScope.showMessage("Error en el registro. Dirección de correo electrónico ya existe.", "danger");
                                }
                                return;
                            }
                            $rootScope.showMessage("Usuario registrado con éxito. Ya puede acceder al sistema.", "success");
                            $('#login-form-link').click();
                            // Si se ha logueado correctamente, lo tratamos aquí.
                            // Podemos también redirigirle a una ruta
                            //$state.go("dashboard");
                        })
                        .catch(function (response) {
                            // Si ha habido errores llegamos a esta parte
                            $rootScope.showMessage("Error en el servidor. Por favor verifique su conexión e inténtelo de nuevo", "danger");
                        });
                }

                $scope.remenberSession = function (option) {
                    authFactory.rememberSession(option);
                }

                $scope.resetPassword = function (email, form) {
                    authFactory.resetPassword(email).then(function (response) {

                        if (response.data === "Error") {
                            $('#pwdModal').modal("hide");
                            $scope.resetEmail = "";
                            form.$setPristine();
                            form.$setUntouched();
                            $rootScope.showMessage("Error en la recuperacion. Dirección de correo electrónico no existe.", "danger");
                            return;
                        }

                        if (response.data === "Success") {
                            $('#pwdModal').modal("hide");
                            $scope.resetEmail = "";
                            form.$setPristine();
                            form.$setUntouched();
                            $rootScope.showMessage("Recuperación de contraseña exitoso. Usted recibira un correo electrónico con su nueva contraseña.", "success");
                            return;
                        }
                    }).catch(function (err) {
                        $('#pwdModal').modal("hide");
                        $scope.resetEmail = "";
                        form.$setPristine();
                        form.$setUntouched();
                        $rootScope.showMessage("Error en el servidor. Por favor verifique su conexión e inténtelo de nuevo", "danger");
                    });
                }


            }]);
})();
