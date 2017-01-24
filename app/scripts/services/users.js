'use strict';

/**
 * @ngdoc service
 * @name standartApp.users
 * @description
 * # users
 * Factory in the standartApp.
 */
angular.module('standartApp')
    .factory('user', function ($http, $q) {

        var headers = {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        var dataFactory = {};
        dataFactory.getUsers = getUsers;
        dataFactory.getUser = getUser;
        dataFactory.postUser = postUser;
        dataFactory.putUser = putUser;
        dataFactory.deleteUser = deleteUser;

        function getUsers(){
            var defer = $q.defer();
            $http.get(url_base + "/user").then(function (response) {
                defer.resolve(response.data);
            }).catch(function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function getUser(id){
            var defer = $q.defer();
            $http.get(url_base + "/user/"+id).then(function (response) {
                defer.resolve(response.data);
            }).catch(function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function postUser(user){
            var defer = $q.defer();
           $http.post(url_base + "/user",user,headers).then(function (response) {
                defer.resolve(response.data);
            }).catch(function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function putUser(user){
            var defer = $q.defer();
            $http.put(url_base + "/user/"+user.id,user,headers).then(function (response) {
                defer.resolve(response.data);
            }).catch(function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function deleteUser(id){
            var defer = $q.defer();
            $http.delete(url_base + "/user/"+id).then(function (response) {
                defer.resolve(response.data);
            }).catch(function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        return dataFactory;
    });
