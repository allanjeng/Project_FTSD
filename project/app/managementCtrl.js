app.controller('roleManagementCtrl', function ($scope, $rootScope, $routeParams, $location, $log, $http, Data) {
  if ($scope.teammates === undefined) {
    Data.post('getteammates', {
      uid: $scope.uid,
      role: $scope.role
    }).then(function (results) {
        $scope.teammates = results.teammates
        var arr = [];
        $scope.teammates.forEach(function(entry) {
            if (!(arr.indexOf(entry) > -1)) {
                arr.push(entry);
            }
        });
        $scope.teammates = arr
        $scope.free_teammates = results.free_teammates
        var arr = [];
        $scope.free_teammates.forEach(function(entry) {
            if (!(arr.indexOf(entry[0]) > -1)) {
                arr.push(entry[0]);
            }
        });
        $scope.free_teammates = arr
        $scope.teamnames = results.tn
        var arr = [];
        $scope.teamnames.forEach(function(entry) {
            if (!(arr.indexOf(entry[0]) > -1)) {
                arr.push(entry[0]);
            }
        });
        $scope.teamnames = arr
        //Second part of function
        $scope.rolechoices = ['tester','coder','designer']

        $scope.roles = results.roles
        var arr = [];
        $scope.roles.forEach(function(entry) {
            if (!(arr.indexOf(entry) > -1)) {
                arr.push(entry);
            }
        });
        $scope.roles = arr

        $scope.free_roles = results.free_roles
        var arr = [];
        $scope.free_roles.forEach(function(entry) {
            if (!(arr.indexOf(entry) > -1)) {
                arr.push(entry);
            }
        });
        $scope.free_roles = arr



    });
  }

  $scope.moveTM = function (comp) {
    Data.post('moveTM', {
      tm:$scope.free_teammate,
      tn:$scope.teamname
    }).then(function (results) {
        Data.toast(results)
    });
  }

  $scope.assignRole = function (comp) {
    Data.post('assignRole', {
      fr:$scope.free_role,
      rc:$scope.rolechoice
    }).then(function (results) {
        Data.toast(results)
    });
  }
});


app.controller('userManagmentCtrl', function ($scope, $rootScope, $routeParams, $location, $log, $http, Data) {
  if ($scope.companies === undefined) {
    Data.post('getCompanies', {
    }).then(function (results) {
        $scope.company = results.companies
        var arr = [];
        $scope.company.forEach(function(entry) {
            if (!(arr.indexOf(entry[0]) > -1)) {
                arr.push(entry[0]);
            }
        });
        $scope.companies = arr
    });
  }

  $scope.addTeamLeadID = function () {
    Data.post('addTeamLeadID', {
        teamleadid: $scope.teamleadid
    }).then(function (results) {
        Data.toast(results);
    });
  }

  $scope.submitCompany = function (comp) {
    Data.post('getUsers', {
      company:$scope.comp
    }).then(function (results) {
        $scope.tl = results.tl
        $scope.tm = results.tm
        var tl_arr = [];
        if ($scope.tl != 0) {
          $scope.tl.forEach(function(entry) {
            if (!(tl_arr.indexOf(entry[0]) > -1)) {
              tl_arr.push(entry[0]);
            }
          });
        }
        var tm_arr = [];
        if ($scope.tm != 0) {
          $scope.tm.forEach(function(entry) {
            if (!(tm_arr.indexOf(entry[0]) > -1)) {
              tm_arr.push(entry[0]);
            }
          });
        }
        $scope.teamleaders = tl_arr
        $scope.teammembers = tm_arr
        Data.toast(results)
    });
  }

  $scope.promoteTL = function (comp) {
    Data.post('promoteTL', {
      tl:$scope.teamleader
    }).then(function (results) {
      Data.toast(results)
    });
  }

  $scope.promoteTM = function (comp) {
    Data.post('promoteTM', {
      tm:$scope.teammember
    }).then(function (results) {
      Data.toast(results)
    });
  }

  $scope.submitCompanyM = function (comp) {
    Data.post('getUsersM', {
      company:$scope.compM
    }).then(function (results) {
        $scope.tlM = results.tl
        $scope.tmM = results.tm
        var tl_arrM = [];
        if ($scope.tlM != 0) {
          $scope.tlM.forEach(function(entry) {
            if (!(tl_arrM.indexOf(entry[0]) > -1)) {
              tl_arrM.push(entry[0]);
            }
          });
        }
        var tm_arrM = [];
        if ($scope.tmM != 0) {
          $scope.tmM.forEach(function(entry) {
            if (!(tm_arrM.indexOf(entry[0]) > -1)) {
              tm_arrM.push(entry[0]);
            }
          });
        }
        $scope.teamleadersM = tl_arrM
        $scope.teamnamesM = tm_arrM
        Data.toast(results)
    });
  }

  $scope.moveTL = function (comp) {
    Data.post('moveTL', {
      tn:$scope.teamnameM,
      tl:$scope.teamleaderM
    }).then(function (results) {
        Data.toast(results)
    });
  }
});
