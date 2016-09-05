/**
 * Created by mohamedisse on 8/12/16.
 */
angular.module('starter')
.service('cameraService',[ '$cordovaCamera', '$ionicActionSheet', '$timeout','$q',
  function ($cordovaCamera, $ionicActionSheet, $timeout, $q) {

    var upload = function (options) {
      var deferred = $q.defer();

      $cordovaCamera.getPicture(options).then(function (imageData) {
        //return the image data
        cameraService.image = imageData;

        deferred.resolve();
      }, function (error) {
        deferred.reject(error);
        console.error(error);
      });
    };

    var cameraService = {
      self: this,

      image: '',

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
              upload(self.fromCamera).then(function () {
                return true;
              }, function (error) {
                console.log(error);
                return true;
              });
            }
            else if (index === 1) {
              upload(self.fromAlbum).then(function () {
                return true;
              }, function (error) {
                console.log(error);
                return true;
              });
            }
          }
        });
        $timeout(function () {
          hideSheet();
        }, 5000);
      }


    };

    return cameraService;

}]);
