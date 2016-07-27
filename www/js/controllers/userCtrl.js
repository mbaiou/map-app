
angular.module('starter.controllers')
  .controller("userCtrl",function($scope, $state, $firebaseAuth,$ionicPopup) {

    var fbAuth = $firebaseAuth();
    $scope.showPopup = function(){
      var alertPopup = $ionicPopup.alert({
        title:'Error',
        template: {
          login:'Login entered incorrectly. Try again!',
          register: 'Registered incorrectly. Try again!'
        }
      });
    };

    $scope.login = function(username, password) {
      fbAuth.$signInWithEmailAndPassword( username, password).then(function(authData) {
        console.log('logged in:', authData);
        $state.go("map");
      }).catch(function(error) {
        console.error("ERROR: " + error);
      });
    };

    $scope.register = function(username, password) {
      fbAuth.$createUserWithEmailAndPassword(username, password).then(function(userData) {
        return fbAuth.$signInWithEmailAndPassword(username, password);
      }).then(function(authData) {
        $state.go("login");
      }).catch(function(error) {
        console.error("ERROR: " + error);
      });
    };
    $scope.logout = function () {
      var x = $firebaseAuth();
      x.$signOut();
      $state.go('map');
    };

  });
