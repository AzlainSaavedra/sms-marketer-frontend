/**
 *
 */
'use strict';
angular.module('standartApp').factory('callRest', function($q, $http) {

	return {
		get : get,
		post : post,
		put : put,
		put2 : put2,
		remove : remove
	};

	/** */
	function get(url, params) {
		var defered = $q.defer();
		$http({
			url : url,
			method : "GET",
			params : params,
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(function(result) {
			defered.resolve(result.data);
		}, function(err) {
			defered.reject(err);
		});
		return defered.promise;
	}

	/** */
	function post(url, params) {
		var defered = $q.defer();
		$http({
			url : url,
			method : "POST",
			data : params,
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(function(result) {
			defered.resolve(result.data);
		}, function(err) {
			defered.reject(err);
		});
		return defered.promise;
	}

	/** */
	function put(url, params) {
		var defered = $q.defer();
		$http({
			url : url,
			method : "PUT",
			data : params,
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(function(result) {
			defered.resolve(result.data);
		}, function(err) {
			defered.reject(err);
		});
		return defered.promise;
	}

	/** */
	function put2(url_, data_, params_) {
		var defered = $q.defer();
		$http({
			url : url_,
			method : "PUT",
			data : data_,
			params : params_,
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(function(result) {
			defered.resolve(result.data);
		}, function(err) {
			defered.reject(err);
		});
		return defered.promise;
	}

	/** */
	function remove(url, params) {
		var defered = $q.defer();
		$http({
			url : url,
			method : "DELETE",
			params : params,
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(function(result) {
			defered.resolve(result.data);
		}, function(err) {
			defered.reject(err);
		});
		return defered.promise;
	}

});
