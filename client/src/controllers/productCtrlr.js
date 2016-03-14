exports.ProductDetailsController = function($scope, $stateParams, itemService) {
  var encoded = encodeURIComponent($stateParams.id);
    console.log('item id from client is'+encoded);
    itemService.fetchItem(encoded).then(function(result){
        console.log('Result returned from Item Service is->'+result);
        $scope.item = result.data.item;
    })

  setTimeout(function() {
    $scope.$emit('ProductDetailsController');
  }, 0);
    
};