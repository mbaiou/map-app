/**
 * Created by mohamedisse on 7/26/16.
 */
angular.module('starter')
  .controller('UploadCtrl',function($scope, cameraService,$firebaseArray,$state) {

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
      console.log('Button has been pressed!');
      cameraService.showSheet();
      $scope.post.image  = cameraService.image;
      console.log($scope.post.image);
    };

    $scope.createPost = function(){
      console.log(' Button has been pressed!');
        var postArray = $firebaseArray(postRef);
        postArray.$add.({}).then(function(postRef) {
          var id = postRef.key;
          console.log('added record with id' + id);
          postArray.$indexFor(id);
          $state.go('app.myposts');
        },function(error){
          console.log(error);
        });
    };
  });




