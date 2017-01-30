'use strict';

/**
 * @ngdoc overview
 * @name standartApp
 * @description
 * # standartApp
 *
 * Main module of the application.
 */

var url_base = "//smsmarketerv2:8082/api-v1";
//var url_base = "http://easycors.app/api-v1";

//var url_base = "http://apirest.app/api-v1";

angular
    .module('standartApp', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngResource',
        'satellizer',
        'ngAnimate',
        'ngTable',
        'ngMessages',
        'validation.match',
        'ngCors',
        'mdo-angular-cryptography',
        'ngFacebook'
    ])
    .config(function ($httpProvider, $stateProvider, $urlRouterProvider, $authProvider, $ocLazyLoadProvider, $cryptoProvider, $facebookProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        //$httpProvider.defaults.withCredentials = true;
        // Parametros de configuración de jwt
        $authProvider.loginUrl = url_base + "/login";
        $authProvider.signupUrl = url_base + "/register";
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "myApp";
        $cryptoProvider.setCryptographyKey('ABCD123');
        $facebookProvider.setAppId('410380665971263');



        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });

        $stateProvider
            .state('index', {
                url: '/',
                controller: function (authFactory, $state) {
                    authFactory.getRememberSession().then(function (response) {
                        if (response) {
                            $state.go("adminDashboard.clients");
                        } else {
                            $state.go("login");
                        }
                    }).catch(function (respponse) {
                        $state.go("login");
                    })

                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginController',
            })
            .state('adminDashboard', {
                url: '/admin',
                abstract: true,
                templateUrl: 'views/main.html',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'standartApp',
                                files: [
                                    'scripts/directives/header/header.js',
                                    'scripts/directives/header/header-notification/header-notification.js',
                                    'scripts/directives/adminSidebar/sidebar.js',
                                    'scripts/directives/adminSidebar/sidebar-search/sidebar-search.js',
                                    'scripts/directives/messages/messages.js'
                                ]
                            })
                    }
                }
            })
            .state('adminDashboard.clients', {
                url: '/clients',
                views: {
                    "workarea": {
                        templateUrl: '../views/clients.html',
                        controller: "ClientsCtrl"
                    }
                }
                //controller: 'loginController',
            })

            .state('adminDashboard.users', {
                url: '/users',
                views: {
                    "workarea": {
                        templateUrl: '../views/users.html',
                        controller: "UsersCtrl"
                    }
                }
                //controller: 'loginController',
            })
            .state('adminDashboard.passwordChange', {
                url: '/passwordChange',
                views: {
                    "workarea": {
                        templateUrl: 'views/passwordchange.html',
                        controller: 'ConfigurationController',
                    }
                }
                //controller: 'loginController',
            })
            .state('main', {
                url: '/main',
                abstract: true,
                templateUrl: 'views/main.html',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'standartApp',
                                files: [
                                    'scripts/directives/header/header.js',
                                    'scripts/directives/header/header-notification/header-notification.js',
                                    'scripts/directives/sidebar/sidebar.js',
                                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js',
                                    'scripts/directives/messages/messages.js'
                                ]
                            })
                    }
                }
            })
            .state('main.clients', {
                url: '/clients',
                views: {
                    "workarea": {
                        templateUrl: '../views/statistics.html'
                    }
                }
                //controller: 'loginController',
            })
            .state('main.passwordChange', {
                url: '/passwordChange',
                views: {
                    "workarea": {
                        templateUrl: 'views/passwordchange.html',
                        controller: 'ConfigurationController',
                    }
                }
                //controller: 'loginController',
            })

        $urlRouterProvider.otherwise('/');
    }).factory('smsMarketerCache', ['$cacheFactory', function($cacheFactory) {
        return $cacheFactory('smsMarketerCache');
    }])
    .run( function( $rootScope ) {
    // Load the facebook SDK asynchronously
    (function(){
        // If we've already installed the SDK, we're done
        if (document.getElementById('facebook-jssdk')) {return;}

        // Get the first script element, which we'll use to find the parent node
        var firstScriptElement = document.getElementsByTagName('script')[0];

        // Create a new script element and set its id
        var facebookJS = document.createElement('script');
        facebookJS.id = 'facebook-jssdk';

        // Set the new script's source to the source of the Facebook JS SDK
        facebookJS.src = '//connect.facebook.net/en_US/all.js';

        // Insert the Facebook JS SDK into the DOM
        firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
    }());
})
