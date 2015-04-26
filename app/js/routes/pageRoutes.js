'use strict';

angular.module('app')

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      
      $urlRouterProvider
        //.when('/', '/sites');

      $stateProvider
        
        .state("home", {
          url: '/',
          resolve: {
            links: function($stateParams, MenuLink) {
              return MenuLink.query().$promise.then(function(data) {
                return data.list;
              });
            },
            nodes: function($stateParams, Node) {
              return Node.query().$promise.then(function(data) {
                return data.list;
              });
            }
          },
          templateUrl: 'views/home.html',
          controller: function($scope, $rootScope, $state, $filter, links, nodes){
            $scope.links = links;
            $scope.nodes = nodes;
            $scope.parentLinks = $filter('filter')($scope.links, {plid: '0'}, true);
          }
        })

        .state("app", {
         url: '/app/:nid',
         resolve: {
            node: function($stateParams, Node) {
              return Node.get({nid: $stateParams.nid}).$promise.then(function(data) {
                return data;
              });
            }
          },
          templateUrl: 'views/app.html',
          controller: function($scope, $rootScope, $state, $filter, $sce, node){
            $scope.node = node;

            $scope.appGo = function(params) {
              $state.go('app', params);
            }
          }
        })


        .state("pricing", {
          url: '/mytown',
          resolve: {
            node: function($stateParams, Node) {
              return Node.get({nid: 16}).$promise.then(function(data) {
                return data;
              });
            }
          },
          templateUrl: 'views/mytown.html',
          controller: function($scope, $rootScope, $state, $filter, $sce, node){
            $scope.node = node;
            $scope.url = $rootScope.myTownUrl;

            $scope.trustSrc = function(src) {
              return $sce.trustAsResourceUrl(src);
            }

          }
        })



    }
  ]
)
