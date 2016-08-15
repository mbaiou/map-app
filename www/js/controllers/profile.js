/**
 * Created by mohamedisse on 8/12/16.
 */
angular.module('starter')
  .controller('ProfileCtrl',function($scope,cameraService) {

    $scope.profile = {
      name: '',
      image: 'img/profileimg.png'
    };

    $scope.addProfilePic = function () {
      var image = cameraService.showSheet();
      console.log(image);
    }
  });
