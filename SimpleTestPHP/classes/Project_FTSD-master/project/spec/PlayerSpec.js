var baseLocation;
var $baseURL = "http://localhost/SimpleTestPHP/classes/Project_FTSD/project/#/";

describe ('Part 1', function() {
          describe('Authentication', function() {
         
         /*var scope;
         var ctrl;
         
         //beforeEach(module('myApp', ['ngRoute', 'ngAnimate', 'toaster']));
         beforeEach(module('myApp'));

         
         beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            ctrl = $controller('authCtrl', {$scope: scope});
        }));*/
         
         var scope;
         var controller;
        var location, $rootScope, http, httpBackend;
                   var _Data;
        var canceller;
         beforeEach(function() {
                    
                    module('myApp');
                    app.config;
                    app.run;
                    
                    /*app.controller("authCtrl", function($location,  $scope, $httpBackend, $http){
                            $http.get('resource/').success(function(data) {
                                                           
                            })
                                   scope = $scope;
                                   http = $http;
                                   httpBackend = $httpBackend;
                    });
                    
                    var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster']);
                    
                    */
                    inject(function(_$location_, _$httpBackend_, _$rootScope_, $controller,$location, $http, $q, Data) {
                           canceller = $q.defer();
                           baseLocation = _$location_;
                           scope = _$rootScope_.$new();
                           $rootScope = _$rootScope_;
                           controller = $controller("authCtrl", {$scope: $rootScope});
                           //
                           _Data = Data;
                           //http = $http;
                           
                           http = $http;
                           httpBackend = _$httpBackend_;
                    });
                    //httpBackend.expectGET("api/v1/session").respond(200);
                    //_Data.get('session');
                    //httpBackend.flush();

                    //httpBackend.whenGET("");
                    
                    
                    /*app.config(['$routeProvider',
                                function ($routeProvider) {
                                $routeProvider.otherwise({
                                        title: 'unit test',
                                        controller: 'authCtrl'
                                    });
                                }]).run(function ($rootScope, $location, Data) {
                                        $rootScope.$on("$routeChangeStart", function (event, next, current) {
                                                       Data.get('session')});
                                        });*/
                   
        })
        
         
         //it('should allow a unique user to be created', function(){
            
            //expect(true).toBeTruthy();
            //$rootScope.$apply();
            
            //var customer = {email: "asdf", password:"asdf"}
            //$scope.doLogin(customer);
            //expect(location.path).toEqual('/dashboard');
            //var other;
            //other = other;*/
            
            /*_Data.post('login', {
                      customer: customer
                      }).then(function (results) {
                              _Data.toast(results);
                              if (results.status == "success") {
                              $location.path('dashboard');
                        }
                    });
             
            });*/
            it ('should be able to log out', function () {
                httpBackend.whenGET("api/v1/logout").respond({message: "Logged out successfully"});
                //httpBackend.whenGET("api/v1/logout").respond(http.get('api/v1/logout').then(function (results) {
                //var app = angular.module("myApp", []);
                //app.controller("authCtrl", function($scope, $httpBackend, $http) {
                httpBackend.expectGET('api/v1/logout');
                               //httpBackend.flush();
                               
                               http.get('api/v1/logout').then(function (results) {
                                                              expect(results.data.message).toEqual("Logged out successfully");
                                                              })
                                                                .catch(function(results) {
                                                                       expect(results.data.message).toEqual("Logged out successfully");                                                                       })
                                                                .finally(function(){
                                                                        $rootScope.$apply();
                                                                });
                httpBackend.flush();
                
    
                
            });
                   it ('should be able to create an account', function () {
                       httpBackend.whenPOST("api/v1/signup").respond({message: "success"});
                       //httpBackend.whenGET("api/v1/logout").respond(http.get('api/v1/logout').then(function (results) {
                       //var app = angular.module("myApp", []);
                       //app.controller("authCtrl", function($scope, $httpBackend, $http) {
                       httpBackend.expectPOST('api/v1/signup');
                       //httpBackend.flush();
                       var customer = {email: "asdf", password:"asdf"}
                       
                       http.post('api/v1/signup', {
                                 customer: customer
                                 }).then(function (results) {
                                        expect(results.data.message).toEqual("success");
                                })
                       .catch(function(results) {
                              expect(results.data.message).toEqual("success");
                                                                     })
                       .finally(function(){
                                $rootScope.$apply();
                                });
                       httpBackend.flush();
                       
                       
                       
                    });
                   it ('should be able to create an account 2.0', function () {
                       httpBackend.whenPOST("api/v1/signup").respond({message: "success"});
                       //httpBackend.whenGET("api/v1/logout").respond(http.get('api/v1/logout').then(function (results) {
                       //var app = angular.module("myApp", []);
                       //app.controller("authCtrl", function($scope, $httpBackend, $http) {
                       httpBackend.expectPOST('api/v1/signup');
                       //httpBackend.flush();
                       var customer = {email: "asdf", password:"asdf"}
                       
                       _Data.post('signup', customer)
                       .then(function (results) {
                                         expect(results.message).toEqual("success");
                                         })
                       .catch(function(results) {
                              expect(results.data.message).toEqual("success");
                                                                     })
                       .finally(function(){
                                $rootScope.$apply();
                                });
                       httpBackend.flush();
                       
                       
                       
                       });
                   it ('should be able to login and go to dashboard', function () {
                       location = getNewLocationPath("login");
                       httpBackend.expectPOST('api/v1/login');

                       httpBackend.whenPOST("api/v1/login").respond({status: "success"});
                       //httpBackend.whenGET("api/v1/logout").respond(http.get('api/v1/logout').then(function (results) {
                       //var app = angular.module("myApp", []);
                       //app.controller("authCtrl", function($scope, $httpBackend, $http) {
                       //httpBackend.flush();
                       var customer = {email: "asdf", password:"asdf"}
                       
                       scope.doLogin(customer);
                       
                       
                       httpBackend.flush();
                       
                       expect($location.$$path).toEqual('/dashboard');
                       
                    });
    });
});
var getNewLocationPath = function (pathMiniUrl) {
    $location = baseLocation;
    $location.$$host = "localhost";
    $location.$$path = "/" + pathMiniUrl;
    $location.$$absUrl = $baseURL + pathMiniUrl;
    $location.$$url = "/" + pathMiniUrl;
    return $location;
};
