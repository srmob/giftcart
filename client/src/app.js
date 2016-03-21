import angular from 'angular'
import 'angular-ui-router' 
import 'angular-ui-bootstrap'
var _ = require('underscore');   
 
//Fetch All controllers

var homeController = require('./controllers/homeController');   
var productControllers = require('./controllers/productCtrlr');   


//Fetch all directives
var homeDirectives = require('./directives/homeDirectives');
var productDirectives = require('./directives/productDirectives');

//Fetch all services
var homeServices = require('./services/homeServices');
var productServices = require('./services/productServices');
//console.log('home services '+homeServices);

var components = angular.module('giftmart.components', ['ng']); 

_.each(homeServices, function(factory, name) {
    //console.log('services registered'+name+' & factory is'+factory);
  components.factory(name, factory);
});
_.each(productServices, function(factory, name) {
    //console.log('services registered'+name+' & factory is'+factory);
  components.factory(name, factory);
});

_.each(homeController, function(controller, name) {
   // console.log('controllers is'+controller+'&&& name is '+name);
  components.controller(name, controller);
});
_.each(productControllers, function(controller, name) {
   // console.log('controllers is'+controller+'&&& name is '+name);
  components.controller(name, controller);
});
_.each(productControllers, function(controller, name) {
   // console.log('productControllers is'+controller+'&&& name is '+name);
  components.controller(name, controller);
});

_.each(homeDirectives, function(directive, name) {
  components.directive(name, directive);
});
_.each(productDirectives, function(directive, name) {
  components.directive(name, directive);
});


var app = angular.module('coolapp',['giftmart.components','ui.router','ui.bootstrap']);

/*app.config(function($routeProvider) {
  $routeProvider.
    when('/categories', {
      template: '<category-list></category-list>'
    }).when('/category/:category', {
      templateUrl: '/B-examples/templates/category_view.html'
    }).
    when('/checkout', {
      template: '<checkout></checkout>'
    }).
    when('/product/:id', {
      template: '<product-details></product-details>'
    });
});*/ 

app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/home')
    $stateProvider
        .state('home',{
            url: '/home',
            template: '<nav-bar></nav-bar>'+
                      '<category-list></category-list>'
        })
        .state('item',{
            url: '/item/id/:itemId',
            template: '<nav-bar></nav-bar>'+'<product-details></product-details>'
       /* <product-details></product-details>*/
        })
});


