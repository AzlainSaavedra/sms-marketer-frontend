/**
 * Created by azlain on 29/01/17.
 */

(function () {
    'use strict';
    angular.module('standartApp').factory('cyptoCache', function(smsMarketerCache, $crypto) {
        return {
            put: function (key, value) {
                value?localStorage.setItem(key, $crypto.encrypt(value)):null;
            },
            get: function (key) {
                return localStorage.getItem(key)?$crypto.decrypt(localStorage.getItem(key)):null;
            },
            remove: function (key) {
                localStorage.removeItem(key)
            }
        }
    });
})();