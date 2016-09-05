/**
 * Created by mohamedisse on 7/26/16.
 */
angular.module('starter')
  .controller('UploadCtrl',function($scope, cameraService,$firebaseArray,$state,$location) {

      var ref = firebase.database().ref();
      var list = $firebaseArray(ref);
      list.$add({foo: "bar"}).then();
      list.$remove(2).then();
      $scope.list = list;
      var id = ref.key;
      console.log("added record with id " + id);
      list.$indexFor(id); //return location in array

      var postRef = ref('posts');
      var postArray = $firebaseArray(postRef);

      postArray.$loaded().then(function(){
        angular.extend($scope.post, postArray)
      });

    $scope.post = {
      description: '',
      image: 'img/profile.png',
      geolocation: ""
    };

    $scope.takePostPic = function(){
      cameraService.showSheet();
      $scope.post.image  = cameraService.image;
      console.log($scope.post.image);
    };

    $scope.addPost = function(){
      var list = postArray;
      list.$add({ foo: "bar" }).then(function(ref) {
        var id = ref.key;
        console.log("added record with id " + id);
        list.$indexFor(id); // returns location in the array
      });
    };


    $scope.goNext = function(app){
      $location.path('/app/detailedposts');
    };
    $scope.navigate = function(app){
      $location.path('app/createposts')
    };

  });




