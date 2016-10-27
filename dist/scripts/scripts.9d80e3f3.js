"use strict";var url_base="//sms-marketer-laravel-back.herokuapp.com:443/api-v1";angular.module("standartApp",["oc.lazyLoad","ui.router","ui.bootstrap","angular-loading-bar","ngResource","satellizer","ngAnimate","ngTable","ngMessages","validation.match","ngCors"]).config(["$httpProvider","$stateProvider","$urlRouterProvider","$authProvider","$ocLazyLoadProvider",function(a,b,c,d,e){a.defaults.useXDomain=!0,delete a.defaults.headers.common["X-Requested-With"],d.loginUrl=url_base+"/login",d.signupUrl=url_base+"/register",d.tokenName="token",d.tokenPrefix="myApp",e.config({debug:!1,events:!0}),b.state("index",{url:"/",controller:["authFactory","$state",function(a,b){a.getRememberSession().then(function(a){a?b.go("main.test"):b.go("login")})["catch"](function(a){b.go("login")})}]}).state("login",{url:"/login",templateUrl:"views/login.html",controller:"loginController"}).state("adminDashboard",{url:"/admin","abstract":!0,templateUrl:"views/main.html",resolve:{loadMyDirectives:["$ocLazyLoad",function(a){return a.load({name:"standartApp",files:["scripts/directives/header/header.js","scripts/directives/header/header-notification/header-notification.js","scripts/directives/adminSidebar/sidebar.js","scripts/directives/adminSidebar/sidebar-search/sidebar-search.js","scripts/directives/messages/messages.js"]})}]}}).state("adminDashboard.clients",{url:"/clients",views:{workarea:{templateUrl:"../views/clients.html",controller:"ClientsCtrl"}}}).state("adminDashboard.users",{url:"/users",views:{workarea:{templateUrl:"../views/users.html",controller:"UsersCtrl"}}}).state("adminDashboard.passwordChange",{url:"/passwordChange",views:{workarea:{templateUrl:"views/passwordchange.html",controller:"ConfigurationController"}}}).state("main",{url:"/main","abstract":!0,templateUrl:"views/main.html",resolve:{loadMyDirectives:["$ocLazyLoad",function(a){return a.load({name:"standartApp",files:["scripts/directives/header/header.js","scripts/directives/header/header-notification/header-notification.js","scripts/directives/sidebar/sidebar.js","scripts/directives/sidebar/sidebar-search/sidebar-search.js","scripts/directives/messages/messages.js"]})}]}}).state("main.clients",{url:"/clients",views:{workarea:{templateUrl:"../views/statistics.html"}}}).state("main.passwordChange",{url:"/passwordChange",views:{workarea:{templateUrl:"views/passwordchange.html",controller:"ConfigurationController"}}}),c.otherwise("/")}]),angular.module("standartApp").controller("globalController",["$rootScope","$scope","$auth","$state","authFactory","$interval",function(a,b,c,d,e,f){}]),function(){angular.module("standartApp").controller("loginController",["$scope","$http","$q","$rootScope","$log","$state","$auth","$timeout","authFactory","clientFactory",function(a,b,c,d,e,f,g,h,i,j){a.email="",a.password="",a.alertMsgLoginFailed=!1,a.alertMsgRegisterSuccess=!1,a.alertMsgRegisterError=!1,a.alertMsgServerError=!1,a.alertMsgResetPasswordError=!1,a.alertMsgResetPasswordSuccess=!1,a.login=function(){$("#login-submit").attr("disabled","disabled"),g.login({email:a.email,password:a.password}).then(function(a){return"undefined"!=typeof a.data.Error?void("invalid_credentials"==a.data.Error?(d.showMessage("Usuario o clave incorrecta. Por favor intentelo de nuevo.","danger"),$("#login-submit").removeAttr("disabled")):(d.showMessage("Error en el servidor. Por favor verifique su conexión e inténtelo de nuevo","danger"),$("#login-submit").removeAttr("disabled"))):void i.userAuth().then(function(a){switch(localStorage.setItem("userStandartApp",JSON.stringify(a)),a.user.rule_id){case 1:d.envName="adminDashboard";break;case 2:break;case 3:d.envName="main"}$("#login-submit").removeAttr("disabled"),f.go(d.envName+".clients")})["catch"](function(a){d.showMessage("Error del sistema. Por favor intentelo de nuevo.","danger"),$("#login-submit").removeAttr("disabled")})})["catch"](function(a){$("#login-submit").removeAttr("disabled"),d.showMessage("Error del sistema. Por favor intentelo de nuevo.","danger")})},a.register=function(){g.signup({email:a.registerEmail,password:a.registerPassword,nombre:a.nombre,apellido:a.apellido,rule_id:3}).then(function(a){return"undefined"!=typeof a.data.Error?void(1062==a.data.Error&&d.showMessage("Error en el registro. Dirección de correo electrónico ya existe.","danger")):(d.showMessage("Usuario registrado con éxito. Ya puede acceder al sistema.","success"),void $("#login-form-link").click())})["catch"](function(a){d.showMessage("Error en el servidor. Por favor verifique su conexión e inténtelo de nuevo","danger")})},a.remenberSession=function(a){i.rememberSession(a)},a.resetPassword=function(b,c){i.resetPassword(b).then(function(b){return"Error"===b.data?($("#pwdModal").modal("hide"),a.resetEmail="",c.$setPristine(),c.$setUntouched(),void d.showMessage("Error en la recuperacion. Dirección de correo electrónico no existe.","danger")):"Success"===b.data?($("#pwdModal").modal("hide"),a.resetEmail="",c.$setPristine(),c.$setUntouched(),void d.showMessage("Recuperación de contraseña exitoso. Usted recibira un correo electrónico con su nueva contraseña.","success")):void 0})["catch"](function(b){$("#pwdModal").modal("hide"),a.resetEmail="",c.$setPristine(),c.$setUntouched(),d.showMessage("Error en el servidor. Por favor verifique su conexión e inténtelo de nuevo","danger")})}}])}(),angular.module("standartApp").factory("callRest",["$q","$http",function(a,b){function c(c,d){var e=a.defer();return b({url:c,method:"GET",params:d,headers:{"Content-Type":"application/json"}}).then(function(a){e.resolve(a.data)},function(a){e.reject(a)}),e.promise}function d(c,d){var e=a.defer();return b({url:c,method:"POST",data:d,headers:{"Content-Type":"application/json"}}).then(function(a){e.resolve(a.data)},function(a){e.reject(a)}),e.promise}function e(c,d){var e=a.defer();return b({url:c,method:"PUT",data:d,headers:{"Content-Type":"application/json"}}).then(function(a){e.resolve(a.data)},function(a){e.reject(a)}),e.promise}function f(c,d,e){var f=a.defer();return b({url:c,method:"PUT",data:d,params:e,headers:{"Content-Type":"application/json"}}).then(function(a){f.resolve(a.data)},function(a){f.reject(a)}),f.promise}function g(c,d){var e=a.defer();return b({url:c,method:"DELETE",params:d,headers:{"Content-Type":"application/json"}}).then(function(a){e.resolve(a.data)},function(a){e.reject(a)}),e.promise}return{get:c,post:d,put:e,put2:f,remove:g}}]),function(){angular.module("standartApp").factory("commonFactory",["$http","$q","$timeout",function(a,b,c){function d(a){a=!0,c(function(){a=!1},3e3)}function e(){var c=b.defer();return a.get(url_base+"/rule").success(function(a){c.resolve(a)}).error(function(a){c.reject(a)}),c.promise}var f={};return f.showMessage=d,f.getRols=e,f}])}(),function(){angular.module("standartApp").factory("authFactory",["callRest","$log","$http","$q","$auth",function(a,b,c,d,e){function f(a){a?localStorage.setItem("standartApp_remember_session",!0):localStorage.setItem("standartApp_remember_session",!1)}function g(){var a=d.defer(),b=!1;return JSON.parse(localStorage.getItem("standartApp_remember_session"))?h().then(function(c){b=c.token_validate?!0:!1,a.resolve(b)})["catch"](function(c){b=!1,a.reject(b)}):a.reject(b),a.promise}function h(){var a=d.defer();return c.post(url_base+"/tokenValidate").success(function(b){a.resolve(b)}).error(function(b){a.reject(b)}),a.promise}function i(a){var b=d.defer();return c.put(url_base+"/resetPassword",{email:a}).success(function(a){b.resolve(a)}).error(function(a){b.reject(a)}),b.promise}function j(a){var b=d.defer();return c.put(url_base+"/passwordChange",a,m).success(function(a){b.resolve(a)}).error(function(a){b.reject(a)}),b.promise}function k(){var a=d.defer();return c.post(url_base+"/userAuth",{},m).success(function(b){a.resolve(b)}).error(function(b){a.reject(b)}),a.promise}var l={},m={"Content-Type":"application/json"};return l.tokenValidate=h,l.userAuth=k,l.rememberSession=f,l.getRememberSession=g,l.resetPassword=i,l.passwordChange=j,l}])}(),angular.module("standartApp").controller("ConfigurationController",["$scope","$rootScope","authFactory","$timeout",function(a,b,c,d){function e(){a.user=JSON.parse(localStorage.getItem("userStandartApp")).User;var d={id:a.user.id,email:a.user.email,oldPass:a.oldPassword,newPass:a.newPassword};c.passwordChange(d).then(function(c){return f(a.resetForm),"Error"==c.data&&"PASSWORD_NOT_MATCH"==c.message?void b.showMessage("Error la contraseña actual es incorrecta.","danger"):"Error"==c.data&&"SQL_ERROR"==c.message?void b.showMessage("Error en el servidor. Por favor intentelo de nuevo.","danger"):void b.showMessage("Su contraseña ha sido modificada exitosamente!.","success")})}function f(b){a.oldPassword="",a.newPassword="",a.repeatPassword="",b.$setPristine(),b.$setUntouched()}a.passwordChange=e}]),angular.module("standartApp").factory("clientFactory",["$http","$q",function(a,b){function c(c){var d=b.defer();return a.post(url_base+"/user",{email:c},h).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}function d(){var c=b.defer();return a.get(url_base+"/client").success(function(a){c.resolve(a)}).error(function(a){c.reject(a)}),c.promise}function e(c){var d=b.defer();return a.get(url_base+"/client/"+c).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}function f(c){var d=b.defer();return a.put(url_base+"/client/"+c.id,c,h).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}function g(c){var d=b.defer();return a["delete"](url_base+"/client/"+c).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}var h={"Content-Type":"application/json"},i={};return i.getUser=c,i.getClients=d,i.getClient=e,i.putClient=f,i.deleteClient=g,i}]),angular.module("standartApp").directive("messages",function(){return{templateUrl:"scripts/directives/messages/messages.html",restrict:"E",scope:{data:"="},controller:["$rootScope","$scope","$timeout",function(a,b,c){a.$on("showMessage",function(a,d){b.data=d,b.data.show=!0,c(function(){b.data.show=!1},3e3)})}]}}),angular.module("standartApp").controller("masterController",["$rootScope","$scope","$auth","$state","authFactory","$interval","$controller","commonFactory",function(a,b,c,d,e,f,g,h){function i(a){$("#modalLogout").modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove(),c.logout().then(function(a){localStorage.setItem("standartApp_remember_session",!1),localStorage.removeItem("userStandartApp"),d.go("login")})["catch"](function(a){})}function j(){$("#modalLogout").modal("show")}function k(){h.getRols().then(function(b){a.rules=b.Rules})}g("ConfigurationController",{$scope:b}),a.envName="",a.logout=i,a.closeSession=j,a.getRols=k,a.rules={},b.dataMessages={type:"",show:!1,message:""},b.getRols(),a.showMessage=function(c,d){b.dataMessages={type:d,show:!1,message:c},a.$emit("showMessage",b.dataMessages)}}]),angular.module("standartApp").controller("ClientsCtrl",["$scope","$rootScope","NgTableParams","clientFactory",function(a,b,c,d){function e(b){$("#modalEditClient").modal("show"),a.clientSelected=angular.copy(b),a.clientSelected.idType||(a.clientSelected.idType="V")}function f(b){$("#modalDeleteClient").modal("show"),a.clientSelected=angular.copy(b)}function g(){a.getClients()}function h(b){a.clientsTable=new c({page:1,count:10},{dataset:b})}function i(){d.getClients().then(function(b){a.clientList=b.Clients,a.initTable(a.clientList)})}function j(a){d.getClient(a).then(function(a){console.log(a)})}function k(c,e){d.putClient(c).then(function(c){a.getClients(),$("#modalEditClient").modal("hide"),a.clientSelected={},e.$setPristine(),e.$setUntouched(),b.showMessage("Cliente guardado exitosamente!.","success")})["catch"](function(a){b.showMessage("Error en la operacion!.","danger")})}function l(){d.deleteClient(a.clientSelected.id).then(function(c){a.getClients(),$("#modalDeleteClient").modal("hide"),b.showMessage("Cliente guardado exitosamente!.","success")})["catch"](function(a){b.showMessage("Error en la operacion!.","danger")})}a.client={},a.clientSelected={},a.initCtrl=g,a.getClients=i,a.getClient=j,a.updateClient=k,a.deleteClient=l,a.initTable=h,a.showEditClienteForm=e,a.showModalDeleteClient=f,a.initCtrl()}]),angular.module("standartApp").controller("UsersCtrl",["$scope","$rootScope","NgTableParams","user",function(a,b,c,d){function e(b,c){switch(console.log(c),$("#modalUser").modal("show"),b){case"add":a.titleForm="Agregar usuario",a.btnOk="Agregar",a.user.status=!0,$("input[name=status]").attr("disabled","disabled"),$("#email").removeAttr("disabled");break;case"edit":a.titleForm="Editar usuario",a.btnOk="Guardar",a.user=angular.copy(c),$("input[name=status]").removeAttr("disabled"),$("#email").attr("disabled","disabled"),a.user.idType||(a.user.idType="V")}}function f(b){$("#modalDeleteUser").modal("show"),a.user=angular.copy(b)}function g(){a.getUsers()}function h(b){a.usersTable=new c({page:1,count:10},{dataset:b})}function i(){d.getUsers().then(function(b){a.usertList=b.Clients,a.initTable(a.usertList)})}function j(a){d.getUser(a).then(function(a){console.log(a)})}function k(c,e){d.postUser(c).then(function(c){console.log(c),a.getUsers(),$("#modalUser").modal("hide"),a.user={},e.$setPristine(),e.$setUntouched(),b.showMessage("Usuario agregado exitosamente!.","success")})["catch"](function(a){b.showMessage("Error en la operacion!.","danger")})}function l(c,e){d.putUser(c).then(function(c){a.getUsers(),$("#modalUser").modal("hide"),a.user={},e.$setPristine(),e.$setUntouched(),b.showMessage("Usuario actualizado exitosamente!.","success")})["catch"](function(a){b.showMessage("Error en la operacion!.","danger")})}function m(){d.deleteUser(a.user.id).then(function(c){a.getUsers(),$("#modalDeleteUser").modal("hide"),b.showMessage("Usuario guardado exitosamente!.","success")})["catch"](function(a){b.showMessage("Error en la operacion!.","danger")})}a.usersList=[],a.user={},a.initCtrl=g,a.getUsers=i,a.getUser=j,a.addUser=k,a.updateUser=l,a.removeUser=m,a.initTable=h,a.showUserForm=e,a.showModalDeleteUser=f,a.initCtrl()}]),angular.module("standartApp").factory("user",["$http","$q",function(a,b){function c(){var c=b.defer();return a.get(url_base+"/user").success(function(a){c.resolve(a)}).error(function(a){c.reject(a)}),c.promise}function d(c){var d=b.defer();return a.get(url_base+"/user/"+c).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}function e(c){console.log(url_base+"/user/");var d=b.defer();return a({url:url_base+"/user/",method:"POST",data:c,withCredentials:!0,headers:{"Content-Type":"application/json; charset=utf-8"}}).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}function f(c){var d=b.defer();return a.put(url_base+"/user/"+c.id,c,h).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}function g(c){var d=b.defer();return a["delete"](url_base+"/user/"+c).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}var h={"Content-Type":"application/json"},i={};return i.getUsers=c,i.getUser=d,i.postUser=e,i.putUser=f,i.deleteUser=g,console.log(url_base+"/user/"),i}]),angular.module("standartApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/clientForm.html",'<div class="modal fade" id="modalEditClient" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog" style="width: 428px"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h4 class="modal-title" id="myModalLabel">Editar cliente</h4> </div> <div class="modal-body"> <div class="row"> <div class="col-lg-12"> <form id="editClientForm" name="editClientForm" role="form" style="display: block" novalidate> <div class="input-group"> <h4>Nombres y apellidos</h4> <div class="rowForm"> <input ng-model="clientSelected.firstName" autofocus type="text" name="firstName" id="firstName" tabindex="1" class="form-control" placeholder="Primer nombre" value="" required> <div ng-messages="editClientForm.firstName.$error"> <div ng-show="editClientForm.firstName.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> <div class="rowForm"> <input ng-model="clientSelected.secondName" autofocus type="text" name="secondName" id="secondName" tabindex="1" class="form-control" placeholder="Segundo nombre" value="" required> <div ng-messages="editClientForm.secondName.$error"> <div ng-show="editClientForm.secondName.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> </div> <div class="input-group"> <div class="rowForm"> <input ng-model="clientSelected.lastName" autofocus type="text" name="lastName" id="lastName" tabindex="1" class="form-control" placeholder="Primer apellido" value="" required> <div ng-messages="editClientForm.lastName.$error"> <div ng-show="editClientForm.lastName.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> <div class="rowForm"> <input ng-model="clientSelected.secondLastName" autofocus type="text" name="secondLastName" id="secondLastName" tabindex="1" class="form-control" placeholder="Segundo apellido" value=""> </div> </div> <hr> <h4>Datos de contacto</h4> <div class="input-group"> <div class="rowForm"> <input ng-model="clientSelected.email" autofocus type="text" name="email" id="email" tabindex="1" class="form-control" placeholder="Correo electrónico" value="" disabled> </div> <div class="rowForm"> <input ng-model="clientSelected.phone" autofocus type="text" name="phone" id="phone" tabindex="1" class="form-control" placeholder="Teléfono" value="" required> <div ng-messages="editClientForm.phone.$error"> <div ng-show="editClientForm.phone.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> </div> <div class="input-group"> <div class="rowForm"> <input ng-model="clientSelected.address" style="width: 378px" autofocus type="text" name="address" id="address" tabindex="1" class="form-control" placeholder="Dirección" value="" required> <div ng-messages="editClientForm.address.$error"> <div ng-show="editClientForm.address.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> </div> <hr> <h4>Identificaión</h4> <div class="input-group"> <div class="rowForm"> <select ng-model="clientSelected.idType" name="idType" class="form-control" id="idType" required> <option value="V">V</option> <option value="E">E</option> <option value="J">J</option> <option value="G">G</option> </select> <div ng-messages="editClientForm.idType.$error"> <div ng-show="editClientForm.idType.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> <div class="rowForm"> <input ng-model="clientSelected.idClient" autofocus type="text" name="idClient" id="idClient" tabindex="1" class="form-control" placeholder="Nro de identificación" value="" required> <div ng-messages="editClientForm.idClient.$error"> <div ng-show="editClientForm.idClient.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> </div> <div class="input-group"> <div class="rowForm"> <input ng-model="clientSelected.businessName" style="width: 378px" autofocus type="text" name="businessName" id="businessName" tabindex="1" class="form-control" placeholder="Razon social" value="" required> <div ng-messages="editClientForm.businessName.$error"> <div ng-show="editClientForm.businessName.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> </div> </form> </div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button> <button type="button" class="btn btn-primary" ng-click="updateClient(clientSelected, editClientForm)">Aceptar</button> </div> </div> <!-- /.modal-content --> </div> <!-- /.modal-dialog --> </div>'),a.put("views/clients.html",'<div class="row"> <div class="col-lg-12"> <h1 class="page-header">Clientes</h1> </div> <!-- /.col-lg-12 --> </div> <!-- /.row --> <div class="row"> <div class="col-lg-12"> <div class="panel panel-default"> <div class="panel-heading"> Lista de clientes </div> <div class="panel-body"> <div class="row"> <div style="margin-left: 10px;margin-right: 10px"> <table ng-table="clientsTable" class="table table-striped table-bordered table-condensed"> <tr ng-repeat="client in $data"> <td data-title="\'Id\'" sortable> {{client.id}} </td> <td data-title="\'Nombre\'" filter="{ firstName: \'text\'}" sortable> {{client.firstName}} </td> <td data-title="\'Apellido\'" filter="{ lastName: \'text\'}" sortable> {{client.lastName}} </td> <td data-title="\'Email\'" filter="{ email: \'text\'}" sortable> {{client.email}} </td> <td data-title="\'Acciones\'" style="text-align: center"> <a href="" class="fa fa-pencil" title="Editar usuario" ng-click="showEditClienteForm(client)"></a> <a href="" class="fa fa-remove" title="Eliminar usuario" ng-click="showModalDeleteClient(client)"></a> </td> </tr> </table> </div> </div> </div> </div> </div> <!-- Modals --> <div ng-include="\'views/clientForm.html\'"></div> <div ng-include="\'resources/modals/deleteClient.html\'"></div> </div>'),a.put("views/login.html",'<!-- Notificaciones --> <messages data="dataMessages"></messages> <!-- Fin notificaciones --> <script>$(function() {\n\n        $(\'#login-form-link\').click(function(e) {\n            $("#login-form").delay(100).fadeIn(100);\n            $("#register-form").fadeOut(100);\n            $(\'#register-form-link\').removeClass(\'active\');\n            $(this).addClass(\'active\');\n            e.preventDefault();\n        });\n        $(\'#register-form-link\').click(function(e) {\n            $("#register-form").delay(100).fadeIn(100);\n            $("#login-form").fadeOut(100);\n            $(\'#login-form-link\').removeClass(\'active\');\n            $(this).addClass(\'active\');\n            e.preventDefault();\n        });\n\n    });</script> <div class="container" style="padding-top: 90px"> <div class="row"> <div class="col-md-6 col-md-offset-3"> <div class="panel panel-login"> <div class="panel-heading"> <div class="row"> <div class="col-xs-6"> <a href="#" class="active" id="login-form-link">Inicio de sesión </a> </div> <div class="col-xs-6"> <a href="#" id="register-form-link">Registro</a> </div> </div> <hr> </div> <div class="panel-body"> <div class="row"> <div class="col-lg-12"> <form id="login-form" name="loginform" role="form" style="display: block" novalidate> <div class="form-group"> <input ng-model="email" autofocus type="text" name="email" id="email" tabindex="1" class="form-control" placeholder="Usuario" value="" required> <div ng-messages="loginform.email.$error"> <div ng-show="loginform.email.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> <div class="form-group"> <input ng-model="password" type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Contraseña" ng-minlength="5" ng-maxlength="10" required> <div ng-messages="loginform.password.$error"> <div ng-show="loginform.password.$dirty" class="text-danger" ng-message="required">Este campo es requerido.</div> <div ng-show="loginform.password.$dirty" class="text-danger" ng-message="minlength">Se requieren 5 caracteres mínimos.</div> <div ng-show="loginform.password.$dirty" class="text-danger" ng-message="maxlength">Se requieren 10 caracteres maximos.</div> </div> </div> <div class="form-group text-center"> <input ng-change="remenberSession(rememberMe)" ng-model="rememberMe" type="checkbox" tabindex="3" class="" name="remember" id="remember"> <label for="remember"> Recordarme</label> </div> <div class="form-group"> <div class="row"> <div class="col-sm-6 col-sm-offset-3"> <input ng-disabled="!loginform.$valid" ng-click="login()" type="button" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Entrar"> </div> </div> </div> <div class="form-group"> <div class="row"> <div class="col-lg-12"> <div class="text-center"> <a href="#" data-target="#pwdModal" data-toggle="modal">Olvido su contraseña?</a> </div> </div> </div> </div> </form> <form name="registerForm" id="register-form" role="form" style="display: none" novalidate> <div class="form-group"> <input ng-model="nombre" type="text" name="nombre" id="nombre" tabindex="1" class="form-control" placeholder="Nombre" value="" required> <div ng-messages="registerForm.nombre.$error"> <div ng-show="registerForm.nombre.$dirty" class="text-danger" ng-message="required">Este campo es requerido.</div> </div> </div> <div class="form-group"> <input ng-model="apellido" type="text" name="apellido" id="apellido" tabindex="1" class="form-control" placeholder="Apellido" value="" required> <div ng-messages="registerForm.apellido.$error"> <div ng-show="registerForm.apellido.$dirty" class="text-danger" ng-message="required">Este campo es requerido.</div> </div> </div> <div class="form-group"> <input ng-model="registerEmail" type="email" name="registerEmail" id="registerEmail" tabindex="1" class="form-control" placeholder="Email Address" value="" required> <div ng-messages="registerForm.registerEmail.$error"> <div ng-show="registerForm.registerEmail.$dirty" class="text-danger" ng-message="required">Este campo es requerido.</div> <div ng-show="registerForm.registerEmail.$dirty" class="text-danger" ng-message="email">Formato de correo electrónico invalido.</div> </div> </div> <div class="form-group"> <input ng-model="registerPassword" type="password" name="registerPassword" id="registerPassword" tabindex="2" class="form-control" placeholder="Contraseña" ng-minlength="5" ng-maxlength="10" required> <div ng-messages="registerForm.registerPassword.$error"> <div ng-show="registerForm.registerPassword.$dirty" class="text-danger" ng-message="required">Este campo es requerido.</div> <div ng-show="registerForm.registerPassword.$dirty" class="text-danger" ng-message="minlength">Se requieren 5 caracteres mínimos.</div> <div ng-show="registerForm.registerPassword.$dirty" class="text-danger" ng-message="maxlength">Se requieren 10 caracteres maximos.</div> </div> </div> <div class="form-group"> <input ng-model="registerConfirmPassword" type="password" name="registerConfirmPassword" id="registerConfirmPassword" tabindex="2" class="form-control" placeholder="Repetir contraseña" data-match="registerPassword"> <div ng-messages="registerForm.registerConfirmPassword.$error"> <div ng-show="registerForm.registerConfirmPassword.$error.match" class="text-danger">Las contraseñas no coinciden!</div> <div ng-show="registerForm.registerConfirmPassword.$dirty" class="text-danger" ng-message="minlength">Se requieren 5 caracteres mínimos.</div> <div ng-show="registerForm.registerConfirmPassword.$dirty" class="text-danger" ng-message="maxlength">Se requieren 10 caracteres maximos.</div> </div> </div> <div class="form-group"> <div class="row"> <div class="col-sm-6 col-sm-offset-3"> <input ng-disabled="!registerForm.$valid" ng-click="register()" type="button" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Registrarse"> </div> </div> </div> </form> </div> </div> </div> </div> </div> </div> <div id="pwdModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> <h1 class="text-center">Restablecer contraseña</h1> </div> <div class="modal-body"> <div class="col-md-12"> <div class="panel panel-default"> <div class="panel-body"> <div class="text-center"> <p>Si ha olvidado su contraseña puede restablecerla desde aqui.</p> <div class="panel-body"> <fieldset> <form name="resetPasswordForm" novalidate> <div class="form-group"> <input ng-model="resetEmail" class="form-control input-lg" placeholder="Dirección de correo electrónico" name="resetEmail" type="email" required> <div ng-messages="resetPasswordForm.resetEmail.$error" style="text-align: left"> <div ng-show="resetPasswordForm.resetEmail.$dirty" class="text-danger" ng-message="required">Este campo es requerido.</div> <div ng-show="resetPasswordForm.resetEmail.$dirty" class="text-danger" ng-message="email">Formato de correo electrónico invalido.</div> </div> </div> <input ng-disabled="!resetPasswordForm.$valid" ng-click="resetPassword(resetEmail, resetPasswordForm)" class="form-control btn btn-primary" value="Restablecer" type="button"> </form> </fieldset> </div> </div> </div> </div> </div> </div> <div class="modal-footer"> <div class="col-md-12"> <button id="cancelResetPasswordBtn" class="btn btn-default" data-dismiss="modal" aria-hidden="true">Cancel</button> </div> </div> </div> </div> </div> </div>'),a.put("views/main.html",'<div id="wrapper"> <!-- Navigation --> <header></header> <!-- /.navbar-top-links --> <!-- /.navbar-static-side --> <div id="page-wrapper" style="min-height: 561px"> <messages data="dataMessages"></messages> <div ui-view="workarea"></div> </div> <!-- /#page-wrapper --> <!-- Modals --> <div ng-include="\'resources/modals/logout.html\'"></div> </div>'),a.put("views/passwordchange.html",'<div class="row"> <div class="col-lg-12"> <h1 class="page-header">Configuración</h1> </div> <!-- /.col-lg-12 --> </div> <!-- /.row --> <div class="row"> <div class="col-lg-12"> <div class="panel panel-default"> <div class="panel-heading"> Cambiar contraseña </div> <div class="panel-body"> <div class="row"> <div class="col-lg-4 col-md-offset-4"> <form role="form" name="resetForm" novalidate> <div class="form-group"> <label>Contraseña actual:</label> <input type="password" class="form-control" placeholder="Contraseña actual" name="oldPassword" ng-model="oldPassword" ng-minlength="5" ng-maxlength="10" required> <div ng-messages="resetForm.oldPassword.$error"> <div ng-show="resetForm.oldPassword.$dirty" class="text-danger" ng-message="required">Este campo es requerido.</div> <div ng-show="resetForm.oldPassword.$dirty" class="text-danger" ng-message="minlength">Se requieren 5 caracteres mínimos.</div> <div ng-show="resetForm.oldPassword.$dirty" class="text-danger" ng-message="maxlength">Se requieren 10 caracteres maximos.</div> </div> </div> <div class="form-group"> <label>Nueva contraseña:</label> <input type="password" class="form-control" placeholder="Contraseña nueva" name="newPassword" ng-model="newPassword" ng-minlength="5" ng-maxlength="10" required> <div ng-messages="resetForm.newPassword.$error"> <div ng-show="resetForm.newPassword.$dirty" class="text-danger" ng-message="required">Este campo es requerido.</div> <div ng-show="resetForm.newPassword.$dirty" class="text-danger" ng-message="minlength">Se requieren 5 caracteres mínimos.</div> <div ng-show="resetForm.newPassword.$dirty" class="text-danger" ng-message="maxlength">Se requieren 10 caracteres maximos.</div> </div> </div> <div class="form-group"> <label>Repetir contraseña:</label> <input type="password" class="form-control" placeholder="Repetir contraseña" name="repeatPassword" ng-model="repeatPassword" data-match="newPassword" ng-minlength="5" ng-maxlength="10"> <div ng-messages="resetForm.repeatPassword.$error"> <div ng-show="resetForm.repeatPassword.$error.match" class="text-danger">Las contraseñas no coinciden!</div> <div ng-show="resetForm.repeatPassword.$dirty" class="text-danger" ng-message="minlength">Se requieren 5 caracteres mínimos.</div> <div ng-show="resetForm.repeatPassword.$dirty" class="text-danger" ng-message="maxlength">Se requieren 10 caracteres maximos.</div> </div> </div> <div class="form-group"> <div class="row"> <div class="col-sm-6 col-sm-offset-3"> <input ng-disabled="!resetForm.$valid" ng-click="passwordChange()" type="button" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Aceptar"> </div> </div> </div> </form> </div> </div> </div> </div> </div> </div>'),
a.put("views/statistics.html","<div> estadisticas del usuario </div>"),a.put("views/test.html","<div>sdssdsdsdsdsd test</div>"),a.put("views/userForm.html",'<div class="modal fade" id="modalUser" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog" style="width: 830px"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h4 class="modal-title" id="myModalLabel">{{titleForm}}</h4> </div> <div class="modal-body"> <div class="row"> <div class="col-lg-12"> <form id="userForm" name="userForm" role="form" style="display: block" novalidate> <div class="input-group"> <h4>Nombres y apellidos</h4> <div class="rowForm"> <input ng-model="user.firstName" autofocus type="text" name="firstName" id="firstName" tabindex="1" class="form-control" placeholder="Primer nombre" value="" required> <div ng-messages="userForm.firstName.$error"> <div ng-show="userForm.firstName.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> <div class="rowForm"> <input ng-model="user.secondName" autofocus type="text" name="secondName" id="secondName" tabindex="1" class="form-control" placeholder="Segundo nombre" value="" required> <div ng-messages="userForm.secondName.$error"> <div ng-show="userForm.secondName.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> <div class="rowForm"> <input ng-model="user.lastName" autofocus type="text" name="lastName" id="lastName" tabindex="1" class="form-control" placeholder="Primer apellido" value="" required> <div ng-messages="userForm.lastName.$error"> <div ng-show="userForm.lastName.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> <div class="rowForm"> <input ng-model="user.secondLastName" autofocus type="text" name="secondLastName" id="secondLastName" tabindex="1" class="form-control" placeholder="Segundo apellido" value=""> </div> </div> <hr> <h4>Datos de contacto</h4> <div class="input-group"> <div class="rowForm"> <input ng-model="user.email" autofocus type="text" name="email" id="email" tabindex="1" class="form-control" placeholder="Correo electrónico" value="" disabled> </div> <div class="rowForm"> <input ng-model="user.phone" autofocus type="text" name="phone" id="phone" tabindex="1" class="form-control" placeholder="Teléfono" value="" required> <div ng-messages="userForm.phone.$error"> <div ng-show="userForm.phone.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> <div class="rowForm"> <input ng-model="user.address" style="width: 378px" autofocus type="text" name="address" id="address" tabindex="1" class="form-control" placeholder="Dirección" value="" required> <div ng-messages="userForm.address.$error"> <div ng-show="userForm.address.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> </div> <hr> <h4>Perfil</h4> <div class="input-group"> <div class="rowForm"> <select ng-options="item.id as item.name for item in $root.rules" ng-model="user.rule_id" name="rule_id" class="form-control" id="rule_id" required> <option value="">Seleccione...</option> </select> <div ng-messages="userForm.idType.$error"> <div ng-show="userForm.idType.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> <div class="rowForm"> <div class="radio-inline"> <label class="radio-inline"><input ng-model="user.status" ng-value="true" type="radio" name="status">Activo</label> <label class="radio-inline"><input ng-model="user.status" ng-value="false" type="radio" name="status">Inactivo</label> </div> <div ng-messages="userForm.status.$error"> <div ng-show="userForm.status.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> </div> <div ng-if="btnOk==\'Agregar\'"> <hr> <h4>Contraseña</h4> <div class="rowForm"> <input ng-model="user.password" autofocus type="password" name="password" id="password" tabindex="1" class="form-control" placeholder="Contraseña" value="" ng-minlength="5" ng-maxlength="10" required> <div ng-messages="userForm.password.$error"> <div ng-show="userForm.password.$dirty" class="text-danger" ng-message="required"> Este campo es requerido. </div> </div> </div> <div class="rowForm"> <input ng-model="repeatPassword" autofocus type="password" name="repeatPassword" id="repeatPassword" tabindex="1" class="form-control" placeholder="Repita la contraseña" value="" ng-minlength="5" ng-maxlength="10" data-match="password" required> <div ng-messages="userForm.repeatPassword.$error"> <div ng-show="resetForm.repeatPassword.$error.match" class="text-danger">Las contraseñas no coinciden!</div> <div ng-show="resetForm.repeatPassword.$dirty" class="text-danger" ng-message="minlength">Se requieren 5 caracteres mínimos.</div> <div ng-show="resetForm.repeatPassword.$dirty" class="text-danger" ng-message="maxlength">Se requieren 10 caracteres maximos.</div> </div> </div> </div> </form> </div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button> <button ng-if="btnOk==\'Agregar\'" type="button" class="btn btn-primary" ng-click="addUser(user, userForm)">{{btnOk}}</button> <button ng-if="btnOk==\'Guardar\'" type="button" class="btn btn-primary" ng-click="updateUser(user, userForm)">{{btnOk}}</button> </div> </div> <!-- /.modal-content --> </div> <!-- /.modal-dialog --> </div>'),a.put("views/users.html",'<div class="row"> <div class="col-lg-12"> <h1 class="page-header">Usuarios</h1> </div> <!-- /.col-lg-12 --> </div> <!-- /.row --> <div class="row"> <div class="col-lg-12"> <div class="panel panel-default"> <div class="panel-heading"> Lista de usuarios </div> <div class="panel-body"> <div class="row"> <div class="rowForm"> <button class="btn btn-primary" ng-click="showUserForm(\'add\',user)">Agregar usuario</button> </div> <div style="margin-left: 10px;margin-right: 10px"> <table ng-table="usersTable" class="table table-striped table-bordered table-condensed"> <tr ng-repeat="row in $data"> <td data-title="\'Id\'" sortable> {{row.id}} </td> <td data-title="\'Email\'" filter="{ email: \'text\'}" sortable> {{row.email}} </td> <td data-title="\'Nombre\'" filter="{ lastName: \'text\'}" sortable> {{row.firstName}} {{row.lastName}} </td> <td data-title="\'Rol\'" filter="{ rule_id: \'number\'}" sortable> {{row.rule_id}} </td> <td data-title="\'Estado\'" filter="{ status: \'text\'}" sortable> {{row.status}} </td> <td data-title="\'Acciones\'" style="text-align: center"> <a href="" class="fa fa-pencil" title="Editar usuario" ng-click="showUserForm(\'edit\',row)"></a> <a href="" class="fa fa-remove" title="Eliminar usuario" ng-click="showModalDeleteUser(row)"></a> </td> </tr> </table> </div> </div> </div> </div> </div> <!-- Modals --> <div ng-include="\'views/userForm.html\'"></div> <div ng-include="\'resources/modals/deleteUser.html\'"></div> </div>')}]);