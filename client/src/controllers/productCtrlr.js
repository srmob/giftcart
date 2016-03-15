exports.ProductDetailsController = function($scope, $stateParams, itemService) {
    console.log('product controller loaded');
  var encoded = encodeURIComponent($stateParams.itemId);
    console.log('item id from client is'+encoded);
    itemService.fetchItem(encoded).then(function(result){
        console.log('Result returned from Item Service is->'+JSON.stringify(result));
        $scope.item = result;
    })

  setTimeout(function() {
    $scope.$emit('ProductDetailsController');
  }, 0);
    
};