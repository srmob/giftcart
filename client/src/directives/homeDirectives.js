exports.navBar = function() {
  return {
    controller: 'NavBarController',
    templateUrl: '/templates/nav_bar.html'
  };
};

exports.categoryList = function() {
  return {
    controller: 'categoryListController',
    templateUrl: '/templates/main_content.html'
  };
};