'use strict';

/**
 * @ngdoc overview
 * @name standartApp
 * @description
 * # standartApp
 *
 * Main module of the application.
 */

var url_base = "//sms-marketer-laravel-back.herokuapp.com/api-v1";

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
        'ngCors'
    ])
    .config(function ($httpProvider, $stateProvider, $urlRouterProvider, $authProvider, $ocLazyLoadProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        // Parametros de configuración de jwt
        $authProvider.loginUrl = url_base + "/login";
        $authProvider.signupUrl = url_base + "/register";
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "myApp";



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
                            $state.go("main.test");
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
    });
