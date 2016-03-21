(function(){
exports.itemService = function($http) {
  var self = this;

  self.fetchItem = function(id) {
    return $http.get('/item/id/'+id)
      .then(function(result){
        //console.log('result is in Product Service file '+JSON.stringify(result.data.data.item))
        return result.data.data;
      },function(error) {
            console.log(error.message);
      });
  };
self.postReview = function(id,review) {
    return $http.post('/item/'+id+'/reviews')
      .then(function(result){
        //console.log('result is in Product Service file '+JSON.stringify(result.data.data.item))
        return result.data.data;
      },function(error) {
            console.log(error.message);
      });
  };
  return self;
};
}());