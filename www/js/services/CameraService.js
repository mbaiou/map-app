/**
 * Created by mohamedisse on 8/12/16.
 */
angular.module('starter')
.service('cameraService',[ '$cordovaCamera', '$ionicActionSheet', '$timeout',
  function ($cordovaCamera, $ionicActionSheet, $timeout) {
  
    var cameraService = {
      self: this,
      
      fromCamera: {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
      },
      fromAlbum: {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
      },
      showSheet: function () {
        console.log('actionsheet should show');
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
              self.upload(fromCamera);
              return true;
            } else if (index === 1) {
              self.upload(fromAlbum);
              return true;
            }
          }
        });
        $timeout(function () {
          hideSheet();
        }, 5000);
      },
      
      upload: function (options) {
        $cordovaCamera.getPicture(options).then(function (imageData) {
            //return the image data
          return imageData;
        }, function (error) {
          console.error(error);
        });
      }
      
    };
    
    return cameraService;
  
}]);
