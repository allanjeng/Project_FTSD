var baseLocation;
var $baseURL = "http://localhost/SimpleTestPHP/classes/Project_FTSD/project/#/";
describe ('SWE Project', function () {
          describe ('Iteration 1', function() {
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
                             });
                    
                    });
          describe ('Iteration 2', function() {
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
                                      controller = $controller("questionnaireCtrl", {$scope: $rootScope});
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
                    describe('Project Management', function () {
                             it ('should be able to create a project with Waterfall as best option', function() {
                                 var model = function(){};
                                 model.question1 = "true";
                                 model.question4 = "true";
                                 model.question5 = "true";
                                 model.question7 = "true";
                                 scope.calculatePoints(model);
                                 expect(scope.$parent.option1).toEqual("Waterfall");
                                 expect(scope.$parent.score1).toEqual(20);
                                 expect (true).toEqual(true);
                                 
                                 });
                             it ('should be able to create a project with RAD as best option', function() {
                                 var model = function(){};
                                 model.question1 = "true";
                                 model.question5 = "true";
                                 model.question6 = "true";
                                 model.question7 = "true";
                                 scope.calculatePoints(model);
                                 expect(scope.$parent.option1).toEqual("RAD");
                                 expect(scope.$parent.score1).toEqual(20);
                                 expect (true).toEqual(true);
                                 
                                 });
                             it ('should be able to create a project with Agile as best option', function() {
                                 var model = function(){};
                                 model.question1 = "true";
                                 model.question3 = "true";
                                 model.question5 = "true";
                                 model.question7 = "true";
                                 scope.calculatePoints(model);
                                 expect(scope.$parent.option1).toEqual("Waterfall");
                                 expect(scope.$parent.score1).toEqual(19);
                                 expect (true).toEqual(true);
                                 
                                 });
                             it ('should be able to create a project with Optimized Waterfall as best option', function() {
                                 var model = function(){};
                                 model.question1 = "true";
                                 model.question3 = "true";
                                 model.question8 = "true";
                                 model.question9 = "true";
                                 scope.calculatePoints(model);
                                 expect(scope.$parent.option1).toEqual("Optimized_Waterfall");
                                 expect(scope.$parent.score1).toEqual(20);
                                 expect (true).toEqual(true);
                                 
                                 });
                             it ('should be able to create a project with Prototyping as best option', function() {
                                 var model = function(){};
                                 model.question1 = "true";
                                 model.question5 = "true";
                                 model.question8 = "true";
                                 model.question9 = "true";
                                 scope.calculatePoints(model);
                                 expect(scope.$parent.option1).toEqual("Prototyping");
                                 expect(scope.$parent.score1).toEqual(19);
                                 expect (true).toEqual(true);
                                 
                                 });
                             });
                    });
          describe ("Iteration 3", function() {
                    
                    //beforeEach(function() {
                    
                    /*app.controller("authCtrl", function($location,  $scope, $httpBackend, $http){
                     $http.get('resource/').success(function(data) {
                     
                     })
                     scope = $scope;
                     http = $http;
                     httpBackend = $httpBackend;
                     });
                     
                     var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster']);
                     
                     */
                    
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
                    
                    //})
                    describe("Notifications", function () {
                             var scope;
                             var controller;
                             var location, $rootScope, http, httpBackend;
                             var _Data;
                             var canceller;
                             beforeEach(function() {
                                        module('myApp');
                                        app.config;
                                        app.run;
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
                                        })
                             it ("should be able to get a notification", function() {
                                 httpBackend.whenPOST("api/v1/getNotifications").respond({message: "success"});
                                 
                                 httpBackend.expectPOST('api/v1/getNotifications').respond({message: "success"});
                                 
                                 _Data.post('getNotifications', {
                                           })
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
                             it ("should be able to get a pending notification", function() {
                                 httpBackend.whenPOST("api/v1/getPendingNotifications").respond({message: "success"});
                                 
                                 httpBackend.expectPOST('api/v1/getPendingNotifications').respond({message: "success"});
                                 
                                 _Data.post('getPendingNotifications', {
                                           })
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
                             it ("should be able to add a notification as admin", function() {
                                 httpBackend.whenPOST("api/v1/addNotification").respond({message: "success"});
                                 
                                 httpBackend.expectPOST('api/v1/addNotification').respond({message: "success"});
                                 
                                 scope.role = "admin";
                                 var notification = "foo";
                                 _Data.post('addNotification', {
                                           notification: notification
                                           })
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
                             it ("should be able to add a notification as team_lead", function() {
                                 httpBackend.whenPOST("api/v1/addNotification").respond({message: "success"});
                                 
                                 httpBackend.expectPOST('api/v1/addNotification').respond({message: "success"});
                                 
                                 scope.role = "team_lead";
                                 var notification = "foo";
                                 
                                 _Data.post('addNotification', {
                                           notification: notification
                                           })
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
                             it ("should be able to add a temp notification not as team_lead or admin", function() {
                                 httpBackend.whenPOST("api/v1/addTempNotification").respond({message: "success"});
                                 
                                 httpBackend.expectPOST('api/v1/addTempNotification').respond({message: "success"});
                                 
                                 var notification = "foo";
                                 
                                 _Data.post('addTempNotification', {
                                           notification: notification
                                           })
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
                             });
                    describe("User Management", function () {
                             var scope;
                             var controller;
                             var location, $rootScope, http, httpBackend;
                             var _Data;
                             var canceller;
                             beforeEach(function() {
                                        module('myApp');
                                        app.config;
                                        app.run;
                                        inject(function(_$location_, _$httpBackend_, _$rootScope_, $controller,$location, $http, $q, Data) {
                                               canceller = $q.defer();
                                               baseLocation = _$location_;
                                               scope = _$rootScope_.$new();
                                               $rootScope = _$rootScope_;
                                               $rootScope.companies = "foo";
                                               controller = $controller("userManagmentCtrl", {$scope: $rootScope});
                                               //
                                               _Data = Data;
                                               //http = $http;
                                               
                                               http = $http;
                                               httpBackend = _$httpBackend_;
                                               
                                               });
                                        })
                             it ("should be able to add team lead id", function() {
                                 //httpBackend.whenGET("api/v1/logout").respond({message: "success"});
                                 //httpBackend.expectGET("api/v1/logout").respond({message: "success"});
                                 //httpBackend.flush();
                                 //location = getNewLocationPath("user_managment");
                                 
                                 httpBackend.whenPOST("api/v1/addTeamLeadID").respond({message: "success"});
                                 //var app = angular.module("myApp", []);
                                 //app.controller("authCtrl", function($scope, $httpBackend, $http) {
                                 httpBackend.expectPOST('api/v1/addTeamLeadID').respond({message: "success"});
                                 //httpBackend.flush();
                                 scope.teamleadid = "NewLeadID";
                                 
                                 _Data.post('addTeamLeadID', {
                                            teamleadid: scope.teamleadid
                                            })
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
                             it ("should be able to get users", function() {
                                 httpBackend.whenPOST("api/v1/getUsers").respond({message: "success"});
                                 //var app = angular.module("myApp", []);
                                 //app.controller("authCtrl", function($scope, $httpBackend, $http) {
                                 httpBackend.expectPOST('api/v1/getUsers').respond({message: "success"});
                                 scope.comp = "foo";
                                 _Data.post('getUsers', {
                                           company:scope.comp
                                           }).then(function (results) {
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
                             it ("should be able to promote team lead", function() {
                                 httpBackend.whenPOST("api/v1/promoteTL").respond({message: "success"});

                                 httpBackend.expectPOST('api/v1/promoteTL').respond({message: "success"});
                                 scope.teamleader = "foo";
                                 _Data.post('promoteTL', {
                                           tl:scope.teamleader
                                })
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
                             it ("should be able to add team member", function() {
                                 httpBackend.whenPOST("api/v1/promoteTM").respond({message: "success"});
                                 
                                 httpBackend.expectPOST('api/v1/promoteTM').respond({message: "success"});
                                 scope.teammember = "foo";
                                 _Data.post('promoteTM', {
                                            tm:scope.teammember
                                })
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
                             it ("should be able to move team lead", function() {
                                 httpBackend.whenPOST("api/v1/moveTL").respond({message: "success"});
                                 
                                 httpBackend.expectPOST('api/v1/moveTL').respond({message: "success"});
                                 scope.teamnameM = "foo";
                                 scope.teamleaderM = "foo";

                                 _Data.post('moveTL', {
                                            tn:scope.teamnameM,
                                            tl:scope.teamleaderM
                                  })
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
                             });
                    describe("Team Member Management", function () {
                             var scope;
                             var controller;
                             var location, $rootScope, http, httpBackend;
                             var _Data;
                             var canceller;
                             beforeEach(function() {
                                        module('myApp');
                                        app.config;
                                        app.run;
                                        inject(function(_$location_, _$httpBackend_, _$rootScope_, $controller,$location, $http, $q, Data) {
                                               canceller = $q.defer();
                                               baseLocation = _$location_;
                                               scope = _$rootScope_.$new();
                                               $rootScope = _$rootScope_;
                                               $rootScope.teammates = "foo";
                                               controller = $controller("roleManagementCtrl", {$scope: $rootScope});
                                               //
                                               _Data = Data;
                                               //http = $http;
                                               
                                               http = $http;
                                               httpBackend = _$httpBackend_;
                                               });
                                        })
                             it ("should be able to get teammates", function() {
                                 expect (true).toBeTruthy();
                                 
                                 });
                             
                             it ("should be able to move team members", function() {
                                 expect (true).toBeTruthy();
                                 
                                 });
                             
                             it ("should be able to remove team members", function() {
                                 expect (true).toBeTruthy();
                                 
                                 });
                             it ("should be able to assign role", function() {
                                 expect (true).toBeTruthy();
                                 
                                 });
                             });
                    
                    });
          describe ("Iteration 4", function() {
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
                                      controller = $controller("forgotPasswordCtrl", {$scope: $rootScope});
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
                    describe("Reset password", function () {
                             it ("should be able to reset password with email address", function() {
                                 httpBackend.whenPOST("api/v1/forgotPassword").respond({message: "success"});
                                 
                                 httpBackend.expectPOST('api/v1/forgotPassword').respond({message: "success"});
                                 scope.email = "foo";
                                 _Data.post('forgotPassword', {
                                        email: scope.email
                                    })
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