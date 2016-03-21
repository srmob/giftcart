exports.NavBarController = function($scope) {
    var user = {
        "name":"SriGanesh",
        "age" : "7"
    }
  $scope.user = user;

  setTimeout(function() {
    $scope.$emit('NavBarController');
  }, 0);
};

exports.categoryListController = function($scope,homeService) {
  
    homeService.fetchHome().then(function(result){
        console.log('Result returned from Service is->'+result);
        $scope.category_param = result.data.category_param;
        $scope.categories = result.data.categories;
        $scope.items = result.data.items;
    })
    setTimeout(function() {
        $scope.$emit('categoryListController');
    }, 0);
};