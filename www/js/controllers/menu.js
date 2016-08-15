/**
 * Created by Moustafa on 7/26/16.
 */
angular.module('starter')

.controller('MenuCtrl', [ '$scope', '$state', '$firebaseAuth', '$ionicHistory',
  function( $scope, $state, $firebaseAuth, $ionicHistory) {

  var Auth = $firebaseAuth();

  $scope.init = function () {
    $scope.currentUser = {
      email: '',
      password: '',
      fbUser: {},
      name: '',
      picture: ''
    };
    $scope.authorized = false;
    $state.go('app.map');
  };

  $scope.init();

  $scope.login = function () {
    Auth.$signInWithEmailAndPassword($scope.currentUser.email, $scope.currentUser.password).then(function (auth) {
      $scope.currentUser.fbUser = auth;
      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $state.go('app.map');
      $scope.authorized = true;
    }, function (error) {
      $scope.error = error;
    });
  };

  $scope.createUser = function() {
    $scope.message = null;
    $scope.error = null;

    // Create a new user
    Auth.$createUserWithEmailAndPassword($scope.currentUser.email, $scope.currentUser.password)
      .then(function(firebaseUser) {
        $scope.message = "User created with uid: " + firebaseUser.uid;
        console.log($scope.message);
        $scope.authorized = true;
        $scope.currentUser.fbUser = firebaseUser;
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $state.go('app.createprofile');
      }).catch(function(error) {
      $scope.error = error;
    });
  };

  $scope.logout = function(){
    console.log('signing out');
    Auth.$signOut();
    $scope.init();
  };

}]);
