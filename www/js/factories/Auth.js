/**
 * Created by mohamedisse on 7/28/16.
 */
angular.module('starter')
  .factory('Auth',function($firebaseAuth,FirebaseUrl){
  var ref =  new Firebase(FirebaseUrl);
    var auth = $firebaseAuth(ref);
    return auth;
  });
