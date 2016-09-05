/**
 * Created by mohamedisse on 7/26/16.
 */
angular.module('starter')
  .controller('UploadCtrl',function($scope, cameraService,$firebaseArray,$state,$location) {

      var ref = firebase.database().ref();
      var postRef = ref.child('posts');
      var postArray = $firebaseArray(postRef);

      postArray.$loaded().then(function(){
        angular.extend($scope.post, postArray)
      });

    $scope.post = {
      description: '',
      image: cameraService.image,
      geolocation: {
                  latitude:"",
                  longitude:"",
                  locid:""
                      },
      createtime:"",
      userId:""
    };

    $scope.takePostPic = function(){
      cameraService.showSheet();
      $scope.post.image  = cameraService.image;
      console.log($scope.post.image);
    };

    $scope.addPost = function(){
      var list = postArray;
      list.$add({ foo:'bar' }).then(function(postRef) {
        var id = postRef.key;
        console.log("added record with id " + id);
        list.$indexFor(id); // returns location in the array
      });
    };


  });




