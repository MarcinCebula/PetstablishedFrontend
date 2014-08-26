"use strict";angular.module("petstablished",["ngCookies","ui.router"]),angular.module("petstablished").constant("env",{env:"production",api:"http://petstablishedserver.9wavelabs.com/api"}),angular.module("petstablished").controller("IntegrationCtrl",["$scope","$http","$state","env",function(t,e,a,s){t.form={},t.status={button:"Process"},t.processing=!1,t.response={},t.resetForm=function(){t.form={},t.processing=!1},t.submit=function(){t.processing=!0,t.status.button="Processing...",e.post(s.api+"/shelter/add_pets_to_organization",{integration:{organization_id:t.form.organizationId,fetch_count:t.form.fetchCount}}).success(function(e){t.response=e.shelter,a.go("integrate.preview"),t.status.button="Process"}).error(function(e){alert(e.error),t.status.button="Process",t.processing=!1})}}]),angular.module("petstablished").controller("PetsCtrl",["$scope","$http","$state","$stateParams","env",function(t,e,a,s,r){t.pagination={page:1,limit:20,count:0,visible:!1},t.shelter={},t.pets={},t.setupCrumbs=function(){t.breadcrumbs=[{state:"integrate.form",name:"Home",params:{},active:!1},{state:"shelters.index",name:"Shelters",params:{},active:!1},{state:"pets.index",name:t.shelter.name,params:{},active:!0}]};var i=function(){var e=t.pagination.page*t.pagination.limit;t.pagination.visible=e>=t.pagination.count?!1:!0};t.isMix=function(t){return"yes"==t?"Mix":""},t.loadMore=function(){t.pagination.disable=!0,t.pagination.page+=1,e.get(r.api+"/shelter/"+s.shelterUrlId+"/pets",{params:{page:t.pagination.page,limit:t.pagination.limit}}).success(function(e){t.pets=t.pets.concat(e.shelter_and_pets.pets),t.pagination.count=e.shelter_and_pets.pet_count,i()}).error(function(t){alert(t.error)})},e.get(r.api+"/shelter/"+s.shelterUrlId+"/pets",{params:{page:t.pagination.page,limit:t.pagination.limit}}).success(function(e){t.shelter=e.shelter_and_pets.shelter,t.pets=e.shelter_and_pets.pets,t.pagination.count=e.shelter_and_pets.pet_count,i(),t.setupCrumbs()}).error(function(t){alert(t.error)})}]),angular.module("petstablished").controller("PetCtrl",["$scope","$http","$state","$stateParams","env",function(t,e,a,s,r){t.shelter={},t.pet={},t.setupCrumbs=function(){t.breadcrumbs=[{state:"integrate.form",name:"Home",params:{},active:!1},{state:"shelters.index",name:"Shelters",params:{},active:!1},{state:"pets.index-wrapper.index",name:t.shelter.name,params:{shelterUrlId:t.shelter.uid_id},active:!1},{state:"fake",name:t.pet.name,params:{},active:!0}]},t.petInfo=function(){var e=$.extend({},t.pet);return delete e.media,e};t.isMix=function(t){return"yes"==t?"Mix":""},e.get(r.api+"/shelter/"+s.shelterUrlId+"/pets/"+s.petId,{}).success(function(e){t.shelter=e.shelter_and_pet.shelter,t.pet=e.shelter_and_pet.pet,t.setupCrumbs()}).error(function(t){alert(t.error)})}]),angular.module("petstablished").controller("PetEditCtrl",["$scope","$http","$state","$stateParams","env",function(t,e,a,s,r){t.shelter={},t.pet={},t.setupCrumbs=function(){t.breadcrumbs=[{state:"integrate.form",name:"Home",params:{},active:!1},{state:"shelters.index",name:"Shelters",params:{},active:!1},{state:"pets.index-wrapper.index",name:t.shelter.name,params:{shelterUrlId:t.shelter.uid_id},active:!1},{state:"pets.view-wrapper.view",name:t.pet.name,params:{petId:t.pet.id},active:!1},{state:"fake",name:"Edit",params:{},active:!0}]},t.petInfo=function(){var e=$.extend({},t.pet);return delete e.media,e};t.isMix=function(t){return"yes"==t?"Mix":""},e.get(r.api+"/shelter/"+s.shelterUrlId+"/pets/"+s.petId,{}).success(function(e){t.shelter=e.shelter_and_pet.shelter,t.pet=e.shelter_and_pet.pet,t.setupCrumbs()}).error(function(t){alert(t.error)})}]),angular.module("petstablished").controller("SheltersCtrl",["$scope","$http","$state","$stateParams","env",function(t,e,a,s,r){t.pagination={page:1,limit:10,count:0,visible:!1},t.setupCrumbs=function(){t.breadcrumbs=[{state:"integrate.form",name:"Home",params:{},active:!1},{state:"shelters",name:"Shelters",params:{},active:!0}]};var i=function(){var e=t.pagination.page*t.pagination.limit;t.pagination.visible=e>=t.pagination.count?!1:!0};t.loadMore=function(){t.pagination.page+=1,e.get(r.api+"/shelter/index",{params:{page:t.pagination.page,limit:t.pagination.limit}}).success(function(e){t.shelters=t.shelters.concat(e.index_with_extras.shelters),t.pagination.count=e.index_with_extras.count,i()}).error(function(t){alert(t.error)})},e.get(r.api+"/shelter/index",{params:{page:t.pagination.page,limit:t.pagination.limit}}).success(function(e){t.shelters=e.index_with_extras.shelters,t.pagination.count=e.index_with_extras.count,i(),t.setupCrumbs()}).error(function(t){alert(t.error)})}]),angular.module("petstablished").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(t,e,a){a.html5Mode(!0).hashPrefix("!"),e.otherwise("/integrate/form"),t.state("integrate",{url:"/integrate","abstract":!0,views:{navigation:{templateUrl:"partials/navigation.html"},body:{templateUrl:"partials/integration.html"}}}).state("integrate.form",{url:"/form",views:{"navigation.steps":{templateUrl:"partials/integration/integration-form.html"}}}).state("integrate.preview",{url:"/preview",views:{"navigation.steps":{templateUrl:"partials/integration/preview.html"}}}).state("shelters",{url:"/shelters","abstract":!0,views:{navigation:{templateUrl:"partials/navigation.html"},body:{templateUrl:"partials/shelters.html"}}}).state("shelters.index",{url:"/index",views:{breadcrumbs:{templateUrl:"partials/breadcrumbs.html"},"shelters.pages":{templateUrl:"partials/shelters/index.html"}}}).state("pets",{url:"/shelters/:shelterUrlId/pets","abstract":!0,views:{navigation:{templateUrl:"partials/navigation.html"},body:{templateUrl:"partials/pets.html"}}}).state("pets.index-wrapper",{url:"","abstract":!0,views:{body:{controller:"PetsCtrl",templateUrl:"partials/pets/pets-wrapper.html"}}}).state("pets.view-wrapper",{url:"/:petId","abstract":!0,views:{body:{controller:"PetCtrl",templateUrl:"partials/pets/pets-wrapper.html"}}}).state("pets.edit-wrapper",{url:"/:petId","abstract":!0,views:{body:{controller:"PetEditCtrl",templateUrl:"partials/pets/pets-wrapper.html"}}}).state("pets.index-wrapper.index",{url:"/index",views:{breadcrumbs:{templateUrl:"partials/breadcrumbs.html"},"pets.pages":{templateUrl:"partials/pets/index.html"}}}).state("pets.view-wrapper.view",{url:"/view",views:{breadcrumbs:{templateUrl:"partials/breadcrumbs.html"},"pets.pages":{templateUrl:"partials/pets/show.html"}}}).state("pets.edit-wrapper.edit",{url:"/edit",views:{breadcrumbs:{templateUrl:"partials/breadcrumbs.html"},"pets.pages":{templateUrl:"partials/pets/edit.html"}}})}]),function(t){try{t=angular.module("petstablished")}catch(e){t=angular.module("petstablished",[])}t.run(["$templateCache",function(t){t.put("partials/breadcrumbs.html",'<div class="container"><ol class="breadcrumb"><li ng-repeat="crumb in breadcrumbs"><span ng-show="crumb.active==true">{{crumb.name}}</span> <a ng-show="crumb.active==false" ui-sref="{{crumb.state}}({{ crumb.params }})">{{crumb.name}}</a></li></ol></div>')}])}(),function(t){try{t=angular.module("petstablished")}catch(e){t=angular.module("petstablished",[])}t.run(["$templateCache",function(t){t.put("partials/integration.html",'<div ng-controller="IntegrationCtrl" class="container integration-container"><div ui-view="navigation.steps"></div></div>')}])}(),function(t){try{t=angular.module("petstablished")}catch(e){t=angular.module("petstablished",[])}t.run(["$templateCache",function(t){t.put("partials/navigation.html",'<nav class="navbar navbar-default" role="navigation"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button><a class="navbar-brand" href="#">Petstablished</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"><ul class="nav navbar-nav"><li><a ui-sref="shelters.index">Shelters</a></li></ul></div></div></nav>')}])}(),function(t){try{t=angular.module("petstablished")}catch(e){t=angular.module("petstablished",[])}t.run(["$templateCache",function(t){t.put("partials/pets.html",'<div ui-view="body"></div>')}])}(),function(t){try{t=angular.module("petstablished")}catch(e){t=angular.module("petstablished",[])}t.run(["$templateCache",function(t){t.put("partials/shelters.html",'<div class="shelters" ng-controller="SheltersCtrl"><div ui-view="breadcrumbs"></div><div ui-view="shelters.pages"></div></div>')}])}(),function(t){try{t=angular.module("petstablished")}catch(e){t=angular.module("petstablished",[])}t.run(["$templateCache",function(t){t.put("partials/integration/integration-form.html",'<form role="novalidate form form-horizontal row"><div class="well col-sm-offset-3 col-sm-6 .col-xs-offsets-2 .col-xs-10"><div class="form-group"><label>Organization ID</label><input ng-model="form.organizationId" ng-disabled="processing" class="form-control input-lg text-center" placeholder="NY803" type="text" name="organization_id"></div><div class="form-group"><label>Fetch Count</label><input ng-model="form.fetchCount" ng-disabled="processing" class="form-control input-lg text-center" placeholder="25" type="number" name="fetch_count" min="1" max="500"></div><div class="form-group integration-submit"><button ng-click="submit()" ng-class="{true: \'disabled\'}[processing]" class="btn btn-default btn-lg col-xs-offset-1 col-xs-10">{{status.button}}</button></div></div></form>')}])}(),function(t){try{t=angular.module("petstablished")}catch(e){t=angular.module("petstablished",[])}t.run(["$templateCache",function(t){t.put("partials/integration/preview.html",'<div class="col-sm-offset-1 col-sm-9 col-xs-offsets-2 col-xs-12"><div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title">{{response.name}}</h3></div><div class="panel-body row"><div class="col-sm-4 col-xs-12"><h4>Only importing Cats and Dogs</h4><h5>Asked to import: {{ response.request_pets_count }} animals</h5><h5>Contains: {{ response.pet_count }} cats & dogs</h5><h5>Imported: {{ response.added_count }} cats & dogs</h5><h5>Updated: {{ response.updated_count }} cats & dogs</h5><br><br></div><div class="col-sm-8 col-xs-12 scrollable"><table class="table table-striped"><tbody><tr><td>ID</td><td>{{ response.id }}</td></tr><tr><td>Name</td><td>{{ response.name }}</td></tr><tr><td>Street</td><td>{{ response.address1 }}</td></tr><tr><td>Location</td><td>{{ response.city }}, {{ response.state }} {{ response.zip }}</td></tr><tr><td>Phone</td><td>{{ response.phone }}</td></tr><tr><td>Email</td><td>{{ response.email }}</td></tr></tbody></table></div><div class="col-xs-12"><br><div class="pull-right"><a ui-sref="integrate.form" ng-click="resetForm()" class="btn btn-default">Try Importing Again</a> <a ui-sref="pets.index-wrapper.index({ shelterUrlId: response.url_id })" class="btn btn-primary">Goto {{ response.name }}</a></div></div></div></div></div>')}])}(),function(t){try{t=angular.module("petstablished")}catch(e){t=angular.module("petstablished",[])}t.run(["$templateCache",function(t){t.put("partials/pets/edit.html",'<form role="form"><div class="form-group"><label for="exampleInputEmail1">Email address</label><input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email"></div><div ng-repeat="(key, value) in petInfo()" class="form-group"><label for="{{key}}">{{key}}</label><input type="test" class="form-control" value="{{value}}"></div><button type="submit" class="btn btn-default">Submit</button></form><div class="col-sm-7 col-xs-12"><div ng-repeat="(key, value) in petInfo()"><input type="text" name="{{key}}" value="{{value}}"><td>{{value}}</td></div></div>')}])}(),function(t){try{t=angular.module("petstablished")}catch(e){t=angular.module("petstablished",[])}t.run(["$templateCache",function(t){t.put("partials/pets/index.html",'<br><div class="container"><div ng-repeat="pet in pets"><div class="col-md-4 col-sm-6 col-xs-6 pets-wrapper"><div class="row thumbnail"><div class="col-sm-6 image"><div class="img-rounded image-index-wrapper"><a ui-sref="pets.view-wrapper.view({ petId: pet.id })"><img src="{{pet.media.images[0].medium.url}}" alt="" class="clip-pet-image"></a></div></div><div class="col-sm-5 content"><a ui-sref="pets.view-wrapper.view({ petId: pet.id })"><h4>{{pet.name}}</h4></a><br><div>({{pet.sex}}) {{pet.age}} {{isMix(pet.mix)}}</div><div>{{pet.status.verbose}}</div><div>{{pet.contact.email}}</div></div></div></div></div><div ng-show="pagination.visible==true" class="col-xs-12 load-more-container"><button ng-click="loadMore()" type="button" class="col-xs-12 col-sm-offset-4 col-sm-4 btn btn-default btn-lg">Get More</button></div></div>')}])}(),function(t){try{t=angular.module("petstablished")}catch(e){t=angular.module("petstablished",[])}t.run(["$templateCache",function(t){t.put("partials/pets/pets-wrapper.html",'<div class="pets"><div ui-view="breadcrumbs"></div><div ui-view="pets.pages"></div></div>')}])}(),function(t){try{t=angular.module("petstablished")}catch(e){t=angular.module("petstablished",[])}t.run(["$templateCache",function(t){t.put("partials/pets/show.html",'<div class="container pet-view"><div class="col-sm-12"><a ui-sref="pets.edit-wrapper.edit({ petId: pet.id })" class="btn btn-primary col-sm-2 pull-right btn-lg">Edit Page</a></div><div class="col-sm-12"><h1 class="col-sm-5">{{ pet.name}}</h1></div><div class="col-sm-5"><img ng-repeat="image in pet.media.images" ng-src="{{ image.large.url }}" alt="" class="col-sm-12"></div><div class="col-sm-7 col-xs-12"><table class="table table-striped"><tbody><tr ng-repeat="(key, value) in petInfo()"><td>{{key}}</td><td>{{value}}</td></tr></tbody></table></div></div>')}])}(),function(t){try{t=angular.module("petstablished")}catch(e){t=angular.module("petstablished",[])}t.run(["$templateCache",function(t){t.put("partials/shelters/index.html",'<br><div class="container"><div ng-repeat="shelter in shelters"><div class="col-sm-10"><a ui-sref="pets.index-wrapper.index({ shelterUrlId: shelter.url_id })"><h3>{{shelter.name}}</h3></a><div class="col-sm-8 col-xs-12"><table class="table table-striped"><tbody><tr><td>ID</td><td>{{ shelter.id }}</td></tr><tr><td>Name</td><td>{{ shelter.name }}</td></tr><tr><td>Street</td><td>{{ shelter.address1 }}</td></tr><tr><td>Location</td><td>{{ shelter.city }}, {{ shelter.shelter.state }} {{ shelter.shelter.zip }}</td></tr><tr><td>Phone</td><td>{{ shelter.phone }}</td></tr><tr><td>Email</td><td>{{ shelter.email }}</td></tr></tbody></table></div></div></div></div><br><div ng-show="pagination.visible==true" class="col-xs-12 load-more-container"><button ng-click="loadMore()" type="button" class="col-xs-12 col-sm-offset-4 col-sm-4 btn btn-default btn-lg">Get More</button></div>')}])}();