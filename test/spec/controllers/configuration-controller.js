'use strict';

describe('Controller: ConfigurationControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('standartApp'));

  var ConfigurationControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfigurationControllerCtrl = $controller('ConfigurationControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConfigurationControllerCtrl.awesomeThings.length).toBe(3);
  });
});
