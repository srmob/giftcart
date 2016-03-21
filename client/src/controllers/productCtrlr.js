exports.ProductDetailsController = function($scope, $stateParams, itemService) {
    console.log('product controller loaded');
    var encoded = encodeURIComponent($stateParams.itemId);
    itemService.fetchItem(encoded).then(function(result){
        //console.log('Result returned from Item Service is->'+JSON.stringify(result));
        $scope.item = result.item;
        $scope.numReviews = result.numReviews;
        $scope.relatedItems = result.relatedItems ;
        $scope.stars = result.stars ;
    })
    
    $scope.addReview = function(review){
        console.log('review passed is '+review);
        itemService.postReview(encoded,review).then(function(result){
            console.log('review from itemService');
        });
    }
  setTimeout(function() {
    $scope.$emit('ProductDetailsController');
  }, 0);
    
};