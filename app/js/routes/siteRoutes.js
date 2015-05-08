'use strict';

angular.module('app.site', [
  'ui.router' 
])

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      

      $stateProvider

        .state("create", {
          url: '/new',
          templateUrl: 'views/sites/create.html',
          controller: function($scope, $rootScope, $state, $filter, $http, Node){

            // Get token
            // @todo: move this into service
            /*if ($rootScope.token == undefined) {
              $http({
                url: $rootScope.apiUrl + 'restws/session/token',
                method: 'GET',
                requestType: 'text',
              }).success(function(data) {
                $rootScope.token = data;
                console.log('dad',data);
              });
            }*/

            $scope.name = '';
            $scope.machineName = '';
            $scope.machineFocused = false;
            $scope.machineNameClass = '';
            $scope.profile = 'helmcivic';
            $scope.location = null;

            $scope.getMachineName = function() {
              $scope.machineName = !$scope.machineNameFocused || $scope.machineName == '' ? $scope.name.replace(/[^a-z0-9]/gi, '-').toLowerCase() : $scope.machineName;
              Node.query({
                'type': 'site',
                field_machine_name: $scope.machineName
              }, function(data) {
                if (data.list.length) {
                  $scope.machineNameClass = 'has-error';
                }
                else {
                  $scope.machineNameClass = 'has-success';
                }
              })
            }

            $scope.submit = function(mlid) {
              if ($scope.machineNameClass == 'has-error') {
                alert('Sorry, your machine name is already taken.');
                return;
              }

              //data we need: profile&name&email&title&machine_name&lat&lng
              $scope.activeLink = mlid;
              var params = {
                key: $rootScope.siteApiKey,
                type: 'site',
                sitename: $scope.name,
                machine_name: $scope.machineName,
                email: $scope.mail,
                profile: $scope.profile
              };

              // Save inline
              $http.get($rootScope.siteApiUrl + 'api/create?'+serialize(params)).success(function(data) {
                $state.go('thanks');
              }).error(function(data) {
                console.log(data);
                alert('Oops, we ran into an issues. Please contact hello@helmcivic.com and we\'ll get you set up ASAP.');
              });
            }

            var serialize = function(obj) {
              var str = [];
              for(var p in obj)
                if (obj.hasOwnProperty(p)) {
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
              return str.join("&");
            }
          }
        })


        .state("thanks", {
          url: '/thanks?email',
          templateUrl: 'views/sites/thanks.html',
          controller: function($scope, $rootScope, $state, $filter, $http){
            $scope.email = $state.params.email;
          }
        })

    }
  ]
)


