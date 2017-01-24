'use strict';

/**
 * @ngdoc service
 * @name standartApp.userFactory
 * @description
 * # userFactory
 * Factory in the standartApp.
 */
angular.module('standartApp')
  .factory('clientFactory', function ($http, $q) {

      var config ={
      "Content-Type": "application/json"
    }

    var dataFactory = {};
    dataFactory.getUser = getUser;
    dataFactory.getClients = getClients;
    dataFactory.getClient = getClient;
    dataFactory.putClient = putClient;
    dataFactory.deleteClient = deleteClient;


    function getUser(email){
      var defer = $q.defer();
      $http.post(url_base + "/user",{email:email},config).then(function (response) {
        defer.resolve(response.data);
      }).catch(function (response) {
        defer.reject(response);
      });
      return defer.promise;
    }

    function getClients(){
      var defer = $q.defer();
      $http.get(url_base + "/client").then(function (response) {
        defer.resolve(response.data);
      }).catch(function (response) {
        defer.reject(response);
      });
      return defer.promise;
    }

    function getClient(id){
      var defer = $q.defer();
      $http.get(url_base + "/client/"+id).then(function (response) {
        defer.resolve(response.data);
      }).catch(function (response) {
        defer.reject(response);
      });
      return defer.promise;
    }

    function putClient(client){
      var defer = $q.defer();
      $http.put(url_base + "/client/"+client.id,client,config).then(function (response) {
        defer.resolve(response.data);
      }).catch(function (response) {
        defer.reject(response);
      });
      return defer.promise;
    }

    function deleteClient(id){
      var defer = $q.defer();
      $http.delete(url_base + "/client/"+id).then(function (response) {
        defer.resolve(response.data);
      }).catch(function (response) {
        defer.reject(response);
      });
      return defer.promise;
    }

    return dataFactory;
  });
