/**
 * Created by mohamedisse on 7/28/16.
 */
angular.module('starter.controllers')
  .controller('AuthCtrl',function($state) {
    var authCtrl = this;
    authCtrl.user = {
      email: '',
      password: '',
      Name: '',
      picture: ''
    };
    authCtrl.login = function () {
      Auth.$authwithPassword(authCtrl.user).then(function (auth) {
        $state.go('home');
      }, function (error) {
        authCtrl.error = error;
      });
    };
    authCtrl.register = function () {
      Auth.$createUser(authCtrl.user).then(function (user) {
        authCtrl.login();
      }, function (error) {
        authCtrl.error = error;
      });
    };
    authCtrl.logout = function(){
    user = $firebaseAuth();
      user.signout();
      $state.go('map');
    }
  });
