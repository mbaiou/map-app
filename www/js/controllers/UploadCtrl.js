/**
 * Created by mohamedisse on 7/26/16.
 */
angular.module('starter.controllers')
.controller('UploadCtrl',function($scope) {

 $scope.upload = function (options) {
 $cordovaCamera.getPicture(options).then(function (imageData) {

  }, function (error) {
    console.error(error);
  });
};

$scope.fromAlbum = function () {
  var options = {
    quality: 75,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    allowEdit: true,
    encodingType: Camera.EncodingType.JPEG,
    popoverOptions: CameraPopoverOptions,
    targetWidth: 500,
    targetHeight: 500,
    saveToPhotoAlbum: false
  };
  $scope.upload(options);
};

$scope.fromCamera = function () {
  var options = {
    quality: 75,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,
    allowEdit: true,
    encodingType: Camera.EncodingType.JPEG,
    popoverOptions: CameraPopoverOptions,
    targetWidth: 500,
    targetHeight: 500,
    saveToPhotoAlbum: false
  };
  $scope.upload(options);
};


$scope.createPost = function () {
  var hideSheet = $ionicActionSheet.show({
    buttons: [
      {text: '<b>Take Picture</b>'},
      {text: '<b>Upload From Album</b>'}
    ],
    cancelText: 'Cancel',
    cancel: function () {
      console.log('Canceled');
    },
    buttonClicked: function (index) {
      if (index === 0) {
        $scope.fromCamera();
        return true;
      } else if (index === 1) {
        $scope.fromAlbum();
        return true;
      }
    }
  });
  $timeout(function () {
    hideSheet();
  }, 5000);
};

});
