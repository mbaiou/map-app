/**
 * Created by mohamedisse on 8/12/16.
 */
angular.module('starter')
  .controller('ProfileCtrl',function($scope, cameraService, $firebaseAuth, $firebaseObject, $state) {

    var auth = $firebaseAuth();

    //use this to get the current authorization user (this.uid is the user's id in firebase)
    var firebaseUser = auth.$getAuth();

    console.log(firebaseUser);

    var ref = firebase.database().ref();

    // the reference in the database at users/<user's id>/profile
    var  profileRef = ref.child('users').child(firebaseUser.uid).child('profile');

    // the profile object
    var profileObject = $firebaseObject(profileRef);

    $scope.profile = {
      name: '',
      image: 'img/profileimg.png'
    };

    profileObject.$loaded().then(function(){ //wait for the firebase object to be loaded
      angular.extend($scope.profile, profileObject);

      if($scope.profile.name === ''){
        $state.go('app.createprofile')
      }

    }, function (error) {
      console.log(error);
    });

    $scope.addProfilePic = function () {
      var x = cameraService.showSheet();
      $scope.profile.image = cameraService.image;
      console.log($scope.profile.image);
    };

    $scope.createProfile = function() {
      console.log('pressed');
        profileObject.name = $scope.profile.name;
        profileObject.image = $scope.profile.image;

      profileObject.$save().then(function(ref){
        console.log(ref); 
        $state.go('app.map');
      }, function (error) {
        console.log(error);
      });

    };

  });
