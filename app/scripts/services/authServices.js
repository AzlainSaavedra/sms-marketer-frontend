/**
 * Created by sazlain on 09/09/16.
 */
(function () {
    "use strict";
    angular.module('standartApp')
        .factory('authFactory', ['callRest', '$log', '$http', '$q', 'cyptoCache', function (callRest, $log, $http, $q, cyptoCache) {

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
                    cyptoCache.put("standartApp_remember_session", "true");
                } else {
                    cyptoCache.remove("standartApp_remember_session");
                }
            }

            function getRememberSession() {
                var defer = $q.defer();
                var ret = false;

                if (JSON.parse(cyptoCache.get("standartApp_remember_session"))) {
                    tokenValidate().then(function (response) {
                        if (response.data.token_validate) {
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

                $http.post(url_base +"/tokenValidate").then(function (response) {
                    defer.resolve(response);
                }).catch(function (err) {
                    defer.reject(err);
                });

                return defer.promise;
            }

            function resetPassword(email) {
                var defer = $q.defer();

                $http.put(url_base +"/resetPassword", {email: email}).then(function (response) {
                    defer.resolve(response);
                }).catch(function (err) {
                    defer.reject(err);
                });

                return defer.promise;
            }

            function passwordChange(data) {
                var defer = $q.defer();

                $http.put(url_base +"/passwordChange", data, config).then(function (response) {
                    defer.resolve(response);
                }).catch(function (err) {
                    defer.reject(err);
                });

                return defer.promise;
            }

            function userAuth() {
                var defer = $q.defer();

                $http.post(url_base +"/userAuth", {}, config).then(function (response) {
                    defer.resolve(response.data);
                }).catch(function (err) {
                    defer.reject(err);
                });

                return defer.promise;
            }


            return dataFactory;
        }]);
})();
