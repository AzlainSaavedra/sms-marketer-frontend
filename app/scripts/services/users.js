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

        var config = {
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

        console.log(url_base + "/user/");



        function getUsers(){
            var defer = $q.defer();
            $http.get(url_base + "/user").success(function (response) {
                defer.resolve(response);
            }).error(function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function getUser(id){
            var defer = $q.defer();
            $http.get(url_base + "/user/"+id).success(function (response) {
                defer.resolve(response);
            }).error(function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function postUser(user){
            console.log(url_base + "/user/")
            var defer = $q.defer();
           $http.jsonp(url_base + "/user/",user,config).success(function (response) {
                defer.resolve(response);
            }).error(function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function putUser(user){
            var defer = $q.defer();
            $http.put(url_base + "/user/"+user.id,user,config).success(function (response) {
                defer.resolve(response);
            }).error(function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function deleteUser(id){
            var defer = $q.defer();
            $http.delete(url_base + "/user/"+id).success(function (response) {
                defer.resolve(response);
            }).error(function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        return dataFactory;
    });
