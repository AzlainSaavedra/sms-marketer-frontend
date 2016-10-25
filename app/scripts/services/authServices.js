/**
 * Created by sazlain on 09/09/16.
 */
(function () {
    "use strict";
    angular.module('standartApp')
        .factory('authFactory', ['callRest', '$log', '$http', '$q', '$auth', function (callRest, $log, $http, $q, $auth) {

            var dataFactory = {};
            var config = {
                "Content-Type": "application/json"
            }

            dataFactory.tokenValidate = tokenValidate;
            dataFactory.userAuth = userAuth;
            dataFactory.rememberSession = rememberSession;
            dataFactory.getRememberSession = getRememberSession;
            dataFactory.resetPassword = resetPassword;
            dataFactory.passwordChange = passwordChange;

            function rememberSession(option) {
                if (option) {
                    localStorage.setItem("standartApp_remember_session", true);
                } else {
                    localStorage.setItem("standartApp_remember_session", false);
                }
            }

            function getRememberSession() {
                var defer = $q.defer();
                var ret = false;
                if (JSON.parse(localStorage.getItem("standartApp_remember_session"))) {
                    tokenValidate().then(function (response) {
                        if (response.token_validate) {
                            ret = true;
                        } else {
                            ret = false;
                        }
                        defer.resolve(ret);
                    }).catch(function (response) {
                        ret = false;
                        defer.reject(ret);
                    });
                } else {
                    defer.reject(ret);
                }
                return defer.promise;
            }

            function tokenValidate() {
                var defer = $q.defer();

                $http.post(url_base +"/tokenValidate").success(function (response) {
                    defer.resolve(response);
                }).error(function (err) {
                    defer.reject(err);
                });

                return defer.promise;
            }

            function resetPassword(email) {
                var defer = $q.defer();

                $http.put(url_base +"/resetPassword", {email: email}).success(function (response) {
                    defer.resolve(response);
                }).error(function (err) {
                    defer.reject(err);
                });

                return defer.promise;
            }

            function passwordChange(data) {
                var defer = $q.defer();

                $http.put(url_base +"/passwordChange", data, config).success(function (response) {
                    defer.resolve(response);
                }).error(function (err) {
                    defer.reject(err);
                });

                return defer.promise;
            }

            function userAuth() {
                var defer = $q.defer();

                $http.post(url_base +"/userAuth", {}, config).success(function (response) {
                    defer.resolve(response);
                }).error(function (err) {
                    defer.reject(err);
                });

                return defer.promise;
            }


            return dataFactory;
        }]);
})();
