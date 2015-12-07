app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, $log) {
    //initially set those objects to null to avoid undefined error
    //
    //
    //
    if ($routeParams.key){
      Data.post('validate', {
          key: $routeParams.key
      }).then(function (results) {
          Data.toast(results);
      });
    }

    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    /*
    $scope.projectManage = function(){
        Data.post('projectManage',{
            }).then(function (results){
            if (results.status == "success"){
                $rootScope['projectName'] = results.projectName;
                $rootScope['projectModel'] = results.projectModel;
                $rootScope['projectDesc'] = results.projectDesc;
                $location.path('projectManage');
            }
        });
    };
    */
    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (customer) {
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('login');
            }
        });
    };

    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    };
               //NEW!!!!
               
               $scope.getNotification = function () {
               
               Data.post('getNotifications', {
                         }).then(function (results) {
                                 $scope.not = results.notif
                                 var arr = [];
                                 if ($scope.not != 0)
                                 {
                                 $scope.not.forEach(function(entry) {
                                                    arr.push(entry[0]);
                                                    });
                                 $scope.notifications = arr
                                 Data.toast(results)
                                 }
                                 });
               
               if ($scope.role == 'team_lead' || $scope.role == 'admin')
               {
               Data.post('getPendingNotifications', {
                         }).then(function (results) {
                                 $scope.not = results.notif
                                 var arr = [];
                                 if ($scope.not != 0)
                                 {
                                 $scope.not.forEach(function(entry) {
                                                    arr.push(entry[0]);
                                                    });
                                 $scope.tempNots = arr
                                 Data.toast(results)
                                 }
                                 });
               }
               };
               
               $scope.getNotificationMessage = function () {
               Data.post('getNotificationMessage', {
                         notification: $scope.notification
                         }).then(function (results) {
                                 $scope.notMessage = results.notmessage.toString()
                                 });
               };
               $scope.getPendingNotificationMessage = function () {
               Data.post('getNotificationMessage', {
                         notification: $scope.$$childHead.tempnot
                         }).then(function (results) {
                                 $scope.tempNotMessage = results.notmessage.toString()
                                 });
               };
               
               $scope.addNotification = function (notification) {
               if ($scope.role == 'team_lead' || $scope.role == 'admin')
               {
               Data.post('addNotification', {
                         notification: notification
                         }).then(function (results) {
                                 Data.toast(results);
                                 if (results.status == "success")
                                 {
                                 $location.path('notifications');
                                 }
                                 });
               }
               else
               {
               Data.post('addTempNotification', {
                         notification: notification
                         }).then(function (results) {
                                 Data.toast(results);
                                 if (results.status == "success")
                                 {
                                 $location.path('notifications');
                                 }
                                 });
               }
               };
               if ($location.$$path == '/notifications')
               {
               $scope.date = (new Date()).toString();
               Data.post('getNotifications', {
                         }).then(function (results) {
                                 $scope.not = results.notif
                                 var arr = [];
                                 if ($scope.not != 0)
                                 {
                                 $scope.not.forEach(function(entry) {
                                                    arr.push(entry[0]);
                                                    });
                                 $scope.notifications = arr
                                 }
                                 });
               
               Data.post('getPendingNotifications', {
                         }).then(function (results) {
                                 $scope.not = results.notif
                                 var arr = [];
                                 if ($scope.not != 0)
                                 {
                                 $scope.not.forEach(function(entry) {
                                                    arr.push(entry[0]);
                                                    });
                                 $scope.tempNots = arr
                                 }
                                 });
               }
               $scope.deleteNotification = function () {
               Data.post('deleteNotification', {
                         notification: $scope.notification
                         }).then(function (results) {
                                 $scope.notMessage = results.notmessage
                                 });
               }
               $scope.tempDeleteNotification = function () {
               Data.post('tempDeleteNotification', {
                         notification: $scope.tempnot
                         }).then(function (results) {
                                 $scope.tempNotMessage = results.notmessage
                                 });
               }
               $scope.approveNotification = function () {
               Data.post('approveNotification', {
                         notification: $scope.tempnot
                         }).then(function (results) {
                                 Data.toast(results);
                                 //$scope.tempNotMessage = results.notmessage
                                 });
               }
});
