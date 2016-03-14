(function(){
exports.homeService = function($http) {
  var self = this;

  self.fetchHome = function() {
    return $http.get('/home')
      .then(function(result){
        return result.data;
      },function(error) {
            console.log(error.message);
      });
  };

  return self;
};
    //components.factory('productInfo',funcGetAllProdCategories);
}());