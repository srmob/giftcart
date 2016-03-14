(function(){
exports.itemService = function($http) {
  var self = this;

  self.fetchItem = function(id) {
    return $http.get('/item/id/'+id)
      .then(function(result){
        return result.data;
      },function(error) {
            console.log(error.message);
      });
  };
  return self;
};
}());